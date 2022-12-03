export class View {

	constructor() {
		this.quizSubject = document.querySelector('#quiz .subject');
		this.quizContent = document.querySelector('#quiz .content');
		this.quizSubcontent = document.querySelector('#quiz .subcontent');
		this.quizLevel = document.querySelector('#quiz .level');

		this.quizId = document.querySelector('#quiz .id');
		this.quizFraction = document.querySelector('#quiz .fraction');

		this.quizData = document.querySelectorAll('#quiz .data>*');
		this.quizAnswerA = document.querySelector('#quiz .a_answer');
		this.quizAnswerB = document.querySelector('#quiz .b_answer');
		this.quizAnswerC = document.querySelector('#quiz .c_answer');
		this.quizAnswerD = document.querySelector('#quiz .d_answer');

		this.quizPrev = document.querySelector('#quiz .prev');
		this.quizNext = document.querySelector('#quiz .next');
	}

	populateSelect(select, options) {
		let i = 0;
		Array.from(select.getElementsByTagName("option")).forEach(o => {
			if (i > 0) {
				o.remove();
			}
			i++;
		});

		options.forEach(option => {
			let element = document.createElement("option");
			element.textContent = option;
			element.value = option;
			select.appendChild(element);
		});
	}

	populateData(element, data) {
		for (let i = 0; i < element.length; i++) {
			element[i].innerText = data[i];
		}
	}

	setCounter(id, numerator, denominator) {
		this.quizId.innerText = id;
		this.quizFraction.innerText = (numerator + 1) + "/" + denominator;
	}

	bindQuizSubject(handler) {
		this.quizSubject.addEventListener('change', event => {
			event.preventDefault();
			handler();
		});
	}

	bindQuizContent(handler) {
		this.quizContent.addEventListener('change', event => {
			event.preventDefault();
			handler();
		});
	}

	bindQuizSubcontent(handler) {
		this.quizSubcontent.addEventListener('change', event => {
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