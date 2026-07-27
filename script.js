// =============================================
//  BASE DE DATOS DE JUEGOS
// =============================================
//  - cover: "covers/nombre.jpg" o URL
//  - download: "#" si no tienes enlace
//  - sistema: nes, snes, megadrive, ps1, ps2, gamecube, xbox360, switch, ps5
// =============================================

const juegos = [
    {
        id: 1,
        titulo: "Street Fighter X Tekken",
        sistema: "xbox360",
        año: 2012,
        genero: "Lucha",
        desarrolladora: "Capcom",
        descripcion: "El crossover definitivo entre dos de las sagas de lucha más importantes. Street Fighter y Tekken se enfrentan en este épico juego de combate.",
        cover: "covers/street_fighter_x_tekken.jpg",
        download: "#"
    },
    {
        id: 2,
        titulo: "The Evil Within",
        sistema: "xbox360",
        año: 2014,
        genero: "Survival Horror",
        desarrolladora: "Tango Gameworks",
        descripcion: "Del creador de Resident Evil, Shinji Mikami. Un terrorífico viaje a través de mentes retorcidas y realidades distorsionadas.",
        cover: "covers/the_evil_within.jpg",
        download: "#"
    },
    {
        id: 3,
        titulo: "Dead or Alive 5 Last Round",
        sistema: "xbox360",
        año: 2015,
        genero: "Lucha",
        desarrolladora: "Koei Tecmo",
        descripcion: "La entrega definitiva de la saga Dead or Alive con gráficos mejorados, nuevos personajes y mecánicas de combate refinadas.",
        cover: "covers/doa5_last_round.jpg",
        download: "#"
    },
    {
        id: 4,
        titulo: "Ninety-Nine Nights 2",
        sistema: "xbox360",
        año: 2010,
        genero: "Hack and Slash",
        desarrolladora: "Q Entertainment",
        descripcion: "Secuela del épico juego de acción con batallas masivas contra cientos de enemigos. Una historia de fantasía oscura.",
        cover: "covers/ninety_nine_nights_2.jpg",
        download: "#"
    },
    {
        id: 5,
        titulo: "Halo 3",
        sistema: "xbox360",
        año: 2007,
        genero: "FPS",
        desarrolladora: "Bungie",
        descripcion: "El épico final de la trilogía original de Halo. El Jefe Maestro enfrenta al Profeta de la Verdad en una batalla por la humanidad.",
        cover: "covers/halo_3.jpg",
        download: "#"
    },
    {
        id: 6,
        titulo: "Gears of War 3",
        sistema: "xbox360",
        año: 2011,
        genero: "TPS",
        desarrolladora: "Epic Games",
        descripcion: "La conclusión de la trilogía original de Gears. Marcus Fenix y su equipo luchan contra la amenaza Locust y la nueva Lambent.",
        cover: "covers/gears_of_war_3.jpg",
        download: "#"
    },
    {
        id: 7,
        titulo: "Forza Horizon",
        sistema: "xbox360",
        año: 2012,
        genero: "Carreras",
        desarrolladora: "Playground Games",
        descripcion: "El primer Horizon, un festival de carreras en mundo abierto con una selección increíble de coches y paisajes de ensueño.",
        cover: "covers/forza_horizon.jpg",
        download: "#"
    },
    {
        id: 8,
        titulo: "Red Dead Redemption",
        sistema: "xbox360",
        año: 2010,
        genero: "Acción-Aventura",
        desarrolladora: "Rockstar Games",
        descripcion: "El Oeste americano cobra vida en esta obra maestra de Rockstar. John Marston busca redención en un mundo que se desvanece.",
        cover: "covers/red_dead_redemption.jpg",
        download: "#"
    }
];

// =============================================
//  ESTADO DE LA APLICACIÓN
// =============================================
let filtroSistema = 'xbox360';  // Por defecto Xbox 360 como en la imagen
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
const modalSystemBadge = document.getElementById('modalSystemBadge');

// =============================================
//  FUNCIONES AUXILIARES
// =============================================
function getSistemasUnicos() {
    const sistemas = new Set(juegos.map(j => j.sistema));
    return sistemas.size;
}

function actualizarStats() {
    totalGamesSpan.textContent = juegos.length;
    totalSystemsSpan.textContent = getSistemasUnicos();
}

