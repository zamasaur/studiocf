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
                case 'study':
                    this.model.setCurrentMode(3);
                    break;
                case 'multiQuiz':
                    this.model.setCurrentMode(4);
                    break;
                default:
                    break;
            }
        });

        this.initQuiz();
        this.initLesson();
        this.initSearch();
        this.initStudy();
        this.initMultiQuiz();

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

    initStudy() {
        this.view.populateSelect(this.view.studySubject, this.model.getSubjects());
        this.view.populateSelect(this.view.studyContent, this.model.getContents());
        this.view.populateSelect(this.view.studySubcontent, this.model.getSubcontents());
        this.view.populateSelect(this.view.studyLevel, this.model.getLevels());

        let mode = 3;
        let state = this.model.getState(mode);
        this.view.setCounter(this.view.studyId, this.view.studyFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);

        this.view.populateData(this.view.studyData, this.model.getData(mode));

        const selects = [this.view.studySubject, this.view.studyContent, this.view.studySubcontent, this.view.studyLevel];
        this.view.bindSubject(selects, this.handleSubject.bind(this));
        this.view.bindContent(selects, this.handleContent.bind(this));
        this.view.bindSubcontent(selects, this.handleSubcontent.bind(this));
        this.view.bindLevel(selects, this.handleLevel.bind(this));

        this.view.bindStudySearch(this.studySearch.bind(this));
        this.view.bindStudyTest(this.studyTest.bind(this));
        this.view.bindStudyPrev(this.studyPrev.bind(this));
        this.view.bindStudyNext(this.studyNext.bind(this));
    }

    initMultiQuiz() {
        this.view.populateMultiSelect(this.view.multiQuizSubject, this.model.getSubjects());
        this.view.populateMultiSelect(this.view.multiQuizContent, []);
        this.view.populateMultiSelect(this.view.multiQuizSubcontent, []);
        this.view.populateMultiSelect(this.view.multiQuizLevel, this.model.getLevels());

        let mode = 4;
        let state = this.model.getState(mode);
        this.view.setCounter(this.view.multiQuizId, this.view.multiQuizFraction, 'none', -1, 0);

        this.view.populateData(this.view.multiQuizData, ['', '', '', '', '']);

        const selects = [this.view.multiQuizSubject, this.view.multiQuizContent, this.view.multiQuizSubcontent, this.view.multiQuizLevel];
        this.view.bindSubject(selects, this.handleMultiQuizSubject.bind(this));
        this.view.bindContent(selects, this.handleMultiQuizContent.bind(this));
        this.view.bindSubcontent(selects, this.handleMultiQuizSubcontent.bind(this));
        this.view.bindLevel(selects, this.handleMultiQuizLevel.bind(this));

        this.view.bindMultiQuizAnswerA(this.multiQuizAnswerA.bind(this));
        this.view.bindMultiQuizAnswerB(this.multiQuizAnswerB.bind(this));
        this.view.bindMultiQuizAnswerC(this.multiQuizAnswerC.bind(this));
        this.view.bindMultiQuizAnswerD(this.multiQuizAnswerD.bind(this));

        this.view.bindMultiQuizPrev(this.multiQuizPrev.bind(this));
        this.view.bindMultiQuizNext(this.multiQuizNext.bind(this));
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
            data = this.view.studyData;
            this.view.studySearch.value = "";
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
            elementId = this.view.studyId;
            elementFraction = this.view.studyFraction;
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
            data = this.view.studyData;
            this.view.studySearch.value = "";
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
            elementId = this.view.studyId;
            elementFraction = this.view.studyFraction;
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
            data = this.view.studyData;
            this.view.studySearch.value = "";
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
            elementId = this.view.studyId;
            elementFraction = this.view.studyFraction;
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
            data = this.view.studyData;
            this.view.studySearch.value = "";
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
            elementId = this.view.studyId;
            elementFraction = this.view.studyFraction;
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
        } else if (mode == 3) {
            this.view.studyAnswerA.classList.remove('success');
            this.view.studyAnswerB.classList.remove('success');
            this.view.studyAnswerC.classList.remove('success');
            this.view.studyAnswerD.classList.remove('success');
            this.view.studyAnswerA.classList.remove('failure');
            this.view.studyAnswerB.classList.remove('failure');
            this.view.studyAnswerC.classList.remove('failure');
            this.view.studyAnswerD.classList.remove('failure');
        } else if (mode == 4) {
            this.view.multiQuizAnswerA.classList.remove('success');
            this.view.multiQuizAnswerB.classList.remove('success');
            this.view.multiQuizAnswerC.classList.remove('success');
            this.view.multiQuizAnswerD.classList.remove('success');
            this.view.multiQuizAnswerA.classList.remove('failure');
            this.view.multiQuizAnswerB.classList.remove('failure');
            this.view.multiQuizAnswerC.classList.remove('failure');
            this.view.multiQuizAnswerD.classList.remove('failure');
        }
    }

    handleMultiQuizSubject(selects) {
        const subjects = Array.from(selects[0].selectedOptions).map(o => o.value);
        const contents = this.model.getContentsForSubjects(subjects);
        this.view.populateMultiSelect(selects[1], contents);
        this.view.populateMultiSelect(selects[2], []);

        const levels = Array.from(selects[3].selectedOptions).map(o => o.value);
        this.model.setFilterMultiQuiz(subjects, [], [], levels);

        this.updateMultiQuizData();
    }

    handleMultiQuizContent(selects) {
        const subjects = Array.from(selects[0].selectedOptions).map(o => o.value);
        const contents = Array.from(selects[1].selectedOptions).map(o => o.value);
        const subcontents = this.model.getSubcontentsForSubjectsAndContents(subjects, contents);
        this.view.populateMultiSelect(selects[2], subcontents);

        const levels = Array.from(selects[3].selectedOptions).map(o => o.value);
        this.model.setFilterMultiQuiz(subjects, contents, [], levels);

        this.updateMultiQuizData();
    }

    handleMultiQuizSubcontent(selects) {
        const subjects = Array.from(selects[0].selectedOptions).map(o => o.value);
        const contents = Array.from(selects[1].selectedOptions).map(o => o.value);
        const subcontents = Array.from(selects[2].selectedOptions).map(o => o.value);
        const levels = Array.from(selects[3].selectedOptions).map(o => o.value);

        this.model.setFilterMultiQuiz(subjects, contents, subcontents, levels);

        this.updateMultiQuizData();
    }

    handleMultiQuizLevel(selects) {
        const subjects = Array.from(selects[0].selectedOptions).map(o => o.value);
        const contents = Array.from(selects[1].selectedOptions).map(o => o.value);
        const subcontents = Array.from(selects[2].selectedOptions).map(o => o.value);
        const levels = Array.from(selects[3].selectedOptions).map(o => o.value);

        this.model.setFilterMultiQuiz(subjects, contents, subcontents, levels);

        this.updateMultiQuizData();
    }

    /* ===== HELPERS ===== */
    updateMultiQuizData() {
        const mode = 4;
        const state = this.model.getState(mode);

        // Se ci sono domande filtrate, seleziona la prima
        const selectedItem = state.items.length > 0 ? 0 : -1;
        state.selectedItem = selectedItem;

        const counterId = selectedItem >= 0 ? state.items[selectedItem].metadata.id : 'none';
        this.view.setCounter(
            this.view.multiQuizId,
            this.view.multiQuizFraction,
            counterId,
            selectedItem,
            state.items.length
        );

        // Popola dati domanda
        const data = selectedItem >= 0 ? this.model.getData(mode) : ['', '', '', '', ''];
        this.view.populateData(this.view.multiQuizData, data);

        // Reset colori risposte
        this.resetAnswerColor(mode);
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

    /*STUDY HANDLERS*/
    studySearch(event) {
        var code = (event.keyCode ? event.keyCode : e.which);
        console.log(code);
        if (code == 13) {
            event.preventDefault();
            this.#doPeek();
        }
    }

    studyTest() {
        let state = this.model.getState();
        this.view.studyData.forEach(element => {
            if (element.innerText == state.items[state.selectedItem].a_answer) {
                this.view.setAnswer(element, true);
            }
        });
    }

    studyPrev() {
        this.model.prev();
        let state = this.model.getState();
        if (state.selectedItem >= 0) {
            this.view.setCounter(this.view.studyId, this.view.studyFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
            this.view.populateData(this.view.studyData, this.model.getData());
            this.resetAnswerColor(this.model.getCurrentMode());
        }
    }

    studyNext() {
        this.model.next();
        let state = this.model.getState();
        this.view.setCounter(this.view.studyId, this.view.studyFraction, state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
        this.view.populateData(this.view.studyData, this.model.getData());
        this.resetAnswerColor(this.model.getCurrentMode());
    }

    async #doPeek() {
        let firstChar = Array.from(this.view.studySearch.value)[0];
        let number = parseInt(this.view.studySearch.value.slice(1));

        this.model.resetState();

        if (firstChar == '#' && !isNaN(number) && number >= 0 && number <= this.model.getState().items.length - 1) {
            const selects = [this.view.studySubject, this.view.studyContent, this.view.studySubcontent, this.view.studyLevel];
            this.view.populateSelect(selects[0], this.model.getSubjects());
            this.view.populateSelect(selects[1], this.model.getContents());
            this.view.populateSelect(selects[2], this.model.getSubcontents());
            this.view.populateSelect(selects[3], this.model.getLevels());

            this.resetAnswerColor(this.model.getCurrentMode());

            this.model.setSelectedItem(number);
            let state = this.model.getState();
            this.view.setCounter(this.view.studyId, this.view.studyFraction, number, state.selectedItem, state.items.length);
            let data = this.model.getData();
            this.view.populateData(this.view.studyData, [data[0], data[1], data[2], data[3], data[4]]);
        }
    }

    /*MULTIQUIZ*/
    multiQuizAnswerA() {
        let state = this.model.getState();
        if (this.view.multiQuizAnswerA.innerText == state.items[state.selectedItem].a_answer) {
            this.view.setAnswer(this.view.multiQuizAnswerA, true);
        } else {
            this.view.setAnswer(this.view.multiQuizAnswerA, false);
        }
    }

    multiQuizAnswerB() {
        let state = this.model.getState();
        if (this.view.multiQuizAnswerB.innerText == state.items[state.selectedItem].a_answer) {
            this.view.setAnswer(this.view.multiQuizAnswerB, true);
        } else {
            this.view.setAnswer(this.view.multiQuizAnswerB, false);
        }
    }

    multiQuizAnswerC() {
        let state = this.model.getState();
        if (this.view.multiQuizAnswerC.innerText == state.items[state.selectedItem].a_answer) {
            this.view.setAnswer(this.view.multiQuizAnswerC, true);
        } else {
            this.view.setAnswer(this.view.multiQuizAnswerC, false);
        }
    }

    multiQuizAnswerD() {
        let state = this.model.getState();
        if (this.view.multiQuizAnswerD.innerText == state.items[state.selectedItem].a_answer) {
            this.view.setAnswer(this.view.multiQuizAnswerD, true);
        } else {
            this.view.setAnswer(this.view.multiQuizAnswerD, false);
        }
    }

    multiQuizPrev() {
        const mode = 4;
        this.model.prev();
        const state = this.model.getState(mode);

        const counterId = state.selectedItem >= 0 ? state.items[state.selectedItem].metadata.id : 'none';
        const data = state.selectedItem >= 0 ? this.model.getData(mode) : ['', '', '', '', ''];

        this.view.setCounter(this.view.multiQuizId, this.view.multiQuizFraction, counterId, state.selectedItem, state.items.length);
        this.view.populateData(this.view.multiQuizData, data);
        this.resetAnswerColor(mode);
    }

    multiQuizNext() {
        const mode = 4;
        this.model.next();
        const state = this.model.getState(mode);

        const counterId = state.selectedItem >= 0 ? state.items[state.selectedItem].metadata.id : 'none';
        const data = state.selectedItem >= 0 ? this.model.getData(mode) : ['', '', '', '', ''];

        this.view.setCounter(this.view.multiQuizId, this.view.multiQuizFraction, counterId, state.selectedItem, state.items.length);
        this.view.populateData(this.view.multiQuizData, data);
        this.resetAnswerColor(mode);
    }
}