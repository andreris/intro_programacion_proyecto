const TOTAL_RONDAS = 7;
const PUNTOS_POR_ACIERTO = 10;

// Arreglo de objetos: cada objeto concentra los datos y reglas visuales de un nivel.
const niveles = [
  {
    id: "colores",
    numero: 1,
    icono: "🎨",
    titulo: "Secuencia de colores",
    detalle: "Memoriza colores en el orden exacto. Cada ronda agrega un nuevo elemento.",
    meta: "Nivel inicial",
    color: "#5debd8",
    glow: "rgba(40, 215, 192, .8)",
    elementos: ["rojo", "azul", "verde", "amarillo", "morado", "rosado", "naranja"],
    instruccion: "Escribe los colores separados por espacios.",
  },
  {
    id: "numeros",
    numero: 2,
    icono: "🔢",
    titulo: "Números de dos cifras",
    detalle: "Sube la dificultad recordando números aleatorios separados por espacios.",
    meta: "Nivel intermedio",
    color: "#ffcc66",
    glow: "rgba(255, 204, 102, .8)",
    elementos: Array.from({ length: 90 }, (_, indice) => String(indice + 10)),
    instruccion: "Escribe los números separados por espacios.",
  },
  {
    id: "personajes",
    numero: 3,
    icono: "⭐",
    titulo: "Personajes conocidos",
    detalle: "El reto final combina nombres de personajes en secuencias cada vez más extensas.",
    meta: "Nivel avanzado",
    color: "#a68cff",
    glow: "rgba(124, 92, 255, .9)",
    elementos: ["elsa", "simba", "nemo", "dory", "olaf", "moana", "woody", "buzz", "mufasa", "aladdin", "ariel", "mulan", "tarzan"],
    instruccion: "Escribe los personajes separados por espacios.",
  },
];

const estado = {
  nivel: null,
  jugadores: [],
  puntajes: [],
  ronda: 1,
  turno: 0,
  secuencia: [],
  bloqueado: false,
};

const levelGrid = document.querySelector("#levelGrid");
const workspace = document.querySelector("#gameWorkspace");
const heroButton = document.querySelector("#startGame");
const gameStatus = document.querySelector("#gameStatus");
const statusDetail = document.querySelector("#statusDetail");
const statusBadge = document.querySelector("#statusBadge");

const escaparHTML = (texto) => String(texto)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const normalizar = (texto) => String(texto)
  .trim()
  .toLowerCase()
  .replace(/\s+/g, " ");

const actualizarEstado = (titulo, detalle, insignia) => {
  gameStatus.textContent = titulo;
  statusDetail.textContent = detalle;
  statusBadge.textContent = insignia;
};

const irAlJuego = () => workspace.scrollIntoView({ behavior: "smooth", block: "start" });

const renderizarNiveles = () => {
  levelGrid.innerHTML = niveles.map((nivel) => `
    <button
      class="level-card ${estado.nivel?.id === nivel.id ? "is-selected" : ""}"
      type="button"
      data-level="${nivel.id}"
      style="--card-color:${nivel.color}; --card-glow:${nivel.glow}"
      aria-pressed="${estado.nivel?.id === nivel.id}"
    >
      <span class="level-number">${nivel.numero}</span>
      <span class="level-icon" aria-hidden="true">${nivel.icono}</span>
      <h3>${nivel.titulo}</h3>
      <p>${nivel.detalle}</p>
      <span class="level-meta">${nivel.meta}</span>
      <span class="level-action">Jugar este nivel →</span>
    </button>
  `).join("");
};

const resumenNivel = () => `
  <div class="level-summary">
    <div class="summary-item"><span>Nivel</span><strong>${estado.nivel.numero} · ${estado.nivel.titulo}</strong></div>
    <div class="summary-item"><span>Rondas</span><strong>${TOTAL_RONDAS}</strong></div>
    <div class="summary-item"><span>Puntaje</span><strong>+${PUNTOS_POR_ACIERTO} por acierto</strong></div>
    <div class="summary-item"><span>Dificultad</span><strong>Progresiva</strong></div>
  </div>
`;

