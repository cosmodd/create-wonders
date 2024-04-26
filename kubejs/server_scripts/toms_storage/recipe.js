ServerEvents.recipes(event => {

	const removeIds = [
		'toms_storage:storage_terminal',
		'toms_storage:crafting_terminal',
		'toms_storage:wireless_terminal',
		'toms_storage:inventory_cable',
		'toms_storage:inventory_cable_connector',
		'toms_storage:inventory_cable_connector_filtered',
		'toms_storage:inventory_proxy',
		'toms_storage:inventory_connector',
		'toms_storage:inventory_hopper_basic',
		'toms_storage:level_emitter',
		'toms_storage:open_crate',
		'toms_storage:trim'
	];

	removeIds.forEach(id => event.remove({ id: id }));

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

	mechanicalCrafting('toms_storage:ts.storage_terminal', [
		' T ',
		'OCD',
		' M '
	], {
		T: 'minecraft:redstone_torch',
		O: 'create:content_observer',
		C: 'create:brass_casing',
		D: 'create:display_board',
		M: 'create:precision_mechanism'
	});

	mechanicalCrafting('toms_storage:ts.crafting_terminal', [
		'  S  ',
		' CCC ',
		'VCCCL',
		' CCC '
	], {
		S: 'toms_storage:ts.storage_terminal',
		C: 'create:mechanical_crafter',
		V: 'create_things_and_misc:vibration_mechanism',
		L: 'create:linked_controller',
	});

	event.shapeless('toms_storage:ts.wireless_terminal', [
		'toms_storage:ts.crafting_terminal',
		'computercraft:wireless_modem_advanced'
	]);

	event.shaped('6x toms_storage:ts.inventory_cable', [
		' S ',
		'KWK',
		' S '
	], {
		S: '#forge:plates/brass',
		K: 'minecraft:dried_kelp',
		W: '#forge:wires/iron'
	});

	event.shapeless('toms_storage:ts.inventory_cable_connector', [
		'toms_storage:ts.inventory_cable',
		'create:chute'
	]);

	event.shapeless('toms_storage:ts.inventory_cable_connector_filtered', [
		'toms_storage:ts.inventory_cable_connector',
		'create:filter'
	]);

	event.shapeless('toms_storage:ts.inventory_proxy', [
		'create:content_observer',
		'#forge:barrels'
	]);

	mechanicalCrafting('toms_storage:ts.inventory_connector', [
		' E ',
		'BVB',
		' C '
	], {
		E: 'minecraft:ender_eye',
		B: 'create:brass_casing',
		V: 'create_things_and_misc:vibration_mechanism',
		C: 'create:smart_chute'
	});

	event.shaped('toms_storage:ts.inventory_hopper_basic', [
		'SCS',
		' I ',
	], {
		S: '#forge:plates/brass',
		C: 'create:chute',
		I: 'toms_storage:ts.inventory_cable'
	});

	event.shapeless('toms_storage:ts.level_emitter', [
		'create:content_observer',
		'toms_storage:ts.inventory_cable',
		'minecraft:redstone_torch'
	]);

	event.shaped('toms_storage:ts.open_crate', [
		'A',
		'B',
		'C'
	], {
		A: 'create:andesite_alloy',
		B: '#forge:barrels',
		C: 'create:chute'
	});

	event.shapeless('toms_storage:ts.trim', [
		'create:andesite_casing',
		'#forge:barrels'
	]);

});