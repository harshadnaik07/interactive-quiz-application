// 12 questions (>= 10)
const questions = [
  { question: "Which language runs in a web browser?", options:["Python","C++","JavaScript","Java"], answer:2 },
  { question: "What does HTML stand for?", options:["Hyperlinks and Text Markup","Hyper Text Markup Language","Home Tool Markup Language","HighText Machine Lang"], answer:1 },
  { question: "Which CSS property controls layout flow?", options:["display","src","href","align"], answer:0 },
  { question: "Which company developed the React library?", options:["Google","Microsoft","Facebook (Meta)","Twitter"], answer:2 },
  { question: "Which keyword declares a variable in modern JavaScript?", options:["var","let/const","def","dim"], answer:1 },
  { question: "What does API stand for?", options:["Application Programming Interface","Applied Programming Internet","App Program Interface","Automated Program Input"], answer:0 },
  { question: "Which method adds an element to the end of an array in JS?", options:["push()","pop()","shift()","slice()"], answer:0 },
  { question: "Which HTTP status code means 'Not Found'?", options:["200","301","404","500"], answer:2 },
  { question: "Which is NOT a JavaScript framework/library?", options:["Angular","Laravel","Vue","React"], answer:1 },
  { question: "Which attribute is used to link a stylesheet in HTML?", options:["src","href","link","rel"], answer:1 },
  { question: "Which operator is used for strict equality in JS?", options:["==","=","===","!=="], answer:2 }
];

let current = 0;
let score = 0;
const perQuestionSeconds = 20; 
let timeLeft = perQuestionSeconds;
let timerInterval = null;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const restartBtn2 = document.getElementById('restartBtn2');
const resultEl = document.getElementById('result');
const cardEl = document.getElementById('card');
const timeLabel = document.getElementById('timeLabel');
const timeBar = document.getElementById('timeBar');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('scoreText');
const finalScore = document.getElementById('finalScore');

function startQuiz(){
  current = 0; score = 0;
  resultEl.classList.add('hidden');
  cardEl.classList.remove('hidden');
  nextBtn.disabled = true;
  updateMeta();
  loadQuestion();
}

function updateMeta(){
  progressText.textContent = `Question ${current+1} / ${questions.length}`;
  scoreText.textContent = `Score: ${score}`;
}

function loadQuestion(){
  clearInterval(timerInterval);

  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';

  // Fade animation
  cardEl.classList.remove('fade-in');
  void cardEl.offsetWidth;
  cardEl.classList.add('fade-in');

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.innerHTML = opt;
    btn.onclick = () => selectAnswer(idx, btn);
    optionsEl.appendChild(btn);
  });

  nextBtn.disabled = true;
  timeLeft = perQuestionSeconds;
  renderTimer();

  timerInterval = setInterval(tickTimer, 200);
}

function tickTimer(){
  timeLeft -= 0.2;
  if(timeLeft <= 0){
    timeLeft = 0;
    renderTimer();
    clearInterval(timerInterval);
    handleTimeout();
  } else {
    renderTimer();
  }
}

function renderTimer(){
  const pct = Math.max(0, (timeLeft / perQuestionSeconds) * 100);
  timeBar.style.width = pct + '%';
  timeLabel.textContent = Math.ceil(timeLeft) + 's';
}

function selectAnswer(selectedIdx, btn){
  clearInterval(timerInterval);

  [...optionsEl.children].forEach(b => b.disabled = true);

  const correctIdx = questions[current].answer;

  if(selectedIdx === correctIdx){
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    optionsEl.children[correctIdx].classList.add('correct');
  }

  updateMeta();

  
  nextBtn.disabled = false;
}

function handleTimeout(){
  [...optionsEl.children].forEach(b => b.disabled = true);

  const correctIdx = questions[current].answer;
  optionsEl.children[correctIdx].classList.add('correct');

 
  nextBtn.disabled = false;
}

function goNext(){
  current++;
  if(current < questions.length){
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult(){
  cardEl.classList.add('hidden');
  resultEl.classList.remove('hidden');
  finalScore.textContent = `You scored ${score} / ${questions.length}`;
}

nextBtn.addEventListener('click', goNext);
restartBtn.addEventListener('click', startQuiz);
restartBtn2.addEventListener('click', startQuiz);

startQuiz();
