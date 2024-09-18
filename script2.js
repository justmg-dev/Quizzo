let questionIndex = 0;  // Soru indeksini global yapıyoruz
let questions = [];     // Soruları global bir değişkende tutacağız

const url = 'https://opentdb.com/api.php?amount=10';

fetch(url)
    .then(response => response.json())  // JSON formatına dönüştürüyoruz
    .then(data => {
        questions = data.results;  // Soruları global değişkende saklıyoruz
        showIt();  // Soruları ekrana yazdır
    })
    .catch(error => console.error('Error fetching data:', error));  // Hata kontrolü ekleyin

function showIt() {
    // Karakterleri değiştir
    questions.forEach(quest => replaceCharacters(quest));

    // İlk soruyu göster
    displayQuestion();
    // Cevabı kontrol etme işlemini ayarla
    checkAnswer();
}

// HTML karakterlerini değiştiren fonksiyon
const replaceCharacters = (value) => {
    for (let key in value) {
        if (typeof value[key] === 'string') {
            value[key] = value[key]
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"');
        }
    }
}

// Soruyu ve seçenekleri ekrana yazdıran fonksiyon
function displayQuestion() {
    if (questionIndex >= questions.length) {
        alert("Tüm soruları bitirdiniz!");
        return;
    }
    
    const currentQuestion = questions[questionIndex];
    const questionTitle = document.querySelector('.questionTitle');
    questionTitle.innerText = currentQuestion.question;  // Soruyu ekrana yazdır
    
    // Seçenekleri yazdır
    optionsValues(currentQuestion);
}

// Seçenekleri ekrana yazdırma fonksiyonu
function optionsValues(obj) {
    const optionsArr = [];
    optionsArr.push(obj.correct_answer);
    obj.incorrect_answers.forEach(e => optionsArr.push(e));

    // Seçenekleri karıştır
    optionsArr.sort(() => Math.random() - 0.5);

    const labels = document.querySelectorAll('.option');
    labels.forEach((option, index) => {
        option.textContent = optionsArr[index];
    });
}

// Cevap kontrolü yapan fonksiyon
const checkAnswer = () => {
    const options = document.querySelectorAll('.option');
    const currentQuestion = questions[questionIndex];
    const currentAnswer = currentQuestion.correct_answer;
    
    options.forEach(span => {
        span.onclick = function () {
            const selectedAnswer = this.textContent;

            if (selectedAnswer === currentAnswer) {
                alert('DOĞRU');
                questionIndex++;  // Doğru cevap olduğunda questionIndex'i arttır
                if (questionIndex < questions.length) {
                    displayQuestion();  // Yeni soruyu göster
                } else {
                    alert("Tüm soruları bitirdiniz!");
                }
            } else {
                alert('YANLIŞ');
            }
        }
    });
}
