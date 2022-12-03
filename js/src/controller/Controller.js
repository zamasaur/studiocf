export class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

        /*INIT QUIZ*/
        this.view.populateSelect(this.view.quizSubject, this.model.getSubjects());
        this.view.populateSelect(this.view.quizContent, this.model.getContents());
        this.view.populateSelect(this.view.quizSubcontent, this.model.getSubcontents());
        this.view.populateSelect(this.view.quizLevel, this.model.getLevels());

        let state = this.model.getState(0);
        this.view.setCounter(state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);

        this.view.populateData(this.view.quizData, this.model.getData(0));

        this.view.bindQuizSubject(this.quizSubject.bind(this));
        this.view.bindQuizContent(this.quizContent.bind(this));
        this.view.bindQuizSubcontent(this.quizSubcontent.bind(this));
        this.view.bindQuizLevel(this.quizLevel.bind(this));

        this.view.bindQuizAnswerA(this.quizAnswerA.bind(this));
        this.view.bindQuizAnswerB(this.quizAnswerB.bind(this));
        this.view.bindQuizAnswerC(this.quizAnswerC.bind(this));
        this.view.bindQuizAnswerD(this.quizAnswerD.bind(this));

        this.view.bindQuizPrev(this.quizPrev.bind(this));
        this.view.bindQuizNext(this.quizNext.bind(this));

    }

    run() {
        console.log('ready');
    }

    /* HANDLERS */
    quizSubject() {
        let subject = this.view.quizSubject.selectedOptions[0].value;
        let content = this.view.quizContent.getElementsByTagName('option')[0].value;
        let subcontent = this.view.quizSubcontent.getElementsByTagName('option')[0].value;
        let level = this.view.quizLevel.getElementsByTagName('option')[0].value;

        this.model.setFilter(subject, content, subcontent, level);
        this.view.populateData(this.view.quizData, this.model.getData(0));

        this.view.populateSelect(this.view.quizContent, this.model.getContents());
        this.view.populateSelect(this.view.quizSubcontent, this.model.getSubcontents());
        this.view.populateSelect(this.view.quizLevel, this.model.getLevels());

        let state = this.model.getState(0);
        this.view.setCounter(state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
    }

    quizContent() {
        let subject = this.view.quizSubject.selectedOptions[0].value;
        let content = this.view.quizContent.selectedOptions[0].value;
        let subcontent = this.view.quizSubcontent.getElementsByTagName('option')[0].value;
        let level = this.view.quizLevel.getElementsByTagName('option')[0].value;

        this.model.setFilter(subject, content, subcontent, level);
        this.view.populateData(this.view.quizData, this.model.getData(0));

        this.view.populateSelect(this.view.quizSubcontent, this.model.getSubcontents());
        this.view.populateSelect(this.view.quizLevel, this.model.getLevels());

        let state = this.model.getState(0);
        this.view.setCounter(state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
    }

    quizSubcontent() {
        let subject = this.view.quizSubject.selectedOptions[0].value;
        let content = this.view.quizContent.selectedOptions[0].value;
        let subcontent = this.view.quizSubcontent.selectedOptions[0].value;
        let level = this.view.quizLevel.getElementsByTagName('option')[0].value;

        this.model.setFilter(subject, content, subcontent, level);
        this.view.populateData(this.view.quizData, this.model.getData(0));

        this.view.populateSelect(this.view.quizLevel, this.model.getLevels());

        let state = this.model.getState(0);
        this.view.setCounter(state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
    }

    quizLevel() {
        let subject = this.view.quizSubject.selectedOptions[0].value;
        let content = this.view.quizContent.selectedOptions[0].value;
        let subcontent = this.view.quizSubcontent.selectedOptions[0].value;
        let level = this.view.quizLevel.selectedOptions[0].value;

        this.model.setFilter(subject, content, subcontent, level);
        this.view.populateData(this.view.quizData, this.model.getData(0));

        let state = this.model.getState(0);
        this.view.setCounter(state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
    }

    quizAnswerA() {
        let state = this.model.getState(0);
        if (this.view.quizAnswerA.innerText == state.items[state.selectedItem].a_answer) {
            this.view.quizAnswerA.classList.add('success');
            this.#onSuccess();
        } else {
            this.view.quizAnswerA.classList.add('failure');
            this.#onFailure();
        }
    }

    quizAnswerB() {
        let state = this.model.getState(0);
        if (this.view.quizAnswerB.innerText == state.items[state.selectedItem].a_answer) {
            this.view.quizAnswerB.classList.add('success');
            this.#onSuccess();
        } else {
            this.view.quizAnswerB.classList.add('failure');
            this.#onFailure();
        }
    }

    quizAnswerC() {
        let state = this.model.getState(0);
        if (this.view.quizAnswerC.innerText == state.items[state.selectedItem].a_answer) {
            this.view.quizAnswerC.classList.add('success');
            this.#onSuccess();
        } else {
            this.view.quizAnswerC.classList.add('failure');
            this.#onFailure();
        }
    }

    quizAnswerD() {
        let state = this.model.getState(0);
        if (this.view.quizAnswerD.innerText == state.items[state.selectedItem].a_answer) {
            this.view.quizAnswerD.classList.add('success');
            this.#onSuccess();
        } else {
            this.view.quizAnswerD.classList.add('failure');
            this.#onFailure();
        }
    }

    #onSuccess() {
        this.#speak('Esatto!');
    }

    #onFailure() {
        this.#speak('Prova ancora!');
    }

    #speak(text) {
        var utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.lang = 'it-IT';
        utterance.rate = 0.75;
        window.speechSynthesis.speak(utterance);
    }

    quizPrev() {
        this.model.prev();
        let state = this.model.getState(0);
        this.view.setCounter(state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
        this.view.populateData(this.view.quizData, this.model.getData(0));
        this.view.quizAnswerA.classList.remove('success');
        this.view.quizAnswerB.classList.remove('success');
        this.view.quizAnswerC.classList.remove('success');
        this.view.quizAnswerD.classList.remove('success');
        this.view.quizAnswerA.classList.remove('failure');
        this.view.quizAnswerB.classList.remove('failure');
        this.view.quizAnswerC.classList.remove('failure');
        this.view.quizAnswerD.classList.remove('failure');
    }

    quizNext() {
        this.model.next();
        let state = this.model.getState(0);
        this.view.setCounter(state.items[state.selectedItem].metadata.id, state.selectedItem, state.items.length);
        this.view.populateData(this.view.quizData, this.model.getData(0));
        this.view.quizAnswerA.classList.remove('success');
        this.view.quizAnswerB.classList.remove('success');
        this.view.quizAnswerC.classList.remove('success');
        this.view.quizAnswerD.classList.remove('success');
        this.view.quizAnswerA.classList.remove('failure');
        this.view.quizAnswerB.classList.remove('failure');
        this.view.quizAnswerC.classList.remove('failure');
        this.view.quizAnswerD.classList.remove('failure');
    }

}