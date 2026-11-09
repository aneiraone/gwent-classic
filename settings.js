"use strict"

// Settings window, opened from the gear (deck customization menu, and next to
// the exit button during a game).
// Three tabs, like the options screen of a PC game:
//   Game     -> game messages, fullscreen
//   Audio    -> music and sound effect volume (the track list stays on the board)
//   Language -> interface language
// During a game the music button on the board (with its track list) is still
// there; it reads and writes the same saved settings, so both always agree.
var SettingsMenu = {
	tabKey: new SavedString("gc-settings-tab", "game"),

	init() {
		this.button = document.getElementById("open-settings");
		this.modal = document.getElementById("settings-modal");
		this.window = this.modal.querySelector(".settings-window");
		this.tabs = [...this.modal.querySelectorAll('[role="tab"]')];
		this.panels = [...this.modal.querySelectorAll('[role="tabpanel"]')];
		const $ = id => document.getElementById(id);

		// Game
		this.notifications = $("setting-notifications");
		this.fullscreen = $("setting-fullscreen");
		this.notifications.addEventListener("change", () => Settings.notifications.setEnabled(this.notifications.checked));
		this.fullscreen.addEventListener("change", () => this.fullscreen.checked ? Fullscreen.enter() : Fullscreen.exit());
		["fullscreenchange", "webkitfullscreenchange"].forEach(t =>
			document.addEventListener(t, () => this.fullscreen.checked = Fullscreen.isActive()));

		// Audio
		this.music = $("setting-music");
		this.musicVolume = $("setting-music-volume");
		this.musicValue = $("setting-music-value");
		this.sfx = $("setting-sfx");
		this.sfxVolume = $("setting-sfx-volume");
		this.sfxValue = $("setting-sfx-value");
		this.music.addEventListener("change", () => { Music.setEnabled(this.music.checked); this.render(); });
		this.musicVolume.addEventListener("input", () => { Music.setVolume(this.musicVolume.valueAsNumber); this.render(); });
		this.sfx.addEventListener("change", () => { Settings.soundEffects.setEnabled(this.sfx.checked); this.render(); this.previewSfx(); });
		this.sfxVolume.addEventListener("input", () => this.setSfxVolume(this.sfxVolume.valueAsNumber));
		// A short sample when the slider is released, to hear the new level
		this.sfxVolume.addEventListener("change", () => this.previewSfx());

		// Language
		I18n.bindSwitch(document.getElementById("lang-switch"));

		// Tabs: click, or arrow keys / Q-E while the window is open
		this.tabs.forEach(t => t.addEventListener("click", () => this.selectTab(t.dataset.tab)));

		// Open / close
		this.button.addEventListener("click", () => this.open());
		this.button.addEventListener("keydown", e => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				this.open();
			}
		});
		this.modal.querySelector(".settings-close").addEventListener("click", () => this.close());
		this.modal.addEventListener("pointerdown", e => {
			if (!this.window.contains(e.target))
				this.close();
		});
		window.addEventListener("keydown", e => this.onKey(e), true);
		EventManager.gameOpened.bind(() => this.close());

		addMouseEnterSFXBySelector(".settings-tabs > button, .settings-close, #lang-switch > button");

		this.selectTab(this.tabKey.get(), false);
	},

	isOpen() {
		return !this.modal.classList.contains("hide");
	},

	open() {
		if (this.isOpen())
			return;
		this.render();
		this.modal.classList.remove("hide");
		AudioManager.playSFX("ui_card_bank");
		const tab = this.tabs.find(t => t.getAttribute("aria-selected") === "true");
		if (tab)
			tab.focus({ preventScroll: true });
	},

	close() {
		if (!this.isOpen())
			return;
		this.modal.classList.add("hide");
		if (this.modal.contains(document.activeElement))
			document.activeElement.blur();
	},

	selectTab(name, focus = true) {
		if (!this.tabs.some(t => t.dataset.tab === name))
			name = this.tabs[0].dataset.tab;
		this.tabKey.set(name);
		this.tabs.forEach(t => {
			const on = t.dataset.tab === name;
			t.setAttribute("aria-selected", on ? "true" : "false");
			t.tabIndex = on ? 0 : -1;
			if (on && focus)
				t.focus({ preventScroll: true });
		});
		this.panels.forEach(p => p.classList.toggle("hide", p.dataset.tab !== name));
	},

	stepTab(dir) {
		const i = this.tabs.findIndex(t => t.getAttribute("aria-selected") === "true");
		const n = this.tabs.length;
		this.selectTab(this.tabs[(i + dir + n) % n].dataset.tab);
		AudioManager.playSFX("ui_card");
	},

	onKey(e) {
		if (!this.isOpen())
			return;
		const inSlider = e.target && e.target.type === "range";
		if (e.key === "q" || e.key === "Q" || (!inSlider && e.key === "ArrowLeft" && e.target.getAttribute("role") === "tab")) {
			e.preventDefault();
			this.stepTab(-1);
		} else if (e.key === "e" || e.key === "E" || (!inSlider && e.key === "ArrowRight" && e.target.getAttribute("role") === "tab")) {
			e.preventDefault();
			this.stepTab(1);
		}
	},

	setSfxVolume(v) {
		v = Math.min(100, Math.max(0, Math.round(v / 5) * 5));
		Settings.sfxVolume.set(String(v));
		this.render();
	},

	previewSfx() {
		AudioManager.playSFX("ui_card");
	},

	// Shows the saved values (they may have changed from the board buttons)
	render() {
		this.notifications.checked = Settings.notifications.isEnabled();
		this.fullscreen.checked = Fullscreen.isActive();

		const musicOn = Settings.music.isEnabled();
		const mv = Music.getVolume();
		this.music.checked = musicOn;
		this.musicVolume.value = mv;
		this.musicVolume.style.setProperty("--vol", mv + "%");
		this.musicValue.textContent = mv + "%";
		this.musicVolume.closest(".settings-row").classList.toggle("off", !musicOn);

		const sfxOn = Settings.soundEffects.isEnabled();
		const sv = Settings.getSfxVolume();
		this.sfx.checked = sfxOn;
		this.sfxVolume.value = sv;
		this.sfxVolume.style.setProperty("--vol", sv + "%");
		this.sfxValue.textContent = sv + "%";
		this.sfxVolume.closest(".settings-row").classList.toggle("off", !sfxOn);
	}
};

SettingsMenu.init();
