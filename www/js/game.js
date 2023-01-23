console.log("Hello game!");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const Score = document.getElementById('score');
//const loader = document.getElementById('loader');
const game = document.getElementById('game');

let availableAnswers = ["n/ž","n/ž","n/ž","n/ž"];
let rightAnswer=0;

let currentQuestionObj = {
    question: "READY?",
    correctAnswer: "YES",
    incorrectAnswers: ["NO", "NO", "NO"],
};
let acceptingAnswers = true;
let score = 0;
let availableQuestions = [];

/*let questions2 = [
    {
        "question": "Test1",
        "correctAnswer": "TestovaciOdpoved1",
        "incorrectAnswers": ["TestovaciOdpoved2, TestovaciOdpoved3, TestovaciOdpoved4"],
    },
    {
        "question": "Test2",
        "correctAnswer": "TestovaciOdpoved2",
        "incorrectAnswers": ["TestovaciOdpoved1, TestovaciOdpoved3, TestovaciOdpoved4"],
    },
    {
        "question": "Test3",
        "correctAnswer": "TestovaciOdpoved3",
        "incorrectAnswers": ["TestovaciOdpoved1, TestovaciOdpoved2, TestovaciOdpoved4"],
    }
]

let questions = [
    {
        question: "Test1",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 1
    },
    {
        question: "Test2",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 2
    },
    {
        question: "Test3",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 3
    }
]*/

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

fetch(
    'https://the-trivia-api.com/api/questions?limit=1'
    )
    .then(res => {
        return res.json();
    })
    .then(loadQ => {
        console.log(loadQ);
        currentQuestionObj = loadQ[0];
        console.log(currentQuestionObj);
    })
    .catch(err => {
        console.error(err);
    });

/*fetch(
    'https://the-trivia-api.com/api/questions?limit=1'
    )
    .then(res => {
        return res.json();
    })
    .then(loadQ => {
        console.log(loadQ);
    })
    .catch(err => {
        console.error(err);
    });*/

startGame = () => {
    score = 0;

    /*fetch(
        'https://the-trivia-api.com/api/questions?limit=1'
        )
        .then(res => {
            return res.json();
        })
        .then(loadQ => {
            console.log(loadQ);
            currentQuestionObj = loadQ[0];
            console.log(currentQuestionObj);
        })
        .catch(err => {
            console.error(err);
        });*/

    

    getNewQuestion();
}

getNewQuestion = () => {
    Score.innerText = score;
    localStorage.setItem("mostRecentScore", score);
    console.log(score);
    fetch(
        'https://the-trivia-api.com/api/questions?limit=1'
        )
        .then(res => {
            return res.json();
        })
        .then(loadQ => {
            console.log(loadQ);
            currentQuestionObj = loadQ[0];
            console.log(currentQuestionObj);
        })
        .catch(err => {
            console.error(err);
        });
    
    //const questionIndex = Math.floor(Math.random()*availableQuestions.length)
    question.innerText = currentQuestionObj.question;

    rightAnswer = Math.floor(Math.random()*4);
    answerIndex = 0;

    availableAnswers.forEach(part => {
        if(answerIndex == rightAnswer){
            availableAnswers[answerIndex] = currentQuestionObj.correctAnswer;
        }
        else{
            const IncIndex = Math.floor(Math.random()*currentQuestionObj.incorrectAnswers.length);
            availableAnswers[answerIndex] = currentQuestionObj.incorrectAnswers[IncIndex];
            currentQuestionObj.incorrectAnswers.splice(IncIndex, 1);
        }
        answerIndex++;
    })
 
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = availableAnswers[number];
    })

    //availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true;
    //game.classList.remove("hidden");

};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = selectedAnswer == rightAnswer ? "correct" : "incorrect";
        
        console.log(classToApply);
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            if(selectedAnswer != rightAnswer){
                return window.location.assign('./end.html')
            }
            else {
                score++;
            getNewQuestion();
            }
        }, 500)
    });
})

startGame();