/*
    <랜덤 게임 룰>
    1. 랜덤 번호 생성
    2. 유저가 번호를 입력한다
    3. go 를 입력한다.
    4. 랜덤 번호가 < 유저번호 다운
    5. 랜덤 번호가 > 유저번호 업
    6. 리셋 버튼 누르면 게임이 리셋
    7. 5번의 기회를 다 쓰면 게임 끝 (더이상 추측 불가, 버튼 disable)
    8. 유저가 1-100 범위 밖에 숫자를 입력하면 알림. 기회 차감 하지 않음.
    9. 유저가 이미 입력한 숫자를 또 읿력하면 알림. 기회 차감 하지 않음.
*/

let computerNum = 0;
let playBtn = document.getElementsByClassName('playBtn');
let userInput = document.getElementsByClassName('userInput');
let resultArea = document.getElementsByClassName('resultArea');
let resetBtn = document.getElementsByClassName('resetBtn');
let chances = 10;
let gameOver = false;
let chancesArea = document.getElementsByClassName('chanceArea');
let history = [];


playBtn[0].addEventListener("click", play);
resetBtn[0].addEventListener("click", reset);
userInput[0].addEventListener("focus",function(){
  userInput[0].value = "";
})

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput[0].value;

  if (userValue < 1 || userValue > 100) {
    resultArea[0].textContent = "1과 100 사이 숫자를 입력해 주세요.";
    return;
  }

  if (history.includes(userValue)) {
    resultArea[0].textContent = "이미 입력한 숫자입니다.";
    return;
  }


  if(userValue < computerNum) {
    resultArea[0].textContent = 'UP';
  } else if(userValue > computerNum) {
    resultArea[0].textContent = 'DOWN';
  } else if(userValue != computerNum) {
      resultArea[0].textContent = '숫자를 입력해 주세요.';
      chances++;
  } else {
    resultArea[0].textContent = '딩동댕';
    gameOver = true;
  }

  chances--;
  chancesArea[0].textContent = `남은 기회 : ${chances} 번`;
  console.log('chances?', chances);


  history.push(userValue);
  console.log(history);

  if(chances < 1) {
    gameOver = true;
  } 
  if(gameOver) {
    playBtn[0].disabled = true;
  }
}

function reset() {
  // user input 창 정리
  userInput[0].value = "";
  // 새로운 번호가 생성
  pickRandomNum();
  
  resultArea[0].textContent = '😎 1~100 중 무엇일까요?';
  chances = 10;
  chancesArea[0].textContent = `남은 기회 : ${chances} 번`;  
  playBtn[0].disabled = false;

  history = [];
}

pickRandomNum();
