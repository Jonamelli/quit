const questions = [
  {
    question: "¿Después de irse del Racing de Santander  Guillermo Fernández Romo que equipo entrenó?",
    options: ["Cartagena FC", "U.D.Ibiza", "Racing de Ferrol"],
    answer: "U.D.Ibiza"
  },
  {
    question: "¿En qué temporada subió el Racing de Santander a 2ªDivisión?",
    options: ["2019-2020", "2017-2017", "2021-2022", "2022-2023"],
    answer: "2021-2022"
  },
  {
    question: "¿En qué equipo está Juan Gutiérrez en la actualidad?",
    options: ["Ibiza", "Mirandés", "Racing de Ferrol", "Elche"],
    answer: "Mirandés"
  },
  {
    question: "¿A quienes se les conoce como el duo sacapuntas?",
    options: ["Andrés y Íñigo Vicente", "Zigic y Munitis", "Juan Carlos Arana y Ekain"],
    answer: "Zigic y Munitis"
  },
  {
    question: "¿En que año se fundó el Real Racing club?",
    options: ["1913", "1933", "1987", "1986"],
    answer: "1913"
  },
  {
    question: "¿En qué año se fundó el Albacete Balompié?",
    options: ["1940", "1959", "1972", "1983"],
    answer: "1940"
  },
  {
    question: "¿Qué jugador del Real Zaragoza es considerado una leyenda del club y fue capitán durante muchos años, conocido como El Jefe?",
    options: ["David Villa", "Juan Esnáider", "Gustavo Poyet", "Gabriel Milito"],
    answer: "Gabriel Milito"
  },
  {
    question: "¿En qué año se fundó el Estadio Carlos Belmonte?",
    options: ["1960", "1970", "1980", "1990"],
    answer: "1960"
  },
  {
    question: "¿Máximo goleador de Segunda División?",
    options: ["Andrés Martín(Racing de Santander)", "Panichelli(Mirandés)", "Alemao(Oviedo)", "Luis Suárez(Almería)"],
    answer: "Luis Suárez(Almería)"
  },
  {
    question: "¿Equipo con más tarjetas 🟨?",
    options: ["Racing de Santander", "Mirandés", "Oviedo", "Córdoba"],
    answer: "Córdoba"
  },
  {
    question: "¿Qué equipo fue subcampeón de la Segunda División en la temporada 2022-2023, logrando también el ascenso a Primera División?",
    options: ["Las Palmas", "Mirandés", "Español", "Córdoba"],
    answer: "Las Palmas"
  },
  {
    question: "¿En qué año se fundó la Segunda División española, conocida como LaLiga SmartBank?",
    options: ["1830", "1870", "1929", "1930"],
    answer: "1929"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 90; // Ajustado a 1 minuto y medio (90 segundos)
let lives = 5;
let userName = "";
let userInstagram = "";
let skipped = []; // Lista de preguntas saltadas
let mainQuestions = [...questions]; // Copia de las preguntas principales

const startScreen = document.querySelector('.start-screen');
const quizContainer = document.querySelector('.quiz-container');
const endScreen = document.querySelector('.end-screen');
const nameInput = document.getElementById('name');
const instagramInput = document.getElementById('instagram');
const startBtn = document.getElementById('start-btn');

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const skipBtn = document.getElementById('skip-btn');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const finalMessage = document.getElementById('final-message');
const sendInstagramLink = document.getElementById('send-instagram');

const livesDisplay = document.createElement('p');
livesDisplay.id = 'lives';
document.querySelector('.quiz-container').insertBefore(livesDisplay, timerEl);

function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

startBtn.addEventListener('click', () => {
  userName = nameInput.value.trim();
  userInstagram = instagramInput.value.trim();
  if (userName === "" || userInstagram === "") {
    alert("Por favor completa tu nombre e Instagram.");
    return;
  }
  shuffleQuestions();
  mainQuestions = [...questions];
  currentQuestion = 0;
  score = 0;
  lives = 5;
  skipped = []; // Limpiamos las preguntas saltadas
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
});

function showQuestion() {
  const q = mainQuestions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  nextBtn.disabled = true;
  timeLeft = 90; // Restablecemos el tiempo a 1 minuto y medio
  updateTimerDisplay();
  updateLivesDisplay();
  startTimer();

  q.options.forEach(option => {
    const div = document.createElement('div');
    div.textContent = option;
    div.classList.add('option');
    div.onclick = () => selectOption(option, div);
    optionsEl.appendChild(div);
  });

  scoreEl.textContent = `Puntaje: ${score}`;
}

function selectOption(selected, element) {
  stopTimer();
  const correct = mainQuestions[currentQuestion].answer;
  const options = document.querySelectorAll('.option');
  options.forEach(opt => opt.onclick = null);

  if (selected === correct) {
    element.style.backgroundColor = 'green';
    score++;
    setTimeout(() => nextQuestion(), 1000);
  } else {
    element.style.backgroundColor = 'red';
    options.forEach(opt => {
      if (opt.textContent === correct) {
        opt.style.backgroundColor = 'green';
      }
    });
    lives--;
    updateLivesDisplay();
    if (lives <= 0) {
      endGame();
    } else {
      nextBtn.disabled = false;
    }
  }

  scoreEl.textContent = `Puntaje: ${score}`;
}

nextBtn.addEventListener('click', () => {
  nextQuestion();
});

skipBtn.addEventListener('click', () => {
  stopTimer();
  skipped.push(mainQuestions[currentQuestion]); // Añadimos la pregunta saltada a la lista
  mainQuestions.splice(currentQuestion, 1); // Eliminamos la pregunta de la lista de preguntas activas
  nextQuestion();
});

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < mainQuestions.length && lives > 0) {
    showQuestion();
  } else if (skipped.length > 0) {
    // Al final, mostramos las preguntas saltadas
    mainQuestions = [...skipped];
    skipped.length = 0;
    currentQuestion = 0;
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  quizContainer.style.display = "none";
  endScreen.style.display = "block";

  // Calculamos el total de preguntas como la suma de las preguntas iniciales y las saltadas
  const totalQuestions = questions.length;
  
  // El mensaje final debería mostrar cuántas preguntas se han acertado
  const finalText = `Has acertado ${score} de ${totalQuestions} preguntas.`;
  finalMessage.innerHTML = finalText;

  const tuInstagram = "lllojona_04";
  const url = `https://instagram.com/${tuInstagram}`;
  sendInstagramLink.href = url;
  sendInstagramLink.onclick = () => {
    navigator.clipboard.writeText(`Hola, soy ${userName} (@${userInstagram}) y obtuve ${score}/${totalQuestions} en el Quiz de Fútbol.`);
    alert("Mensaje copiado. Pégalo en el DM de Instagram.");
  };
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    // Reproducir la alarma cuando queden 30 segundos
    if (timeLeft <= 30) {
      // Aquí podrías agregar un sonido de alarma o advertencia, por ejemplo:
      const warningAudio = new Audio('./music/alerta.mp3'); // Cambia 'alerta.mp3' por la ruta de tu archivo de audio
      if (warningAudio.paused) {
        warningAudio.play();
      }
    }

    if (timeLeft <= 0) {
      stopTimer();
      handleTimeout();
    }
  }, 800); // Cambié el intervalo a 800 ms para que el tiempo pase más rápido
}

function stopTimer() {
  clearInterval(timer);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.textContent = `⏱ Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateLivesDisplay() {
  livesDisplay.textContent = `❤️ Vidas restantes: ${lives}`;
}

function handleTimeout() {
  stopTimer();
  const options = document.querySelectorAll('.option');
  options.forEach(opt => opt.onclick = null);
  lives--;
  updateLivesDisplay();
  if (lives <= 0) {
    endGame();
  } else {
    setTimeout(() => nextQuestion(), 1000);
  }
}
