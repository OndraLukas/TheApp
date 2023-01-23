const username = document.getElementById('username');
const SaveScoreBtn = document.getElementById('SaveScoreBtn');
const finalscore = document.getElementById('finalscore')
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

console.log(highScores);
finalscore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    console.log(username.value);
    SaveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score);

    highScores.sort( (a,b) => b.score - a.score)

    highScores.splice(MAX_HIGH_SCORES);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log(JSON.parse(localStorage.getItem("highScores")));
    username.disabled = true;
    SaveScoreBtn.disabled = true;
}