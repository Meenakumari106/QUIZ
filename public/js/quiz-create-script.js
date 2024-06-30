
let questionCount = 0;

function addQuestion() {
  questionCount++;
  const questionId = `question-${questionCount}`;
  const questionHtml = `
        <div class="card mb-3" id="${questionId}">
            <div class="card-body">
                <h4>Question ${questionCount}</h4>
                <div class="form-group mb-3">
                    <label for="${questionId}-text">Question Text:</label>
                    <input type="text" class="form-control" id="${questionId}-text" name="questions[${questionCount}][text]" placeholder="Enter Question Text" required>
                </div>
                <div class="form-group mb-3">
                    <label for="${questionId}-type">Question Type:</label>
                    <select class="form-control" id="${questionId}-type" name="questions[${questionCount}][type]" onchange="changeQuestionType('${questionId}')">
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                        <option value="one-word">One Word</option>
                    </select>
                </div>
                <div class="form-group mb-3">
                    <label for="answer">Correct Answer:</label>
                    <input type="text" class="form-control" id="${questionId}-answer" name="questions[${questionCount}][answer]" placeholder="Enter Correct Answer" required>
         </div>

                <div class="form-group mb-3" id="${questionId}-options-container">
                    <label>Options:</label>
                    <div class="form-group" id="${questionId}-options">
                        <div class="input-group mb-2">
                            <input type="text" class="form-control" name="questions[${questionCount}][options][1]" placeholder="Option 1" required>
                        </div>
                        <div class="input-group mb-2">
                            <input type="text" class="form-control" name="questions[${questionCount}][options][2]" placeholder="Option 2" required>
                        </div>
                    </div>
                    <button type="button" class="btn btn-secondary btn-sm mt-2" onclick="addOption('${questionId}')">Add Option</button>
                </div>


                <button type="button" class="btn btn-danger mt-3" onclick="removeQuestion('${questionId}')">Remove Question</button>
            </div>
        </div>`;
  document
    .getElementById("questions-container")
    .insertAdjacentHTML("beforeend", questionHtml);
}

function addOption(questionId) {
  const optionsContainer = document.getElementById(`${questionId}-options`);
  const optionNumber = optionsContainer.children.length + 1;
  const optionHtml = `
        <div class="input-group mb-2">
            <input type="text" class="form-control" name="questions[${questionId.split("-")[1]
    }][options][]${optionNumber}" placeholder="Option ${optionNumber}" required>
            ${optionNumber > 2
      ? '<div class="input-group-append"><button class="btn btn-outline-danger" type="button" onclick="deleteOption(this)">Delete</button></div>'
      : ""
    }
        </div>`;
  optionsContainer.insertAdjacentHTML("beforeend", optionHtml);
  updateOptionNumbers(questionId);
}

function deleteOption(button) {
  const optionDiv = button.closest(".input-group");
  const optionsContainer = optionDiv.closest(".form-group");
  optionDiv.remove();
  updateOptionNumbers(optionsContainer.id.split("-options")[0]);
}

function updateOptionNumbers(questionId) {
  const optionsContainer = document.getElementById(`${questionId}-options`);
  const optionInputs = optionsContainer.querySelectorAll(".input-group input");
  optionInputs.forEach((input, index) => {
    input.placeholder = `Option ${index + 1}`;
  });
}

function removeQuestion(questionId) {
  const questionElement = document.getElementById(questionId);
  questionElement.parentNode.removeChild(questionElement);

  const questionCards = document.querySelectorAll("#questions-container .card");
  questionCount = 0;
  questionCards.forEach((card) => {
    questionCount++;
    const currentQuestionId = `question-${questionCount}`;
    card.id = currentQuestionId;
    card.querySelector("h4").textContent = `Question ${questionCount}`;
    card.querySelectorAll(`[name^='questions']`).forEach((element) => {
      const regex = /\[\d+\]/;
      const newName = element.name.replace(regex, `[${questionCount}]`);
      element.name = newName;
    });
    updateOptionNumbers(currentQuestionId);
  });
}

function changeQuestionType(questionId) {
  const questionType = document.getElementById(`${questionId}-type`).value;
  const optionsContainer = document.getElementById(
    `${questionId}-options-container`
  );

  if (questionType === "multiple-choice") {
    optionsContainer.innerHTML = `
            <label>Options:</label>
            <div class="form-group" id="${questionId}-options">
                <div class="input-group mb-2">
                    <input type="text" class="form-control" name="questions[${questionId.split("-")[1]
      }][options][]" placeholder="Option 1" required>
                </div>
                <div class="input-group mb-2">
                    <input type="text" class="form-control" name="questions[${questionId.split("-")[1]
      }][options][]" placeholder="Option 2" required>
                </div>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" onclick="addOption('${questionId}')">Add Option</button>`;
  } else {
    optionsContainer.innerHTML = "";
  }
}

// document
//   .getElementById("create-quiz-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     const formData = new FormData(this);
//     const quizData = Object.fromEntries(formData.entries());
//     console.log("Quiz Data:", quizData);

//   });
document
  .getElementById("create-quiz-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const quizData = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())));
      // Generate a temporary userId (Example: using a random unique identifier)
      const userId = generateTemporaryUserId(); // Implement this function to generate a unique identifier

      quizData.userId = userId; // Add userId to quizData
  
     console.log("Quiz Data:", quizData);


    fetch(`http://localhost:3000/api/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Redirecting to quiz-saved page...');
        window.location.href = '/quiz-saved';
        console.log('Quiz saved successfully:', data);
        // Optionally handle success response
      
       
      })
      .catch(error => {
        console.error('Error saving quiz:', error);
        // Optionally handle error
      });


  });

  function generateTemporaryUserId() {
    // Example of generating a unique identifier (UUID version 4)
    return 'temp-user-' + Math.random().toString(36).substr(2, 9);
    // return res.session.user.email || '';
  }