const renderizarJugadores = () => {
  const lista = document.querySelector("#playerList");
  const botonIniciar = document.querySelector("#beginChallenge");
  if (!lista || !botonIniciar) return;

  lista.innerHTML = estado.jugadores.length
    ? estado.jugadores.map((jugador, indice) => `
      <div class="player-row">
        <span class="player-name"><span class="avatar">${indice + 1}</span>${escaparHTML(jugador)}</span>
        <button class="remove-player" type="button" data-remove-player="${indice}" aria-label="Eliminar a ${escaparHTML(jugador)}">Eliminar</button>
      </div>
    `).join("")
    : '<p class="panel-intro">Todavía no hay jugadores. Agrega al menos uno.</p>';

  botonIniciar.disabled = estado.jugadores.length === 0;
};

const renderizarConfiguracion = () => {
  workspace.innerHTML = `
    <div class="workspace-header">
      <div class="workspace-title">
        <span class="workspace-title-icon" aria-hidden="true">${estado.nivel.icono}</span>
        <div><strong>${estado.nivel.titulo}</strong><small>Configura a los participantes</small></div>
      </div>
      <button class="ghost-button" id="changeLevel" type="button">Cambiar de nivel</button>
    </div>
    <div class="workspace-body setup-grid">
      <section class="panel">
        <h3>¿Quiénes van a jugar?</h3>
        <p class="panel-intro">Agrega entre 1 y 6 participantes. Todos jugarán las siete rondas.</p>
        <form id="playerForm" novalidate>
          <label class="field-label" for="playerName">Nombre del jugador</label>
          <div class="input-row">
            <input class="text-input" id="playerName" name="playerName" maxlength="18" autocomplete="off" placeholder="Ejemplo: André" required>
            <button class="secondary-button" type="submit">+ Agregar</button>
          </div>
          <p class="form-message" id="formMessage" aria-live="polite"></p>
        </form>
        <div class="player-list" id="playerList"></div>
      </section>
      <aside class="panel">
        <h3>Resumen de la partida</h3>
        <p class="panel-intro">La secuencia crecerá un elemento por cada ronda.</p>
        ${resumenNivel()}
        <div class="setup-actions">
          <button class="primary-button" id="beginChallenge" type="button" disabled>Comenzar desafío</button>
        </div>
      </aside>
    </div>
  `;

  renderizarJugadores();
  document.querySelector("#playerName").focus();
  actualizarEstado("Configurando partida", `Nivel seleccionado: ${estado.nivel.titulo}.`, "Preparación");
};

const seleccionarNivel = (id) => {
  estado.nivel = niveles.find((nivel) => nivel.id === id);
  estado.jugadores = [];
  estado.puntajes = [];
  estado.ronda = 1;
  estado.turno = 0;
  renderizarNiveles();
  renderizarConfiguracion();
  irAlJuego();
};

const agregarJugador = (nombre) => {
  const limpio = nombre.trim().replace(/\s+/g, " ");
  const mensaje = document.querySelector("#formMessage");
  if (limpio.length < 2) {
    mensaje.textContent = "Escribe un nombre de al menos 2 caracteres.";
    return false;
  }
  if (estado.jugadores.some((jugador) => normalizar(jugador) === normalizar(limpio))) {
    mensaje.textContent = "Ese jugador ya fue agregado.";
    return false;
  }
  if (estado.jugadores.length >= 6) {
    mensaje.textContent = "Puedes registrar un máximo de 6 jugadores.";
    return false;
  }
  estado.jugadores.push(limpio);
  mensaje.textContent = "";
  renderizarJugadores();
  return true;
};

const crearSecuencia = () => Array.from(
  { length: estado.ronda },
  () => estado.nivel.elementos[Math.floor(Math.random() * estado.nivel.elementos.length)],
);

const renderizarMarcador = () => `
  <aside class="panel scoreboard">
    <h3>Marcador</h3>
    <div class="score-list">
      ${estado.jugadores.map((jugador, indice) => `
        <div class="score-row ${indice === estado.turno ? "is-current" : ""}">
          <span class="avatar">${indice + 1}</span>
          <strong title="${escaparHTML(jugador)}">${escaparHTML(jugador)}</strong>
          <span class="score-points">${estado.puntajes[indice]} pts</span>
        </div>
      `).join("")}
    </div>
  </aside>
`;

const cabeceraJuego = () => `
  <div class="workspace-header">
    <div class="workspace-title">
      <span class="workspace-title-icon" aria-hidden="true">${estado.nivel.icono}</span>
      <div><strong>${estado.nivel.titulo}</strong><small>Ronda ${estado.ronda} de ${TOTAL_RONDAS}</small></div>
    </div>
    <button class="ghost-button" id="exitGame" type="button">Salir de la partida</button>
  </div>
`;

