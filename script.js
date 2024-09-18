const url = 'https://opentdb.com/api.php?amount=10&type=multiple'
var questionIndex = 0
var questions;
var totalScore = 0
var tries = 3
fetch(url)
    .then(object => {
        return object.json()
    })
    .then(edit)
    .then(showIt)

function edit(object) {
    questions = object.results
    for (let quest of questions) {
        replaceCharacters(quest)
    }
}

function showIt(object) {
    showQuestion(questions[questionIndex])
    checkAnswer(questions[questionIndex])

    console.log(questions[questionIndex]);
}

const replaceCharacters = (value) => {
    for (let key in value) {
        if (typeof value[key] === 'string') {
            value[key] = value[key]
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"')
        }
    }
}

function showQuestion(currentQuestion) {
    const questionTitle = document.querySelector('.questionTitle')
    questionTitle.textContent = currentQuestion.question
    optionsValues(currentQuestion)

}

function optionsValues(currentQuestion) {
    const optionsArr = []
    optionsArr.push(currentQuestion.correct_answer)
    currentQuestion.incorrect_answers.forEach(e => optionsArr.push(e));

    optionsArr.sort(() => Math.random() - 0.5);


    const labels = document.querySelectorAll('.option')
    // const inputs = document.querySelectorAll('input[type="radio"')
    labels.forEach((option, index) => {
        option.textContent = optionsArr[index]
    });

    /* inputs.forEach((option, index) => {
        option.value = options[index]
    }) */
}

/* const checkAnswer = (currentQuestion) => {
    const options = document.querySelectorAll('.option')
    let currentAnswer = currentQuestion.correct_answer;
    options.forEach(span => {
        span.onclick = function () {
            const selectedAnswer = this.textContent
            if (selectedAnswer === currentAnswer) {
                alert('TRUE')
                questionIndex++
                showIt(currentQuestion[questionIndex])
            } else {
                alert('FALSE')
                return
            }
        }
    })

}
 */

const checkAnswer = (currentQuestion) => {
    const options = document.querySelectorAll('.option')
    let currentAnswer = currentQuestion.correct_answer;
    options.forEach(span => {
        span.onclick = function () {
            const selectedAnswer = this.textContent
            if (selectedAnswer === currentAnswer) {
                questionIndex++
                totalScore += 10
                const score = document.querySelector('.score')
                score.textContent = totalScore
                showIt(questions[questionIndex])
                if (totalScore == 20) winner()
            } else {
                tries--
                const health = document.querySelector('.health')
                health.textContent = tries
                if (tries === 0) {
                    totalScore = 0
                    alert('You Lose')
                }
                return
            }
        }
    })

const winner = () => {
    alert('you win')
}
}
