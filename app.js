let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
const toggleBtn = document.querySelector(".mode");
let btns = ["yellow", "red", "green", "purple"];

document.addEventListener("keypress", function(){
    if (started == false) {
        started = true;
        console.log("game is started");
        levelUp();
    }
});

//flash function to flash btns 
function flash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}
//flash when user try to click 
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}
//level up function to update level
function levelUp() {
    userSeq = [];

    level++;
    h2.innerText = `level ${level}`
    updateHighscore();
    let randIdx = Math.floor(Math.random() * 3);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    flash(randBtn);
}
//check answer for matching sequences
function checkAnswer(idx){
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}<b> <br>
        Press any key to Restart the Game again.`;
        h2.style.color = "darkgreen";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        reset();
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);
    let userCol = btn.getAttribute("id");
    userSeq.push(userCol);

    checkAnswer(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
}

//game reset function
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function updateHighscore(){
   prevScore = level;
   if (highestScore < prevScore) {
      highestScore = prevScore;
   }
    h3.innerText = `Highest score : ${highestScore}`;
}
let theme = "light";
//mode logic
function changeMode(){
    if (theme === "light") {
        document.querySelector("body").classList.add("dark");
        toggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`
        theme = "dark";
    }else{
        document.querySelector("body").classList.remove("dark");
        toggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`
        theme = "light";
    }
}
toggleBtn.addEventListener("click", changeMode);