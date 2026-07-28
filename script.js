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
let ordenAlfabetico = false;

// =============================================
//  PAGINACIÓN
// =============================================
const JUEGOS_POR_PAGINA = 25;
let paginaActual = 1;

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
const systemSelect = document.getElementById('systemSelect');
const sortCheckbox = document.getElementById('sortAlphabetical');

// Controles de paginación
const paginacionContainer = document.getElementById('paginacion');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

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
    if (paginacionContainer) paginacionContainer.style.display = 'none';
}

// =============================================
//  MOSTRAR ERROR
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
    systemSelect.disabled = true;
    if (paginacionContainer) paginacionContainer.style.display = 'none';
}

// =============================================
//  CARGAR SISTEMAS
// =============================================
async function cargarSistemas() {
    mostrarSpinner('Cargando sistemas...');
    
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
        
        console.log(`✅ ${sistemas.length} sistemas cargados`);
        
        await cargarTodosLosJuegos();
        
        generarFiltros();
        actualizarStats();
        paginaActual = 1;
        renderizarJuegos();
        
        searchInput.disabled = false;
        document.querySelector('.search-btn').disabled = false;
        systemSelect.disabled = false;
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
//  CARGAR TODOS LOS JUEGOS
// =============================================
async function cargarTodosLosJuegos() {
    mostrarSpinner('Cargando juegos...');
    
    let totalCargados = 0;
    
    for (const sistema of sistemas) {
        try {
            const respuesta = await fetch(`data/${sistema.archivo}`);
            
            if (!respuesta.ok) {
                console.warn(`⚠️ No se pudo cargar ${sistema.archivo}: ${respuesta.status}`);
                juegosPorSistema[sistema.id] = [];
                continue;
            }
            
            const data = await respuesta.json();
            
            if (!data.juegos) {
                console.warn(`⚠️ El archivo ${sistema.archivo} no tiene la propiedad "juegos"`);
                juegosPorSistema[sistema.id] = [];
                continue;
            }
            
            juegosPorSistema[sistema.id] = data.juegos;
            
            data.juegos.forEach(juego => {
                todosLosJuegos.push({
                    ...juego,
                    sistema: sistema.id,
                    sistemaNombre: sistema.nombre,
                    sistemaIcono: sistema.icono
                });
            });
            
            totalCargados += data.juegos.length;
            console.log(`✅ ${data.juegos.length} juegos de ${sistema.nombre}`);
            
        } catch (error) {
            console.error(`❌ Error cargando ${sistema.archivo}:`, error);
            juegosPorSistema[sistema.id] = [];
        }
    }
    
    console.log(`📦 Total: ${totalCargados} juegos cargados`);
    
    if (todosLosJuegos.length === 0) {
        throw new Error('No se encontraron juegos en ningún sistema');
    }
}

// =============================================
//  GENERAR FILTROS (Dropdown)
// =============================================
function generarFiltros() {
    if (!systemSelect) return;
    
    systemSelect.innerHTML = '';
    
    const optTodos = document.createElement('option');
    optTodos.value = 'all';
    optTodos.textContent = `🌐 Todos (${todosLosJuegos.length})`;
    systemSelect.appendChild(optTodos);
    
    sistemas.forEach(sistema => {
        const opt = document.createElement('option');
        opt.value = sistema.id;
        const count = juegosPorSistema[sistema.id] ? juegosPorSistema[sistema.id].length : 0;
        opt.textContent = `${sistema.nombre} (${count})`;
        systemSelect.appendChild(opt);
    });
    
    if (filtroSistema && systemSelect.querySelector(`option[value="${filtroSistema}"]`)) {
        systemSelect.value = filtroSistema;
    } else {
        systemSelect.value = 'xbox360';
        filtroSistema = 'xbox360';
    }
    
    systemSelect.removeEventListener('change', cambiarSistema);
    systemSelect.addEventListener('change', cambiarSistema);
}

function cambiarSistema() {
    filtroSistema = systemSelect.value;
    paginaActual = 1;
    renderizarJuegos();
}

// =============================================
//  FUNCIONES AUXILIARES
// =============================================
function getSistemasUnicos() {
    return sistemas.length;
}

function actualizarStats() {
    if (totalGamesSpan) totalGamesSpan.textContent = todosLosJuegos.length;
    if (totalSystemsSpan) totalSystemsSpan.textContent = getSistemasUnicos();
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
//  FUNCIÓN PARA ORDENAR JUEGOS
// =============================================
function ordenarJuegos(juegos) {
    if (ordenAlfabetico) {
        return [...juegos].sort((a, b) => 
            a.titulo.localeCompare(b.titulo, 'es', { sensitivity: 'base' })
        );
    }
    return juegos;
}

// =============================================
//  OBTENER JUEGOS FILTRADOS
// =============================================
function getJuegosFiltrados() {
    const filtrados = todosLosJuegos.filter(j => {
        const coincideSistema = filtroSistema === 'all' || j.sistema === filtroSistema;
        const coincideBusqueda = j.titulo.toLowerCase().includes(busqueda.toLowerCase());
        return coincideSistema && coincideBusqueda;
    });
    
    return ordenarJuegos(filtrados);
}

// =============================================
//  RENDERIZADO DE JUEGOS CON PAGINACIÓN
// =============================================
function renderizarJuegos() {
    if (cargando) return;
    
    const filtrados = getJuegosFiltrados();
    const totalJuegos = filtrados.length;
    const totalPaginas = Math.ceil(totalJuegos / JUEGOS_POR_PAGINA);
    
    if (paginaActual > totalPaginas && totalPaginas > 0) {
        paginaActual = totalPaginas;
    }
    if (paginaActual < 1) paginaActual = 1;
    
    const inicio = (paginaActual - 1) * JUEGOS_POR_PAGINA;
    const fin = Math.min(inicio + JUEGOS_POR_PAGINA, totalJuegos);
    const juegosPagina = filtrados.slice(inicio, fin);
    
    gamesCount.textContent = `${totalJuegos} juegos`;
    if (filtroSistema === 'all') {
        galleryTitle.textContent = 'TODOS LOS JUEGOS';
    } else {
        galleryTitle.textContent = getNombreSistemaUpper(filtroSistema);
    }
    
    if (paginacionContainer) {
        if (totalJuegos > JUEGOS_POR_PAGINA) {
            paginacionContainer.style.display = 'flex';
            actualizarControlesPaginacion(paginaActual, totalPaginas, totalJuegos);
        } else {
            paginacionContainer.style.display = 'none';
        }
    }
    
    if (totalJuegos === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        if (paginacionContainer) paginacionContainer.style.display = 'none';
        return;
    }
    noResults.style.display = 'none';
    
    const html = juegosPagina.map(j => `
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
//  CONTROLES DE PAGINACIÓN
// =============================================
function actualizarControlesPaginacion(pagina, totalPaginas, totalJuegos) {
    if (prevPageBtn) {
        prevPageBtn.disabled = pagina <= 1;
        prevPageBtn.style.opacity = pagina <= 1 ? '0.4' : '1';
    }
    if (nextPageBtn) {
        nextPageBtn.disabled = pagina >= totalPaginas;
        nextPageBtn.style.opacity = pagina >= totalPaginas ? '0.4' : '1';
    }
    if (pageInfo) {
        const inicio = (pagina - 1) * JUEGOS_POR_PAGINA + 1;
        const fin = Math.min(pagina * JUEGOS_POR_PAGINA, totalJuegos);
        pageInfo.textContent = `${inicio} - ${fin} de ${totalJuegos}`;
    }
}

function irPagina(pagina) {
    const filtrados = getJuegosFiltrados();
    const totalPaginas = Math.ceil(filtrados.length / JUEGOS_POR_PAGINA);
    if (pagina < 1 || pagina > totalPaginas) return;
    paginaActual = pagina;
    renderizarJuegos();
    document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function paginaAnterior() {
    if (paginaActual > 1) {
        irPagina(paginaActual - 1);
    }
}

function paginaSiguiente() {
    const filtrados = getJuegosFiltrados();
    const totalPaginas = Math.ceil(filtrados.length / JUEGOS_POR_PAGINA);
    if (paginaActual < totalPaginas) {
        irPagina(paginaActual + 1);
    }
}

// =============================================
//  EVENTO DEL CHECKBOX (orden alfabético)
// =============================================
if (sortCheckbox) {
    sortCheckbox.addEventListener('change', function() {
        ordenAlfabetico = this.checked;
        paginaActual = 1;
        renderizarJuegos();
    });
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
    paginaActual = 1;
    renderizarJuegos();
});

document.querySelector('.search-btn').addEventListener('click', function() {
    busqueda = searchInput.value.trim();
    paginaActual = 1;
    renderizarJuegos();
});

searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        busqueda = this.value.trim();
        paginaActual = 1;
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
console.log('🔄 Iniciando RetroVault...');
cargarSistemas();
console.log('✅ RetroVault listo!');
