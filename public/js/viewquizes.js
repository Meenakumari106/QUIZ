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
    const savedQuizzesList = document.getElementById('saved-quizzes-list');
    savedQuizzesList.innerHTML = ''; // Clear any existing content

    console.log('Displaying Quizzes:', quizzes);
   
    if (Object.keys(quizzes).length > 0) {
        // Loop through each quiz in the object
        Object.keys(quizzes).forEach((quizKey, quizIndex) => {
             const quiz=quizzes
            //  console.log(quiz)
            const quizContainer = document.createElement('div');
            quizContainer.className = 'quiz-container mb-4 p-3 border border-gray-300 rounded-md';

            // Create title for the quiz
            const title = document.createElement('h1');
            title.className = 'title mb-1 text-2xl font-semibold text-gray-800 border-b pb-2 border-gray-300';
            title.innerText = 'Quiz Title';
            quizContainer.appendChild(title);

            // Create quiz title element
            // console.log(quizIndex)
            const quizTitle = document.createElement('h3');
            quizTitle.className = 'quiz-title mb-2 text-xl font-semibold text-blue-600';
            quizTitle.innerText = quiz['quiz-title'];
            quizContainer.appendChild(quizTitle);

          
            

            // Create list for questions
            const questionsList = document.createElement('div');
            questionsList.className = 'questions-list mt-3';
            // console.log(quiz.questions)

           const questions=quiz.questions;
                // console.log(questions)
            Object.keys(questions).forEach((question, questionIndex) => {
            //      console.log("question")
            // //     // Create card for each question
            //     console.log("index",questionIndex)
            //     console.log(questions[questionIndex])
                
               const questionCard = document.createElement('div');
                questionCard.className = 'card mb-3';
                questionCard.id = `quiz-${quizIndex}-question-${questionIndex}`;
                questionsList.appendChild(questionCard)
                 

            //     // Create card body for the question
                const questionCardBody = document.createElement('div');
                questionCardBody.className = 'card-body';
              
                // console.log(questionsList)
            //     // Create title for the question

                const questionTitle = document.createElement('h4');
                questionTitle.innerText = `Question ${questionIndex + 1}`;
                questionCardBody.appendChild(questionTitle);
                // console.log(questionCardBody)
                

            //     // Create div for question text
                const questionTextDiv = document.createElement('div');
                questionTextDiv.className = 'form-group mb-3';
                const questionTextLabel = document.createElement('label');
                questionTextLabel.innerText = 'Question Text:';
                const questionText = document.createElement('p');
                questionText.innerText = questions[questionIndex]['text'];
                questionTextDiv.appendChild(questionTextLabel);
                questionTextDiv.appendChild(questionText);
                questionCardBody.appendChild(questionTextDiv)
                // questionCard.appendChild(questionCardBody)
                

            //     // Create div for question type
                const questionTypeDiv = document.createElement('div');
                questionTypeDiv.className = 'form-group mb-3';
                const questionTypeLabel = document.createElement('label');
                questionTypeLabel.innerText = 'Question Type:';
                const questionType = document.createElement('p');
               questionType.innerText = questions[questionIndex]['type'].replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
               questionTypeDiv.appendChild(questionTypeLabel);
               questionTypeDiv.appendChild(questionType);
               questionCardBody.appendChild(questionTypeDiv);

           

            // //     // Create container for options
              const optionsContainer = document.createElement('div');
              optionsContainer.className = 'form-group mb-3';
              const optionsLabel = document.createElement('label');
              optionsLabel.innerText = 'Options:';
               optionsContainer.appendChild(optionsLabel);
              const optionsDiv = document.createElement('div');
              optionsDiv.className = 'form-group';

            // //     // Loop through each option in the question
                questions[questionIndex]['options'].forEach((option, optionIndex) => {
                    const optionDiv = document.createElement('div');
                    optionDiv.className = 'mb-2';
                    const optionText = document.createElement('p');
                    optionText.innerText = `Option ${optionIndex + 1}: ${option}`;
                    optionDiv.appendChild(optionText);
                    optionsDiv.appendChild(optionDiv);
                });

               optionsContainer.appendChild(optionsDiv);

            // //     // Append elements to question card body
            //     questionCardBody.appendChild(questionTextDiv);
            //     questionCardBody.appendChild(questionTypeDiv);
                questionCardBody.appendChild(optionsContainer);
                questionCard.appendChild(questionCardBody);
                questionsList.appendChild(questionCard);
                // console.log(questionsList)
             });

            // // Append questions list to quiz container
         quizContainer.appendChild(questionsList);

            // Append quiz container to saved quizzes list
            savedQuizzesList.appendChild(quizContainer);
        });
    } else {
        // Display message if no quizzes are available
        savedQuizzesList.innerHTML = '<li class="list-group-item">No quizzes available</li>';
    }
}


document.addEventListener('DOMContentLoaded', () => {
const startQuizBtn = document.getElementById('start-quiz-btn');

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
  console.error('Failed fetch saved quizes', error);
//   alert('Failed to start quiz. Please try again.');
}
});


});

  