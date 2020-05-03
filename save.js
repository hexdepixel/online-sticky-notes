// dictionary where each note corresponds to a random id
var note_dict = {};

// converts notes into only initial attributes and returns a list of attribute arrays
// notes (iterable): a list of note objects
function notes_to_array(notes) {
	var attr_arrays = [];

	for (var id in notes) {
		attr_arrays.push({
			"id": id,
			"x": notes[id].x,
			"y": notes[id].y,
			"colour": notes[id].colour,
			"text": notes[id].text.innerHTML
		});
	}

	return attr_arrays;
}

// converts initial atributes into notes and returns a dict of note objects
// array (iterable): a list of attribute arrays
function array_to_notes(arrays) {
	var note_dict = {};

	for (var array in arrays) {
		note_dict[arrays[array].id] = new Note(
			arrays[array].id,
			parseInt(arrays[array].x),
			parseInt(arrays[array].y),
			arrays[array].colour,
			arrays[array].text
		);
	}

	return note_dict;
}

// saves note_dict to localStorage
// ask (bool): whether permission should be asked
// item (str): the localStorage item in which to save
function save(ask, item) {
	// ask only if needed, otherwise bypass the check
	if (ask ? confirm("Are you sure you want to save?") : true) {
		// stringifies and saves data
		localStorage.setItem(item, JSON.stringify(
			notes_to_array(note_dict)
		));
	}
};

// loads note_dict from the last save
// ask (bool): whether permission should be asked
// item (str): the localStorage item from which to load
function load(ask, item) {
	// ask only if needed, otherwise bypass the check
	if (ask ? confirm("Are you sure you want to load?") : true) {
		// removes all note elements
		for (var note in note_dict) document.body.removeChild(note_dict[note].container);

		// replace current note_dict with the saved note_dict
		note_dict = array_to_notes(JSON.parse(
			localStorage.getItem(item)
		));
	}
}

// alerts note_dict so it can be copied
function copy_save() {
	prompt("Copy this somewhere:", JSON.stringify(notes_to_array(note_dict)));
}

// takes save string and loads it
function copy_load() {
	save = prompt("Paste a save here:");

	// only loads if user presses yes and types something in
	if (save) {
		// removes all note elements
		for (var note in note_dict) document.body.removeChild(note_dict[note].container);

		// replace current note_dict with the saved note_dict
		note_dict = array_to_notes(JSON.parse(save));
	}
}