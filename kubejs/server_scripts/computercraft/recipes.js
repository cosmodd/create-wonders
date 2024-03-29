ServerEvents.recipes(event => {

	// COMPUTERS
	event.shaped('computercraft:computer_normal', [
		'ACA',
		'AKA',
		'ADA',
	], {
		A: 'create:andesite_alloy',
		C: 'createaddition:capacitor',
		K: 'create:andesite_casing',
		D: 'create:display_board'
	}).id('computercraft:computer_normal');

	event.shaped('computercraft:computer_advanced', [
		'BPB',
		'BCB',
		'BDB',
	], {
		B: '#forge:ingots/brass',
		P: 'create:precision_mechanism',
		C: 'create:brass_casing',
		D: 'create:display_board'
	}).id('computercraft:computer_advanced');

	event.shaped('computercraft:computer_advanced', [
		'BPB',
		'BCB',
		'BDB',
	], {
		B: '#forge:ingots/brass',
		P: 'create:precision_mechanism',
		C: 'create:brass_casing',
		D: 'computercraft:computer_normal'
	}).id('computercraft:computer_advanced_upgrade');

	// POCKET COMPUTERS
	event.shaped('computercraft:pocket_computer_normal', [
		'AC',
		'AD',
	], {
		A: 'create:andesite_alloy',
		C: 'createaddition:capacitor',
		D: 'create:display_board'
	}).id('computercraft:pocket_computer_normal');

	event.shaped('computercraft:pocket_computer_advanced', [
		'BP',
		'BD',
	], {
		B: '#forge:ingots/brass',
		P: 'create:precision_mechanism',
		D: 'create:display_board'
	}).id('computercraft:pocket_computer_advanced');

	event.shaped('computercraft:pocket_computer_advanced', [
		'BP',
		'BC',
	], {
		B: '#forge:ingots/brass',
		P: 'create:precision_mechanism',
		C: 'computercraft:pocket_computer_normal'
	}).id('computercraft:pocket_computer_advanced_upgrade');

	// TURTLES
	event.shapeless('computercraft:turtle_normal', [
		'create_sa:vault_component',
		'computercraft:computer_normal',
		'create_sa:heat_engine'
	]).id('computercraft:turtle_normal');

	event.shapeless('computercraft:turtle_advanced', [
		'create_sa:vault_component',
		'computercraft:computer_advanced',
		'create_sa:heat_engine'
	]).id('computercraft:turtle_advanced');

	event.shaped('computercraft:turtle_advanced', [
		'BPB',
		'BTB',
		'BCB',
	], {
		B: '#forge:ingots/brass',
		P: 'create:precision_mechanism',
		T: 'computercraft:turtle_normal',
		C: 'create:brass_casing'
	}).id('computercraft:turtle_advanced_upgrade');

	// MONITORS
	event.shapeless('2x computercraft:monitor_normal', [
		'create:andesite_casing',
		'create:display_board'
	]).id('computercraft:monitor_normal');

	event.shapeless('2x computercraft:monitor_advanced', [
		'create:brass_casing',
		'create:display_board'
	]).id('computercraft:monitor_advanced');

	// MODEMS AND CABLES
	event.shaped('4x computercraft:cable', [
		' K ',
		'KWK',
		' K ',
	], {
		K: 'minecraft:dried_kelp',
		W: '#forge:wires/copper'
	}).id('computercraft:cable');

	event.shaped('computercraft:wired_modem', [
		' S ',
		'SCS',
		' S ',
	], {
		S: '#forge:plates/iron',
		C: 'computercraft:cable',
	}).id('computercraft:wired_modem');

	event.shapeless('computercraft:wireless_modem_normal', [
		'#forge:ender_pearls',
		'create:andesite_casing',
		'minecraft:redstone_torch',
	]).id('computercraft:wireless_modem_normal');

	event.shapeless('computercraft:wireless_modem_advanced', [
		'minecraft:ender_eye',
		'create:brass_casing',
		'minecraft:redstone_torch',
	]).id('computercraft:wireless_modem_advanced');

	// SPEAKER
	event.shapeless('computercraft:speaker', [
		'create:andesite_casing',
		'#minecraft:wool',
		'#forge:dusts/redstone',
	]).id('computercraft:speaker');

	// PRINTER
	event.shapeless('computercraft:printer', [
		'create:andesite_casing',
		'#forge:paper',
		'minecraft:ink_sac',
	]).id('computercraft:printer');

	// DISK DRIVE
	event.shapeless('computercraft:disk_drive', [
		'create:andesite_casing',
		'computercraft:disk',
	]).id('computercraft:disk_drive');

	// DISKS
	const DISK_COLORS = {
		black: 0x111111,
		red: 0xcc4c4c,
		green: 0x57A64E,
		brown: 0x7f664c,
		blue: 0x3366cc,
		purple: 0xb266e5,
		cyan: 0x4c99b2,
		light_gray: 0x999999,
		gray: 0x4c4c4c,
		pink: 0xf2b2cc,
		lime: 0x7fcc19,
		yellow: 0xdede6c,
		light_blue: 0x99b2f2,
		magenta: 0xe57fd8,
		orange: 0xf2b233,
		white: 0xf0f0f0
	}

	event.remove({ output: 'computercraft:disk' });
	event.shapeless('computercraft:disk', [
		'#forge:paper',
		'#forge:plates/iron',
		'#forge:dusts/redstone',
	]).id('computercraft:disk');

	Object.entries(DISK_COLORS).forEach(([name, color]) => {
		const item = Item.of('computercraft:disk', { 'Color': color });

		event.shapeless(item, [
			'computercraft:disk',
			`#forge:dyes/${name}`
		]).id(`computercraft:disk_${name}`);
	});

});