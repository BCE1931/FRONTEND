export const typeData = {
  questionid: "",
  type: "",
  alreadyhas: false,
  lookawaytime: 0,
  selectedAnswer: "", // ✅ added to store user’s chosen option
};

export const initTypeData = () => {
  if (!localStorage.getItem("typeData")) {
    localStorage.setItem("typeData", JSON.stringify({}));
    console.log("✅ typeData created in localStorage");
  } else {
    console.log("ℹ️ typeData already exists in localStorage");
  }
};

export const questions = [
  // Theoretical / programming
  {
    question: "What is the capital of India?",
    options: ["New Delhi", "Mumbai", "Bangalore", "Kolkata"],
    answer: "New Delhi",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Computer Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlink Text Mark Language",
      "Hyperlink and Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Django", "React", "Laravel", "Flask"],
    answer: "React",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Twitter"],
    answer: "Facebook",
  },

  // Numerical questions
  {
    question:
      "If a train travels 60 km in 1.5 hours, what is its speed in km/h?",
    options: ["30", "40", "45", "50"],
    answer: "40",
  },
  {
    question: "What is 25% of 200?",
    options: ["25", "40", "50", "75"],
    answer: "50",
  },
  {
    question: "If x + 5 = 12, what is the value of x?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "The sum of angles in a triangle is?",
    options: ["90°", "180°", "270°", "360°"],
    answer: "180°",
  },
  {
    question: "What is the LCM of 4 and 6?",
    options: ["10", "12", "14", "24"],
    answer: "12",
  },

  // Theoretical / general knowledge
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<hyperlink>"],
    answer: "<a>",
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["color", "font-color", "text-color", "fg-color"],
    answer: "color",
  },
  {
    question: "Which SQL command is used to fetch data?",
    options: ["SELECT", "UPDATE", "INSERT", "DELETE"],
    answer: "SELECT",
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["const", "let", "var", "static"],
    answer: "const",
  },

  // Numerical / aptitude
  {
    question:
      "A shopkeeper buys an item for $80 and sells for $100. What is the profit %?",
    options: ["20%", "25%", "15%", "10%"],
    answer: "25%",
  },
  {
    question: "If 5x = 45, find x.",
    options: ["5", "7", "9", "10"],
    answer: "9",
  },
  {
    question: "What is the area of a rectangle with length 10 and width 5?",
    options: ["50", "25", "15", "30"],
    answer: "50",
  },
  {
    question: "If a car covers 120 km in 2 hours, what is its speed?",
    options: ["50 km/h", "60 km/h", "55 km/h", "70 km/h"],
    answer: "60 km/h",
  },
  {
    question: "The next number in the series 2, 4, 8, 16, ?",
    options: ["20", "24", "32", "36"],
    answer: "32",
  },
  {
    question: "Which of the following is a backend framework?",
    options: ["React", "Django", "Vue", "Angular"],
    answer: "Django",
  },
];

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const saveusername = (username) => {
  localStorage.setItem("username", username);
};

export const getusername = () => {
  return localStorage.getItem("username");
};

export const saveemail = (email) => {
  localStorage.setItem("email", email);
};

export const getemail = () => {
  return localStorage.getItem("email");
};

export const saverefershtoken = (refreshtoken) => {
  localStorage.setItem("refreshtoken", refreshtoken);
};

export const getrefershtoken = () => {
  return localStorage.getItem("refreshtoken");
};
