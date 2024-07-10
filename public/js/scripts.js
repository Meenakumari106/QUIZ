document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript loaded!");

    // LOGIN FORM
    document.getElementById("login-form").addEventListener("submit", handleLoginFormSubmit);

    // REGISTER FORM
    document.getElementById("register-form").addEventListener("submit", handleRegisterFormSubmit);

    // QUIZ CREATE FORM
    document.getElementById("quiz-create-form").addEventListener("submit", handleQuizCreateFormSubmit);

    // QUIZ TAKE
    // document.getElementById("take-quiz-form").addEventListener("submit", handleTakeQuizFormSubmit);

    // FORGOT PASSWORD
    document.getElementById("forgot-password-form").addEventListener("submit", handleForgotPasswordFormSubmit);

    // RESULTS
    fetchQuizResults(); // Directly call the function here

    // Helper functions
    async function handleLoginFormSubmit(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        console.log(`Login attempt: ${email}, ${password}`);

        try {
            const response = await fetch("http://example.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            console.log("Login successful", data);
            window.location.href = "dashboard.html"; // Redirect to dashboard or quiz page
        } catch (error) {
            console.error("Login error:", error.message);
            // Show error message to the user (e.g., display an alert)
            alert("Login failed. Please check your credentials and try again.");
        }
    }

    
    // function handleQuizCreateFormSubmit(event) {
    //     event.preventDefault();
    //     const title = document.getElementById("quiz-title").value;
    //     const description = document.getElementById("quiz-description").value;
    //     const timeLimit = document.getElementById("quiz-time-limit").value;
    //     const difficulty = document.getElementById("quiz-difficulty").value;
    //     const scoring = document.getElementById("quiz-scoring").value;
    //     const access = document.getElementById("quiz-access").value;
      
    //     const questionsContainer = document.getElementById("questions-container");
    //     const questionElements = questionsContainer.children;
    //     const questions = [];
      
    //     questionElements.forEach((questionElement) => {
    //       const question = {};
    //       question.text = questionElement.querySelector(`[name*="[text]"]`).value;
    //       question.type = questionElement.querySelector(`[name*="[type]"]`).value;
    //       const options = questionElement.querySelectorAll(`[name*="[options][]"]`);
    //       question.options = Array.prototype.map.call(options, (option) => option.value);
    //       questions.push(question);
    //     });
      
    //     const quizData = {
    //       title,
    //       description,
    //       timeLimit,
    //       difficulty,
    //       scoring,
    //       access,
    //       questions,
    //     };
      
    //     fetch('/api/quizzes', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(quizData)
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log('Quiz saved successfully:', data))
    //     .catch(error => console.error('Error saving quiz:', error));
    //   }
    


    async function handleRegisterFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log(`Register attempt: ${name}, ${email}, ${password}`);

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json();
            console.log("Registration successful", data);
            window.location.href = "login.html"; // Redirect to login page after registration
        } catch (error) {
            console.error("Registration error:", error.message);
            // Show error message to the user (e.g., display an alert)
            alert("Registration failed. Please try again later.");
        }
    }

    function handleQuizCreateFormSubmit(event) {
        event.preventDefault();
        const title = document.getElementById("quiz-title").value;
        const description = document.getElementById("quiz-description").value;
        const timeLimit = document.getElementById("quiz-time-limit").value;
        const difficulty = document.getElementById("quiz-difficulty").value;
        const scoring = document.getElementById("quiz-scoring").value;
        const access = document.getElementById("quiz-access").value;
      
        const questionsContainer = document.getElementById("questions-container");
        const questionElements = questionsContainer.children;
        const questions = [];
      
        questionElements.forEach((questionElement) => {
          const question = {};
          question.text = questionElement.querySelector(`[name*="[text]"]`).value;
          question.type = questionElement.querySelector(`[name*="[type]"]`).value;
          const options = questionElement.querySelectorAll(`[name*="[options][]"]`);
          question.options = Array.prototype.map.call(options, (option) => option.value);
          questions.push(question);
        });
      
        const quizData = {
          title,
          description,
          timeLimit,
          difficulty,
          scoring,
          access,
          questions,
        };
      
        // Send quiz data to server
        fetch('/save-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(quizData)
        })
        .then(response => response.json())
        .then(data => console.log('Quiz saved successfully:', data))
        .catch(error => console.error('Error saving quiz:', error));
      }

    // function handleTakeQuizFormSubmit(event) {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const quizResults = {};
    //     // Example quiz data; this should be fetched from the server
    //     const quizData = {
    //         title: "Sample Quiz",
    //         questions: [
    //             {
    //                 id: 1,
    //                 text: "What is the capital of France?",
    //                 type: "multiple-choice",
    //                 options: ["Paris", "London", "Berlin", "Madrid"],
    //             },
    //             {
    //                 id: 2,
    //                 text: "Is the sky blue?",
    //                 type: "true-false",
    //             },
    //             {
    //                 id: 3,
    //                 text: "Briefly describe photosynthesis.",
    //                 type: "short-answer",
    //             },
    //         ],
    //     };

    //     quizData.questions.forEach((question) => {
    //         quizResults[question.id] = formData.get(`question-${question.id}`);
    //     });
    //     console.log("Quiz Results:", quizResults);
    //     // Add code to send this data to the server for scoring and result tracking
    //     // Example: You can use fetch or other method to send data to the server
    // }

    async function handleForgotPasswordFormSubmit(event) {
        event.preventDefault();
        const email = document.getElementById("forgot-email").value;
        console.log(`Forgot password request for: ${email}`);

        try {
            const response = await fetch("http://example.com/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("Password reset request failed");
            }

            const data = await response.json();
            console.log("Password reset request successful", data);
            alert("Password reset link sent to your email.");
            window.location.href = "login.html"; // Redirect to login page or show success message
        } catch (error) {
            console.error("Password reset error:", error.message);
            // Show error message to the user (e.g., display an alert)
            alert("Password reset request failed. Please try again later.");
        }
    }

    async function fetchQuizResults() {
        try {
            const response = await fetch("http://example.com/quiz-results", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Error fetching quiz results");
            }

            const data = await response.json();
            const quizResultsElement = document.getElementById("quiz-results");

            if (data && data.length > 0) {
                data.forEach((result) => {
                    const resultHtml = `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${result.quizTitle}</h5>
                                <p class="card-text">Score: ${result.score}</p>
                                <p class="card-text">Date Taken: ${result.date}</p>
                                <a href="#" class="btn btn-primary">View Detailed Report</a>
                            </div>
                        </div>
                    `;
                    quizResultsElement.insertAdjacentHTML("beforeend", resultHtml);
                });
            } else {
                quizResultsElement.innerHTML = '<p>No quiz results found.</p>';
            }
        } catch (error) {
            console.error("Error fetching quiz results:", error.message);
            const quizResultsElement = document.getElementById("quiz-results");
            quizResultsElement.innerHTML = '<p>Error fetching quiz results.</p>';
        }
    }



   
});
document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript loaded!");
  
    // LOGIN FORM
    document
        .getElementById("login-form")
        .addEventListener("submit", handleLoginFormSubmit);
  
    // REGISTER FORM
    document
        .getElementById("register-form")
        .addEventListener("submit", handleRegisterFormSubmit);
  
    // QUIZ CREATE FORM
    document
        .getElementById("quiz-create-form")
        .addEventListener("submit", handleQuizCreateFormSubmit);
  
    // QUIZ TAKE
    // document
    //     .getElementById("take-quiz-form")
    //     .addEventListener("submit", handleTakeQuizFormSubmit);
  
    // FORGOT PASSWORD
    document
        .getElementById("forgot-password-form")
        .addEventListener("submit", handleForgotPasswordFormSubmit);
  
    // RESULTS
    fetchQuizResults(); // Directly call the function here
  
    // Helper functions
    async function handleLoginFormSubmit(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        console.log(`Login attempt: ${email}, ${password}`);
  
        try {
            const response = await fetch("http://example.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
  
            if (!response.ok) {
                throw new Error("Login failed");
            }
  
            const data = await response.json();
            console.log("Login successful", data);
            window.location.href = "dashboard.html"; // Redirect to dashboard or quiz page
        } catch (error) {
            console.error("Login error:", error.message);
            // Show error message to the user (e.g., display an alert)
            alert("Login failed. Please check your credentials and try again.");
        }
    }
  
    async function handleRegisterFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
  
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
  
        console.log(`Register attempt: ${name}, ${email}, ${password}`);
  
        try {
            const response = await fetch("http://example.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
  
            if (!response.ok) {
                throw new Error("Registration failed");
            }
  
            const data = await response.json();
            console.log("Registration successful", data);
            window.location.href = "login.html"; // Redirect to login page after registration
        } catch (error) {
            console.error("Registration error:", error.message);
            // Show error message to the user (e.g., display an alert)
            alert("Registration failed. Please try again later.");
        }
    }
  
    function handleQuizCreateFormSubmit(event) {
        event.preventDefault();
        const title = document.getElementById("quiz-title").value;
        const description = document.getElementById("quiz-description").value;
        console.log(`Quiz Created: ${title}, ${description}`);
        // Add code to send this data to the server or store it
        // Example: You can use fetch or other method to send data to the server
    }
  
    function handleTakeQuizFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const quizResults = {};
        // Example quiz data; this should be fetched from the server
        const quizData = {
            title: "Sample Quiz",
            questions: [
                {
                    id: 1,
                    text: "What is the capital of France?",
                    type: "multiple-choice",
                    options: ["Paris", "London", "Berlin", "Madrid"],
                },
                {
                    id: 2,
                    text: "Is the sky blue?",
                    type: "true-false",
                },
                {
                    id: 3,
                    text: "Briefly describe photosynthesis.",
                    type: "short-answer",
                },
            ],
        };
  
        quizData.questions.forEach((question) => {
            quizResults[question.id] = formData.get(`question-${question.id}`);
        });
        console.log("Quiz Results:", quizResults);
        // Add code to send this data to the server for scoring and result tracking
        // Example: You can use fetch or other method to send data to the server
    }
  
    async function handleForgotPasswordFormSubmit(event) {
        event.preventDefault();
        const email = document.getElementById("forgot-email").value;
        console.log(`Forgot password request for: ${email}`);
  
        try {
            const response = await fetch("http://example.com/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
  
            if (!response.ok) {
                throw new Error("Password reset request failed");
            }
  
            const data = await response.json();
            console.log("Password reset request successful", data);
            alert("Password reset link sent to your email.");
            window.location.href = "login.html"; // Redirect to login page or show success message
        } catch (error) {
            console.error("Password reset error:", error.message);
            // Show error message to the user (e.g., display an alert)
            alert("Password reset request failed. Please try again later.");
        }
    }
  
    async function fetchQuizResults() {
        try {
            const response = await fetch("http://example.com/quiz-results", {
                method: "GET",
            });
  
            if (!response.ok) {
                throw new Error("Error fetching quiz results");
            }
  
            const data = await response.json();
            const quizResultsElement = document.getElementById("quiz-results");
  
            if (data && data.length > 0) {
                data.forEach((result) => {
                    const resultHtml = `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">${result.quizTitle}</h5>
                                <p class="card-text">Score: ${result.score}</p>
                                <p class="card-text">Date Taken: ${result.date}</p>
                                <a href="#" class="btn btn-primary">View Detailed Report</a>
                            </div>
                        </div>
                    `;
                    quizResultsElement.insertAdjacentHTML("beforeend", resultHtml);
                });
            } else {
                quizResultsElement.innerHTML = "<p>No quiz results found.</p>";
            }
        } catch (error) {
            console.error("Error fetching quiz results:", error.message);
            const quizResultsElement = document.getElementById("quiz-results");
            quizResultsElement.innerHTML = "<p>Error fetching quiz results.</p>";
        }
    }
  });


 