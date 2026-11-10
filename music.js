"use strict"

// Background music player for the local files in audio/.
// A popover on the music note in the settings cluster controls it:
// play/pause, volume/mute, previous/next, seek bar and track list.
// Nothing is streamed from outside: every track is a file in audio/.
var Music = {
	// Edit this list to rename, reorder, add or remove tracks.
	TRACKS: [
		{ title: "Track 1", file: "audio/track1.mp3" },
		{ title: "Track 2", file: "audio/track2.mp3" },
		{ title: "Track 3", file: "audio/track3.mp3" },
		{ title: "Track 4", file: "audio/track4.mp3" },
		{ title: "Track 5", file: "audio/track5.mp3" },
		{ title: "Track 6", file: "audio/track6.mp3" },
		{ title: "Track 7", file: "audio/track7.mp3" },
		{ title: "Track 8", file: "audio/track8.mp3" },
		{ title: "Track 9", file: "audio/track9.mp3" },
		{ title: "Track 10", file: "audio/track10.mp3" },
		{ title: "Track 11", file: "audio/track11.mp3" },
		{ title: "Track 12", file: "audio/track12.mp3" },
		{ title: "Track 13", file: "audio/track13.mp3" }
	],
	volume: new SavedString("gc-music-volume", "50"),
	lastTrack: new SavedString("gc-music-track", "0"),
	current: 0,
	durations: [],

	init() {
		this.audio = document.getElementById("bg-music");
		this.button = document.getElementById("toggle-music");
		this.panel = document.getElementById("music-panel");
		const q = sel => this.panel.querySelector(sel);
		this.playBtn = q(".music-play");
		this.muteBtn = q(".music-mute");
		this.slider = q(".music-volume");
		this.listBtn = q(".music-list-toggle");
		this.nowTitle = q(".music-now-title");
		this.nowTime = q(".music-now-time");
		this.progress = q(".music-progress");
		this.progressFill = q(".music-progress-fill");

		const saved = parseInt(this.lastTrack.get(), 10);
		this.current = (saved >= 0 && saved < this.TRACKS.length) ? saved : 0;

		const list = q(".music-tracks");
		this.trackItems = this.TRACKS.map((t, i) => {
			const li = document.createElement("li");
			const btn = document.createElement("button");
			btn.type = "button";
			btn.tabIndex = -1;
			const name = document.createElement("span");
			name.textContent = t.title;
			const len = document.createElement("small");
			btn.append(name, len);
			btn.addEventListener("click", () => this.playTrack(i));
			li.append(btn);
			list.append(li);
			return li;
		});
		this.loadDurations();

		// Audio element events
		this.audio.preload = "none";
		this.audio.addEventListener("ended", () => this.playTrack((this.current + 1) % this.TRACKS.length));
		this.audio.addEventListener("error", () => {
			// Skip a missing or broken file instead of stopping the music
			if (Settings.music.isEnabled() && this.TRACKS.length > 1)
				setTimeout(() => this.playTrack((this.current + 1) % this.TRACKS.length), 500);
		});
		["play", "pause", "timeupdate", "loadedmetadata"].forEach(t => this.audio.addEventListener(t, () => this.render()));

		// Panel open/close
		this.panel.addEventListener("mousedown", e => { if (e.target !== this.slider) e.preventDefault(); });
		this.button.addEventListener("click", e => {
			if (!this.panel.contains(e.target))
				this.isOpen() ? this.close() : this.open();
		});
		document.addEventListener("pointerdown", e => {
			if (this.isOpen() && !this.button.contains(e.target))
				this.close();
		});
		window.addEventListener("keydown", e => {
			if (e.key === "Escape" && this.isOpen()) {
				e.stopImmediatePropagation();
				this.close();
			}
		}, true);

		// Controls
		this.playBtn.addEventListener("click", () => this.setEnabled(!Settings.music.isEnabled()));
		this.muteBtn.addEventListener("click", () => this.toggleMute());
		this.slider.addEventListener("input", () => this.setVolume(this.slider.valueAsNumber));
		this.slider.addEventListener("pointerup", () => this.slider.blur());
		q(".music-prev").addEventListener("click", () => this.step(-1));
		q(".music-next").addEventListener("click", () => this.step(1));
		this.listBtn.addEventListener("click", () => this.toggleList());
		this.progress.addEventListener("pointerdown", e => this.seekTo(e));

		// Browsers block autoplay until the user interacts with the page.
		// Only some events count as that gesture: touchstart does not (mobile
		// needs touchend/pointerup/click), so a blocked play() is retried on
		// every gesture until the music really starts.
		const gestures = ["pointerup", "touchend", "click", "keydown"];
		const stopListening = () => gestures.forEach(t => window.removeEventListener(t, startOnInteraction, true));
		const startOnInteraction = () => {
			if (Settings.music.isEnabled() && this.audio.paused && !document.hidden)
				this.apply();
		};
		gestures.forEach(t => window.addEventListener(t, startOnInteraction, true));
		this.audio.addEventListener("playing", stopListening, { once: true });

		// Pause while the tab is hidden, resume when it is visible again
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				this.pausedBySystem = !this.audio.paused;
				this.audio.pause();
			} else if (this.pausedBySystem) {
				this.pausedBySystem = false;
				this.apply();
			}
		});

		I18n.onChange(() => this.translate());
		this.translate();
		this.slider.value = this.getVolume();
		this.audio.volume = this.getVolume() / 100;
		this.render();
		if (Settings.music.isEnabled())
			this.apply();
	},

	// Texts set from code (aria labels)
	translate() {
		const q = sel => this.panel.querySelector(sel);
		q(".music-prev").setAttribute("aria-label", I18n.ui("musicPrev"));
		q(".music-next").setAttribute("aria-label", I18n.ui("musicNext"));
		this.slider.setAttribute("aria-label", I18n.ui("musicVolume"));
		this.listBtn.setAttribute("aria-label", I18n.ui("musicList"));
		this.render();
	},

	// Reads each file's length (metadata only) to show it in the track list
	loadDurations() {
		this.TRACKS.forEach((t, i) => {
			const probe = new Audio();
			probe.preload = "metadata";
			probe.addEventListener("loadedmetadata", () => {
				this.durations[i] = probe.duration;
				this.trackItems[i].querySelector("small").textContent = this.formatTime(probe.duration);
				if (i === this.current)
					this.render();
				probe.removeAttribute("src");
				probe.load();
			}, { once: true });
			probe.src = t.file;
		});
	},

	formatTime(sec) {
		sec = Number.isFinite(sec) ? Math.max(0, Math.floor(sec)) : 0;
		return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");
	},

	getVolume() {
		const v = parseInt(this.volume.get(), 10);
		return Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : 50;
	},

	// Loads the current track into the audio element if it isn't already
	ensureLoaded() {
		const file = this.TRACKS[this.current].file;
		if (!this.audio.src || !this.audio.src.endsWith(file))
			this.audio.src = file;
	},

	setEnabled(enabled) {
		Settings.music.setEnabled(enabled);
		this.apply();
	},

	// The saved setting is the source of truth: the player follows it
	apply() {
		if (Settings.music.isEnabled()) {
			this.ensureLoaded();
			this.audio.play().catch(() => {});
		} else {
			this.audio.pause();
		}
		this.render();
	},

	setVolume(v) {
		v = Math.min(100, Math.max(0, Math.round(v / 5) * 5));
		if (v > 0)
			this.unmuteTo = v;
		this.volume.set(String(v));
		this.slider.value = v;
		this.audio.volume = v / 100;
		this.render();
	},

	// Mute remembers the last level to come back to
	toggleMute() {
		const v = this.getVolume();
		if (v > 0)
			this.unmuteTo = v;
		this.setVolume(v > 0 ? 0 : (this.unmuteTo || 50));
	},

	// Picking a track turns music on: it is an explicit request to hear it
	playTrack(i) {
		this.current = i;
		this.lastTrack.set(String(i));
		this.audio.src = this.TRACKS[i].file;
		this.setEnabled(true);
	},

	// Back restarts the current track first, like most players
	step(dir) {
		if (dir < 0 && this.audio.currentTime > 3) {
			this.audio.currentTime = 0;
			return this.setEnabled(true);
		}
		const n = this.TRACKS.length;
		this.playTrack((this.current + dir + n) % n);
	},

	seekTo(e) {
		const d = this.audio.duration;
		if (!Number.isFinite(d))
			return;
		const rect = this.progress.getBoundingClientRect();
		const f = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
		this.audio.currentTime = f * d;
		this.setEnabled(true);
	},

	isOpen() {
		return this.button.classList.contains("open");
	},

	open() {
		this.button.classList.add("open");
		this.render();
	},

	// Shows or hides the track list above the bar
	toggleList() {
		const open = this.panel.classList.toggle("list-open");
		this.listBtn.classList.toggle("active", open);
	},

	close() {
		this.button.classList.remove("open");
		this.panel.classList.remove("list-open");
		this.listBtn.classList.remove("active");
		if (document.activeElement === this.slider)
			this.slider.blur();
	},

	render() {
		if (!this.playBtn)
			return;
		const enabled = Settings.music.isEnabled();
		const v = this.getVolume();
		this.button.classList.toggle("fade", !enabled || v === 0);
		this.playBtn.classList.toggle("playing", enabled);
		this.playBtn.setAttribute("aria-label", I18n.ui(enabled ? "musicPause" : "musicPlay"));
		this.muteBtn.classList.toggle("muted", v === 0);
		this.muteBtn.classList.toggle("quiet", v > 0 && v < 50);
		this.muteBtn.setAttribute("aria-label", I18n.ui(v === 0 ? "musicUnmute" : "musicMute"));
		this.slider.title = v + "%";
		this.slider.style.setProperty("--vol", v + "%");
		if (!this.isOpen())
			return;

		const loaded = this.audio.src && this.audio.src.endsWith(this.TRACKS[this.current].file);
		const duration = loaded && Number.isFinite(this.audio.duration) ? this.audio.duration : (this.durations[this.current] || 0);
		const elapsed = loaded ? this.audio.currentTime : 0;
		this.nowTitle.textContent = this.TRACKS[this.current].title;
		this.nowTime.textContent = this.formatTime(elapsed) + " / " + this.formatTime(duration);
		this.progressFill.style.width = (duration ? 100 * elapsed / duration : 0) + "%";
		this.progress.classList.toggle("disabled", !loaded || !duration);
		this.trackItems.forEach((li, k) => li.classList.toggle("current", k === this.current));
	}
};

Music.init();