const renderizarTurno = () => {
  const jugador = estado.jugadores[estado.turno];
  estado.bloqueado = false;
  workspace.innerHTML = `
    ${cabeceraJuego()}
    <div class="workspace-body game-layout">
      <section class="game-main">
        <div class="round-bar"><strong>Turno de ${escaparHTML(jugador)}</strong><span>${estado.ronda} elemento${estado.ronda === 1 ? "" : "s"} por recordar</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${(estado.ronda / TOTAL_RONDAS) * 100}%"></div></div>
        <div class="turn-card">
          <div>
            <h3>¿Listo, ${escaparHTML(jugador)}?</h3>
            <p>Cuando pulses el botón verás la secuencia durante unos segundos. Luego deberás escribirla en el mismo orden.</p>
            <button class="primary-button" id="revealSequence" type="button">👁 Mostrar secuencia</button>
          </div>
        </div>
      </section>
      ${renderizarMarcador()}
    </div>
  `;
  actualizarEstado(`Ronda ${estado.ronda} · Turno de ${jugador}`, "Pulsa “Mostrar secuencia” cuando estés preparado.", "Jugando");
};

const mostrarSecuencia = () => {
  if (estado.bloqueado) return;
  estado.bloqueado = true;
  estado.secuencia = crearSecuencia();
  const turnCard = document.querySelector(".turn-card");
  const duracion = Math.min(5000, 1900 + estado.ronda * 380);

  turnCard.innerHTML = `
    <div>
      <h3>Memoriza la secuencia</h3>
      <p>No cambies el orden de los elementos.</p>
      <div class="sequence" aria-label="Secuencia para memorizar">
        ${estado.secuencia.map((elemento) => `<span class="sequence-token">${escaparHTML(elemento)}</span>`).join("")}
      </div>
      <span class="answer-hint">La secuencia se ocultará automáticamente.</span>
    </div>
  `;
  actualizarEstado("Memorizando secuencia", `Tienes ${(duracion / 1000).toFixed(1)} segundos para observarla.`, "Memoriza");
  window.setTimeout(renderizarRespuesta, duracion);
};

const renderizarRespuesta = () => {
  const jugador = estado.jugadores[estado.turno];
  const turnCard = document.querySelector(".turn-card");
  turnCard.innerHTML = `
    <div class="answer-form">
      <h3>Ahora escribe la secuencia</h3>
      <p>${estado.nivel.instruccion}</p>
      <div class="sequence"><span class="sequence-hidden" aria-hidden="true">••••••</span></div>
      <form id="answerForm" autocomplete="off">
        <label class="field-label" for="answerInput">Respuesta de ${escaparHTML(jugador)}</label>
        <div class="input-row">
          <input class="text-input" id="answerInput" required placeholder="Escribe aquí la secuencia completa">
          <button class="primary-button" type="submit">Comprobar</button>
        </div>
        <span class="answer-hint">Usa un solo espacio entre cada elemento.</span>
      </form>
    </div>
  `;
  document.querySelector("#answerInput").focus();
  actualizarEstado("Esperando respuesta", `Turno de ${jugador}. La secuencia está oculta.`, "Responde");
};

const comprobarRespuesta = (respuesta) => {
  const correcta = normalizar(respuesta) === normalizar(estado.secuencia.join(" "));
  const jugador = estado.jugadores[estado.turno];
  if (correcta) estado.puntajes[estado.turno] += PUNTOS_POR_ACIERTO;

  const turnCard = document.querySelector(".turn-card");
  turnCard.innerHTML = `
    <div class="feedback ${correcta ? "correct" : "incorrect"}">
      <div class="feedback-icon" aria-hidden="true">${correcta ? "✅" : "💡"}</div>
      <h3>${correcta ? `¡Excelente, ${escaparHTML(jugador)}!` : "Casi lo consigues"}</h3>
      <p>${correcta ? `Sumaste ${PUNTOS_POR_ACIERTO} puntos.` : `La secuencia correcta era: ${escaparHTML(estado.secuencia.join(" "))}`}</p>
      <button class="primary-button" id="nextTurn" type="button">${textoSiguientePaso()}</button>
    </div>
  `;
  document.querySelector(".scoreboard").outerHTML = renderizarMarcador();
  actualizarEstado(correcta ? "Respuesta correcta" : "Respuesta incorrecta", correcta ? `¡${jugador} suma ${PUNTOS_POR_ACIERTO} puntos!` : "La partida continúa con el siguiente turno.", correcta ? "Acierto" : "Continúa");
};

