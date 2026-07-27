// =============================================
//  BASE DE DATOS DE JUEGOS (MODIFICA AQUÍ)
// =============================================
//  - cover: Puedes usar una URL o "covers/nombre.jpg"
//  - download: Pon "#" si no tienes enlace aún
//  - sistema: Debe coincidir con los data-system de los filtros
// =============================================

const juegos = [
    {
        id: 1,
        titulo: "Super Mario Bros",
        sistema: "nes",
        año: 1985,
        genero: "Plataformas",
        desarrolladora: "Nintendo",
        descripcion: "El clásico juego que revolucionó los plataformas. Mario debe rescatar a la princesa Peach del malvado Bowser.",
        cover: "https://cdn.thegamesdb.net/images/original/boxart/front/140-1.jpg",  // O usa covers/cover.jpg"
        download: "#"  // Cambia por tu enlace externo
    },
    {
        id: 2,
        titulo: "The Legend of Zelda",
        sistema: "snes",
        año: 1991,
        genero: "Aventura",
        desarrolladora: "Nintendo",
        descripcion: "Una épica aventura en Hyrule. Link debe derrotar a Ganon y salvar a la princesa Zelda.",
        cover: "covers/zelda_snes.jpg",
        download: "#"
    },
    {
        id: 3,
        titulo: "Sonic the Hedgehog 2",
        sistema: "megadrive",
        año: 1992,
        genero: "Plataformas",
        desarrolladora: "Sega",
        descripcion: "Sonic corre a toda velocidad para detener al Dr. Robotnik. Con Tails como compañero.",
        cover: "covers/sonic_2.jpg",
        download: "#"
    },
    {
        id: 4,
        titulo: "Final Fantasy VII",
        sistema: "ps1",
        año: 1997,
        genero: "RPG",
        desarrolladora: "Square",
        descripcion: "Un clásico del RPG. Cloud y sus aliados luchan contra la corporación Shinra y Sephiroth.",
        cover: "covers/ff7.jpg",
        download: "#"
    },
    {
        id: 5,
        titulo: "God of War II",
        sistema: "ps2",
        año: 2007,
        genero: "Acción",
        desarrolladora: "Santa Monica Studio",
        descripcion: "Kratos continúa su venganza contra los dioses del Olimpo en esta espectacular aventura.",
        cover: "covers/gow2.jpg",
        download: "#"
    },
    {
        id: 6,
        titulo: "The Legend of Zelda: The Wind Waker",
        sistema: "gamecube",
        año: 2002,
        genero: "Aventura",
        desarrolladora: "Nintendo",
        descripcion: "Link explora un océano infinito en un estilo visual cel-shading único y encantador.",
        cover: "covers/wind_waker.jpg",
        download: "#"
    },
    {
        id: 7,
        titulo: "Halo 3",
        sistema: "xbox360",
        año: 2007,
        genero: "FPS",
        desarrolladora: "Bungie",
        descripcion: "El épico final de la trilogía original de Halo. El Jefe Maestro enfrenta al Profeta de la Verdad.",
        cover: "covers/halo_3.jpg",
        download: "#"
    },
    {
        id: 8,
        titulo: "The Legend of Zelda: Breath of the Wild",
        sistema: "switch",
        año: 2017,
        genero: "Aventura",
        desarrolladora: "Nintendo",
        descripcion: "Un mundo abierto sin precedentes en la saga. Link despierta tras 100 años para derrotar a Ganon.",
        cover: "covers/botw.jpg",
        download: "#"
    },
    {
        id: 9,
        titulo: "God of War Ragnarök",
        sistema: "ps5",
        año: 2022,
        genero: "Acción",
        desarrolladora: "Santa Monica Studio",
        descripcion: "Kratos y Atreus se enfrentan al Ragnarök en un viaje emocional y épico por los nueve reinos.",
        cover: "covers/ragnarok.jpg",
        download: "#"
    },
    {
        id: 10,
        titulo: "Donkey Kong Country",
        sistema: "snes",
        año: 1994,
        genero: "Plataformas",
        desarrolladora: "Rare",
        descripcion: "Donkey Kong y Diddy Kong deben recuperar su plátano robado por los Kremlings.",
        cover: "covers/dkc.jpg",
        download: "#"
    },
    {
        id: 11,
        titulo: "Mega Man X",
        sistema: "snes",
        año: 1993,
        genero: "Acción",
        desarrolladora: "Capcom",
        descripcion: "X, un reploid avanzado, lucha contra los Mavericks en este clásico de acción y plataformas.",
        cover: "covers/mega_man_x.jpg",
        download: "#"
    },
    {
        id: 12,
        titulo: "Shadow of the Colossus",
        sistema: "ps2",
        año: 2005,
        genero: "Aventura",
        desarrolladora: "Team Ico",
        descripcion: "Un joven debe derrotar a 16 colosos para revivir a una chica. Una obra maestra atmosférica.",
        cover: "covers/sotc.jpg",
        download: "#"
    }
];

// =============================================
//  ESTADO DE LA APLICACIÓN
// =============================================
let filtroSistema = 'all';
let busqueda = '';
let vista = 'grid';  // 'grid' o 'list'
let juegoSeleccionado = null;

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

// =============================================
//  RENDERIZADO DE JUEGOS
// =============================================
function renderizarJuegos() {
    const filtrados = juegos.filter(j => {
        const coincideSistema = filtroSistema === 'all' || j.sistema === filtroSistema;
        const coincideBusqueda = j.titulo.toLowerCase().includes(busqueda.toLowerCase());
        return coincideSistema && coincideBusqueda;
    });

    // Actualizar contador y título
    gamesCount.textContent = `${filtrados.length} juegos`;
    if (filtroSistema === 'all') {
        galleryTitle.textContent = 'Todos los juegos';
    } else {
        const nombre = getNombreSistema(filtroSistema);
        galleryTitle.textContent = `${nombre} (${filtrados.length})`;
    }

    // Mostrar u ocultar mensaje de no resultados
    if (filtrados.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    // Construir HTML
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
                <div class="card-system">
                    <i class="fas ${getIconoSistema(j.sistema)}"></i> ${getNombreSistema(j.sistema)}
                </div>
            </div>
            <div class="card-overlay">
                <div class="overlay-title">${j.titulo}</div>
                <div class="overlay-meta">${getNombreSistema(j.sistema)} • ${j.año}</div>
                <a href="${j.download}" target="_blank" class="btn-download" onclick="event.stopPropagation();">
                    <i class="fas fa-external-link-alt"></i> Enlace
                </a>
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

    juegoSeleccionado = juego;
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
        modalDownloadBtn.style.opacity = '0.6';
        modalDownloadBtn.style.pointerEvents = 'none';
    } else {
        modalDownloadBtn.style.opacity = '1';
        modalDownloadBtn.style.pointerEvents = 'auto';
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

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
});

// Cerrar modal clic fuera
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
actualizarStats();
renderizarJuegos();
