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
      question: "¿En que año se fundo el Real Racing club ?",
      options: ["1913", "1933", "1987", "1986"],
      answer: "1913"
    },
    {
    question: "¿ En qué año se fundó el Albacete Balompié ?",
    options: ["1940", "1959", "1972", "1983"],
    answer: "1940"
  },

  {
    question: "¿Qué jugador del Real Zaragoza es considerado una leyenda del club y fue capitán durante muchos años, conocido como El Jefe?",
    Opciones: ["David Villa", "Juan Esnáider", "Gustavo Poyet", "Gabriel Milito"],
    answer: "Gabriel Militao"
  },
  {
    question: "¿En qué año de fundó el Estadio Carlos Belmonte?",
    Opciones: ["1960", "1970", "1980", "1990"],
    answer: "1960"
  },
  {
    question: "¿Máximo goleador de Segunda Divisón ?",
    Opciones: ["Andrés Martín(Racing de Santander)", "Panichelli(Mirandes)", "Alemao(Oviedo)", "Luis Suárez(Almería)"],
    answer: "1960"
  },
  {
    question: "¿Equipo con más tarjetas 🟨 ?",
    Opciones: ["Racing de Santander", "Mirandes", "Oviedo", "Córdoba"],
    answer: "1960"
  },
  {
    question: " ¿Qué equipo fue subcampeón de la Segunda División en la temporada 2022-2023, logrando también el ascenso a Primera División?",
    Opciones: ["La palmas", "Mirandes", "Español", "Córdoba"],
    answer: "La palmas"
  },
  {
    question: " ¿En qué año se fundó la Segunda División española, conocida como LaLiga SmartBank?",
    Opciones: ["1830", "1870", "1929", "1930"],
    answer: "1929"
  },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 180;
  let lives = 5;
  let userName = "";
  let userInstagram = "";
  let skippedQuestions = [];
  
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
  
  // Shuffle questions for random order
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
    shuffleQuestions(); // Desordena las preguntas al iniciar el juego
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion(); // Muestra la primera pregunta después de desordenarlas
  });
  
  function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    nextBtn.disabled = true;
    timeLeft = 180;
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
    const correct = questions[currentQuestion].answer;
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
        endGame("Perdiste todas tus vidas.");
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
    if (!skippedQuestions.includes(currentQuestion)) {
      skippedQuestions.push(currentQuestion);
    }
    nextQuestion();
  });
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      endGame("¡Has completado el juego!");
    }
  }
  
  function endGame(message) {
    quizContainer.style.display = "none";
    endScreen.style.display = "block";
  
    const finalText = `Hola, soy ${userName} (@${userInstagram}) y obtuve ${score}/${questions.length} en el Quiz de Fútbol.`;
    finalMessage.innerHTML = `${message}<br><br>${finalText}`;
  
    const tuInstagram = "lllojona_04"; // Reemplaza con tu @ real (sin arroba)
    const url = `https://instagram.com/${tuInstagram}`;
    sendInstagramLink.href = url;
    sendInstagramLink.onclick = () => {
      navigator.clipboard.writeText(finalText);
      alert("Mensaje copiado. Pégalo en el DM de Instagram.");
    };
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        stopTimer();
        handleTimeout();
      }
    }, 1000);
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
    const correct = questions[currentQuestion].answer;
    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
      opt.onclick = null;
      if (opt.textContent === correct) {
        opt.style.backgroundColor = 'green';
      }
    });
    lives--;
    updateLivesDisplay();
    if (lives <= 0) {
      endGame("Se acabó el tiempo y perdiste todas tus vidas.");
    } else {
      nextBtn.disabled = false;
    }
  }
  
