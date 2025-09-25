export class Model {

	constructor(jsondata) {
		this.jsondata = jsondata;
		this.state = new Map();
		// 0 = quiz, 1 = lesson, 2 = search
		this.getModes().forEach(mode => {
			if (mode == 0) {
				this.currentMode = 0;
			}
			this.resetState(mode);
		});
	}

	getModes() {
		return [0, 1, 2, 3, 4];
	}

	getCurrentMode() {
		return this.currentMode;
	}

	setCurrentMode(mode) {
		this.currentMode = mode;
	}

	isPlaying(mode = this.currentMode) {
		return this.state.get(mode).playing;
	}

	setPlaying(playing, mode = this.currentMode) {
		return this.state.get(mode).playing = playing;
	}

	setSelectedItem(selectedItem, mode = this.currentMode) {
		return this.state.get(mode).selectedItem = selectedItem;
	}

	setFilter(subject, content, subcontent, level, mode = this.currentMode) {
		content = subject == 'all' ? 'all' : content;
		subcontent = content == 'all' ? 'all' : subcontent;

		let items = mode == 2 || mode == 3 ? this.#fetchItems(subject, content, subcontent, level) : this.shuffleArray(this.#fetchItems(subject, content, subcontent, level));

		this.state.set(mode, {
			filter: { subject: subject, content: content, subcontent: subcontent, level: level },
			items: items,
			selectedItem: 0,
		});
	}

	addUtterance(utterance, mode = this.currentMode) {
		this.state.get(mode).utterance = utterance;
	}

	getUtterance(mode = this.currentMode) {
		return this.state.get(mode).utterance;
	}

	prev() {
		let state = this.state.get(this.currentMode);
		if (state.selectedItem > 0) {
			this.state.get(this.currentMode).selectedItem--;
		}
	}

	next() {
		let state = this.state.get(this.currentMode);
		if (state.selectedItem + 1 < state.items.length) {
			this.state.get(this.currentMode).selectedItem++;
		}
	}

	loop() {
		let state = this.state.get(this.currentMode);
		this.state.get(this.currentMode).selectedItem = (this.state.get(this.currentMode).selectedItem + 1) % state.items.length;
	}

	getState(mode = this.currentMode) {
		return JSON.parse(JSON.stringify(this.state.get(mode)));
	}

	setState(items, mode = this.currentMode) {
		this.state.set(mode, {
			filter: this.state.get(mode).filter,
			items: items,
			selectedItem: 0,
		});
	}

	resetState(mode = this.currentMode) {
		this.setFilter('all', 'all', 'all', 'all', mode);
		if (mode == 1) {
			this.setPlaying(false, mode);
		}
		if (mode == 2) {
			this.setSelectedItem(-1, mode);
		}
	}

	getSubjects(mode = this.currentMode) {
		let items = this.jsondata;
		let set = new Set();

		items.forEach(item => {
			set.add(item.metadata.subject);
		});

		return Array.from(set);
	}

	getContents(mode = this.currentMode) {
		let state = this.state.get(mode);
		let items = this.jsondata;
		let set = new Set();

		items.forEach(item => {
			if (state.filter.subject == item.metadata.subject) {
				set.add(item.metadata.content);
			}
		});

		return Array.from(set);
	}

	getSubcontents(mode = this.currentMode) {
		let state = this.state.get(mode);
		let items = this.jsondata;
		let set = new Set();

		items.forEach(item => {
			if (state.filter.content == item.metadata.content) {
				set.add(item.metadata.subcontent);
			}
		});

		return Array.from(set);
	}

	getLevels(mode = this.currentMode) {
		let state = this.state.get(mode);
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

	getData(mode = this.currentMode) {
		let state = this.state.get(mode);

		if (state.items.length == 0) {
			return [null, null, null, null, null];
		}

		let data = state.items[state.selectedItem];

		if (mode == 0 || mode == 3 || mode == 4) {
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

	getContentsForSubjects(subjects) {
		let items = this.jsondata;
		let set = new Set();

		items.forEach(item => {
			if (subjects.length === 0 || subjects.includes(item.metadata.subject)) {
				set.add(item.metadata.content);
			}
		});

		return Array.from(set);
	}

	getSubcontentsForSubjectsAndContents(subjects, contents) {
		let items = this.jsondata;
		let set = new Set();

		items.forEach(item => {
			if ((subjects.length === 0 || subjects.includes(item.metadata.subject)) &&
				(contents.length === 0 || contents.includes(item.metadata.content))) {
				set.add(item.metadata.subcontent);
			}
		});

		return Array.from(set);
	}

	setFilterMultiQuiz(subjects, contents, subcontents, levels) {
		const toStringArray = arr => arr.map(x => String(x));

		const subjectsStr = toStringArray(subjects);
		const contentsStr = toStringArray(contents);
		const subcontentsStr = toStringArray(subcontents);
		const levelsStr = toStringArray(levels);

		const filtered = this.jsondata.filter(item => {
			const itemSubject = String(item.metadata.subject);
			const itemContent = String(item.metadata.content);
			const itemSubcontent = String(item.metadata.subcontent);
			const itemLevel = String(item.metadata.level);

			const subjectMatch = subjectsStr.length === 0 || subjectsStr.includes(itemSubject);
			const contentMatch = contentsStr.length === 0 || contentsStr.includes(itemContent);
			const subcontentMatch = subcontentsStr.length === 0 || subcontentsStr.includes(itemSubcontent);
			const levelMatch = levelsStr.length === 0 || levelsStr.includes(itemLevel);

			return subjectMatch && contentMatch && subcontentMatch && levelMatch;
		});

		const shuffled = this.shuffleArray(filtered);

		this.state.set(4, {
			filter: {
				subjects: subjects,
				contents: contents,
				subcontents: subcontents,
				levels: levels
			},
			items: shuffled,
			selectedItem: shuffled.length > 0 ? 0 : -1
		});
	}

}