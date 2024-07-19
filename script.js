





function toggleRulesVisibility() {
    const rulesPopup = document.getElementById('rules-popup');
    rulesPopup.style.display="block";
    const rules = document.getElementsByClassName('rules')[0];
    rulesPopup.classList.toggle('hidden');
    rules.classList.toggle('hidden');
} 

document.getElementById('replay-button-win').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'index.html'; 
});

document.getElementById('replay-button-lose').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'index.html'; 
});
    
document.getElementById('replay-button-draw').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'index.html'; 
});

    let winnerPresentationEl = document.getElementsByClassName('winnerpresentation')[0];
    winnerPresentationEl.style.display = 'none';
    let loseEl=document.getElementsByClassName('you-loose')[0];
    loseEl.style.display = 'none';
    let drawEl=document.getElementsByClassName('draw')[0];
    drawEl.style.display = 'none';
    const rulesPopup = document.getElementById('rules-popup');
    rulesPopup.style.display="none";

    // fetching data from local storage then showing it on the screen
    const humanScoreEl = document.getElementById('human-score');
    const computerScoreEl = document.getElementById('computer-score');
    let humanScore=localStorage.getItem('humanScore') ? parseInt(localStorage.getItem('humanScore')): 0;
    let computerScore=localStorage.getItem('computerScore')? parseInt(localStorage.getItem('computerScore')):0;
    humanScoreEl.textContent = `${humanScore}`;
    computerScoreEl.textContent=`${computerScore}`



    const choices=document.querySelectorAll('.choice');
    const choicesArray = ['rock', 'paper', 'scissors'];

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const humanChoice = choice.id;
            const computerChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
            const result = getResult(humanChoice, computerChoice);
            updateScore(result);
            saveScores();
           

            if (result === 'win') {
                showCelebration(humanChoice,computerChoice);
               
            } 
            else if(result==='lose'){
                  showlose(humanChoice,computerChoice);
            }
            else{
                showDraw(humanChoice,computerChoice);
            }
        });
    });



    function getResult(human, computer) {
        if (human === computer) return 'draw';
        if ((human === 'rock' && computer === 'scissors') || 
            (human === 'scissors' && computer === 'paper') || 
            (human === 'paper' && computer === 'rock')) {
            return 'win';
        }
        return 'lose';
    }

    function updateScore(result) {
        if (result === 'win') {
            humanScore++;
        } else if (result === 'lose') {
            computerScore++;
        }
        humanScoreEl.textContent = `${humanScore}`;
        computerScoreEl.textContent = `${computerScore}`;
    }


    function saveScores() {
        localStorage.setItem('humanScore', humanScore);
        localStorage.setItem('computerScore', computerScore);
    }

  

// Update the showCelebration function in script.js
function showCelebration(humanChoice,computerChoice) {
    let triangleEl=document.getElementsByClassName('triangle')[0];
    triangleEl.style.display = 'none';

    
    winnerPresentationEl.style.display='block';
    triangleEl.parentNode.replaceChild(winnerPresentationEl, triangleEl);

    const image=document.getElementById('your-choice');

    image.src=`./images/${humanChoice}.png`;
  
    const pcimage=document.getElementById('pc-choice');

    pcimage.src=`./images/${computerChoice}.png`;


}


function showDraw(humanChoice, computerChoice){
    let triangleEl=document.getElementsByClassName('triangle')[0];
    triangleEl.style.display="none";
    drawEl.style.display="block";

    triangleEl.parentNode.replaceChild(drawEl, triangleEl);

    const image=document.getElementById('your-choice');

    image.src=`./images/${humanChoice}.png`;
  
    const pcimage=document.getElementById('pc-choice');

    pcimage.src=`./images/${computerChoice}.png`;

  
}

function showlose(humanChoice, computerChoice){
    let triangleEl=document.getElementsByClassName('triangle')[0];
    triangleEl.style.display="none";
    loseEl.style.display="block";


    triangleEl.parentNode.replaceChild(loseEl, triangleEl);

    const image=document.getElementById('your-choice');

    image.src=`./images/${humanChoice}.png`;
  
    const pcimage=document.getElementById('pc-choice');

    pcimage.src=`./images/${computerChoice}.png`;

}