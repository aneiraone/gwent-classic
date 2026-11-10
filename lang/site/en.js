"use strict"

// English site texts (interface, popups, notifications, warnings).
// This is the base language: any text missing in another language falls back to it.
// {param} placeholders are replaced at runtime.
I18n.register("en", {
	// Name shown in the language selector
	name: "English",

	ui: {
		pageTitle: "Gwent Classic from The Witcher 3: Wild Hunt",
		language: "Language",

		// Settings buttons
		toggleMusic: "Toggle music",
		musicPlay: "Play",
		musicPause: "Pause",
		musicMute: "Mute",
		musicUnmute: "Unmute",
		musicVolume: "Volume",
		musicPrev: "Previous track",
		musicNext: "Next track",
		musicList: "Track list",
		exitFullscreen: "Exit fullscreen",
		enterFullscreen: "Fullscreen",

		// Settings window (deck customization menu)
		settings: "Settings",
		close: "Close",
		tabGame: "Game",
		tabAudio: "Audio",
		gameMessages: "Game messages",
		gameMessagesHint: "Show notices such as turn changes and round results.",
		displayFullscreen: "Fullscreen",
		displayFullscreenHint: "Use the whole screen to play.",
		musicLabel: "Music",
		musicHint: "Background music volume.",
		sfxLabel: "Sound effects",
		sfxHint: "Volume of cards, abilities and menus.",
		sfxVolume: "Sound effects volume",
		languageHint: "Interface and ability texts. Card and character names stay in English.",

		// Board
		exitGame: "Exit game",
		viewLeader: "View leader",
		playLeader: "Play leader",
		passed: "Passed",
		pass: "Pass",
		passRound: "Pass round",
		viewDiscards: "View discards",
		player1: "Player 1",
		player2: "Player 2",
		redrawTitle: "Choose up to 2 cards to redraw.",

		// End screen
		round1: "Round 1",
		round2: "Round 2",
		round3: "Round 3",
		drawMessage: "The battle cannot end in a draw. You can play a rematch using the same decks or surrender.",
		customize: "Customize",
		rematch: "Rematch",
		newGame: "New Game",

		// Deck customization
		uploadDeck: "Upload Deck",
		changeFaction: "Change Faction",
		downloadDeck: "Download Deck",
		cardCollection: "Card Collection",
		cardsInDeck: "Cards in Deck",
		filterAll: "All Cards",
		filterClose: "Close Combat",
		filterRanged: "Ranged Combat",
		filterSiege: "Siege",
		filterHero: "Hero Cards",
		filterWeather: "Weather Cards",
		filterSpecial: "Special Cards",
		leader: "Leader",
		statTotal: "Total cards in deck",
		statUnits: "Number of Unit Cards",
		statSpecial: "Special Cards",
		statStrength: "Total Unit Card Strength",
		statHeroes: "Hero Cards",
		startGame: "Start game",
		opponentDeck: "Opponent's Deck",
		viewOpponent: "View opponent",
		uploadOpponent: "Upload opponent",
		clearOpponent: "Clear opponent",
		random: "Random",

		// Popups
		yes: "Yes",
		no: "No",
		resume: "Resume",
		exit: "Exit",
		quitTitle: "Quit current game?",
		quitDescription: "This will return you to the deck customization menu.",
		goFirst: "Go First",
		letOpponentStart: "Let Opponent Start",
		goFirstTitle: "Would you like to go first?",
		goFirstDescription: "The Scoia'tael faction perk allows you to decide who will get to go first.",

		// Deck warnings
		deckMinUnits: "Your deck must have at least 22 unit cards.",
		deckMaxSpecial: "Your deck must have no more than 10 special cards.",
		deckBadFormat: "Uploaded deck is not formatted correctly!",
		deckNotParsable: "Uploaded deck is not parsable!",
		deckInvalidLeader: "'{name}' cannot be used as a leader.",
		deckLeaderFaction: "Leader '{name}' doesn't match deck faction '{faction}'.",
		deckInvalidId: "ID {id} does not correspond to a card.",
		deckCardFaction: "'{name}' cannot be used in a deck of faction type '{faction}'.",
		deckCardCount: "Deck contains {count}/{max} available '{name}' cards."
	},

	// Timed messages during the game (key = notification name)
	notifications: {
		"me-first": "You will go first",
		"op-first": "Your opponent will go first",
		"me-coin": "You will go first",
		"op-coin": "Your opponent will go first",
		"round-start": "Round Start",
		"me-pass": "Round passed",
		"op-pass": "Your opponent has passed",
		"win-round": "You won the round!",
		"lose-round": "Your opponent won the round",
		"draw-round": "The round ended in a draw",
		"me-turn": "Your turn!",
		"op-turn": "Opponent's turn",
		"north": "Northern Realms faction ability triggered - North draws an additional card.",
		"monsters": "Monsters faction ability triggered - one randomly-chosen Monster Unit Card stays on the board",
		"scoiatael": "Opponent used the Scoia'tael faction perk to go first.",
		"skellige-op": "Opponent Skellige Ability Triggered!",
		"skellige-me": "Skellige Ability Triggered!"
	}
});