const textoSiguientePaso = () => {
  const ultimoJugador = estado.turno === estado.jugadores.length - 1;
  const ultimaRonda = estado.ronda === TOTAL_RONDAS;
  if (ultimoJugador && ultimaRonda) return "Ver resultado final";
  if (ultimoJugador) return `Comenzar ronda ${estado.ronda + 1}`;
  return `Turno de ${estado.jugadores[estado.turno + 1]}`;
};

const avanzarTurno = () => {
  estado.turno += 1;
  if (estado.turno >= estado.jugadores.length) {
    estado.turno = 0;
    estado.ronda += 1;
  }
  if (estado.ronda > TOTAL_RONDAS) {
    renderizarResultado();
    return;
  }
  renderizarTurno();
};

const renderizarResultado = () => {
  const maximo = Math.max(...estado.puntajes);
  const ganadores = estado.jugadores.filter((_, indice) => estado.puntajes[indice] === maximo);
  const nombres = ganadores.join(" y ");
  workspace.innerHTML = `
    <div class="result-card">
      <div>
        <div class="trophy" aria-hidden="true">🏆</div>
        <h2>${ganadores.length > 1 ? "¡Tenemos un empate!" : "¡Tenemos ganador!"}</h2>
        <p>${escaparHTML(nombres)} ${ganadores.length > 1 ? "comparten el primer lugar" : "demostró una memoria increíble"} en ${estado.nivel.titulo}.</p>
        <div class="result-score">${maximo} puntos</div>
        <div class="result-actions">
          <button class="primary-button" id="playAgain" type="button">Jugar otra vez</button>
          <button class="secondary-button" id="chooseAnother" type="button">Elegir otro nivel</button>
        </div>
      </div>
    </div>
  `;
  actualizarEstado("Partida finalizada", `${nombres}: ${maximo} puntos.`, "Completado");
};

const iniciarPartida = () => {
  estado.puntajes = estado.jugadores.map(() => 0);
  estado.ronda = 1;
  estado.turno = 0;
  renderizarTurno();
};

const volverASeleccion = () => {
  estado.nivel = null;
  estado.jugadores = [];
  estado.puntajes = [];
  renderizarNiveles();
  workspace.innerHTML = `
    <div class="workspace-empty">
      <div><div class="workspace-empty-icon" aria-hidden="true">👆</div><h3>Selecciona un nivel para comenzar</h3><p>Haz clic en cualquiera de las tarjetas para configurar una nueva partida.</p></div>
    </div>
  `;
  actualizarEstado("Juego listo", "Selecciona uno de los tres niveles para configurar la partida.", "Esperando");
  document.querySelector("#levels-title").scrollIntoView({ behavior: "smooth", block: "start" });
};

// Delegación de eventos: un solo controlador gestiona los componentes dinámicos.
document.addEventListener("click", (evento) => {
  const tarjeta = evento.target.closest("[data-level]");
  if (tarjeta) seleccionarNivel(tarjeta.dataset.level);

  const eliminar = evento.target.closest("[data-remove-player]");
  if (eliminar) {
    estado.jugadores.splice(Number(eliminar.dataset.removePlayer), 1);
    renderizarJugadores();
  }

  if (evento.target.closest("#beginChallenge")) iniciarPartida();
  if (evento.target.closest("#revealSequence")) mostrarSecuencia();
  if (evento.target.closest("#nextTurn")) avanzarTurno();
  if (evento.target.closest("#changeLevel") || evento.target.closest("#exitGame") || evento.target.closest("#chooseAnother")) volverASeleccion();
  if (evento.target.closest("#playAgain")) {
    estado.ronda = 1;
    estado.turno = 0;
    estado.puntajes = estado.jugadores.map(() => 0);
    renderizarTurno();
  }
});

document.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (evento.target.matches("#playerForm")) {
    const entrada = document.querySelector("#playerName");
    if (agregarJugador(entrada.value)) entrada.value = "";
    entrada.focus();
  }
  if (evento.target.matches("#answerForm")) {
    const entrada = document.querySelector("#answerInput");
    if (!entrada.value.trim()) return;
    entrada.disabled = true;
    comprobarRespuesta(entrada.value);
  }
});

heroButton.addEventListener("click", () => {
  document.querySelector("#levels-title").scrollIntoView({ behavior: "smooth", block: "start" });
});

renderizarNiveles();
