export class Model {

	constructor(jsondata) {
		this.jsondata = jsondata;
		this.currentMode = 0; // 0 = quiz, 1 = search, 2 = listen
		this.state = new Map();
		this.setFilter('all', 'all');
	}

	setFilter(subject, level) {
		this.state.set(this.currentMode, {
			filter: { subject: subject, level: level },
			items: this.shuffleArray(this.#fetchItems(subject, level)),
			selectedItem: 0,
		});
		console.log(this.state.get(this.currentMode).items);/*!!!*/
	}

	getSubjects() {
		let subjects = [];
		Object.entries(this.jsondata).forEach(([key, value]) => {
			subjects = subjects.concat(key);
		});

		return subjects;
	}

	getLevels() {
		return [1, 2];
	}

	getContent(mode) {
		let value = this.state.get(mode);
		let content = value.items[value.selectedItem];

		if (mode == 0) {
			return [content.question].concat(this.shuffleArray([content.a_answer, content.b_answer, content.c_answer, content.d_answer]));
		}
		return [content.question, content.a_answer, content.b_answer, content.c_answer, content.d_answer];
	}

	shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	#fetchItems(subject, level) {

		let items = [];
		Object.entries(this.jsondata).forEach(([key, value]) => {
			if (subject == 'all' || subject == key) {
				items = items.concat(value);
			}
		});

		if (level == 'all') {
			return items;
		}

		return items.filter((item) => {
			return item.metadata.level == level;
		});
	}

}