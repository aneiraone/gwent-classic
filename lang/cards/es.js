"use strict"

// Spanish card texts. Card and character names stay in English,
// so ability titles that are card names (Clear Weather, Scorch...) are not listed.
I18n.register("es", {
	abilityNames: {
		leader: "Habilidad de Líder",
		hero: "héroe",
		scorch_c: "Scorch - Combate Cuerpo a Cuerpo",
		scorch_r: "Scorch - Distancia",
		scorch_s: "Scorch - Asedio",
		agile: "ágil",
		muster: "reunión",
		spy: "espía",
		medic: "médico",
		morale: "Moral",
		bond: "Vínculo Estrecho",
		avenger: "Vengador",
		avenger_kambi: "Vengador"
	},
	// Unit ability descriptions keep the trailing space: they are concatenated.
	abilities: {
		clear: "Elimina todos los efectos de las Cartas de Clima (Biting Frost, Impenetrable Fog y Torrential Rain). ",
		frost: "Reduce a 1 la fuerza de todas las cartas de Combate Cuerpo a Cuerpo de ambos jugadores. ",
		fog: "Reduce a 1 la fuerza de todas las cartas de Combate a Distancia de ambos jugadores. ",
		rain: "Reduce a 1 la fuerza de todas las cartas de Asedio de ambos jugadores. ",
		storm: "Reduce a 1 la fuerza de todas las unidades de Combate a Distancia y de Asedio. ",
		hero: "No le afectan las Cartas Especiales ni las habilidades. ",
		decoy: "Intercámbiala por una carta del campo de batalla para devolver esa carta a tu mano. ",
		horn: "Duplica la fuerza de todas las cartas de unidad de esa fila. Limitado a 1 por fila. ",
		mardroeme: "Provoca la transformación de todas las cartas Berserker de la misma fila. ",
		berserker: "Se transforma en oso cuando hay una carta Mardroeme en su fila. ",
		scorch: "Se descarta tras jugarla. Destruye la(s) carta(s) más fuerte(s) del campo de batalla. ",
		scorch_c: "Destruye la(s) unidad(es) de Combate Cuerpo a Cuerpo más fuerte(s) del enemigo si la fuerza combinada de todas sus unidades de Combate Cuerpo a Cuerpo es 10 o más. ",
		scorch_r: "Destruye la(s) unidad(es) de Combate a Distancia más fuerte(s) del enemigo si la fuerza combinada de todas sus unidades de Combate a Distancia es 10 o más. ",
		scorch_s: "Destruye la(s) unidad(es) de Asedio más fuerte(s) del enemigo si la fuerza combinada de todas sus unidades de Asedio es 10 o más. ",
		agile: "Puede colocarse en la fila de Combate Cuerpo a Cuerpo o en la de Combate a Distancia. No se puede mover una vez colocada. ",
		muster: "Busca todas las cartas con el mismo nombre en tu mazo y juégalas al instante. ",
		spy: "Colócala en el campo de batalla de tu oponente (cuenta para su total) y roba 2 cartas de tu mazo. ",
		medic: "Elige una carta de tu pila de descartes y juégala al instante (no Héroes ni Cartas Especiales). ",
		morale: "Suma +1 a todas las unidades de la fila (excepto a sí misma). ",
		bond: "Colócala junto a una carta con el mismo nombre para duplicar la fuerza de ambas. ",
		avenger: "Cuando esta carta es retirada del campo de batalla, invoca una nueva y poderosa Carta de Unidad que ocupa su lugar. ",
		avenger_kambi: "Cuando esta carta es retirada del campo de batalla, invoca una nueva y poderosa Carta de Unidad que ocupa su lugar. ",

		// Leaders
		foltest_king: "Elige una carta Impenetrable Fog de tu mazo y juégala al instante.",
		foltest_lord: "Elimina cualquier efecto de clima en juego (provocado por cartas Biting Frost, Torrential Rain o Impenetrable Fog).",
		foltest_siegemaster: "Duplica la fuerza de todas tus unidades de Asedio (a menos que ya haya un Commander's Horn en esa fila).",
		foltest_steelforged: "Destruye la(s) unidad(es) de Asedio más fuerte(s) del enemigo si la fuerza combinada de todas sus unidades de Asedio es 10 o más.",
		foltest_son: "Destruye la(s) unidad(es) de Combate a Distancia más fuerte(s) del enemigo si la fuerza combinada de todas sus unidades de Combate a Distancia es 10 o más.",
		emhyr_imperial: "Elige una carta Torrential Rain de tu mazo y juégala al instante.",
		emhyr_emperor: "Mira 3 cartas al azar de la mano de tu oponente.",
		emhyr_whiteflame: "Anula la Habilidad de Líder de tu oponente.",
		emhyr_relentless: "Roba una carta de la pila de descartes de tu oponente.",
		emhyr_invader: "Las habilidades que devuelven una unidad al campo de batalla devuelven una unidad elegida al azar. Afecta a ambos jugadores.",
		eredin_commander: "Duplica la fuerza de todas tus unidades de Combate Cuerpo a Cuerpo (a menos que ya haya un Commander's Horn en esa fila).",
		eredin_bringer_of_death: "Devuelve a tu mano una carta de tu pila de descartes.",
		eredin_destroyer: "Descarta 2 cartas y roba 1 carta de tu elección de tu mazo.",
		eredin_king: "Elige cualquier carta de clima de tu mazo y juégala al instante.",
		eredin_treacherous: "Duplica la fuerza de todas las cartas espía (afecta a ambos jugadores).",
		francesca_queen: "Destruye la(s) unidad(es) de Combate Cuerpo a Cuerpo más fuerte(s) del enemigo si la fuerza combinada de todas sus unidades de Combate Cuerpo a Cuerpo es 10 o más.",
		francesca_beautiful: "Duplica la fuerza de todas tus unidades de Combate a Distancia (a menos que ya haya un Commander's Horn en esa fila).",
		francesca_daisy: "Roba una carta adicional al comienzo de la batalla.",
		francesca_pureblood: "Elige una carta Biting Frost de tu mazo y juégala al instante.",
		francesca_hope: "Mueve las unidades ágiles a la fila válida que maximice su fuerza (no mueve las que ya están en su fila óptima).",
		crach_an_craite: "Baraja todas las cartas del cementerio de cada jugador de vuelta en su mazo.",
		king_bran: "Las unidades solo pierden la mitad de su fuerza con mal clima."
	},
	factions: {
		realms: "Roba una carta de tu mazo cada vez que ganas una ronda.",
		nilfgaard: "Gana cualquier ronda que termine en empate.",
		monsters: "Conserva una Carta de Unidad al azar en el campo tras cada ronda.",
		scoiatael: "Decide quién juega el primer turno.",
		skellige: "Al comienzo de la tercera ronda, 2 cartas al azar del cementerio se colocan en el campo de batalla."
	}
});
