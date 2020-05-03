// generates an id and adds a note to note_dict
function add_note(x, y, colour, text) {
	// generates a random id between 0 and (max_notes-1) that is not already in note_dict
	do { var id = Math.floor(Math.random() * max_notes); }
	while (Object.keys(note_dict).includes(id))
	// adds note with id
	note_dict[id] = new Note(id, x, y, colour, text);
};
// comment this later
document.getElementById("new_note").onclick = () => {
	add_note(50, 100, "silver", "Write stuff here...");
}
document.getElementById("save").onclick = () => { save(true, "attrs"); };
document.getElementById("load").onclick = () => { load(true, "attrs"); };
document.getElementById("copy_save").onclick = () => { copy_save(); };
document.getElementById("copy_load").onclick = () => { copy_load(); };
// asks for confirmation
window.onbeforeunload = () => { return "Are you sure you want to quit? Remember to save!"; }

var max_notes = 1000;

load(false, "attrs");