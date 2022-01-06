class Note {
	// id		: position in note_dict
	// x		: distance in pixels from left edge of window
	// y		: distance in pixels from top edge of window
	// colour	: css colour
	// text		: text inside note
	constructor(id, x, y, colour, text) {
		// basic attributes
		this.id		= id;
		this.x		= x;
		this.y		= y;
		this.colour	= colour;
		// elements
		this.container		= Note.Container(x, y, this.colour);
		this.top_bar		= Note.Top_bar(this.colour);
		this.close_but		= Note.Icon_but("assets/close.png", "Close note icon");
		this.min_but		= Note.Icon_but("assets/min.png", "Minimise note icon");
		this.palette_but	= Note.Icon_but("assets/palette.png", "Change note colour icon");
		this.content		= Note.Content(text);
		// dragging code
		// click_e: mouse down event object
		this.top_bar.onmousedown = (click_e) => {
			// gets coords of note
			var init_x = this.container.style.left;
			var init_y = this.container.style.top;
			// removes "px" from the end
			init_x = init_x.substring(init_x.length - 2, init_x);
			init_y = init_y.substring(init_y.length - 2, init_y);
			// moves mouse
			document.onmousemove = (move_e) => {
				this.container.style.left = `${move_e.clientX - (click_e.clientX - init_x)}px`;
				this.container.style.top = `${move_e.clientY - (click_e.clientY - init_y)}px`;
			};
			// stops moving the container and sets new coords when mouse is released
			document.onmouseup = () => {
				document.onmousemove = null;
				this.x = this.container.style.left;
				this.y = this.container.style.top;
			};
		}
		// opens close popup
		this.close_but.onclick = () => {
			popup(
				"Are you sure you want to close this note forever?",
				// deletes elements and note object
				Popup_Button("Confirm", () => {
					document.body.removeChild(this.container);
					delete note_dict[id];
				}),
				// does nothing
				Popup_Button("Cancel", () => {})
			);
		};
		// toggles note content
		this.min_but.onclick = () => {
			// if content is invisible
			if (this.content.offsetWidth > 0 && this.content.offsetHeight > 0) {
				// make it visible
				this.content.style.display = "none";
			} else {
				// otherwise make it invisible
				this.content.style.display = "block";
			}
		}
		// opens palette popup
		this.palette_but.onclick = () => {
			popup(
				"Please select your note's colour.",
				Popup_Button("Red",		() => {this.colour_selected("red")}),
				Popup_Button("Orange",	() => {this.colour_selected("orange")}),
				Popup_Button("Yellow",	() => {this.colour_selected("yellow")}),
				Popup_Button("Green",	() => {this.colour_selected("green")}),
				Popup_Button("Cyan",	() => {this.colour_selected("cyan")}),
				Popup_Button("Blue",	() => {this.colour_selected("blue")}),
				Popup_Button("Purple",	() => {this.colour_selected("purple")}),
				Popup_Button("Pink",	() => {this.colour_selected("pink")})
			);
		};
		// creates elements on document
		document.body.appendChild(this.container);
			this.container.appendChild(this.top_bar);
				this.top_bar.appendChild(this.close_but);
				this.top_bar.appendChild(this.min_but);
				this.top_bar.appendChild(this.palette_but);
			this.container.appendChild(this.content);
	}
	// called when a colour selector button is pressed
	// colour: css colour to make the note into
	colour_selected(colour) {
		this.colour = colours[colour];
		this.top_bar.style.backgroundColor = colours[colour];
		this.container.style.borderColor = colours[colour];
	}
	// contains everything in the note
	// x		: distance in pixels from left edge of window
	// y		: distance in pixels from top edge of window
	// colour	: css border colour
	static Container(x, y, colour) {
		var container = document.createElement("div");
		container.className = "container";
		container.style.left = `${x}px`;
		container.style.top = `${y}px`;
		container.style.borderColor = colour;

		return container;
	}
	// draggable and contains buttons for closing/minimising/etc
	// colour: css border colour
	static Top_bar(colour) {
		var top_bar = document.createElement("div");
		top_bar.className = "top_bar";
		top_bar.style.background = colour;

		return top_bar;
	}
	// buttons in the top bar for closing/minimising/etc, contain icons
	// src: URL for image
	// alt: alt text if image is unloaded/for screenreaders
	static Icon_but(src, alt) {
		// creates icon button and adds proper class
		var icon_but = document.createElement("button");
		icon_but.className = "icon_but";
		// creates icon element and adds attrs
		var icon_img = document.createElement("img");
		icon_img.className = "icon_img";
		icon_img.src = src;
		icon_img.alt = alt;
		// appends image to button
		icon_but.appendChild(icon_img);

		return icon_but;
	}
	// where the note's text goes
	// text: text
	static Content(text) {
		var content = document.createElement("p");
		content.contentEditable = "true";
		content.className = "content";
		content.innerHTML = text;

		return content;
	}
}