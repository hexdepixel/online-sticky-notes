// colours that notes can be
var colours = {
	"red"	: "#ff8080",
	"orange": "#ffc080",
	"yellow": "#ffff80",
	"green"	: "#80ff80",
	"cyan"	: "#80ffff",
	"blue"	: "#8080ff",
	"purple": "#c080ff",
	"pink"	: "#ff80ff"
};
// dictionary in which an ID corresponds to a note
var note_dict = {};
var max_notes = 1000;
// creates a new note
// x			: distance in pixels from left edge of window
// y			: distance in pixels from top edge of window
// colour_name	: key for css colour in colours array
// text			: text inside note
function new_note(x, y, colour_name, text) {
	// cancels function if there are too many notes
	if (Object.keys(note_dict).length >= max_notes) {
		popup(
			`You have reached the maximum number of notes allowed (${max_notes}).
			Delete some to make space.`,
			Popup_Button("OK", () => {})
		);
		return;
	}
	var id;
	// generates random id
	do { id = Math.floor(Math.random() * max_notes).toString(); }
	// generates new id if id already exists
	while (Object.keys(note_dict).includes(id));

	note_dict[id] = new Note(id, x, y, colours[colour_name], text);
}