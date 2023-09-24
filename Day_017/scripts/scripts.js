    //************
    // Constants *
    //************
    const urls = {
        token: "https://opentdb.com/api_token.php",
        quiz: "https://opentdb.com/api.php"
    }

    const tokenParms = {
    command: "request",
    };

    const quizParms = {
    token: "",
    amount: 10,
    type: "multiple",
    };

    const quizSelectionElements = {
        amount: document.querySelector("#trivia_amount"),
        category: document.querySelector("#trivia_category"),
        difficulty: document.querySelector("#trivia_difficulty"),
        start: document.querySelector("#start")
    }

    const quizQuestionElements = {
        score: document.querySelector("#score span"),
        category: document.querySelector("#question-category"),
        question: document.querySelector("#question-text"),
        answers: document.querySelectorAll("#answers div a"),
        nextQuestion: document.querySelector("#next-question"),
        restartQuiz: document.querySelector("#restart-quiz"),
    };

    const quizStatus = {
        questionNumber: 0,
        score: 0,
        answers: [],
        correctAnswerIndex: 0,
        eventListenersActive: true
    }

    const containerElements = {
        inner: document.querySelector(".inner-container"),
        setup: document.querySelector("#setup-container"),
        question: document.querySelector("#question-container"),
    };

    const quiz = {
        questions: null
    }

    //******************
    // helper unctions *
    //******************

    async function getToken() {
        // get token from api so that it can subsequently be used in data fetches
        const token = await fetchFromApi(urls.token, tokenParms);

        // save token to quizParms object for later use
        quizParms.token = token.token;

        // enable the start button - the start button was disabled to prevent it being clicked until the token is received
        quizSelectionElements.start.disabled = false;
    }

    function setEventListeners() {
        quizSelectionElements.amount.addEventListener("input", (event) => {
            // set the quizParms amount value to the entered amount
            quizParms.amount = event.target.value;
        })

        quizSelectionElements.category.addEventListener("change", (event) => {
          // set the quizParms category parameter to the selected value, unless it is the 'any' option,
          // in which case remove the category parameter as no parameter is to be sent if the selection is 'any'
          event.target.value === "Any"
            ? delete quizParms.category
            : (quizParms.category = event.target.value);
        });

        quizSelectionElements.difficulty.addEventListener("change", (event) => {
            // set the quizParms difficulty parameter to the selected value, unless it is the 'any' option, 
            // in which case remove the difficulty parameter as no parameter is to be sent if the selection is 'any'
            event.target.value === "Any" ? delete quizParms.difficulty : (quizParms.difficulty = event.target.value);
        });

        quizSelectionElements.start.addEventListener("click", start);

        quizQuestionElements.answers.forEach((answer) => {
            answer.addEventListener("click", checkAnswer);
        })

        quizQuestionElements.nextQuestion.addEventListener("click", showNextQuestion);
        quizQuestionElements.restartQuiz.addEventListener("click", restartQuiz);
    }

    function uiToQuestions() {
        // switch the ui to hide the question selection criteria and show a queestion
        containerElements.setup.classList.add("hide");
        containerElements.question.classList.remove("hide");
        containerElements.inner.classList.remove("flex-row");
        containerElements.inner.classList.add("flex-col");

        // hide the restart quiz button
        quizQuestionElements.restartQuiz.classList.add( "hide" );

        // show the next question button
        quizQuestionElements.nextQuestion.classList.remove("hide");
    }

    function populateQuestion() {
        // get the current question
        question = quiz.questions[quizStatus.questionNumber];

        // populate the category and question text
        quizQuestionElements.category.innerHTML = `Category: ${question.category}`;
        quizQuestionElements.question.innerHTML = `Q${quizStatus.questionNumber + 1}: ${question.question}`;

        // populate the answer buttons
        populateAnswersArray(question);
        for (answer of quizQuestionElements.answers) {
            answer.innerHTML = quizStatus.answers[parseInt(answer.dataset.index)];
        }  
    }

    function resetAnswersStatus() {
        // reset the answer button status
        quizQuestionElements.answers.forEach((answer) => {
            answer.classList.add("active");
            answer.classList.remove("correct", "incorrect");
        });
    }

    // populate answers randomly into the answers array
    function populateAnswersArray(question) {
        quizStatus.answers = [];

        // put the correct annswer in a random position in the array
        quizStatus.correctAnswerIndex = Math.floor(Math.random() * 4);
        quizStatus.answers[quizStatus.correctAnswerIndex] = question.correct_answer;

        // put the incorrect answers in the unoccupied positions of the array
        let answerIndex = 0;
        for (let answer of question.incorrect_answers) {
            if (quizStatus.answers[answerIndex]) {
                answerIndex++;
            }
            quizStatus.answers[answerIndex] = answer;
            answerIndex++;
        }
    }

    //**************************************
    // Functions called by event listeners *
    //**************************************

    async function start() {
        // hide the next question button but keep in the flow
        quizQuestionElements.nextQuestion.style.visibility = "hidden";

        // hide the restartQuiz button and remove from the flow to that it is not taking up space
        quizQuestionElements.restartQuiz.classList.add('hide');

        // get questions from the api
        const data = await fetchFromApi(urls.quiz, quizParms);
        quiz.questions = data.results;

        // switch the ui to show the questions rather than the question selection criteria
        uiToQuestions();

        // fill in the questions
        populateQuestion();
     }

    function checkAnswer(event) {
        // disable further clicks on the answer buttons once an answer has been given
        if (!quizStatus.eventListenersActive) {
            return;
        }
        quizStatus.eventListenersActive = false;

        // get the index for the button that was clicked
        const clickedIndex = event.target.dataset.index;

        // get the index for the correct answer
        const correctAnswerIndex = quizStatus.correctAnswerIndex.toString();

        quizQuestionElements.answers.forEach((answer) => {
            // turn the correct answer green
            if (answer.dataset.index === correctAnswerIndex) {
                answer.classList.add("correct");
            }

            // marked the clicked answer as right or wrong
            if (answer.dataset.index === clickedIndex) {
                if (clickedIndex === correctAnswerIndex) {
                    quizStatus.score++;
                } else {
                    answer.classList.add("incorrect");
                }
            }

            // update the score on the screen
            quizQuestionElements.score.textContent = `${quizStatus.score}/${ quizStatus.questionNumber + 1}`;

            // make all the buttons inactive so that they no longer respond to hover, click etc.
            answer.classList.remove("active");

            if (quizStatus.questionNumber < quiz.questions.length - 1) {
                // enable the next question button
                quizQuestionElements.nextQuestion.style.visibility = "visible";
            } else {
                // show the quiz again question button and hide the next question button
                quizQuestionElements.restartQuiz.classList.remove("hide");
                quizQuestionElements.nextQuestion.classList.add("hide");
            }
        });
    }

    function showNextQuestion() {
        // enable event listeners on answer buttons
        quizStatus.eventListenersActive = true;

        // hide the next question button but keep it in the flow
        quizQuestionElements.nextQuestion.style.visibility = "hidden";

        // reset the answer button status
        resetAnswersStatus();

        quizStatus.questionNumber++;

        // poulate the next question
        populateQuestion();
    }

    function restartQuiz() {
        // enable event listeners on answer buttons
        quizStatus.eventListenersActive = true;

        // reset the answer button status
        resetAnswersStatus();

        containerElements.question.classList.add("hide");
        containerElements.setup.classList.remove("hide");

        // reset quiz status
        quizStatus.questionNumber = 0;
        quizStatus.score = 0;

        // reset score on screen
        // update the score on the screen
        quizQuestionElements.score.textContent = "0";
    }

    //**************************
    // executed on script load *
    //**************************

    getToken();
    setEventListeners();

