export class Controller {

    constructor(model, view) {
        this.model = model;
        this.view = view;

        /*INIT QUIZ*/
        this.view.populateSelect(this.view.quizSubject, this.model.getSubjects());
        this.view.populateSelect(this.view.quizLevel, this.model.getLevels());
        this.view.populateContent(this.view.quizContent, this.model.getContent(0));

        this.view.bindQuizSubject(this.quizSubject.bind(this));
        this.view.bindQuizLevel(this.quizLevel.bind(this));

        this.view.bindQuizAnswerA(this.quizAnswerA.bind(this));
        this.view.bindQuizAnswerB(this.quizAnswerB.bind(this));
        this.view.bindQuizAnswerC(this.quizAnswerC.bind(this));
        this.view.bindQuizAnswerD(this.quizAnswerD.bind(this));

        this.view.bindQuizPrev(this.quizPrev.bind(this));
        this.view.bindQuizNext(this.quizNext.bind(this));

    }

    run() {
        console.log('run');
    }

    /* HANDLERS */
    quizSubject() {
        let subject = this.view.quizSubject.selectedOptions[0].value;
        let level = this.view.quizLevel.selectedOptions[0].value;

        this.model.setFilter(subject, level);
        this.view.populateContent(this.view.quizContent, this.model.getContent(0));
    }

    quizLevel() {
        let subject = this.view.quizSubject.selectedOptions[0].value;
        let level = this.view.quizLevel.selectedOptions[0].value;

        this.model.setFilter(subject, level);
        this.view.populateContent(this.view.quizContent, this.model.getContent(0));
    }

    quizAnswerA() {
        let state = this.model.state.get(0);
        if (this.view.quizAnswerA.innerText == state.items[state.selectedItem].a_answer) {
            this.view.quizAnswerA.classList.add('success');
            this.#onSuccess();
        } else {
            this.view.quizAnswerA.classList.add('failure');
            this.#onFailure();
        }
    }

    quizAnswerB() {
        let state = this.model.state.get(0);
        if (this.view.quizAnswerB.innerText == state.items[state.selectedItem].a_answer) {
            this.view.quizAnswerB.classList.add('success');
            this.#onSuccess();
        } else {
            this.view.quizAnswerB.classList.add('failure');
            this.#onFailure();
        }
    }

    quizAnswerC() {
        let state = this.model.state.get(0);
        if (this.view.quizAnswerC.innerText == state.items[state.selectedItem].a_answer) {
            this.view.quizAnswerC.classList.add('success');
            this.#onSuccess();
        } else {
            this.view.quizAnswerC.classList.add('failure');
            this.#onFailure();
        }
    }

    quizAnswerD() {
        let state = this.model.state.get(0);
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
        this.view.populateContent(this.view.quizContent, this.model.getContent(0));
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
        this.view.populateContent(this.view.quizContent, this.model.getContent(0));
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