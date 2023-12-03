// Fetch questions from GitHub repository
const apiUrl = 'https://raw.githubusercontent.com/Rehart-Kcalb/philoQuiz/main/questions.json';

let currentQuestionIndex = 0;
let questions = [];

// Fetch questions from JSON file
async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        questions = await response.json();
        console.log(questions)
        displayQuestion();
    } catch (error) {
        console.log('Error fetching questions:', error);
    }
}

// Shuffle function to randomize array elements
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Display current question with multiple options
function displayQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const question = questions[currentQuestionIndex];

    if (question) {
        // Shuffle the philosophers' names
        const shuffledOptions = shuffleArray([...question.options, question.philosopher]);

        quizContainer.innerHTML = `
            <p class="text-lg mb-4">${question.quote}</p>
            <div class="grid grid-cols-2 gap-4">
                ${shuffledOptions.map(option => `<button class="bg-gray-200 p-2 rounded-md quiz-option" data-option="${option}">${option}</button>`).join('')}
            </div>
        `;

        // Attach click event listeners to the option buttons
        const optionButtons = document.querySelectorAll('.quiz-option');
        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                handleAnswer(button.getAttribute('data-option'));
            });

            // Add a hover effect
            button.addEventListener('mouseover', () => {
                button.classList.add('hover:shadow-md', 'hover:bg-blue-200'); // Customize the glow effect
            });

            button.addEventListener('mouseout', () => {
                button.classList.remove('hover:shadow-md', 'hover:bg-blue-200');
            });
        });
    } else {
        // No more questions, display a completion message
        quizContainer.innerHTML = '<p class="text-lg mb-4">Викторина окончена! Отлично справились</p>';
        document.getElementById('next-btn').style.display = 'none';
    }
}



// Event handler for handling user's answer
function handleAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].philosopher;
    console.log("Chosen option",userAnswer)

    if (userAnswer === correctAnswer) {
        // User's answer is correct, move to the next question
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // User's answer is incorrect, provide feedback (you can customize this)
        alert(`Неправильный ответ.Попробуйте еще!`);
    }
}

// Update your existing event listener for the "Next" button
document.getElementById('next-btn').addEventListener('click', () => {
    alert('Выберите вариант ответа, перед тем как перейти к следущему вопросу.');
});
fetchQuestions();
