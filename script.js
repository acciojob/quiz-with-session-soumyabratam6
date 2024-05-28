// Questions data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Function to render questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = '';

  const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    question.choices.forEach(choice => {
      const choiceLabel = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);
      if (savedProgress[index] === choice) {
		  choiceElement.setAttribute('checked', 'checked');
		}
      choiceElement.addEventListener("change", () => saveProgress(index, choice));
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Function to save the user's progress
function saveProgress(questionIndex, selectedChoice) {
  let progress = JSON.parse(sessionStorage.getItem('progress')) || {};
  progress[questionIndex] = selectedChoice;
  sessionStorage.setItem('progress', JSON.stringify(progress));
  console.log(sessionStorage.getItem('progress'));
}
function calculateScore() {
  const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};
  let score = 0;

  questions.forEach((question, index) => {
    if (savedProgress[index] === question.answer) {
      score++;
    }
  });
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;
  localStorage.setItem('score', score);
}
document.getElementById("submit").addEventListener("click", calculateScore);
renderQuestions();
window.addEventListener("load", renderQuestions);
