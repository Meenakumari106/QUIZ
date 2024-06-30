document.addEventListener("DOMContentLoaded", function () {
  const quizData = {
    title: "Sample Quiz",
    duration: 600, // 10 minutes in seconds
    questions: [
      {
        text: "What is the capital of France?",
        type: "multiple-choice",
        options: ["Paris", "London", "Berlin", "Madrid"],
      },
      {
        text: "The sky is blue.",
        type: "true-false",
        options: ["True", "False"],
      },
      {
        text: "Describe the process of photosynthesis.",
        type: "one-word",
        options: [],
      },
    ],
  };

  let currentQuestionIndex = 0;
  const totalQuestions = quizData.questions.length;

  const startQuizButton = document.getElementById("start-quiz-btn");
  const quizForm = document.getElementById("take-quiz-form");
  const quizTitleInput = document.getElementById("quiz-title-display");
  const questionsContainer = document.getElementById(
    "quiz-questions-container"
  );
  const prevButton = document.getElementById("prev-question-btn");
  const nextButton = document.getElementById("next-question-btn");
  const submitButton = document.getElementById("submit-btn");
  const timerDisplay = document.getElementById("timer");
  const timeRemainingDisplay = document.getElementById("time-remaining");

  startQuizButton.addEventListener("click", function () {
    // Simulating quiz access check with title and password
    const enteredTitle = document.getElementById("quiz-title").value;
    const enteredPassword = document.getElementById("quiz-password").value;

    if (enteredTitle === quizData.title && enteredPassword === "password") {
      document.getElementById("quiz-access-form").style.display = "none";
      startQuizButton.style.display = "none";
      quizForm.style.display = "block";
      timerDisplay.style.display = "block";
      quizTitleInput.value = quizData.title;
      populateQuizQuestion(quizData, currentQuestionIndex);
      startTimer(quizData.duration, timeRemainingDisplay);
    } else {
      alert("Invalid quiz title or password");
    }
  });

  function populateQuizQuestion(data, index) {
    questionsContainer.innerHTML = ""; // Clear previous question

    const question = data.questions[index];
    const questionHtml = `
          <div class="card mb-3">
              <div class="card-body">
                  <div class="form-group">
                      <label>Question ${index + 1}: ${question.text}</label>
                  </div>
                  ${generateQuestionOptions(question, index)}
              </div>
          </div>`;
    questionsContainer.insertAdjacentHTML("beforeend", questionHtml);

    updateButtonStates();
  }

  function generateQuestionOptions(question, questionIndex) {
    if (question.type === "multiple-choice") {
      return question.options
        .map(
          (option, index) => `
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="questions[${questionIndex}]" id="question-${questionIndex}-option-${index}" value="${option}">
                  <label class="form-check-label" for="question-${questionIndex}-option-${index}">
                      ${option}
                  </label>
              </div>`
        )
        .join("");
    } else if (question.type === "true-false") {
      return question.options
        .map(
          (option, index) => `
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="questions[${questionIndex}]" id="question-${questionIndex}-option-${index}" value="${option}">
                  <label class="form-check-label" for="question-${questionIndex}-option-${index}">
                      ${option}
                  </label>
              </div>`
        )
        .join("");
    } else if (question.type === "one-word") {
      return `
              <div class="form-group">
                  <input type="text" class="form-control" name="questions[${questionIndex}]" pattern="\\b\\w+\\b" title="Please enter a single word.">
              </div>`;
    }
  }

  function startTimer(duration, display) {
    let timer = duration,
      minutes,
      seconds;
    const interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(interval);
        quizForm.submit();
      }
    }, 1000);
  }

  function updateButtonStates() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === totalQuestions - 1;
    submitButton.style.display =
      currentQuestionIndex === totalQuestions - 1 ? "block" : "none";
  }

  function goToNextQuestion() {
    saveUserResponse(currentQuestionIndex);
    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
      populateQuizQuestion(quizData, currentQuestionIndex);
    }
  }

  function goToPreviousQuestion() {
    saveUserResponse(currentQuestionIndex);
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      populateQuizQuestion(quizData, currentQuestionIndex);
    }
  }

  prevButton.addEventListener("click", goToPreviousQuestion);
  nextButton.addEventListener("click", goToNextQuestion);

  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveUserResponse(currentQuestionIndex);
    const formData = new FormData(this);
    const quizResponses = Object.fromEntries(formData.entries());
    console.log("Quiz Responses:", quizResponses);
    // Add code to handle quiz submission, e.g., send to server
  });

  function saveUserResponse(index) {
    const formData = new FormData(quizForm);
    const responses = Object.fromEntries(formData.entries());
    // Depending on your needs, you may want to store responses differently or validate them.
    console.log(
      "Saved response for question",
      index + 1,
      ":",
      responses[`questions[${index}]`]
    );
  }
});
