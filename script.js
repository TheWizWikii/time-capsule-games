// =============================================
//  ESTADO DE LA APLICACIÓN
// =============================================
let sistemas = [];
let juegosPorSistema = {};
let todosLosJuegos = [];
let filtroSistema = 'xbox360';
let busqueda = '';
let vista = 'grid';
let sistemaActual = null;

// =============================================
//  REFERENCIAS AL DOM
// =============================================
const grid = document.getElementById('gameGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const galleryTitle = document.getElementById('galleryTitle');
const gamesCount = document.getElementById('gamesCount');
const totalGamesSpan = document.getElementById('totalGames');
const totalSystemsSpan = document.getElementById('totalSystems');
const systemsNav = document.querySelector('.systems-scroll');

const modal = document.getElementById('gameModal');
const modalClose = document.querySelector('.modal-close');
const modalCover = document.getElementById('modalCover');
const modalTitle = document.getElementById('modalTitle');
const modalSystem = document.getElementById('modalSystem');
const modalYear = document.getElementById('modalYear');
const modalGenre = document.getElementById('modalGenre');
const modalDeveloper = document.getElementById('modalDeveloper');
const modalDescription = document.getElementById('modalDescription');
const modalDownloadBtn = document.getElementById('modalDownloadBtn');
const modalTorrentBtn = document.getElementById('modalTorrentBtn');
const modalMagnetBtn = document.getElementById('modalMagnetBtn');

// =============================================
//  CARGAR SISTEMAS Y JUEGOS
// =============================================
async function cargarSistemas() {
    try {
        const respuesta = await fetch('data/sistemas.json');
        const data = await respuesta.json();
        sistemas = data.sistemas;
        
        // Cargar juegos de cada sistema
        await cargarTodosLosJuegos();
        
        // Generar filtros dinámicamente
        generarFiltros();
        
        // Inicializar
        actualizarStats();
        renderizarJuegos();
        
    } catch (error) {
        console.error('Error cargando sistemas:', error);
        cargarDatosRespaldo();
    }
}

async function cargarTodosLosJuegos() {
    todosLosJuegos = [];
    
    for (const sistema of sistemas) {
        try {
            const respuesta = await fetch(`data/${sistema.archivo}`);
            const data = await respuesta.json();
            
            // Guardar juegos por sistema para acceso rápido
            juegosPorSistema[sistema.id] = data.juegos;
            
            // Añadir al array plano con información del sistema
            data.juegos.forEach(juego => {
                todosLosJuegos.push({
                    ...juego,
                    sistema: sistema.id,
                    sistemaNombre: sistema.nombre,
                    sistemaIcono: sistema.icono
                });
            });
        } catch (error) {
            console.error(`Error cargando ${sistema.archivo}:`, error);
            juegosPorSistema[sistema.id] = [];
        }
    }
}

// =============================================
//  GENERAR FILTROS AUTOMÁTICAMENTE
// =============================================
function generarFiltros() {
    // Limpiar filtros existentes
    const filtrosExistentes = systemsNav.querySelectorAll('.system-filter');
    filtrosExistentes.forEach(btn => btn.remove());
    
    // Crear botón "Todos"
    const btnTodos = document.createElement('button');
    btnTodos.className = 'system-filter';
    btnTodos.dataset.system = 'all';
    btnTodos.innerHTML = `<i class="fas fa-globe"></i> Todos`;
    btnTodos.addEventListener('click', function() {
        document.querySelectorAll('.system-filter').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filtroSistema = 'all';
        renderizarJuegos();
    });
    systemsNav.appendChild(btnTodos);
    
    // Crear botón para cada sistema
    sistemas.forEach(sistema => {
        const btn = document.createElement('button');
        btn.className = 'system-filter';
        btn.dataset.system = sistema.id;
        const count = juegosPorSistema[sistema.id] ? juegosPorSistema[sistema.id].length : 0;
        btn.innerHTML = `<i class="fas ${sistema.icono}"></i> ${sistema.nombre} <span class="badge">${count}</span>`;
        btn.addEventListener('click', function() {
            document.querySelectorAll('.system-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtroSistema = sistema.id;
            renderizarJuegos();
        });
        systemsNav.appendChild(btn);
    });
    
    // Activar Xbox 360 por defecto
    document.querySelectorAll('.system-filter').forEach(btn => {
        if (btn.dataset.system === 'xbox360') {
            btn.classList.add('active');
        }
    });
}

// =============================================
//  FUNCIONES AUXILIARES
// =============================================
function getSistemasUnicos() {
    return sistemas.length;
}

function actualizarStats() {
    totalGamesSpan.textContent = todosLosJuegos.length;
    totalSystemsSpan.textContent = getSistemasUnicos();
}

function getNombreSistemaUpper(sistemaId) {
    const sistema = sistemas.find(s => s.id === sistemaId);
    return sistema ? sistema.nombre.toUpperCase() : sistemaId.toUpperCase();
}

function getIconoSistema(sistemaId) {
    const sistema = sistemas.find(s => s.id === sistemaId);
    return sistema ? sistema.icono : 'fa-gamepad';
}

function getNombreSistema(sistemaId) {
    const sistema = sistemas.find(s => s.id === sistemaId);
    return sistema ? sistema.nombre : sistemaId;
}

// =============================================
//  RENDERIZADO DE JUEGOS
// =============================================
function renderizarJuegos() {
    const filtrados = todosLosJuegos.filter(j => {
        const coincideSistema = filtroSistema === 'all' || j.sistema === filtroSistema;
        const coincideBusqueda = j.titulo.toLowerCase().includes(busqueda.toLowerCase());
        return coincideSistema && coincideBusqueda;
    });

    gamesCount.textContent = `${filtrados.length} juegos`;
    if (filtroSistema === 'all') {
        galleryTitle.textContent = 'TODOS LOS JUEGOS';
    } else {
        galleryTitle.textContent = getNombreSistemaUpper(filtroSistema);
    }

    if (filtrados.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    const html = filtrados.map(j => `
        <div class="game-card" data-id="${j.id}" onclick="abrirModal(${j.id})">
            <div class="card-cover">
                ${j.cover ? 
                    `<img src="${j.cover}" alt="${j.titulo}" loading="lazy" />` : 
                    `<div class="no-cover"><i class="fas fa-image"></i></div>`
                }
            </div>
            <div class="card-info">
                <div class="card-title">${j.titulo}</div>
            </div>
        </div>
    `).join('');

    grid.innerHTML = html;
    grid.classList.toggle('list-view', vista === 'list');
}

// =============================================
//  MODAL
// =============================================
function abrirModal(id) {
    const juego = todosLosJuegos.find(j => j.id === id);
    if (!juego) return;

    modalCover.src = juego.cover || '';
    modalCover.alt = juego.titulo;
    modalTitle.textContent = juego.titulo;
    modalSystem.innerHTML = `<i class="fas ${getIconoSistema(juego.sistema)}"></i> ${getNombreSistema(juego.sistema)}`;
    modalYear.innerHTML = `<i class="far fa-calendar-alt"></i> ${juego.año || '—'}`;
    modalGenre.innerHTML = `<i class="fas fa-tag"></i> ${juego.genero || '—'}`;
    modalDeveloper.querySelector('span').textContent = juego.desarrolladora || '—';
    modalDescription.textContent = juego.descripcion || 'Sin descripción disponible.';

    // Botón 1: Descarga Directa
    if (juego.download && juego.download !== '#') {
        modalDownloadBtn.href = juego.download;
        modalDownloadBtn.textContent = 'Descarga Directa';
        modalDownloadBtn.classList.remove('disabled');
        modalDownloadBtn.style.pointerEvents = 'auto';
        modalDownloadBtn.style.opacity = '1';
    } else {
        modalDownloadBtn.href = '#';
        modalDownloadBtn.textContent = 'No disponible';
        modalDownloadBtn.classList.add('disabled');
        modalDownloadBtn.style.pointerEvents = 'none';
        modalDownloadBtn.style.opacity = '0.4';
    }

    // Botón 2: Torrent
    if (juego.torrent && juego.torrent !== '#') {
        modalTorrentBtn.href = juego.torrent;
        modalTorrentBtn.textContent = 'Torrent';
        modalTorrentBtn.classList.remove('disabled');
        modalTorrentBtn.style.pointerEvents = 'auto';
        modalTorrentBtn.style.opacity = '1';
    } else {
        modalTorrentBtn.href = '#';
        modalTorrentBtn.textContent = 'No disponible';
        modalTorrentBtn.classList.add('disabled');
        modalTorrentBtn.style.pointerEvents = 'none';
        modalTorrentBtn.style.opacity = '0.4';
    }

    // Botón 3: Magnet
    if (juego.magnet && juego.magnet !== '#') {
        modalMagnetBtn.href = juego.magnet;
        modalMagnetBtn.textContent = 'Magnet';
        modalMagnetBtn.classList.remove('disabled');
        modalMagnetBtn.style.pointerEvents = 'auto';
        modalMagnetBtn.style.opacity = '1';
    } else {
        modalMagnetBtn.href = '#';
        modalMagnetBtn.textContent = 'No disponible';
        modalMagnetBtn.classList.add('disabled');
        modalMagnetBtn.style.pointerEvents = 'none';
        modalMagnetBtn.style.opacity = '0.4';
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function closeModal() {
    cerrarModal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
});

modalClose.addEventListener('click', cerrarModal);

// =============================================
//  FILTROS Y BÚSQUEDA
// =============================================
searchInput.addEventListener('input', function() {
    busqueda = this.value.trim();
    renderizarJuegos();
});

document.querySelector('.search-btn').addEventListener('click', function() {
    busqueda = searchInput.value.trim();
    renderizarJuegos();
});

searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        busqueda = this.value.trim();
        renderizarJuegos();
    }
});

// =============================================
//  CAMBIO DE VISTA
// =============================================
document.getElementById('gridViewBtn').addEventListener('click', function() {
    vista = 'grid';
    document.getElementById('listViewBtn').classList.remove('active');
    this.classList.add('active');
    renderizarJuegos();
});

document.getElementById('listViewBtn').addEventListener('click', function() {
    vista = 'list';
    document.getElementById('gridViewBtn').classList.remove('active');
    this.classList.add('active');
    renderizarJuegos();
});

// =============================================
//  DATOS DE RESPALDO (por si falla la carga)
// =============================================
function cargarDatosRespaldo() {
    sistemas = [
        {
            id: 'xbox360',
            nombre: 'Xbox 360',
            icono: 'fa-xbox',
            archivo: 'xbox360.json'
        }
    ];
    juegosPorSistema = {
        xbox360: [
            {
                id: 1,
                titulo: "Street Fighter X Tekken",
                año: 2012,
                genero: "Lucha",
                desarrolladora: "Capcom",
                descripcion: "El crossover definitivo.",
                cover: "covers/xbox360/sfxtekken.jpg",
                download: "#",
                torrent: "#",
                magnet: "#"
            }
        ]
    };
    todosLosJuegos = [];
    sistemas.forEach(sistema => {
        juegosPorSistema[sistema.id].forEach(juego => {
            todosLosJuegos.push({
                ...juego,
                sistema: sistema.id,
                sistemaNombre: sistema.nombre,
                sistemaIcono: sistema.icono
            });
        });
    });
    generarFiltros();
    actualizarStats();
    renderizarJuegos();
}

// =============================================
//  INICIALIZACIÓN
// =============================================
cargarSistemas();
