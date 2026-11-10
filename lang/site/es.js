"use strict"

// Spanish site texts (interface, popups, notifications, warnings).
// Card, character and faction names stay in English.
// {param} placeholders are replaced at runtime.
I18n.register("es", {
	// Name shown in the language selector
	name: "Español",

	ui: {
		pageTitle: "Gwent Classic de The Witcher 3: Wild Hunt",
		language: "Idioma",

		// Settings buttons
		toggleMusic: "Activar/desactivar música",
		musicPlay: "Reproducir",
		musicPause: "Pausa",
		musicMute: "Silenciar",
		musicUnmute: "Activar sonido",
		musicVolume: "Volumen",
		musicPrev: "Pista anterior",
		musicNext: "Pista siguiente",
		musicList: "Lista de pistas",
		exitFullscreen: "Salir de pantalla completa",
		enterFullscreen: "Pantalla completa",

		// Settings window (deck customization menu)
		settings: "Configuración",
		close: "Cerrar",
		tabGame: "Juego",
		tabAudio: "Audio",
		gameMessages: "Mensajes del juego",
		gameMessagesHint: "Muestra avisos como el cambio de turno y el resultado de cada ronda.",
		displayFullscreen: "Pantalla completa",
		displayFullscreenHint: "Usa toda la pantalla para jugar.",
		musicLabel: "Música",
		musicHint: "Volumen de la música de fondo.",
		sfxLabel: "Efectos de sonido",
		sfxHint: "Volumen de cartas, habilidades y menús.",
		sfxVolume: "Volumen de los efectos de sonido",
		languageHint: "Textos de la interfaz y de las habilidades. Los nombres de cartas y personajes se mantienen en inglés.",

		// Board
		exitGame: "Salir de la partida",
		viewLeader: "Ver líder",
		playLeader: "Usar líder",
		passed: "Pasó",
		pass: "Pasar",
		passRound: "Pasar ronda",
		viewDiscards: "Ver descartes",
		player1: "Jugador 1",
		player2: "Jugador 2",
		redrawTitle: "Elige hasta 2 cartas para volver a robar.",

		// End screen
		round1: "Ronda 1",
		round2: "Ronda 2",
		round3: "Ronda 3",
		drawMessage: "La batalla no puede terminar en empate. Puedes jugar la revancha con los mismos mazos o rendirte.",
		customize: "Personalizar",
		rematch: "Revancha",
		newGame: "Nueva partida",

		// Deck customization
		uploadDeck: "Cargar mazo",
		changeFaction: "Cambiar facción",
		downloadDeck: "Descargar mazo",
		cardCollection: "Colección de cartas",
		cardsInDeck: "Cartas en el mazo",
		filterAll: "Todas las cartas",
		filterClose: "Cuerpo a cuerpo",
		filterRanged: "A distancia",
		filterSiege: "Asedio",
		filterHero: "Cartas de héroe",
		filterWeather: "Cartas de clima",
		filterSpecial: "Cartas especiales",
		leader: "Líder",
		statTotal: "Total de cartas en el mazo",
		statUnits: "Cartas de Unidad",
		statSpecial: "Cartas Especiales",
		statStrength: "Fuerza total de las unidades",
		statHeroes: "Cartas de Héroe",
		startGame: "Iniciar",
		opponentDeck: "Mazo del oponente",
		viewOpponent: "Ver oponente",
		uploadOpponent: "Cargar oponente",
		clearOpponent: "Quitar oponente",
		random: "Aleatorio",

		// Popups
		yes: "Sí",
		no: "No",
		resume: "Continuar",
		exit: "Salir",
		quitTitle: "¿Abandonar la partida actual?",
		quitDescription: "Volverás al menú de personalización del mazo.",
		goFirst: "Empezar yo",
		letOpponentStart: "Que empiece el oponente",
		goFirstTitle: "¿Quieres empezar tú?",
		goFirstDescription: "La ventaja de facción de Scoia'tael te permite decidir quién empieza.",

		// Deck warnings
		deckMinUnits: "Tu mazo debe tener al menos 22 cartas de unidad.",
		deckMaxSpecial: "Tu mazo no puede tener más de 10 cartas especiales.",
		deckBadFormat: "¡El mazo cargado no tiene el formato correcto!",
		deckNotParsable: "¡No se pudo leer el mazo cargado!",
		deckInvalidLeader: "'{name}' no se puede usar como líder.",
		deckLeaderFaction: "El líder '{name}' no corresponde a la facción del mazo '{faction}'.",
		deckInvalidId: "El ID {id} no corresponde a ninguna carta.",
		deckCardFaction: "'{name}' no se puede usar en un mazo de la facción '{faction}'.",
		deckCardCount: "El mazo contiene {count}/{max} cartas disponibles de '{name}'."
	},

	// Timed messages during the game (key = notification name)
	notifications: {
		"me-first": "Empiezas tú",
		"op-first": "Empieza tu oponente",
		"me-coin": "Empiezas tú",
		"op-coin": "Empieza tu oponente",
		"round-start": "Comienza la ronda",
		"me-pass": "Has pasado la ronda",
		"op-pass": "Tu oponente ha pasado",
		"win-round": "¡Has ganado la ronda!",
		"lose-round": "Tu oponente ha ganado la ronda",
		"draw-round": "La ronda terminó en empate",
		"me-turn": "¡Tu turno!",
		"op-turn": "Turno del oponente",
		"north": "Se activó la habilidad de facción de Northern Realms: roba una carta adicional.",
		"monsters": "Se activó la habilidad de facción de Monsters: una Carta de Unidad elegida al azar permanece en el campo",
		"scoiatael": "El oponente usó la ventaja de facción de Scoia'tael para empezar.",
		"skellige-op": "¡Se activó la habilidad de Skellige del oponente!",
		"skellige-me": "¡Se activó la habilidad de Skellige!"
	}
});
