# Cambios respecto al proyecto original

Este repositorio es un fork de [gwent-classic](https://github.com/asundr/gwent-classic) (Arun Sundaram). Este documento resume los cambios que se aplicaron sobre la versión original (último commit original: `08592d8`).

## Resumen

| Área | Cambio |
|---|---|
| Idiomas | Sistema de traducción (i18n) con inglés y español, seleccionable en el juego |
| Música | Se reemplazó YouTube por 13 pistas MP3 locales con reproducción aleatoria |
| Configuración | Ventana de configuración (engranaje) con pestañas Juego, Audio e Idioma, en el menú de mazos y en la partida |
| Botón Pasar | Hay que mantenerlo presionado 2 segundos para pasar la ronda |
| Editor de mazos | Doble clic para agregar/quitar cartas; clic derecho para ver la descripción |
| Clic derecho | Ya no abre el menú del navegador; cierra el carrusel si está abierto |
| Tablero | Nueva imagen de fondo `img/board.png` |
| Datos de cartas | `cards.js` pasó de un JSON en texto a un array JavaScript (mismos datos) |

---

## 1. Soporte multilenguaje (i18n)

Se agregó un gestor de idiomas y se sacaron todos los textos fijos del código.

### Archivos nuevos

- **`lang/i18n.js`**: gestor de idiomas (objeto global `I18n`).
  - `I18n.register(code, data)`: cada archivo de idioma registra sus secciones.
  - `I18n.t(section, key, params)`: devuelve el texto en el idioma actual. Si falta, usa el inglés. Reemplaza marcadores `{param}`.
  - Atajos: `I18n.ui()`, `I18n.abilityName()`, `I18n.abilityDescription()`, `I18n.factionDescription()`.
  - `I18n.applyToDOM()`: traduce los elementos HTML marcados con:
    - `data-i18n="clave"`: texto del elemento.
    - `data-i18n-title="clave"`: tooltip (`data-title`).
    - `data-i18n-aria="clave"`: `aria-label`.
  - `I18n.bindSwitch(root)`: llena el selector de idioma (`#lang-switch`) y lo mantiene sincronizado.
  - `I18n.onChange(fn)`: avisa cuando cambia el idioma.
  - El idioma elegido se guarda en `localStorage` (clave `gc-language`).
- **`lang/cards/en.js`** y **`lang/cards/es.js`**: nombres de habilidades, descripciones de habilidades y descripciones de facciones.
- **`lang/site/en.js`** y **`lang/site/es.js`**: textos de la interfaz, popups, notificaciones y advertencias del editor de mazos.

> Los nombres de cartas, personajes y facciones se mantienen en inglés.

### Cambios en archivos existentes

- **`abilities.js`**: se quitaron las propiedades `name` y `description` de cada habilidad (ahora están en `lang/cards/*.js`). Solo queda la lógica y el audio.
- **`factions.js`**: se quitaron las `description` de cada facción. El popup de Scoia'tael ("¿Quieres empezar tú?") usa `I18n.ui(...)`.
- **`gwent.js`**:
  - `Card.desc_name` y `Card.desc` ahora son *getters*: se calculan en el idioma actual cada vez que se muestran, en vez de fijarse al crear la carta.
  - Todos los textos fijos usan `I18n`: popups (salir, sí/no), título del redraw, nombres "Player 1"/"Player 2", tooltips del líder, título del mazo oponente, "Random" y las advertencias al subir mazos (con parámetros como `{name}`, `{faction}`, `{count}`).
  - La descripción de la facción en el editor se actualiza al cambiar el idioma.
  - Las notificaciones guardan su texto en `data-text` (ver CSS).
- **`index.html`**:
  - Los textos fijos se reemplazaron por atributos `data-i18n` / `data-i18n-title`.
  - El selector de idioma `#lang-switch` está en la pestaña Idioma de la ventana de configuración (ver sección 6).
  - Se cargan los scripts de `lang/` después de `cards.js` y antes de `decks.js`.
- **`style.css`**:
  - Las notificaciones ya no tienen el texto fijo en CSS (`content: "..."`). Ahora usan `content: attr(data-text)`.
  - Estilos del selector de idioma (en el tablero y en el menú de mazos).
  - El botón "Start game" se centra y crece según el largo del texto, para que quepa la traducción.

### Cómo agregar un idioma

1. Copiar `lang/cards/en.js` y `lang/site/en.js` con el nuevo código (por ejemplo `fr.js`) y traducir los valores.
2. Agregar los dos `<script>` en `index.html`, junto a los demás de `lang/`.

El idioma aparece solo en el selector. Los textos que falten se muestran en inglés.

---

## 2. Música local en vez de YouTube

- Se eliminó la API de YouTube (`<div id="youtube">`, el script `iframe_api`, `initYouTube`, `setYouTubeEnabled` y `onYouTubeIframeAPIReady`).
- Se agregó `<audio id="bg-music">` y 13 pistas en **`audio/track1.mp3` … `audio/track13.mp3`**.
- Nuevos métodos en `UI` (`gwent.js`):
  - `initMusic()`: arma la lista, fija el volumen en 50% y configura eventos.
  - `nextTrack()`: elige una pista aleatoria distinta de la actual.
  - `playMusic()`: continúa la pista actual o empieza una nueva.
  - `toggleMusic()`: usa el ajuste guardado (`Settings.music`) para activar o pausar.
- Comportamiento:
  - Al terminar una pista, pasa a otra al azar.
  - Si una pista falla al cargar, se salta a la siguiente.
  - Como los navegadores bloquean el autoplay, la música empieza con la primera interacción (clic, toque o tecla).
  - Se pausa cuando la pestaña queda oculta y se reanuda al volver.
- Ya no hace falta conexión a internet para la música.

---

## 3. Botón "Pasar" con pulsación sostenida

- Nueva constante en `gwent.js`: `PASS_HOLD_SECONDS = 2` (con `0` vuelve a pasar con un solo clic).
- Nuevo método `UI.initPassButton()`: al presionar, el botón muestra una cuenta regresiva (2, 1…) y pasa la ronda al llegar a cero. Si se suelta antes o el puntero sale del botón, se cancela.
- Usa eventos `pointer*`, así que funciona con mouse y pantallas táctiles.
- CSS: el botón no permite seleccionar texto (`user-select: none`, `touch-action: none`).

Evita pasar la ronda por un clic accidental.

---

## 4. Editor de mazos y clic derecho

- **Doble clic** (antes clic simple) para mover una carta entre la colección y el mazo. Así se evitan cambios accidentales.
- **Clic derecho** sobre una carta del editor: abre el carrusel con su descripción y habilidad. Otro clic derecho lo cierra.
- **Clic derecho global**: nunca abre el menú contextual del navegador. Si hay un carrusel que se puede cerrar, lo cierra.
- CSS: las cartas grandes del editor no permiten seleccionar texto (para que el doble clic no lo resalte).

---

## 5. Otros cambios

- **Tablero**: `style.css` usa `img/board.png` (nueva imagen) en vez de `img/board.jpg`.
- **`cards.js`**: `card_dict` pasó de un texto JSON concatenado con `JSON.parse(...)` a un array JavaScript directo. Es más fácil de leer y editar. **Los datos son los mismos** (216 cartas, verificado comparando ambas versiones).
- **`index.html`**: el puntaje inicial de la fila de asedio del oponente aparecía como `12`; ahora parte en `0`.

---

## 6. Ventana de configuración

Un **engranaje** abre una ventana de configuración al estilo de un juego de PC. En el menú de personalización del mazo está en la esquina superior izquierda (reemplaza al selector de idioma y a los botones de música y sonido). En la partida está junto al botón de salir.

- **Pestañas**:
  - **Juego**: mensajes del juego (notificaciones) y pantalla completa.
  - **Audio**: activar/desactivar y volumen de la música y de los efectos de sonido. Aquí no está la lista de pistas.
  - **Idioma**: lista de idiomas registrados, cada uno con su nombre.
- **Cerrar**: solo con la X de la esquina (o clic fuera de la ventana). `Esc` no se usa, porque en pantalla completa el navegador lo usa para salir de ella. `Q`/`E` (o las flechas sobre las pestañas) cambian de pestaña.
- La pestaña elegida se recuerda (`gc-settings-tab`).
- **Volumen de efectos**: nuevo ajuste `Settings.sfxVolume` (`gc-sfx-volume`, 0-100). `applySfxVolume()` lo aplica antes de reproducir cada efecto.
- **En la partida** se quitaron los botones de efectos de sonido y de mensajes del tablero (ahora están en la ventana). Solo queda el botón de música con su reproductor y lista de pistas, que usa los mismos ajustes guardados que la ventana.
- Archivos: `settings.js` (objeto `SettingsMenu`), `svg/settings.svg`, textos nuevos en `lang/site/*.js`. En `gwent.js` se quitaron `toggleNotifications()` y `toggleSFX()` junto con sus botones.

---

## Archivos afectados

| Archivo | Estado |
|---|---|
| `abilities.js` | Modificado |
| `cards.js` | Modificado (formato) |
| `factions.js` | Modificado |
| `gwent.js` | Modificado |
| `index.html` | Modificado |
| `style.css` | Modificado |
| `lang/i18n.js` | Nuevo |
| `settings.js`, `svg/settings.svg` | Nuevos |
| `lang/cards/en.js`, `lang/cards/es.js` | Nuevos |
| `lang/site/en.js`, `lang/site/es.js` | Nuevos |
| `audio/track1.mp3` … `audio/track13.mp3` | Nuevos |
| `img/board.png` | Nuevo |
