document.addEventListener("DOMContentLoaded", function () {
  // Mockup results data for demonstration
  const resultsData = {
    title: "Sample Quiz",
    questions: [
      {
        text: "What is the capital of France?",
        type: "multiple-choice",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris",
        userAnswer: "Paris",
      },
      {
        text: "The sky is blue.",
        type: "true-false",
        options: ["True", "False"],
        correctAnswer: "True",
        userAnswer: "False",
      },
      {
        text: "Describe the process of photosynthesis.",
        type: "short-answer",
        correctAnswer:
          "Photosynthesis is the process by which green plants use sunlight to synthesize foods with the help of chlorophyll.",
        userAnswer: "It's how plants make food using sunlight.",
      },
    ],
  };

  function populateQuizResults(data) {
    const resultsContainer = document.getElementById("quiz-results");
    const titleHtml = `<h2>${data.title}</h2>`;
    resultsContainer.insertAdjacentHTML("beforeend", titleHtml);

    data.questions.forEach((question, index) => {
      const questionHtml = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5>Question ${index + 1}: ${question.text}</h5>
                        <p><strong>Your Answer:</strong> ${
                          question.userAnswer
                        }</p>
                        <p><strong>Correct Answer:</strong> ${
                          question.correctAnswer
                        }</p>
                        ${generateResultFeedback(question)}
                    </div>
                </div>`;
      resultsContainer.insertAdjacentHTML("beforeend", questionHtml);
    });

    const summaryHtml = generateSummary(data.questions);
    resultsContainer.insertAdjacentHTML("beforeend", summaryHtml);
  }

  function generateResultFeedback(question) {
    if (question.userAnswer === question.correctAnswer) {
      return '<p class="text-success">Correct!</p>';
    } else {
      return '<p class="text-danger">Incorrect</p>';
    }
  }

  function generateSummary(questions) {
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(
      (q) => q.userAnswer === q.correctAnswer
    ).length;
    const score = (correctAnswers / totalQuestions) * 100;

    return `
            <div class="card mt-4">
                <div class="card-body">
                    <h4>Summary</h4>
                    <p>Total Questions: ${totalQuestions}</p>
                    <p>Correct Answers: ${correctAnswers}</p>
                    <p>Score: ${score.toFixed(2)}%</p>
                </div>
            </div>`;
  }

  function storeResult(result) {
    let storedResults = localStorage.getItem("quizResults");
    storedResults = storedResults ? JSON.parse(storedResults) : [];
    storedResults.push(result);
    localStorage.setItem("quizResults", JSON.stringify(storedResults));
  }

  function getStoredResults() {
    let storedResults = localStorage.getItem("quizResults");
    return storedResults ? JSON.parse(storedResults) : [];
  }

  function generateAdminReport() {
    const storedResults = getStoredResults();
    // Example report: Count of quizzes taken
    const report = `
            <div class="card mt-4">
                <div class="card-body">
                    <h4>Admin Report</h4>
                    <p>Total Quizzes Taken: ${storedResults.length}</p>
                    <!-- More detailed report can be generated here -->
                </div>
            </div>`;
    return report;
  }

  function displayAdminReport() {
    const adminReport = generateAdminReport();
    document
      .getElementById("quiz-results")
      .insertAdjacentHTML("beforeend", adminReport);
  }

  // Display results and store them
  populateQuizResults(resultsData);
  storeResult(resultsData);

  // Display admin report if the user is an admin (for simplicity, assume user is admin)
  displayAdminReport();
});
