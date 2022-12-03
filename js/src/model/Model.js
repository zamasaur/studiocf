export class Model {

	constructor(jsondata) {
		this.jsondata = jsondata;
		this.currentMode = 0; // 0 = quiz, 1 = search, 2 = listen
		this.state = new Map();
		this.setFilter('all', 'all', 'all', 'all');
	}

	setFilter(subject, content, subcontent, level) {
		content = subject == 'all' ? 'all' : content;
		subcontent = content == 'all' ? 'all' : subcontent;
		this.state.set(this.currentMode, {
			filter: { subject: subject, content: content, subcontent: subcontent, level: level },
			items: this.shuffleArray(this.#fetchItems(subject, content, subcontent, level)),
			selectedItem: 0,
		});
	}

	prev() {
		let state = this.state.get(this.currentMode);
		if (state.selectedItem > 0) {
			this.state.get(this.currentMode).selectedItem--;
		}
	}

	next() {
		let state = this.state.get(this.currentMode);
		if (state.selectedItem < state.items.length) {
			this.state.get(this.currentMode).selectedItem++;
		}
	}

	getState(mode) {
		return JSON.parse(JSON.stringify(this.state.get(mode)));
	}

	getSubjects() {
		let items = this.jsondata;
		let set = new Set();

		items.forEach(item => {
			set.add(item.metadata.subject);
		});

		return Array.from(set);
	}

	getContents() {
		let state = this.state.get(this.currentMode);
		let items = this.jsondata;
		let set = new Set();

		items.forEach(item => {
			if (state.filter.subject == item.metadata.subject) {
				set.add(item.metadata.content);
			}
		});

		return Array.from(set);
	}

	getSubcontents() {
		let state = this.state.get(this.currentMode);
		let items = this.jsondata;
		let set = new Set();

		items.forEach(item => {
			if (state.filter.content == item.metadata.content) {
				set.add(item.metadata.subcontent);
			}
		});

		return Array.from(set);
	}

	getLevels() {
		let state = this.state.get(this.currentMode);
		let items = this.jsondata;
		let set = new Set();

		items.forEach(item => {
			if ((state.filter.subject == 'all' || item.metadata.subject == state.filter.subject) &&
				(state.filter.content == 'all' || item.metadata.content == state.filter.content) &&
				(state.filter.subcontent == 'all' || item.metadata.subcontent == state.filter.subcontent)) {

				set.add(item.metadata.level);
			}
		});

		return Array.from(set);
	}

	getData(mode) {
		let state = this.state.get(mode);

		if (state.items.length == 0) {
			return [null, null, null, null, null];
		}

		let data = state.items[state.selectedItem];

		if (mode == 0) {
			return [data.question].concat(this.shuffleArray([data.a_answer, data.b_answer, data.c_answer, data.d_answer]));
		}
		return [data.question, data.a_answer, data.b_answer, data.c_answer, data.d_answer];
	}

	shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	#fetchItems(subject, content, subcontent, level) {

		let items = this.jsondata;

		return items.filter((item) => {
			return (subject == 'all' || item.metadata.subject == subject) &&
				(content == 'all' || item.metadata.content == content) &&
				(subcontent == 'all' || item.metadata.subcontent == subcontent) &&
				(level == 'all' || item.metadata.level == level);
		});
	}

}