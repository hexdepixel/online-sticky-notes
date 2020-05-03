// basic note note object with coords & colour
class Note {
	constructor(id, x, y, colour, text) {
		// basic attributes
		this.id = id;
		this.x = x;
		this.y = y;
		this.colour = colour;
		// creates elements
		this.container = Note.Container(x, y, colour);
		this.text = Note.Text("Write stuff here...", text);
		this.deleter = Note.Icon("deleter", "Delete note");
		this.palette = Note.Icon("palette", "Recolour note");
		this.dragger = Note.Icon("dragger", "Move note");
		// adds elements
		document.body.appendChild(this.container);
		this.container.appendChild(this.text);
		this.container.appendChild(this.deleter);
		this.container.appendChild(this.palette);
		this.container.appendChild(this.dragger);

		// deleter code
		this.deleter.onclick = () => {
			if (confirm("Are you sure you want to delete this note forever?")) {
				this.container.remove();
				delete note_dict[id];
			}
		};
		// palette code
		this.palette.onclick = () => {
			this.colour = prompt(`What colour will the note be? (Current: ${this.colour})`);
			this.container.style.background = this.colour;
		}
		// dragger code
		this.dragger.onmousedown = (click_e) => {
			// gets coords of container
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
		};
	}
	// container contains the note
	static Container(x, y, colour) {
		var container = document.createElement("div");
		container.className = "container";
		container.style.left = `${x}px`;
		container.style.top = `${y}px`;
		container.style.background = colour;
		return container;
	}
	// text is where you enter text
	static Text(title, content) {
		var text = document.createElement("p");
		text.className = "text";
		text.contentEditable = "true";
		text.title = title;
		text.innerHTML = content;
		return text;
	}
	// icons are the buttons at the bottom
	static Icon(name, title) {
		var icon = document.createElement("img");
		icon.className = `${name}`;
		icon.src = `assets/${name}.png`;
		icon.title = title;
		return icon;
	}
}