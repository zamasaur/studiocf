export class View {

	constructor() {
		this.quizSubject = document.querySelector('#quiz .subject');
		this.quizLevel = document.querySelector('#quiz .level');
		this.quizContent = document.querySelectorAll('#quiz .content>*');
		this.quizAnswerA = document.querySelector('#quiz .a_answer');
		this.quizAnswerB = document.querySelector('#quiz .b_answer');
		this.quizAnswerC = document.querySelector('#quiz .c_answer');
		this.quizAnswerD = document.querySelector('#quiz .d_answer');
		this.quizPrev = document.querySelector('#quiz .prev');
		this.quizNext = document.querySelector('#quiz .next');
	}

	populateSelect(select, options) {

		options.forEach(option => {
			let element = document.createElement("option");
			element.textContent = option;
			element.value = option;
			select.appendChild(element);
		});
	}

	populateContent(div, content) {
		for (let i = 0; i < div.length; i++) {
			div[i].innerText = content[i];
		}
	}

	bindQuizSubject(handler) {
		this.quizSubject.addEventListener('change', event => {
			event.preventDefault();
			handler();
		});
	}

	bindQuizLevel(handler) {
		this.quizLevel.addEventListener('change', event => {
			event.preventDefault();
			handler();
		});
	}

	bindQuizAnswerA(handler) {
		this.quizAnswerA.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindQuizAnswerB(handler) {
		this.quizAnswerB.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindQuizAnswerC(handler) {
		this.quizAnswerC.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindQuizAnswerD(handler) {
		this.quizAnswerD.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindQuizPrev(handler) {
		this.quizPrev.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindQuizNext(handler) {
		this.quizNext.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

}