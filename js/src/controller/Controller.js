export class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.worker = new Worker('./js/worker.js');

        this.worker.addEventListener('message', event => {
            let mode = 2;
            let jsondata = event.data.map((item) => { return item.item });

            if (jsondata.length > 0) {
                this.model.setState(jsondata, mode);
                let state = this.model.getState();
                this.view.setCounter(this.view.searchId, this.view.searchFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
                this.view.populateData(this.view.searchData, this.model.getData());
            } else {
                this.model.resetState(mode);
                let state = this.model.getState(mode);
                this.view.setCounter(this.view.searchId, this.view.searchFraction, 'none', state.selectedItem, state.items.length);
                this.view.populateData(this.view.searchData, ['', '']);
            }
        });

        this.view.carousel.addEventListener('slide.bs.carousel', (event) => {
            switch (event.relatedTarget.id) {
                case 'quiz':
                    this.model.setCurrentMode(0);
                    break;
                case 'lesson':
                    this.model.setCurrentMode(1);
                    break;
                case 'search':
                    this.model.setCurrentMode(2);
                    break;
                case 'review':
                    this.model.setCurrentMode(3);
                    break;
                default:
                    break;
            }
        });

        this.initQuiz();
        this.initLesson();
        this.initSearch();
        this.initReview();

    }

    initQuiz() {
        this.view.populateSelect(this.view.quizSubject, this.model.getSubjects());
        this.view.populateSelect(this.view.quizContent, this.model.getContents());
        this.view.populateSelect(this.view.quizSubcontent, this.model.getSubcontents());
        this.view.populateSelect(this.view.quizLevel, this.model.getLevels());

        let mode = 0;
        let state = this.model.getState(mode);
        this.view.setCounter(this.view.quizId, this.view.quizFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);

        this.view.populateData(this.view.quizData, this.model.getData(mode));

        const selects = [this.view.quizSubject, this.view.quizContent, this.view.quizSubcontent, this.view.quizLevel];
        this.view.bindSubject(selects, this.handleSubject.bind(this));
        this.view.bindContent(selects, this.handleContent.bind(this));
        this.view.bindSubcontent(selects, this.handleSubcontent.bind(this));
        this.view.bindLevel(selects, this.handleLevel.bind(this));

        this.view.bindQuizAnswerA(this.quizAnswerA.bind(this));
        this.view.bindQuizAnswerB(this.quizAnswerB.bind(this));
        this.view.bindQuizAnswerC(this.quizAnswerC.bind(this));
        this.view.bindQuizAnswerD(this.quizAnswerD.bind(this));

        this.view.bindQuizPrev(this.quizPrev.bind(this));
        this.view.bindQuizNext(this.quizNext.bind(this));
    }

    initLesson() {
        this.view.populateSelect(this.view.lessonSubject, this.model.getSubjects());
        this.view.populateSelect(this.view.lessonContent, this.model.getContents());
        this.view.populateSelect(this.view.lessonSubcontent, this.model.getSubcontents());
        this.view.populateSelect(this.view.lessonLevel, this.model.getLevels());

        let mode = 1;
        let state = this.model.getState(mode);
        this.view.setCounter(this.view.lessonId, this.view.lessonFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);

        this.view.populateData(this.view.lessonData, this.model.getData(mode));

        const selects = [this.view.lessonSubject, this.view.lessonContent, this.view.lessonSubcontent, this.view.lessonLevel];
        this.view.bindSubject(selects, this.handleSubject.bind(this));
        this.view.bindContent(selects, this.handleContent.bind(this));
        this.view.bindSubcontent(selects, this.handleSubcontent.bind(this));
        this.view.bindLevel(selects, this.handleLevel.bind(this));

        this.view.bindLessonPlaypause(this.lessonPlaypause.bind(this));

        this.view.setAnswer(this.view.lessonAnswerA, true);
        this.view.setAnswer(this.view.lessonAnswerB, false);
        this.view.setAnswer(this.view.lessonAnswerC, false);
        this.view.setAnswer(this.view.lessonAnswerD, false);
    }

    initSearch() {
        let mode = 2;
        let state = this.model.getState(mode);
        this.view.setCounter(this.view.searchId, this.view.searchFraction, 'none', state.selectedItem, state.items.length);

        this.view.bindSearchSearch(this.searchSearch.bind(this));
        this.view.bindSearchPrev(this.searchPrev.bind(this));
        this.view.bindSearchNext(this.searchNext.bind(this));
    }

    initReview() {
        this.view.populateSelect(this.view.reviewSubject, this.model.getSubjects());
        this.view.populateSelect(this.view.reviewContent, this.model.getContents());
        this.view.populateSelect(this.view.reviewSubcontent, this.model.getSubcontents());
        this.view.populateSelect(this.view.reviewLevel, this.model.getLevels());

        let mode = 3;
        let state = this.model.getState(mode);
        this.view.setCounter(this.view.reviewId, this.view.reviewFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);

        this.view.populateData(this.view.reviewData, this.model.getData(mode));

        const selects = [this.view.reviewSubject, this.view.reviewContent, this.view.reviewSubcontent, this.view.reviewLevel];
        this.view.bindSubject(selects, this.handleSubject.bind(this));
        this.view.bindContent(selects, this.handleContent.bind(this));
        this.view.bindSubcontent(selects, this.handleSubcontent.bind(this));
        this.view.bindLevel(selects, this.handleLevel.bind(this));

        this.view.bindReviewSearch(this.reviewSearch.bind(this));
        this.view.bindReviewTest(this.reviewTest.bind(this));
        this.view.bindReviewPrev(this.reviewPrev.bind(this));
        this.view.bindReviewNext(this.reviewNext.bind(this));
    }

    run() {
        this.view.setLoaded();
        console.log('ready');
    }

    /* FILTERS HANDLERS */
    handleSubject(selects) {
        let subject = selects[0].selectedOptions[0].value;
        let content = selects[1].getElementsByTagName('option')[0].value;
        let subcontent = selects[2].getElementsByTagName('option')[0].value;
        let level = selects[3].getElementsByTagName('option')[0].value;

        let mode = this.model.getCurrentMode();

        window.speechSynthesis.cancel(this.model.getUtterance(mode));
        this.model.setPlaying(false);
        this.view.lessonPlaypause.innerHTML = '<i class="fa-sharp fa-solid fa-play">';

        this.model.setFilter(subject, content, subcontent, level);
        let data;
        if (mode == 0) {
            data = this.view.quizData;
        } else if (mode == 1) {
            data = this.view.lessonData;
        } else {
            data = this.view.reviewData;
            this.view.reviewSearch.value = "";
        }
        this.view.populateData(data, this.model.getData(mode));

        this.view.populateSelect(selects[1], this.model.getContents(mode));
        this.view.populateSelect(selects[2], this.model.getSubcontents(mode));
        this.view.populateSelect(selects[3], this.model.getLevels(mode));

        let state = this.model.getState(mode);
        let elementId;
        let elementFraction;
        if (mode == 0) {
            elementId = this.view.quizId;
            elementFraction = this.view.quizFraction;
        } else if (mode == 1) {
            elementId = this.view.lessonId;
            elementFraction = this.view.lessonFraction;
        } else {
            elementId = this.view.reviewId;
            elementFraction = this.view.reviewFraction;
        }
        this.view.setCounter(elementId, elementFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);

        this.resetAnswerColor(mode);
    }

    handleContent(selects) {
        let subject = selects[0].selectedOptions[0].value;
        let content = selects[1].selectedOptions[0].value;
        let subcontent = selects[2].getElementsByTagName('option')[0].value;
        let level = selects[3].getElementsByTagName('option')[0].value;

        let mode = this.model.getCurrentMode();

        window.speechSynthesis.cancel(this.model.getUtterance(mode));
        this.model.setPlaying(false);
        this.view.lessonPlaypause.innerHTML = '<i class="fa-sharp fa-solid fa-play">';

        this.model.setFilter(subject, content, subcontent, level);
        let data;
        if (mode == 0) {
            data = this.view.quizData;
        } else if (mode == 1) {
            data = this.view.lessonData;
        } else {
            data = this.view.reviewData;
            this.view.reviewSearch.value = "";
        }
        this.view.populateData(data, this.model.getData(mode));

        this.view.populateSelect(selects[2], this.model.getSubcontents(mode));
        this.view.populateSelect(selects[3], this.model.getLevels(mode));

        let state = this.model.getState(mode);
        let elementId;
        let elementFraction;
        if (mode == 0) {
            elementId = this.view.quizId;
            elementFraction = this.view.quizFraction;
        } else if (mode == 1) {
            elementId = this.view.lessonId;
            elementFraction = this.view.lessonFraction;
        } else {
            elementId = this.view.reviewId;
            elementFraction = this.view.reviewFraction;
        }
        this.view.setCounter(elementId, elementFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);

        this.resetAnswerColor(mode);
    }

    handleSubcontent(selects) {
        let subject = selects[0].selectedOptions[0].value;
        let content = selects[1].selectedOptions[0].value;
        let subcontent = selects[2].selectedOptions[0].value;
        let level = selects[3].getElementsByTagName('option')[0].value;

        let mode = this.model.getCurrentMode();

        window.speechSynthesis.cancel(this.model.getUtterance(mode));
        this.model.setPlaying(false);
        this.view.lessonPlaypause.innerHTML = '<i class="fa-sharp fa-solid fa-play">';

        this.model.setFilter(subject, content, subcontent, level);
        let data;
        if (mode == 0) {
            data = this.view.quizData;
        } else if (mode == 1) {
            data = this.view.lessonData;
        } else {
            data = this.view.reviewData;
            this.view.reviewSearch.value = "";
        }
        this.view.populateData(data, this.model.getData(mode));

        this.view.populateSelect(selects[3], this.model.getLevels(mode));

        let state = this.model.getState(mode);
        let elementId;
        let elementFraction;
        if (mode == 0) {
            elementId = this.view.quizId;
            elementFraction = this.view.quizFraction;
        } else if (mode == 1) {
            elementId = this.view.lessonId;
            elementFraction = this.view.lessonFraction;
        } else {
            elementId = this.view.reviewId;
            elementFraction = this.view.reviewFraction;
        }
        this.view.setCounter(elementId, elementFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);

        this.resetAnswerColor(mode);
    }

    handleLevel(selects) {
        let subject = selects[0].selectedOptions[0].value;
        let content = selects[1].selectedOptions[0].value;
        let subcontent = selects[2].selectedOptions[0].value;
        let level = selects[3].selectedOptions[0].value;

        let mode = this.model.getCurrentMode();

        window.speechSynthesis.cancel(this.model.getUtterance(mode));
        this.model.setPlaying(false);
        this.view.lessonPlaypause.innerHTML = '<i class="fa-sharp fa-solid fa-play">';

        this.model.setFilter(subject, content, subcontent, level);
        let data;
        if (mode == 0) {
            data = this.view.quizData;
        } else if (mode == 1) {
            data = this.view.lessonData;
        } else {
            data = this.view.reviewData;
            this.view.reviewSearch.value = "";
        }
        this.view.populateData(data, this.model.getData(mode));

        let state = this.model.getState(mode);
        let elementId;
        let elementFraction;
        if (mode == 0) {
            elementId = this.view.quizId;
            elementFraction = this.view.quizFraction;
        } else if (mode == 1) {
            elementId = this.view.lessonId;
            elementFraction = this.view.lessonFraction;
        } else {
            elementId = this.view.reviewId;
            elementFraction = this.view.reviewFraction;
        }
        this.view.setCounter(elementId, elementFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);

        this.resetAnswerColor(mode);
    }

    resetAnswerColor(mode) {
        if (mode == 0) {
            this.view.quizAnswerA.classList.remove('success');
            this.view.quizAnswerB.classList.remove('success');
            this.view.quizAnswerC.classList.remove('success');
            this.view.quizAnswerD.classList.remove('success');
            this.view.quizAnswerA.classList.remove('failure');
            this.view.quizAnswerB.classList.remove('failure');
            this.view.quizAnswerC.classList.remove('failure');
            this.view.quizAnswerD.classList.remove('failure');
        } else if (mode == 1) {
            this.view.lessonAnswerA.classList.remove('success');
            this.view.lessonAnswerB.classList.remove('success');
            this.view.lessonAnswerC.classList.remove('success');
            this.view.lessonAnswerD.classList.remove('success');
            this.view.lessonAnswerA.classList.remove('failure');
            this.view.lessonAnswerB.classList.remove('failure');
            this.view.lessonAnswerC.classList.remove('failure');
            this.view.lessonAnswerD.classList.remove('failure');
        } else {
            this.view.reviewAnswerA.classList.remove('success');
            this.view.reviewAnswerB.classList.remove('success');
            this.view.reviewAnswerC.classList.remove('success');
            this.view.reviewAnswerD.classList.remove('success');
            this.view.reviewAnswerA.classList.remove('failure');
            this.view.reviewAnswerB.classList.remove('failure');
            this.view.reviewAnswerC.classList.remove('failure');
            this.view.reviewAnswerD.classList.remove('failure');
        }
    }

    /* QUIZ HANDLERS */
    quizAnswerA() {
        let state = this.model.getState();
        if (this.view.quizAnswerA.innerText == state.items[state.selectedItem].a_answer) {
            this.view.setAnswer(this.view.quizAnswerA, true);
        } else {
            this.view.setAnswer(this.view.quizAnswerA, false);
        }
    }

    quizAnswerB() {
        let state = this.model.getState();
        if (this.view.quizAnswerB.innerText == state.items[state.selectedItem].a_answer) {
            this.view.setAnswer(this.view.quizAnswerB, true);
        } else {
            this.view.setAnswer(this.view.quizAnswerB, false);
        }
    }

    quizAnswerC() {
        let state = this.model.getState();
        if (this.view.quizAnswerC.innerText == state.items[state.selectedItem].a_answer) {
            this.view.setAnswer(this.view.quizAnswerC, true);
        } else {
            this.view.setAnswer(this.view.quizAnswerC, false);
        }
    }

    quizAnswerD() {
        let state = this.model.getState();
        if (this.view.quizAnswerD.innerText == state.items[state.selectedItem].a_answer) {
            this.view.setAnswer(this.view.quizAnswerD, true);
        } else {
            this.view.setAnswer(this.view.quizAnswerD, false);
        }
    }

    quizPrev() {
        this.model.prev();
        let state = this.model.getState();
        this.view.setCounter(this.view.quizId, this.view.quizFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
        this.view.populateData(this.view.quizData, this.model.getData());
        this.resetAnswerColor(this.model.getCurrentMode());
    }

    quizNext() {
        this.model.next();
        let state = this.model.getState();
        this.view.setCounter(this.view.quizId, this.view.quizFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
        this.view.populateData(this.view.quizData, this.model.getData());
        this.resetAnswerColor(this.model.getCurrentMode());
    }

    /* LESSON HANDLERS */
    lessonPlaypause() {

        if (!this.model.isPlaying()) {
            this.model.setPlaying(true);
            this.view.lessonPlaypause.innerHTML = '<i class="fa-sharp fa-solid fa-stop"></i>';
        } else {
            this.model.setPlaying(false);
            this.view.lessonPlaypause.innerHTML = '<i class="fa-sharp fa-solid fa-play">';
        }

        this.#update();
    }

    async #speak(text) {
        var utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.lang = 'it-IT';
        utterance.rate = 0.75;

        this.model.addUtterance(utterance);

        window.speechSynthesis.speak(utterance);
    }

    #step() {
        let mode = 1;

        this.model.loop();
        let state = this.model.getState(mode);
        this.view.setCounter(this.view.lessonId, this.view.lessonFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
        this.view.populateData(this.view.lessonData, this.model.getData(mode));
    }

    #update() {
        let mode = 1;

        if (this.model.isPlaying()) {
            let state = this.model.getState(mode);
            let text = '';
            for (let i = 0; i < 3; i++) {
                text += '. Domanda: ' + state.items[state.selectedItem].question + '. Risposta: ' + state.items[state.selectedItem].a_answer;
            }
            text = text.substring(2);
            this.#speak(text);
            this.model.getUtterance(mode).addEventListener('end', (event) => {
                this.#step();
                event.target.removeEventListener('end', this.#step);
                this.#update();
            })
        } else {
            window.speechSynthesis.cancel(this.model.getUtterance(mode));
        }
    }

    /*SEARCH HANDLERS*/
    searchSearch(event) {
        var code = (event.keyCode ? event.keyCode : e.which);
        console.log(code);
        if (code == 13) {
            event.preventDefault();
            this.#doSearch();
        }
    }

    searchPrev() {
        this.model.prev();
        let state = this.model.getState();
        if (state.selectedItem >= 0) {
            this.view.setCounter(this.view.searchId, this.view.searchFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
            this.view.populateData(this.view.searchData, this.model.getData());
        }
    }

    searchNext() {
        this.model.next();
        let state = this.model.getState();
        this.view.setCounter(this.view.searchId, this.view.searchFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
        this.view.populateData(this.view.searchData, this.model.getData());
    }

    async #doSearch() {
        this.view.searchFraction.innerText = 'Loading...'

        let firstChar = Array.from(this.view.searchSearch.value)[0];
        let number = parseInt(this.view.searchSearch.value.slice(1));

        this.model.resetState();

        if (firstChar == '#' && !isNaN(number) && number >= 0 && number <= this.model.getState().items.length - 1) {
            this.model.setSelectedItem(number);
            let state = this.model.getState();
            this.view.setCounter(this.view.searchId, this.view.searchFraction, number, state.selectedItem, state.items.length);
            let data = this.model.getData();
            this.view.populateData(this.view.searchData, [data[0], data[1]]);
        } else {
            this.worker.postMessage(this.view.searchSearch.value);
        }
    }

    /*REVIEW HANDLERS*/
    reviewSearch(event) {
        var code = (event.keyCode ? event.keyCode : e.which);
        console.log(code);
        if (code == 13) {
            event.preventDefault();
            this.#doPeek();
        }
    }

    reviewTest() {
        let state = this.model.getState();
        this.view.reviewData.forEach(element => {
            if (element.innerText == state.items[state.selectedItem].a_answer) {
                this.view.setAnswer(element, true);
            }
        });
    }

    reviewPrev() {
        this.model.prev();
        let state = this.model.getState();
        if (state.selectedItem >= 0) {
            this.view.setCounter(this.view.reviewId, this.view.reviewFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
            this.view.populateData(this.view.reviewData, this.model.getData());
            this.resetAnswerColor(this.model.getCurrentMode());
        }
    }

    reviewNext() {
        this.model.next();
        let state = this.model.getState();
        this.view.setCounter(this.view.reviewId, this.view.reviewFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
        this.view.populateData(this.view.reviewData, this.model.getData());
        this.resetAnswerColor(this.model.getCurrentMode());
    }

    async #doPeek() {
        let firstChar = Array.from(this.view.reviewSearch.value)[0];
        let number = parseInt(this.view.reviewSearch.value.slice(1));

        this.model.resetState();

        if (firstChar == '#' && !isNaN(number) && number >= 0 && number <= this.model.getState().items.length - 1) {
            const selects = [this.view.reviewSubject, this.view.reviewContent, this.view.reviewSubcontent, this.view.reviewLevel];
            this.view.populateSelect(selects[0], this.model.getSubjects());
            this.view.populateSelect(selects[1], this.model.getContents());
            this.view.populateSelect(selects[2], this.model.getSubcontents());
            this.view.populateSelect(selects[3], this.model.getLevels());

            this.resetAnswerColor(this.model.getCurrentMode());

            this.model.setSelectedItem(number);
            let state = this.model.getState();
            this.view.setCounter(this.view.reviewId, this.view.reviewFraction, number, state.selectedItem, state.items.length);
            let data = this.model.getData();
            this.view.populateData(this.view.reviewData, [data[0], data[1], data[2], data[3], data[4]]);
        }
    }
}