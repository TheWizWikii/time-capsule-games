// =============================================
//  BASE DE DATOS DE JUEGOS
// =============================================
//  - cover: "covers/nombre.jpg" o URL
//  - download: "#" si no tienes enlace
//  - torrent: "#" si no tienes enlace torrent
//  - magnet: "#" si no tienes enlace magnet
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
        cover: "https://cdn.thegamesdb.net/images/original/boxart/front/13386-1.jpg",
        download: "#",      // Enlace directo
        torrent: "https://minerva-archive.org/assets/Minerva_Myrient_v0.3/Minerva_Myrient%20-%20Redump%20-%20Microsoft%20-%20Xbox%20360.torrent",       // Enlace .torrent
        magnet: "magnet:?xt=urn:btih:c98fbaa2a36ee48e3d9423be02cdbefd9281bc7d&dn=Minerva_Myrient&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2810%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=http%3A%2F%2F95.107.48.115%3A80%2Fannounce&tr=http%3A%2F%2Fopen.acgnxtracker.com%3A80%2Fannounce&tr=http%3A%2F%2Ft.acg.rip%3A6699%2Fannounce&tr=http%3A%2F%2Ft.nyaatracker.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.bt4g.com%3A2095%2Fannounce&tr=http%3A%2F%2Ftracker.files.fm%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Fvps02.net.orel.ru%3A80%2Fannounce&tr=https%3A%2F%2F1337.abcvg.info%3A443%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce&tr=https%3A%2F%2Ftracker.nanoha.org%3A443%2Fannounce&tr=https%3A%2F%2Ftracker.sloppyta.co%3A443%2Fannounce&tr=udp%3A%2F%2F208.83.20.20%3A6969%2Fannounce&tr=udp%3A%2F%2F37.235.174.46%3A2710%2Fannounce&tr=udp%3A%2F%2F75.127.14.224%3A2710%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ffe.dealclub.de%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fmovies.zsw.ca%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fpublic.tracker.vraphim.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fretracker.lanta-net.ru%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.0x.tf%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filemail.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pomf.se%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.swateam.org.uk%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=https%3A%2F%2Ftracker1.ctix.cn%3A443%2Fannounce&tr=https%3A%2F%2Ftracker.loligirl.cn%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=https%3A%2F%2Ftracker.gbitt.info%3A443%2Fannounce&tr=http%3A%2F%2Ftracker.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.therarbg.to%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.therarbg.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.io%3A6969%2Fannounce&tr=udp%3A%2F%2Fnew-line.net%3A6969%2Fannounce&tr=udp%3A%2F%2Fmoonburrow.club%3A6969%2Fannounce&tr=udp%3A%2F%2Fepider.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fbt.ktrackers.com%3A6666%2Fannounce&so=3759"         // Enlace magnet
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
        download: "#",
        torrent: "#",
        magnet: "#"
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
        download: "#",
        torrent: "#",
        magnet: "#"
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
        download: "#",
        torrent: "#",
        magnet: "#"
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
        download: "#",
        torrent: "#",
        magnet: "#"
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
        download: "#",
        torrent: "#",
        magnet: "#"
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
        download: "#",
        torrent: "#",
        magnet: "#"
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
        download: "#",
        torrent: "#",
        magnet: "#"
    }
];

// =============================================
//  ESTADO DE LA APLICACIÓN
// =============================================
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
                <!-- SIN SUBTÍTULO -->
            </div>
        </div>
    `).join('');

    grid.innerHTML = html;
    grid.classList.toggle('list-view', vista === 'list');
}

// =============================================
//  MODAL CON 3 BOTONES
// =============================================
function abrirModal(id) {
    const juego = juegos.find(j => j.id === id);
    if (!juego) return;

    // Actualizar portada
    modalCover.src = juego.cover || '';
    modalCover.alt = juego.titulo;
    modalTitle.textContent = juego.titulo;

    // Meta info
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
document.querySelectorAll('.system-filter').forEach(btn => {
    if (btn.dataset.system === 'xbox360') {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
});

actualizarStats();
renderizarJuegos();
