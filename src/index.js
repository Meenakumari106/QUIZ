const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("./config");
const Quiz=require("./models/Quiz");


// require('dotenv').config();

const cors = require('cors'); // Ensure cors is required
const { corsOptions } = require('./config'); // Import the configurations


const app = express();

// Converting data into JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use(cors(corsOptions));

// EJS as a View Engine
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/forgot-password", (req, res) => {
  res.render("forgot-password");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/quiz-create", (req, res) => {
  res.render("quiz-create");
});

app.get("/quiz-take", (req, res) => {
  res.render("quiz-take");
});

app.get("/my-account", (req, res) => {
  res.render("my-account");
});

app.get("/result", (req, res) => {
  res.render("result");
});

app.get("/viewsavedquiz",(req,res)=>{
  res.render("viewsavedquiz")
})

app.get("/quiz-saved",(req,res)=>{
  res.render("quiz-saved");
})

// Register user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  try {
    // Check for already existing user

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.send("User already exists. Please choose a different email.");
      return;
    }

    // Encrypt password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("ok")
    
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    res.send("Error during registration: " + error.message);
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.send("User not found.");
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
     
      res.render("home");
    } else {
      res.send("Wrong password.");
    }
  } catch (error) {
    res.send("Invalid credentials.");
  }
});

app.get("/my-account", async (req, res) => {
  const userId = req.session.userId; // Assuming you are storing user ID in session
  const user = await User.findById(userId);

  if (user) {
    res.render("my-account", { userName: user.name, userEmail: user.email });
  } else {
    res.send("User not found.");
  }
});


app.use(express.json());


//to create and save quizes
app.post('/api/quizzes', async (req, res) => {
  try {
    console.log("this is what request consists")
    console.log(req.body)
    const userId = req.body.userId;
    const quizData = {
      'userId': userId,
      "quiz-title": req.body['quiz-title'],
      "quiz-description": req.body['quiz-description'],
      "quiz-time-limit": req.body['quiz-time-limit'],
      "quiz-difficulty": req.body['quiz-difficulty'],
      "quiz-scoring": req.body['quiz-scoring'],
      "quiz-access": req.body['quiz-access'],
      "quiz-password":req.body['quiz-password'],
      questions: []
    };

    let questionCount = 1;
    while (req.body[`questions[${questionCount}][text]`]) {
      const options = [];
      let optionCount = 1;
      while (req.body[`questions[${questionCount}][options][${optionCount}]`]) {
        options.push(req.body[`questions[${questionCount}][options][${optionCount}]`]);
        optionCount++;
      }
      // console.log(options)
      quizData.questions.push({
        text: req.body[`questions[${questionCount}][text]`],
        type: req.body[`questions[${questionCount}][type]`],
        answer:req.body[`questions[${questionCount}][answer]`],
        options: options
      });

      questionCount++;

      
    }
    console.log("this is new quizdata",quizData)
    const quiz = new Quiz(quizData);
    const savedQuiz = await quiz.save();
    
    res.status(201).json(savedQuiz);
    
  } catch (err) {
    console.error('Error saving quiz:', err);
    res.status(500).json({ error: 'Failed to save quiz' });
  }
});

// //to fetch quizes
// app.get('/api/quizzes', async (req, res) => {
//   try {
//     const userId = req.query.userId; // Retrieve userId from query parameter

//     if (!userId) {
//       return res.status(400).json({ error: 'userId query parameter is required' });
//     }
//     const quizzes = await Quiz.find({ userId: userId }); 
    
//     console.log(quizzes)// Retrieve all quizzes from the database
//     res.status(200).json(quizzes); // Return quizzes as JSON response
//   } catch (err) {
//     console.error('Error fetching quizzes:', err);
//     res.status(500).json({ error: 'Failed to fetch quizzes' });
//   }
// });

app.get('/api/quizzes', async (req, res) => {
  const { title, password } = req.query;
console.log(title)
  try {
    const quiz = await Quiz.findOne({ 'quiz-title':title,'quiz-password':password }); // Adjust according to your schema
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found or invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



const port = 3000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
