// dictionary where each sticky corresponds to a random id
var sticky_dict = {};

var max_stickies = 1000;

// basic sticky note object with coords & colour
class Sticky {
	constructor(id, x, y, colour) {
		// basic attributes
		this.id = id;
		this.x = x;
		this.y = y;
		this.colour = colour;
		// creates elements
		this.container = Sticky.Container(x, y, colour);
		this.text = Sticky.Text("Write stuff here...");
		this.deleter = Sticky.Icon("deleter", "Delete sticky");
		this.palette = Sticky.Icon("palette", "Recolour sticky");
		this.dragger = Sticky.Icon("dragger", "Move sticky");
		// adds elements
		document.body.appendChild(this.container);
		this.container.appendChild(this.text);
		this.container.appendChild(this.deleter);
		this.container.appendChild(this.palette);
		this.container.appendChild(this.dragger);

		// deleter code
		this.deleter.onclick = () => {
			if (confirm("Are you sure you want to delete this sticky forever?")) {
				this.container.remove();
				delete sticky_dict[id];
			}
		};
		// palette code
		this.palette.onclick = () => {
			this.colour = prompt(`What colour will the sticky be? (Current: ${colour})`);
			this.container.style.borderColor = this.colour;
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
	// container contains the sticky
	static Container(x, y, colour) {
		var container = document.createElement("div");
		container.className = "container";
		container.style.left = `${x}px`;
		container.style.top = `${y}px`;
		container.style.borderColor = colour;
		return container;
	}
	// text is where you enter text
	static Text(title) {
		var text = document.createElement("p");
		text.className = "text";
		text.contentEditable = "true";
		text.title = title;
		text.innerHTML = title;
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

// adds a sticky to the sticky dictionary
function add_sticky(x, y, colour) {
	// checks if max stickies has been reached
	if (Object.keys(sticky_dict).length >= max_stickies) {
		alert(`Too many stickies (${Object.keys(sticky_dict).length}/${max_stickies})!`);
		return;
	};

	// random id between 0 and (max_stickies - 1), checks for duplicates
	do {
		var id = Math.floor(Math.random() * max_stickies);
	} while (
		Object.keys(sticky_dict).includes(id.toString(10))
	);

	// creates the sticky
	sticky_dict[id] = new Sticky(id, x, y, colour);
}

document.getElementById("new_sticky").onclick = () => {
	add_sticky(50, 50, "black");
}