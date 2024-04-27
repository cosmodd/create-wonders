ServerEvents.recipes(event => {
	
	function mechanicalCrafting(output, pattern, keys) {
		const [_, quantity, item] = output.match(/^(?:(\d+)x)?\s*(.+)$/);
		const jsonKeys = Object.entries(keys).reduce((a, [k, v]) => {
			const [, char, value] = v.match(/(\W)?(.+)/);
			let itemEntry = { item: value };
			if (char === '#') itemEntry = { tag: value };

			a[k] = [itemEntry];
			return a;
		}, {});

		event.custom({
			type: 'create:mechanical_crafting',
			pattern: pattern,
			key: jsonKeys,
			result: {
				count: quantity ? parseInt(quantity) : 1,
				item: item
			}
		})
	}

	const removeIds = [
		// Basic materials
		'immersive_aircraft:hull',
		'immersive_aircraft:sail',
		'immersive_aircraft:propeller',
		'immersive_aircraft:boiler',
		'immersive_aircraft:engine',
		// Vehicles
		'immersive_aircraft:airship',
		'immersive_aircraft:cargo_airship',
		'immersive_aircraft:biplane',
		'immersive_aircraft:gyrodyne',
		'immersive_aircraft:quadrocopter',
		// Attachments
		'immersive_aircraft:rotary_cannon',
		'immersive_aircraft:heavy_crossbow',
		'immersive_aircraft:telescope',
		'immersive_aircraft:bomb_bay',
		// Upgrades
		'immersive_aircraft:eco_engine',
		'immersive_aircraft:nether_engine',
		'immersive_aircraft:steel_boiler',
		'immersive_aircraft:enhanced_propeller',
		'immersive_aircraft:industrial_gears',
		'immersive_aircraft:sturdy_pipes',
		'immersive_aircraft:gyroscope',
		'immersive_aircraft:hull_reinforcement',
		'immersive_aircraft:improved_landing_gear',
	];

	removeIds.forEach(id => event.remove({ id: id }));

	// -------------------------- //
	// Vehicles                   //
	// -------------------------- //
	mechanicalCrafting('immersive_aircraft:airship', [
		' SSS ',
		' SSS ',
		' s s ',
		'SHCEP',
		' HHH ',
	], {
		S: 'immersive_aircraft:sail',
		H: 'immersive_aircraft:hull',
		C: '#create:seats',
		E: 'immersive_aircraft:engine',
		P: 'create:propeller',
		s: '#forge:string'
	});

	event.shaped('immersive_aircraft:cargo_airship', [
		'CAC',
		'CEC',
		'P P'
	], {
		C: '#forge:chests/wooden',
		A: 'immersive_aircraft:airship',
		E: 'immersive_aircraft:boiler',
		P: 'create:propeller'
	});

	mechanicalCrafting('immersive_aircraft:biplane', [
		'   S ',
		'S  S ',
		'HHsEP',
		'S  S ',
		'   S ',
	], {
		S: 'immersive_aircraft:sail',
		H: 'immersive_aircraft:hull',
		E: 'immersive_aircraft:engine',
		P: 'immersive_aircraft:propeller',
		s: '#create:seats'
	});

	event.shaped('immersive_aircraft:gyrodyne', [
		' P ',
		'SpS',
		'HsH'
	], {
		P: 'immersive_aircraft:propeller',
		S: 'immersive_aircraft:sail',
		H: 'immersive_aircraft:hull',
		s: '#create:seats',
		p: 'create:precision_mechanism'
	});

	event.shaped('immersive_aircraft:quadrocopter', [
		'PCP',
		' c ',
		'PEP'
	], {
		P: 'create:propeller',
		E: 'immersive_aircraft:boiler',
		C: 'create:andesite_casing',
		c: 'farmersdelight:canvas',
	});

	// -------------------------- //
	// Basic materials            //
	// -------------------------- //
	event.shaped('immersive_aircraft:hull', [
		'CIC',
	], {
		C: 'create:andesite_casing',
		I: '#forge:ingots/iron',
	});

	event.shaped('immersive_aircraft:sail', [
		'SS',
		'SS',
	], {
		S: 'create:white_sail',
	});

	event.shaped('immersive_aircraft:propeller', [
		' S ',
		'SPS',
		' S '
	], {
		S: '#forge:plates/iron',
		P: 'create:propeller',
	});

	event.shaped('immersive_aircraft:boiler', [
		'E',
		'T',
		'B',
	], {
		E: 'create:steam_engine',
		T: 'create:fluid_tank',
		B: 'create:blaze_burner',
	});

	event.shaped('immersive_aircraft:engine', [
		'CMC',
		'SES'
	], {
		C: '#forge:plates/copper',
		M: 'create:precision_mechanism',
		S: '#forge:plates/obsidian',
		E: 'immersive_aircraft:boiler',
	});

	// -------------------------- //
	// Upgrades                   //
	// -------------------------- //
	event.shaped('immersive_aircraft:eco_engine', [
		'IWI',
		'CEC'
	], {
		I: '#forge:plates/iron',
		W: 'minecraft:water_bucket',
		C: '#forge:plates/copper',
		E: 'immersive_aircraft:boiler',
	});

	event.shaped('immersive_aircraft:nether_engine', [
		'ILI',
		'SES'
	], {
		I: '#forge:plates/iron',
		L: 'minecraft:lava_bucket',
		S: '#forge:plates/obsidian',
		E: 'immersive_aircraft:boiler',
	});

	event.shaped('immersive_aircraft:steel_boiler', [
		'ITI',
		'IFI'
	], {
		I: '#forge:plates/iron',
		T: 'create:fluid_tank',
		F: 'minecraft:furnace'
	});

	event.shaped('immersive_aircraft:enhanced_propeller', [
		' B ',
		'BPB',
		' B '
	], {
		B: '#forge:plates/brass',
		P: 'create:propeller',
	});

	event.shaped('immersive_aircraft:industrial_gears', [
		' Cc',
		'IAC',
		'iI '
	], {
		C: '#forge:ingots/copper',
		c: '#forge:plates/copper',
		A: 'create:andesite_alloy',
		I: '#forge:ingots/iron',
		i: '#forge:plates/iron',
	});

	event.shaped('immersive_aircraft:sturdy_pipes', [
		'PIP'
	], {
		P: 'create:fluid_pipe',
		I: '#forge:plates/iron',
	});

	event.shapeless('immersive_aircraft:gyroscope', [
		'minecraft:compass',
		'2x create:electron_tube'
	]);

	event.shaped('immersive_aircraft:hull_reinforcement', [
		'SHS'
	], {
		S: '#forge:plates/iron',
		H: 'immersive_aircraft:hull'
	});

	event.shaped('immersive_aircraft:improved_landing_gear', [
		'SI',
		'B '
	], {
		S: '#forge:plates/iron',
		I: '#forge:ingots/iron',
		B: 'create:belt_connector'
	});

	// -------------------------- //
	// Attachments                //
	// -------------------------- //
	event.shaped('immersive_aircraft:rotary_cannon', [
		' PP',
		'DPP',
		'R  '
	], {
		P: 'create:fluid_pipe',
		D: 'minecraft:dispenser',
		R: '#forge:rods/copper'
	});

	event.shapeless('immersive_aircraft:heavy_crossbow', [
		'#forge:rods/wooden',
		'minecraft:crossbow'
	]);

	event.shapeless('immersive_aircraft:telescope', [
		'#forge:rods/wooden',
		'minecraft:spyglass'
	]);

	event.shaped('immersive_aircraft:bomb_bay', [
		'IDI',
		'SBS'
	], {
		I: '#forge:ingots/iron',
		D: 'minecraft:dispenser',
		B: 'supplementaries:bomb',
		S: '#forge:plates/iron',
	});
	
});