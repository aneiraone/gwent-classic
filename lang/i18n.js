"use strict"

// Language manager.
// Translations are split by domain, and each file registers its sections:
//   lang/cards/xx.js -> card texts   (abilityNames, abilities, factions)
//   lang/site/xx.js  -> site texts   (name, ui, notifications)
// Texts missing in a language fall back to the default language (English).
//
// HTML elements are translated through attributes:
//   data-i18n="key"        -> textContent = ui[key]
//   data-i18n-title="key"  -> data-title  = ui[key]  (hover tooltips)
//   data-i18n-aria="key"   -> aria-label  = ui[key]
var I18n = {
	storageKey: "gc-language",
	defaultLanguage: "en",
	languages: {},
	current: null,
	listeners: [],

	// Adds the sections in data to the language; can be called by several files.
	register(code, data) {
		const lang = this.languages[code] || (this.languages[code] = {});
		for (const [section, value] of Object.entries(data)) {
			if (value && typeof value === "object")
				lang[section] = Object.assign(lang[section] || {}, value);
			else
				lang[section] = value;
		}
	},

	getLanguage() {
		if (this.current === null) {
			let saved = null;
			try { saved = localStorage.getItem(this.storageKey); } catch (e) {}
			this.current = (saved && this.languages[saved]) ? saved : this.defaultLanguage;
		}
		return this.current;
	},

	setLanguage(code) {
		if (!this.languages[code] || code === this.getLanguage())
			return;
		this.current = code;
		try { localStorage.setItem(this.storageKey, code); } catch (e) {}
		this.applyToDOM();
		this.listeners.forEach(fn => fn(code));
	},

	onChange(fn) {
		this.listeners.push(fn);
	},

	// Returns languages[current][section][key] (or the default language's text),
	// replacing {param} placeholders with the values in params.
	t(section, key, params) {
		let text;
		for (const code of [this.getLanguage(), this.defaultLanguage]) {
			const lang = this.languages[code];
			if (lang && lang[section] && lang[section][key] !== undefined) {
				text = lang[section][key];
				break;
			}
		}
		if (text === undefined)
			return "";
		if (params)
			text = text.replace(/\{(\w+)\}/g, (m, p) => params[p] !== undefined ? params[p] : m);
		return text;
	},

	// Shortcuts
	ui(key, params) { return this.t("ui", key, params); },
	abilityName(key) { return this.t("abilityNames", key); },
	abilityDescription(key) { return this.t("abilities", key); },
	factionDescription(key) { return this.t("factions", key); },

	// Sets an element's text from a ui key and keeps it updated on language change.
	setText(elem, key) {
		elem.dataset.i18n = key;
		elem.textContent = this.ui(key);
	},

	// Sets an element's tooltip from a ui key and keeps it updated on language change.
	setTitle(elem, key) {
		elem.dataset.i18nTitle = key;
		elem.setAttribute("data-title", this.ui(key));
	},

	// Translates every element marked with data-i18n / data-i18n-title.
	applyToDOM(root = document) {
		document.documentElement.lang = this.getLanguage();
		root.querySelectorAll("[data-i18n]").forEach(e => e.textContent = this.ui(e.dataset.i18n));
		root.querySelectorAll("[data-i18n-title]").forEach(e => e.setAttribute("data-title", this.ui(e.dataset.i18nTitle)));
		root.querySelectorAll("[data-i18n-aria]").forEach(e => e.setAttribute("aria-label", this.ui(e.dataset.i18nAria)));
	},

	// Fills a <select> with the registered languages and keeps it in sync.
	bindSelect(select) {
		select.innerHTML = "";
		for (const code of Object.keys(this.languages)) {
			const option = document.createElement("option");
			option.value = code;
			option.textContent = this.languages[code].name || code;
			select.appendChild(option);
		}
		select.value = this.getLanguage();
		select.addEventListener("change", () => this.setLanguage(select.value));
		this.onChange(code => select.value = code);
	}
};
