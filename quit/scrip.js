// Simula el tiempo de carga de tu quiz
window.onload = function() {
    setTimeout(() => {
      // Oculta la pantalla de carga
      document.getElementById('loading-screen').style.display = 'none';
  
      // Muestra el quiz
      document.getElementById('quiz-container').style.display = 'block';
  
      // Redirige después de 3 segundos (simula el fin de la carga)
      setTimeout(() => {
        // Redirige a otro archivo HTML (quiz.html, por ejemplo)
        window.location.href = "quiz.html";  // Cambia quiz.html al archivo al que deseas redirigir
      }, 3000); // 3 segundos después de mostrar el contenido
    }, 3000); // Pantalla de carga visible por 3 segundos
  };
  