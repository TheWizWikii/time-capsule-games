// =============================================
//  VERSIÓN DE PRUEBA - DATOS EN EL SCRIPT
//  SI ESTO FUNCIONA, EL PROBLEMA SON LOS JSON
// =============================================

// =============================================
//  DATOS DE PRUEBA (juegos de ejemplo)
// =============================================
const juegosDePrueba = [
    {
        id: 1,
        titulo: "Street Fighter X Tekken",
        sistema: "xbox360",
        año: 2012,
        genero: "Lucha",
        desarrolladora: "Capcom",
        descripcion: "El crossover definitivo entre dos de las sagas de lucha más importantes.",
        cover: "covers/xbox360/street_fighter_x_tekken.jpg",
        download: "#",
        torrent: "#",
        magnet: "#"
    },
    {
        id: 2,
        titulo: "The Evil Within",
        sistema: "xbox360",
        año: 2014,
        genero: "Survival Horror",
        desarrolladora: "Tango Gameworks",
        descripcion: "Del creador de Resident Evil, Shinji Mikami.",
        cover: "covers/xbox360/the_evil_within.jpg",
        download: "#",
        torrent: "#",
        magnet: "#"
    },
    {
        id: 3,
        titulo: "Halo 3",
        sistema: "xbox360",
        año: 2007,
        genero: "FPS",
        desarrolladora: "Bungie",
        descripcion: "El épico final de la trilogía original de Halo.",
        cover: "covers/xbox360/halo_3.jpg",
        download: "#",
        torrent: "#",
        magnet: "#"
    }
];

// =============================================
//  ESTADO DE LA APLICACIÓN
// =============================================
let todosLosJuegos = [];
let filtroSistema = 'xbox360';
let busqueda = '';
let vista = 'grid';

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
//  INICIALIZAR CON DATOS DE PRUEBA
// =============================================
function inicializar() {
    // Copiar datos de prueba
    todosLosJuegos = juegosDePrueba.map(j => ({
        ...j,
        sistemaNombre: 'Xbox 360',
        sistemaIcono: 'fa-xbox'
    }));
    
    // Generar filtros
    generarFiltros();
    actualizarStats();
    renderizarJuegos();
    
    // Habilitar elementos
    searchInput.disabled = false;
    document.querySelector('.search-btn').disabled = false;
    
    // Ocultar loading
    if (initialLoading) {
        initialLoading.style.display = 'none';
    }
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
    
    // Botón Xbox 360
    const btnXbox = document.createElement('button');
    btnXbox.className = 'system-filter active';
    btnXbox.dataset.system = 'xbox360';
    btnXbox.innerHTML = `<i class="fab fa-xbox"></i> Xbox 360 <span class="badge">${todosLosJuegos.length}</span>`;
    btnXbox.addEventListener('click', function() {
        document.querySelectorAll('.system-filter').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filtroSistema = 'xbox360';
        renderizarJuegos();
    });
    systemsNav.appendChild(btnXbox);
}

// =============================================
//  FUNCIONES AUXILIARES
// =============================================
function actualizarStats() {
    totalGamesSpan.textContent = todosLosJuegos.length;
    totalSystemsSpan.textContent = '1';
}

function getNombreSistemaUpper(sistemaId) {
    return 'XBOX 360';
}

function getIconoSistema(sistemaId) {
    return 'fa-xbox';
}

function getNombreSistema(sistemaId) {
    return 'Xbox 360';
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
    modalSystem.innerHTML = `<i class="fas fa-xbox"></i> Xbox 360`;
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
inicializar();
