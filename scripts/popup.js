// returns a button object
// text: text inside button
// onclick: function to call when clicked
function Popup_Button(text, onclick) {
	var element = document.createElement("button");
	element.innerHTML = text;
	// runs specified script, then deletes popup
	element.onclick = () => {
		onclick();
		document.getElementById("popup_background").remove();
		document.getElementById("popup_container").remove();
	};

	return element;
}
// creates a popup
// text 			: text inside popup
// ...buttons_list	: list of HTML button objects
function popup(text, ...buttons_list) {
	// creates element which makes background dim and non-interactive
	var background = document.createElement("div");
	background.className	= "floating";
	background.id			= "popup_background";
	document.body.appendChild(background);
	// creates container for popup
	var container = document.createElement("div");
	container.className	= "floating";
	container.id		= "popup_container";
	document.body.appendChild(container);
	// creates text space for popup
	var text_div = document.createElement("div");
	text_div.id			= "popup_text";
	text_div.innerHTML	= text;
	container.appendChild(text_div);
	// creates space for input
	var input = document.createElement("div");
	input.id = "popup_input";
	// appends the buttons to the input container
	for (var button_id in buttons_list) {
		input.appendChild(buttons_list[button_id]);
	}
	container.appendChild(input);
}