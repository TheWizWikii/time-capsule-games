// =============================================
//  ESTADO DE LA APLICACIÓN
// =============================================
let sistemas = [];
let juegosPorSistema = {};
let todosLosJuegos = [];
let filtroSistema = 'xbox360';
let busqueda = '';
let vista = 'grid';
let cargando = true;

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
const initialLoading = document.getElementById('initialLoading');

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
//  MOSTRAR SPINNER DE CARGA
// =============================================
function mostrarSpinner(mensaje = 'Cargando biblioteca de juegos...') {
    grid.innerHTML = `
        <div class="loading-message" id="loadingSpinner">
            <div class="loading-spinner"></div>
            <p>${mensaje}</p>
        </div>
    `;
    noResults.style.display = 'none';
}

// =============================================
//  MOSTRAR PÁGINA DE ERROR
// =============================================
function mostrarError(mensaje, detalle = '') {
    grid.innerHTML = `
        <div class="error-page">
            <i class="fas fa-exclamation-triangle error-icon"></i>
            <h2>⚠️ Error al cargar los datos</h2>
            <p>${mensaje}</p>
            ${detalle ? `
                <div class="error-details">
                    <strong>Detalle técnico:</strong><br />
                    ${detalle}
                </div>
            ` : ''}
            <button class="btn-retry" onclick="window.location.reload()">
                <i class="fas fa-sync-alt"></i> Reintentar
            </button>
        </div>
    `;
    galleryTitle.textContent = '⚠️ ERROR';
    gamesCount.textContent = '—';
    searchInput.disabled = true;
    document.querySelector('.search-btn').disabled = true;
}

// =============================================
//  CARGAR SISTEMAS (solo la lista)
// =============================================
async function cargarSistemas() {
    try {
        const respuesta = await fetch('data/sistemas.json');
        
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
        }
        
        const data = await respuesta.json();
        sistemas = data.sistemas;
        
        if (!sistemas || sistemas.length === 0) {
            throw new Error('El archivo sistemas.json está vacío o mal formado');
        }
        
        // Una vez cargados los sistemas, cargar todos los juegos
        await cargarTodosLosJuegos();
        
        // Generar filtros y renderizar
        generarFiltros();
        actualizarStats();
        renderizarJuegos();
        
        // Habilitar elementos
        searchInput.disabled = false;
        document.querySelector('.search-btn').disabled = false;
        cargando = false;
        
    } catch (error) {
        console.error('Error cargando sistemas:', error);
        mostrarError(
            'No se pudo cargar la lista de sistemas.',
            `Error: ${error.message}`
        );
        cargando = false;
    }
}

// =============================================
//  CARGAR TODOS LOS JUEGOS (UNO POR UNO)
//  ===== ESTA ES LA FUNCIÓN QUE FUNCIONA =====
// =============================================
async function cargarTodosLosJuegos() {
    mostrarSpinner('Cargando juegos...');
    
    // Recorrer cada sistema y cargar su archivo JSON
    for (const sistema of sistemas) {
        try {
            const respuesta = await fetch(`data/${sistema.archivo}`);
            
            if (!respuesta.ok) {
                console.warn(`No se pudo cargar ${sistema.archivo}: ${respuesta.status}`);
                juegosPorSistema[sistema.id] = [];
                continue;
            }
            
            const data = await respuesta.json();
            
            if (!data.juegos) {
                console.warn(`El archivo ${sistema.archivo} no tiene la propiedad "juegos"`);
                juegosPorSistema[sistema.id] = [];
                continue;
            }
            
            // Guardar juegos de este sistema
            juegosPorSistema[sistema.id] = data.juegos;
            
            // Añadir al array plano
            data.juegos.forEach(juego => {
                todosLosJuegos.push({
                    ...juego,
                    sistema: sistema.id,
                    sistemaNombre: sistema.nombre,
                    sistemaIcono: sistema.icono
                });
            });
            
            console.log(`✅ Cargados ${data.juegos.length} juegos de ${sistema.nombre}`);
            
        } catch (error) {
            console.error(`Error cargando ${sistema.archivo}:`, error);
            juegosPorSistema[sistema.id] = [];
        }
    }
    
    // Verificar que haya juegos
    if (todosLosJuegos.length === 0) {
        throw new Error('No se encontraron juegos en ningún sistema');
    }
    
    console.log(`✅ Total: ${todosLosJuegos.length} juegos cargados`);
}

// =============================================
//  GENERAR FILTROS
// =============================================
function generarFiltros() {
    // Limpiar filtros existentes
    const filtrosExistentes = systemsNav.querySelectorAll('.system-filter');
    filtrosExistentes.forEach(btn => btn.remove());
    
    // Botón "Todos"
    const btnTodos = document.createElement('button');
    btnTodos.className = 'system-filter';
    btnTodos.dataset.system = 'all';
    btnTodos.innerHTML = `<i class="fas fa-globe"></i> Todos <span class="badge">${todosLosJuegos.length}</span>`;
    btnTodos.addEventListener('click', function() {
        document.querySelectorAll('.system-filter').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filtroSistema = 'all';
        renderizarJuegos();
    });
    systemsNav.appendChild(btnTodos);
    
    // Botones por sistema
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
    if (cargando) return;
    
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
                    `<img src="${j.cover}" alt="${j.titulo}" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=\\'no-cover\\'><i class=\\'fas fa-image\\'></i></div>'" />` : 
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
//  INICIALIZACIÓN
// =============================================
cargarSistemas();
