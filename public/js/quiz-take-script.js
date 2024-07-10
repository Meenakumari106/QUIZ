let currentQuestionIndex=0;
let totalQuestions=0;
let quizData;

async function fetchQuizzes(quizTitle, password) {
  try {
      const response = await fetch(`http://localhost:3000/api/quizzes?title=${encodeURIComponent(quizTitle)}&password=${encodeURIComponent(password)}`); // Replace with your backend URL if different
      if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
      }
      const quizzes = await response.json();
      console.log('Quizzes:', quizzes); // Log the fetched quizzes to the console or use them as needed
      return quizzes;
  } catch (error) {
      console.error('Error fetching quizzes:', error);
      // Handle error scenario (e.g., show an error message to the user)
      return null; // or throw error for further handling
  }
}

function displayQuizzes(quizzes) {

  quizData=quizzes
  totalQuestions=Object.keys(quizData.questions).length
  const timeRemainingDisplay = document.getElementById("time-remaining");

  const userId=document.getElementById("userId").style.display="block";
 
  document.getElementById("quiz-access-form").style.display = "none";
  document.getElementById("start-quiz-btn").style.display = "none";
  document.getElementById("take-quiz-form").style.display="block";
  document.getElementById("quiz-title-display").value=quizData['quiz-title'];
  // document.getElementById("timer").style.display="block";
  // document.getElementById("timer").textContent=format(quizData['quiz-time-limit'])
  // timeRemainingDisplay.style.display="block";
 

    // console.log("done")
    const questionsContainer=document.getElementById("quiz-questions-container");
    populateQuizQuestion(quizData, currentQuestionIndex,questionsContainer);
   
      // startTimer(quizData['quiz-time-limit'], timeRemainingDisplay);
 
}


document.addEventListener('DOMContentLoaded', () => {
  const startQuizBtn = document.getElementById('start-quiz-btn');
  const nextButton = document.getElementById("next-question-btn").addEventListener("click",goToNextQuestion);
  // const prevButton=document.getElementById("prev-question-btn").addEventListener("click",goToPreviousQuestion)
  const submitButton = document.getElementById("submit-btn")

  startQuizBtn.addEventListener('click', async () => {
      const quizTitleInput = document.getElementById('quiz-title');
      const quizPasswordInput = document.getElementById('quiz-password');

      const quizTitle = quizTitleInput.value.trim();
      const quizPassword = quizPasswordInput.value.trim();

      if (quizTitle === '' || quizPassword === '') {
          alert('Please enter both Quiz Title and Password');
          return;
      }

      try {
          const quizData = await fetchQuizzes(quizTitle, quizPassword).then(quizzes => {
            if (quizzes) {
                 displayQuizzes(quizzes);
                
            }
            console.log("Quizzes fetched and displayed successfully");
        })
          // console.log('Quiz Data:', quizData);
       

      } catch (error) {
          console.error('Failed to start quiz:', error);
          alert('Failed to start quiz. Please try again.');
      }
  });
  submitButton.addEventListener("click", submitQuiz);

});

  

  function populateQuizQuestion(data, index,questionsContainer) {
    // questionsContainer.innerHTML = ""; // Clear previous question

    const question = data.questions[index]['text'];
    console.log(question)
    const questionHtml = `
          <div class="card mb-3">
              <div class="card-body">
                  <div class="form-group">
                      <label>Question ${index + 1}:${question}</label>
                  </div>
                  ${generateQuestionOptions(data, index)}
              </div>
          </div>`;
    questionsContainer.insertAdjacentHTML("beforeend", questionHtml);

    //updateButtonStates();
  }

  function generateQuestionOptions(data, questionIndex) {

    if (data.questions[questionIndex]['type'] === "multiple-choice") {
      const question=data.questions[questionIndex];
      console.log(question)
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

  // function startTimer(duration, display) {
  //   let timer = duration,
  //     minutes,
  //     seconds;
  //   const interval = setInterval(function () {
  //     minutes = parseInt(timer / 60, 10);
  //     seconds = parseInt(timer % 60, 10);

  //     minutes = minutes < 10 ? "0" + minutes : minutes;
  //     seconds = seconds < 10 ? "0" + seconds : seconds;

  //     display.textContent = minutes + ":" + seconds;

  //     if (--timer < 0) {
  //       clearInterval(interval);
  //       quizForm.submit();
  //     }
  //   }, 1000);
  // }

  // function updateButtonStates() {
    
  //   prevButton.disabled = currentQuestionIndex === 0;
  //   nextButton.disabled = currentQuestionIndex === totalQuestions - 1;
  //   submitButton.style.display =
  //     currentQuestionIndex === totalQuestions - 1 ? "block" : "none";
  // }

  function goToNextQuestion() {
    //saveUserResponse(currentQuestionIndex);
    if (currentQuestionIndex < totalQuestions - 1) {
      // console.log(totalQuestions)
      currentQuestionIndex++;
      // console.log(currentQuestionIndex)
      // populateQuizQuestion(quizData, currentQuestionIndex);
      const questionsContainer = document.getElementById("quiz-questions-container");
      if (questionsContainer) {
        populateQuizQuestion(quizData, currentQuestionIndex, questionsContainer);
      } else {
        console.error('Quiz questions container not found.');
      }
    }
    else{
        document.getElementById("submit-btn").style.display="block";
    }
  }

  // function goToPreviousQuestion() {
  //   // saveUserResponse(currentQuestionIndex);
  //   if (currentQuestionIndex > 0) {
  //     currentQuestionIndex--;
  //     // populateQuizQuestion(quizData, currentQuestionIndex);
  //     const questionsContainer = document.getElementById("quiz-questions-container");
  //     if (questionsContainer) {
  //       populateQuizQuestion(quizData, currentQuestionIndex, questionsContainer);
  //     } else {
  //       console.error('Quiz questions container not found.');
  //     }
  //   }
  // }

  function submitQuiz(event) {
    event.preventDefault(); // Prevent form from submitting the default way
  
    const userId = document.getElementById('userId').value;
    const quizForm = document.getElementById('take-quiz-form');
    const formData = new FormData(quizForm);
    formData.append('userId', userId);
    const quizResponses = Object.fromEntries(formData.entries());
  
    console.log("Quiz responses:", quizResponses);
  
    // Example: Send the responses to the server
    fetch('http://localhost:3000/api/submit-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizResponses)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit quiz');
        }
        return response.json();
      })
      .then(result => {
        console.log('Quiz submitted successfully:', result);
        // Redirect or show a success message
        alert('Quiz submitted successfully!');
        window.location.href = '/userresponse';
      })
      .catch(error => {
        console.error('Error submitting quiz:', error);
        alert('Failed to submit quiz. Please try again.');
      });
  }

