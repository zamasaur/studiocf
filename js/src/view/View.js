export class View {

	constructor() {
		this.spinner = document.querySelector('#spinner');
		this.carousel = document.querySelector('#carousel');

		/*QUIZ*/
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

		/*LESSON*/
		this.lessonSubject = document.querySelector('#lesson .subject');
		this.lessonContent = document.querySelector('#lesson .content');
		this.lessonSubcontent = document.querySelector('#lesson .subcontent');
		this.lessonLevel = document.querySelector('#lesson .level');

		this.lessonId = document.querySelector('#lesson .id');
		this.lessonFraction = document.querySelector('#lesson .fraction');

		this.lessonData = document.querySelectorAll('#lesson .data>*');
		this.lessonAnswerA = document.querySelector('#lesson .a_answer');
		this.lessonAnswerB = document.querySelector('#lesson .b_answer');
		this.lessonAnswerC = document.querySelector('#lesson .c_answer');
		this.lessonAnswerD = document.querySelector('#lesson .d_answer');

		this.lessonPlaypause = document.querySelector('#lesson .playpause');

	}

	setLoaded() {
		this.spinner.classList.add('d-none');
		this.carousel.classList.remove('d-none');
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

	setCounter(elementId, elementFraction, id, numerator, denominator) {
		elementId.innerText = id;
		elementFraction.innerText = (numerator + 1) + "/" + denominator;
	}

	setAnswer(quizAnswer, isSuccess) {
		quizAnswer.classList.add(isSuccess ? 'success' : 'failure');
	}

	bindSubject(selects, handler) {
		selects[0].addEventListener('change', event => {
			event.preventDefault();
			handler(selects);
		});
	}

	bindContent(selects, handler) {
		selects[1].addEventListener('change', event => {
			event.preventDefault();
			handler(selects);
		});
	}

	bindSubcontent(selects, handler) {
		selects[2].addEventListener('change', event => {
			event.preventDefault();
			handler(selects);
		});
	}

	bindLevel(selects, handler) {
		selects[3].addEventListener('change', event => {
			event.preventDefault();
			handler(selects);
		});
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

	bindLessonPlaypause(handler) {
		this.lessonPlaypause.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

}