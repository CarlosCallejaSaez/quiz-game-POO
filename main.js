class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.correctCount = 0;
        this.incorrectCount = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    selectAnswer(answer) {
        const currentQuestion = this.getCurrentQuestion();
        const isCorrect = answer === currentQuestion.correctAnswer;

        if (isCorrect) {
            this.correctCount++;
        } else {
            this.incorrectCount++;
            const correctButton = Array.from(answerButtonsElement.children).find(button => button.innerText === currentQuestion.correctAnswer);
            if (correctButton) {
                correctButton.classList.add('correct');
            }
        }

        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.innerText === answer) {
                button.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
            button.disabled = true;
        });

        correctCountElement.innerText = this.correctCount;
        incorrectCountElement.innerText = this.incorrectCount;

       
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}


const questions = [
    {
        question: "¿Cuál es la capital de Francia?",
        answers: ["París", "Madrid", "Roma", "Berlín"],
        correctAnswer: "París"
    },
    {
        question: "¿Qué planeta es conocido como el Planeta Rojo?",
        answers: ["Marte", "Júpiter", "Venus", "Saturno"],
        correctAnswer: "Marte"
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Miguel Ángel"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "¿Cuál es el mamífero más grande?",
        answers: ["Ballena Azul", "Elefante", "Jirafa", "León"],
        correctAnswer: "Ballena Azul"
    },
    {
        question: "¿Cuál es el número primo más pequeño?",
        answers: ["1", "2", "3", "5"],
        correctAnswer: "2"
    },
    {
        question: "¿Qué gas utilizan las plantas para la fotosíntesis?",
        answers: ["Monóxido de Carbono", "Oxígeno", "Nitrógeno", "Dióxido de Carbono"],
        correctAnswer: "Dióxido de Carbono"
    },
    
];


const quiz = new Quiz(questions);

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const correctCountElement = document.getElementById('correct-count');
const incorrectCountElement = document.getElementById('incorrect-count');

const displayQuestion = question => {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
};

const selectAnswer = answer => {
    quiz.selectAnswer(answer);

    Array.from(answerButtonsElement.children).forEach(button => {
        const currentQuestion = quiz.getCurrentQuestion();
        if (button.innerText === currentQuestion.correctAnswer) {
            button.classList.add('correct');
        } else if (button.innerText === answer) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });

    correctCountElement.innerText = quiz.correctCount;
    incorrectCountElement.innerText = quiz.incorrectCount;

    if (quiz.hasEnded()) {
        alert(`Quiz completado. Aciertos: ${quiz.correctCount}`);
    }
};

nextButton.innerText = 'Start';
nextButton.addEventListener('click', () => {
    if (!quiz.hasEnded()) {
        quiz.currentQuestionIndex++;
        displayQuestion(quiz.getCurrentQuestion());
        nextButton.innerText = 'Next';
    } else {
        alert(`Quiz completado. Aciertos: ${quiz.correctCount}`);
    }
});