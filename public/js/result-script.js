

let quizData;
let quizResponse;

function displayresults(result) {
  // Hide the quiz results section
  document.getElementById("quiz-results").style.display = "none";
  
  // Show the result container
  document.getElementById("result-container").style.display = "block";

  // Display the score
  const scoreElement = document.getElementById("score");
  scoreElement.style.display = "block";
  scoreElement.textContent = result.score; // Set the score value

  // Display the correct answers count
  const correctElement = document.getElementById("Correct");
  correctElement.style.display = "block";
  correctElement.textContent = result.correctAnswers; // Set the correct answers count

  // Display the total questions count
  const totalElement = document.getElementById("total");
  totalElement.style.display = "block";
  totalElement.textContent = result.totalQuestions; // Set the total questions count
}


async function fetchQuizzes(quizTitle, password) {
  try {
      const response = await fetch(`http://localhost:3000/api/quizzes?title=${encodeURIComponent(quizTitle)}&password=${encodeURIComponent(password)}`); // Replace with your backend URL if different
      if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
      }
      const quizzes = await response.json();
      // console.log('Quizzes:', quizzes); // Log the fetched quizzes to the console or use them as needed
      return quizzes;
  } catch (error) {
      console.error('Error fetching quizzes:', error);
      // Handle error scenario (e.g., show an error message to the user)
      return null; // or throw error for further handling
  }
}
async function fetchResponse(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/quizresponses?id=${encodeURIComponent(userId)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch responses');
    }
    const responses = await response.json();
    console.log("Responses:", responses); // Log the fetched responses to the console or use them as needed
    return responses;
  } catch (error) {
    console.error('Error fetching responses:', error);
    return null;
  }
}

async function calculateResults() {
  try {
    
    if (!quizData || !quizResponse) {
      throw new Error('Quiz or response not found');
    }

    // Initialize variables to calculate the score
    let correctAnswers = 0;
    const totalQuestions =Object.keys(quizData.questions).length;
    console.log(totalQuestions);
   
    let questionCount = 0; // Start from 0

while (questionCount < totalQuestions) {
  const c = quizData.questions[questionCount].answer;
  const r = quizResponse.responses[questionCount].answer;
 console.log("c,r",c,r)
  if (c === r) {
    correctAnswers++;
  }
  questionCount++;
}

    const score = (correctAnswers / totalQuestions) * 100;

    // Log the result
    console.log(`Score: ${score}%`);
    console.log(`Correct Answers: ${correctAnswers}`);
    console.log(`Total Questions: ${totalQuestions}`);

    // You can return the score or any other data as needed
    return {
      score,
      correctAnswers,
      totalQuestions,
    };
  } catch (error) {
    console.error('Error calculating results:', error);
  }
}

;

document.addEventListener('DOMContentLoaded', () => {
  const startQuizBtn = document.getElementById('start-quiz-btn');
  
  startQuizBtn.addEventListener('click', async () => {
  const quizTitleInput = document.getElementById('quiz-title');
  const quizPasswordInput = document.getElementById('quiz-password');
  const userIdInput=document.getElementById('userId');
  const quizTitle = quizTitleInput.value.trim();
  const quizPassword = quizPasswordInput.value.trim();
  const userId=userIdInput.value.trim();
  if (quizTitle === '' || quizPassword === '' || userId ==='') {
    alert('Please enter  Quiz Title , Password and UserId');
    return;
  }
 
  try {
    quizData = await fetchQuizzes(quizTitle, quizPassword);
    if (quizData) {
      console.log("Quizzes fetched and displayed successfully");
    }

  } catch (error) {
    console.error('Failed to fetch quizzes', error);
  }

  try {
    quizResponse = await fetchResponse(userId);
    if (quizResponse) {
      console.log("Responses fetched successfully");
    }
  } catch (error) {
    console.error('Failed to fetch responses', error);
  }
  calculateResults()
  .then((result) => {
    displayresults(result)
    console.log('Result:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  
  });
});