function getIconoSistema(sistema) {
    const mapa = {
        'nes': 'fa-gamepad',
        'snes': 'fa-gamepad',
        'megadrive': 'fa-gamepad',
        'ps1': 'fa-gamepad',
        'ps2': 'fa-gamepad',
        'gamecube': 'fa-gamepad',
        'xbox360': 'fa-xbox',
        'switch': 'fa-gamepad',
        'ps5': 'fa-gamepad'
    };
    return mapa[sistema] || 'fa-gamepad';
}

function getNombreSistema(sistema) {
    const mapa = {
        'nes': 'NES',
        'snes': 'SNES',
        'megadrive': 'Mega Drive',
        'ps1': 'PS1',
        'ps2': 'PS2',
        'gamecube': 'GameCube',
        'xbox360': 'Xbox 360',
        'switch': 'Switch',
        'ps5': 'PS5'
    };
    return mapa[sistema] || sistema;
}

function getNombreSistemaUpper(sistema) {
    const mapa = {
        'nes': 'NES',
        'snes': 'SNES',
        'megadrive': 'MEGA DRIVE',
        'ps1': 'PS1',
        'ps2': 'PS2',
        'gamecube': 'GAMECUBE',
        'xbox360': 'XBOX 360',
        'switch': 'SWITCH',
        'ps5': 'PS5'
    };
    return mapa[sistema] || sistema.toUpperCase();
}

// =============================================
//  RENDERIZADO DE JUEGOS
// =============================================
function renderizarJuegos() {
    const filtrados = juegos.filter(j => {
        const coincideSistema = filtroSistema === 'all' || j.sistema === filtroSistema;
        const coincideBusqueda = j.titulo.toLowerCase().includes(busqueda.toLowerCase());
        return coincideSistema && coincideBusqueda;
    });

    gamesCount.textContent = `${filtrados.length} juegos`;
    if (filtroSistema === 'all') {
        galleryTitle.textContent = 'Todos los juegos';
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
                <div class="card-system-badge">
                    <i class="fab fa-xbox"></i> ${getNombreSistemaUpper(j.sistema)}
                </div>
            </div>
            <div class="card-info">
                <div class="card-title">${j.titulo}</div>
                <div class="card-subtitle">
                    <i class="fas ${getIconoSistema(j.sistema)}"></i> ${getNombreSistema(j.sistema)}
                </div>
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
    const juego = juegos.find(j => j.id === id);
    if (!juego) return;

    modalCover.src = juego.cover || '';
    modalCover.alt = juego.titulo;
    modalTitle.textContent = juego.titulo;
    modalSystem.innerHTML = `<i class="fas ${getIconoSistema(juego.sistema)}"></i> ${getNombreSistema(juego.sistema)}`;
    modalYear.innerHTML = `<i class="far fa-calendar-alt"></i> ${juego.año || '—'}`;
    modalGenre.innerHTML = `<i class="fas fa-tag"></i> ${juego.genero || '—'}`;
    modalDeveloper.querySelector('span').textContent = juego.desarrolladora || '—';
    modalDescription.textContent = juego.descripcion || 'Sin descripción disponible.';
    modalDownloadBtn.href = juego.download || '#';
    modalDownloadBtn.textContent = juego.download && juego.download !== '#' ? 'Visitar enlace externo' : 'Enlace no disponible';
    if (!juego.download || juego.download === '#') {
        modalDownloadBtn.style.opacity = '0.5';
        modalDownloadBtn.style.pointerEvents = 'none';
    } else {
        modalDownloadBtn.style.opacity = '1';
        modalDownloadBtn.style.pointerEvents = 'auto';
    }
    modalSystemBadge.innerHTML = `<i class="${getIconoSistema(juego.sistema)}"></i> ${getNombreSistemaUpper(juego.sistema)}`;

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
document.querySelectorAll('.system-filter').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.system-filter').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filtroSistema = this.dataset.system;
        renderizarJuegos();
    });
});

searchInput.addEventListener('input', function() {
    busqueda = this.value.trim();
    renderizarJuegos();
});

// Botón de búsqueda
document.querySelector('.search-btn').addEventListener('click', function() {
    busqueda = searchInput.value.trim();
    renderizarJuegos();
});

// Enter en el campo de búsqueda
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
// Activar filtro por defecto Xbox 360
document.querySelectorAll('.system-filter').forEach(btn => {
    if (btn.dataset.system === 'xbox360') {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
});

actualizarStats();
renderizarJuegos();
