const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectanswer)
        answerButtonsElement.appendChild(button)
    })

}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectanswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [{
        question: 'What does FE means in Web Development?',
        answers: [
            { text: 'For Example', correct: false },
            { text: 'Function E', correct: false },
            { text: 'Front End', correct: true },
            { text: 'All Of The Above', correct: false }

        ]
    },

    {
        question: 'How many stages are there in Start.ng internship?',
        answers: [
            { text: '5', correct: false },
            { text: '10', correct: true },
            { text: '4', correct: false },
            { text: '1', correct: false }

        ]
    },

    {
        question: 'Start.ng internship is the same as HNG internship?',
        answers: [
            { text: 'False', correct: true },
            { text: 'True', correct: false },
            { text: 'Somehow', correct: false },
            { text: 'I do not know', correct: false }

        ]
    },

    {
        question: 'HP of HP laptop computers means what?',
        answers: [
            { text: 'Human Power', correct: false },
            { text: 'Hewlett Packard', correct: true },
            { text: 'Horse Power', correct: false },
            { text: 'Human Planning', correct: false }

        ]
    },

    {
        question: 'Which of these is not a code editor?',
        answers: [
            { text: 'Sublime Text', correct: false },
            { text: 'Atom', correct: false },
            { text: 'Virtual Studio Code', correct: false },
            { text: 'Console', correct: true }

        ]
    }
]