function makeBubble() {
  let clutter = '';
  for (let i = 0; i < 133; i++) {
    clutter += `<div class="bubble">${Math.floor(
      Math.random() * 10 + 1
    )}</div>`;
  }
  document.querySelector('.panel-bottom').innerHTML = clutter;
}
let rn;
let score = 0
function increaseScore() {
    score += 1
    document.querySelector(".score").textContent = score
}

function runTimer() {
    let time = 60;
    document.querySelector('.timer').textContent = time;
    const timeInterval = setInterval(() => {
        time--;
        if (time >= 0) {
            document.querySelector('.timer').textContent = time;
        } else {
            document.querySelector(".panel-bottom").innerHTML = ""
            clearInterval(timeInterval);
            alert(`Your Score : ${score}`)
        }
    }, 1000);
}

function getNewHit() {
    rn = Math.floor((Math.random()*10)+1)
    document.querySelector(".hit").textContent = rn
}


document.querySelector(".panel-bottom").addEventListener("click",function (dets) {
    var clickedNum = Number(dets.target.textContent)
    if (clickedNum == rn) {
        increaseScore()
        makeBubble()
        getNewHit()
        
    } else {
        makeBubble()
        
    }
    
    
})

runTimer();
makeBubble();
getNewHit();

