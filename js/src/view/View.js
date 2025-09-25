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

		/*STUDY*/
		this.studySearch = document.querySelector('#study .search');

		this.studySubject = document.querySelector('#study .subject');
		this.studyContent = document.querySelector('#study .content');
		this.studySubcontent = document.querySelector('#study .subcontent');
		this.studyLevel = document.querySelector('#study .level');

		this.studyId = document.querySelector('#study .id');
		this.studyFraction = document.querySelector('#study .fraction');

		this.studyData = document.querySelectorAll('#study .data>*');
		this.studyTest = document.querySelector('#study .data');
		this.studyAnswerA = document.querySelector('#study .a_answer');
		this.studyAnswerB = document.querySelector('#study .b_answer');
		this.studyAnswerC = document.querySelector('#study .c_answer');
		this.studyAnswerD = document.querySelector('#study .d_answer');

		this.studyPrev = document.querySelector('#study .prev');
		this.studyNext = document.querySelector('#study .next');

		/* MULTIQUIZ */
		this.multiQuizSubject = document.querySelector('#multiQuiz .subject');
		this.multiQuizContent = document.querySelector('#multiQuiz .content');
		this.multiQuizSubcontent = document.querySelector('#multiQuiz .subcontent');
		this.multiQuizLevel = document.querySelector('#multiQuiz .level');

		this.multiQuizId = document.querySelector('#multiQuiz .id');
		this.multiQuizFraction = document.querySelector('#multiQuiz .fraction');

		this.multiQuizData = document.querySelectorAll('#multiQuiz .data>*');
		this.multiQuizAnswerA = document.querySelector('#multiQuiz .a_answer');
		this.multiQuizAnswerB = document.querySelector('#multiQuiz .b_answer');
		this.multiQuizAnswerC = document.querySelector('#multiQuiz .c_answer');
		this.multiQuizAnswerD = document.querySelector('#multiQuiz .d_answer');

		this.multiQuizPrev = document.querySelector('#multiQuiz .prev');
		this.multiQuizNext = document.querySelector('#multiQuiz .next');
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

	populateMultiSelect(select, options) {
		Array.from(select.getElementsByTagName("option")).forEach(o => o.remove());

		options.forEach(option => {
			let element = document.createElement("option");
			element.textContent = option;
			element.value = option;
			select.appendChild(element);
		});

		select.selectedIndex = -1;
	}

	populateDataMultiQuiz(data) {
		for (let i = 0; i < this.multiQuizData.length; i++) {
			this.multiQuizData[i].innerText = data[i] || '';
		}
	}

	setCounterMultiQuiz(id, fraction, currentId, selectedIndex, total) {
		id.innerText = currentId || 'none';
		fraction.innerText = (selectedIndex + 1) + '/' + total;
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

	bindStudySearch(handler) {
		this.studySearch.addEventListener('keypress', event => {
			handler(event);
		});
	}

	bindStudyTest(handler) {
		this.studyTest.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindStudyPrev(handler) {
		this.studyPrev.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindStudyNext(handler) {
		this.studyNext.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindMultiQuizAnswerA(handler) {
		this.multiQuizAnswerA.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindMultiQuizAnswerB(handler) {
		this.multiQuizAnswerB.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindMultiQuizAnswerC(handler) {
		this.multiQuizAnswerC.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindMultiQuizAnswerD(handler) {
		this.multiQuizAnswerD.addEventListener('click', event => {
			event.preventDefault();
			handler();
		});
	}

	bindMultiQuizPrev(handler) {
		this.multiQuizPrev.addEventListener('click', event => {
			event.preventDefault(); handler();
		});
	}

	bindMultiQuizNext(handler) {
		this.multiQuizNext.addEventListener('click', event => {
			event.preventDefault(); handler();
		});
	}
}