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

		/*SEARCH*/
		this.searchSearch = document.querySelector('#search .search');

		this.searchId = document.querySelector('#search .id');
		this.searchFraction = document.querySelector('#search .fraction');

		this.searchData = document.querySelectorAll('#search .data>*');
		this.searchAnswer = document.querySelector('#search .a_answer');

		this.searchPrev = document.querySelector('#search .prev');
		this.searchNext = document.querySelector('#search .next');

		/*REVIEW*/
		this.reviewSearch = document.querySelector('#review .search');

		this.reviewSubject = document.querySelector('#review .subject');
		this.reviewContent = document.querySelector('#review .content');
		this.reviewSubcontent = document.querySelector('#review .subcontent');
		this.reviewLevel = document.querySelector('#review .level');

		this.reviewId = document.querySelector('#review .id');
		this.reviewFraction = document.querySelector('#review .fraction');

		this.reviewData = document.querySelectorAll('#review .data>*');
		this.reviewTest = document.querySelector('#review .data');
		this.reviewAnswerA = document.querySelector('#review .a_answer');
		this.reviewAnswerB = document.querySelector('#review .b_answer');
		this.reviewAnswerC = document.querySelector('#review .c_answer');
		this.reviewAnswerD = document.querySelector('#review .d_answer');

		this.reviewPrev = document.querySelector('#review .prev');
		this.reviewNext = document.querySelector('#review .next');

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

	bindSearchSearch(handler) {
		this.searchSearch.addEventListener('keypress', event => {
			handler(event);
		});
	}

	bindSearchPrev(handler) {
		this.searchPrev.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindSearchNext(handler) {
		this.searchNext.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindReviewSearch(handler) {
		this.reviewSearch.addEventListener('keypress', event => {
			handler(event);
		});
	}

	bindReviewTest(handler) {
		this.reviewTest.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindReviewPrev(handler) {
		this.reviewPrev.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindReviewNext(handler) {
		this.reviewNext.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}
}