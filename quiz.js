// Array of quiz questions
let quizQuestions = [
    { question: "What year did Kenya gain independence?", options: ["1960", "1963", "1965", "1970"], correct: 1 },
    { question: "Which is the largest national park in Kenya?", options: ["Nairobi National Park", "Tsavo National Park", "Maasai Mara", "Lake Nakuru National Park"], correct: 1 },
    { question: "What is the capital city of Kenya?", options: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"], correct: 0 },
    { question: "What is the national language of Kenya?", options: ["English", "Swahili", "Luo", "Kikuyu"], correct: 1 },
    { question: "Which river is the longest in Kenya?", options: ["Tana River", "Athi River", "Ewaso Ng'iro", "Mara River"], correct: 0 },
];

let currentQuestion = 0;
let score = 0;
let timer;
let shuffledQuestions = shuffleArray([...quizQuestions]);

// Function to shuffle questions
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Function to display a question
function displayQuestion() {
    clearInterval(timer);
    startTimer(30);

    let current = shuffledQuestions[currentQuestion];
    document.getElementById("question-text").innerText = current.question;

    document.getElementById("a-label").innerText = "A. " + current.options[0];
    document.getElementById("b-label").innerText = "B. " + current.options[1];
    document.getElementById("c-label").innerText = "C. " + current.options[2];
    document.getElementById("d-label").innerText = "D. " + current.options[3];

    document.getElementById("correct-answer").style.display = "none";
    document.querySelectorAll('input[name="answer"]').forEach(input => input.checked = false);

    document.getElementById("submit-answer").style.display = "inline-block";
    document.getElementById("next-question").style.display = "none";

    animateQuestion();
}

// Function to animate question
function animateQuestion() {
    const container = document.querySelector('.quiz-container');
    container.style.animation = 'fadeIn 0.8s ease-in-out forwards';
}

// Function to handle answer submission
function submitAnswer() {
    let selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    let answerIndex = parseInt(selectedAnswer.value);
    let correctIndex = shuffledQuestions[currentQuestion].correct;

    // Display the correct answer
    document.getElementById("correct-answer").innerText = `Correct Answer: ${String.fromCharCode(65 + correctIndex)}. ${shuffledQuestions[currentQuestion].options[correctIndex]}`;
    document.getElementById("correct-answer").style.display = "block";

    // Check if the selected answer is wrong
    if (answerIndex !== correctIndex) {
        // Display the wrong answer in red
        let wrongAnswer = document.createElement("p");
        wrongAnswer.style.color = "red";
        wrongAnswer.innerText = `Wrong Answer: ${String.fromCharCode(65 + answerIndex)}. ${shuffledQuestions[currentQuestion].options[answerIndex]}`;
        document.getElementById("correct-answer").appendChild(wrongAnswer);
    }

    // Update score only if the answer is correct
    if (answerIndex === correctIndex) score++;

    // Hide submit button and show next button
    document.getElementById("submit-answer").style.display = "none";
    document.getElementById("next-question").style.display = "inline-block";

    // Stop timer
    clearInterval(timer);
}

// Function to handle next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) {
        displayQuestion();
    } else {
        showScore();
    }
}

// Function to show the final score
function showScore() {
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("score").style.display = "block";

    let feedback = score === shuffledQuestions.length ? "Great job!" : score > shuffledQuestions.length / 2 ? "Good effort!" : "Keep practicing!";
    document.getElementById("score").innerHTML = `You scored ${score} out of ${shuffledQuestions.length}. ${feedback}<br><button id="retry-quiz" class="quiz-button">Try Again</button>`;
}

// Function to retry the quiz
function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    shuffledQuestions = shuffleArray([...quizQuestions]);

    document.getElementById("quiz-section").style.display = "block";
    document.getElementById("score").style.display = "none";
    displayQuestion();
}

// Timer Functionality
function startTimer(seconds) {
    let timeLeft = seconds;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

// Event Listeners
document.getElementById("submit-answer").addEventListener("click", submitAnswer);
document.getElementById("next-question").addEventListener("click", nextQuestion);
document.addEventListener("click", (event) => {
    if (event.target.id === "retry-quiz") retryQuiz();
});

// Initialize the quiz
displayQuestion();
done
