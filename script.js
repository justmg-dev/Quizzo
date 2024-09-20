const url = 'https://opentdb.com/api.php?amount=10&type=multiple'
var questionIndex = 0
let questions;
var totalScore = 0
var tries = 3
const score = document.querySelector('.score')
const health = document.querySelector('.health')
const header = document.querySelector('.header')
const correctEffect = new Audio('Quizzo/sounds/correct.mp3')
const wrongEffect = new Audio ('Quizzo/sounds/wrong.mp3')
const music = new Audio('Quizzo/sounds/loop.mp3')


const fetcho = (url) => {
    fetch(url)
        .then(object => {
            return object.json()
        })
        .then(edit)
        .then(showIt)
        .then(gameMusic)
}

const edit = (object) => {
    questions = object.results
    questions = questions.sort(() => Math.random() - 0.5)
    for (let quest of questions) {
        replaceCharacters(quest)
    }
}

const showIt = (object) => {
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
                .replace(/&rsquo;/g, `'`)
        }
    }
}

const showQuestion = (currentQuestion) => {
    const questionTitle = document.querySelector('.questionTitle')
    questionTitle.textContent = currentQuestion.question
    optionsValues(currentQuestion)
    questionStatus()
}

const optionsValues = (currentQuestion) => {
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

const rightAnswer = () => {
    correctEffect.volume = 0.3
    correctEffect.play()
    correctEffect.currentTime = 0;
    questionIndex++
    totalScore += 10
    score.textContent = `Score: ${totalScore}`
    showIt(questions[questionIndex])
    if (questionIndex == questions.length) {
        if (totalScore >= 80) winner()
    }
}

const wrongAnswer = () => {
    tries--
    wrongEffect.volume = 0.3
    wrongEffect.play()
    wrongEffect.currentTime = 0
    const health = document.querySelector('.health')
    health.classList.add('vibration')
    setTimeout(() => {
        health.classList.remove('vibration')
    }, 1000);
    health.textContent = tries
    health.textContent = `Health: ${tries}`
    if (tries === 0) {
        alert('You Lose')
        totalScore = 0
        score.textContent = `Score: ${totalScore}`
        tries = 3
        fetcho(url)
        randomCircles()
    }
}

const checkAnswer = (currentQuestion) => {
    const options = document.querySelectorAll('.option')
    let currentAnswer = currentQuestion.correct_answer;
    options.forEach(span => {
        span.onclick = function () {
            const selectedAnswer = this.textContent
            if (selectedAnswer === currentAnswer) {
                rightAnswer()
            } else {
                wrongAnswer()
            }
        }
    })

    const winner = () => {
        alert('you win')
    }
}


const randomCircles = () => {
    var num = Math.floor(Math.random() * 5)
    for (let i = 0; i <= num; i++) {
        let span = document.createElement('span')
        span.classList.add('headerOverlay')
        header.appendChild(span)
    }
    randomPositioning()
}

function randomPositioning() {
    const circles = document.querySelectorAll('.headerOverlay')
    const headerHeight = header.offsetHeight
    const headerWidth = header.offsetWidth

    circles.forEach((circle, i) => {
        circle.id = `overlay${i + 1}`

        const randomTop = Math.floor(Math.random() * (headerHeight + 100 - circle.offsetHeight)) + 'px'
        const randomLeft = Math.floor(Math.random() * (headerWidth + 100 - circle.offsetWidth)) + 'px'

        document.getElementById(`overlay${i + 1}`).style.top = randomTop
        document.getElementById(`overlay${i + 1}`).style.left = randomLeft
    })
}

const questionStatus = () => {
    const question = document.querySelector('.questionNumber')
    question.textContent = `${questionIndex + 1} /` + questions.length
}

const musicAdjust = () => {
    document.getElementById('playSound').addEventListener('click', () => {
        music.currentTime = 0; // Sesin başını sıfırla
        music.play()           // Sesi çal
            .then(() => {
                console.log("Ses çalıyor!");
            })
            .catch(error => {
                console.error("Ses çalınamadı:", error);
            });
    });
}

const gameMusic = () => {
    music.play()
    music.loop = true
}

fetcho(url)
window.onload = function () {
    randomCircles()
    musicAdjust()
}