// converts notes into only initial attributes and returns a list of attribute arrays
function notes_to_array(notes) {
	var attr_arrays = [];

	for (var id in notes) {
		attr_arrays.push({
			"id": id,
			"x": note_dict[id].x,
			"y": note_dict[id].y,
			"colour": notes[id].colour,
			"text": notes[id].content.innerHTML
		});
	}

	return attr_arrays;
}

// converts initial atributes into notes and returns a dict of note objects
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

// saves notes to localStorage
function save(item) {
	popup(
		"Are you sure you want to save?",
		Popup_Button("Confirm", () => {
			// stringifies and saves data
			localStorage.setItem(item, JSON.stringify(
				notes_to_array(note_dict)
			));
		}),
		Popup_Button("Cancel", () => {})
	);
};

// loads note_dict from the last save
// item (str): the localStorage item from which to load
function load(item) {
	popup(
		"Are you sure you want to load?",
		Popup_Button("Confirm", () => {
			// removes all note elements
			for (var note in note_dict) document.body.removeChild(note_dict[note].container);

			// replace current note_dict with the saved note_dict
			note_dict = array_to_notes(JSON.parse(
				localStorage.getItem(item)
			));
		}),
		Popup_Button("Cancel", () => {})
	);
}

// alerts note_dict so it can be copied
// note: the popup version doesn't work because you can't copy overflowing text, will be fixed in v2.1
function copy_save() {
	// popup(
	// 	`Copy this somewhere:<hr/>${JSON.stringify(notes_to_array(note_dict))}`,
	// 	Popup_Button("OK", () => {})
	// );
	// alerts note_dict so it can be copied
	prompt("Copy this somewhere:", JSON.stringify(notes_to_array(note_dict)));
}

// takes save string and loads it
function copy_load() {
	var save = prompt("Paste a save here:");

	// only loads if user presses yes and types something in
	if (save) {
		// removes all note elements
		for (var note in note_dict) document.body.removeChild(note_dict[note].container);

		// replace current note_dict with the saved note_dict
		note_dict = array_to_notes(JSON.parse(save));
	}
}
// asks for confirmation
window.onbeforeunload = () => { return "Are you sure you want to quit? Remember to save!"; }