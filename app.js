// app.js
import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, push, set, get, child, onValue, remove } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- QUESTION BANK ---
const QUESTIONS = [
    { q: "What is my favorite colour?", opts: ["Red", "Blue", "Green", "Yellow"], img: "https://picsum.photos/id/111/1200/700" },
    { q: "What is my biggest pet peeve?", opts: ["Loud chewing", "Being interrupted", "People who are late", "Smacking noises"], img: "https://picsum.photos/id/214/1200/700" },
    { q: "What's my go-to comfort food?", opts: ["Pizza", "Ice cream", "Chicken wings", "Pasta"], img: "https://picsum.photos/id/1015/1200/700" },
    { q: "If I could travel anywhere, where would I go?", opts: ["Japan", "Italy", "New Zealand", "Egypt"], img: "https://picsum.photos/id/1018/1200/700" },
    { q: "What is my favorite movie genre?", opts: ["Sci-Fi", "Comedy", "Thriller", "Horror"], img: "https://picsum.photos/id/1025/1200/700" },
    { q: "What's my biggest fear?", opts: ["Heights", "Spiders", "Public speaking", "Being alone"], img: "https://picsum.photos/id/1062/1200/700" },
    { q: "What's my coffee order?", opts: ["Black coffee", "Latte", "Cappuccino", "Mocha"], img: "https://picsum.photos/id/1069/1200/700" },
    { q: "Which animal do I secretly wish was my pet?", opts: ["Sloth", "Owl", "Penguin", "Red Panda"], img: "https://picsum.photos/id/1070/1200/700" },
    { q: "What is my dream job?", opts: ["Pilot", "Artist", "Psychologist", "Chef"], img: "https://picsum.photos/id/1074/1200/700" },
    { q: "What's my favorite season?", opts: ["Spring", "Summer", "Autumn", "Winter"], img: "https://picsum.photos/id/1076/1200/700" },
    { q: "What's my favorite way to relax?", opts: ["Reading a book", "Watching a movie", "Listening to music", "Taking a walk"], img: "https://picsum.photos/id/1080/1200/700" },
    { q: "Which superpower would I want?", opts: ["Teleportation", "Invisibility", "Flying", "Mind-reading"], img: "https://picsum.photos/id/1083/1200/700" },
    { q: "What's my favorite way to spend a weekend?", opts: ["Staying in", "Going out with friends", "Exploring a new place", "Doing a hobby"], img: "https://picsum.photos/id/111/1200/700" },
    { q: "What's my favorite type of music?", opts: ["Pop", "Rock", "Hip-hop", "Classical"], img: "https://picsum.photos/id/111/1200/700" },
    { q: "What's my favorite emoji?", opts: ["😂", "❤️", "🤩", "🤔"], img: "https://picsum.photos/id/1015/1200/700" },
    { q: "Am I a morning person or a night owl?", opts: ["Morning person", "Night owl"], img: "https://picsum.photos/id/1018/1200/700" },
    { q: "What's my ideal date?", opts: ["Dinner and a movie", "A walk in the park", "A picnic", "A concert"], img: "https://picsum.photos/id/1025/1200/700" },
    { q: "What's my dream car?", opts: ["Tesla", "Lamborghini", "Porsche", "Mercedes"], img: "https://picsum.photos/id/1062/1200/700" },
    { q: "What's my guilty pleasure?", opts: ["Reality TV", "Fast food", "Sleeping in", "Binge-watching shows"], img: "https://picsum.photos/id/1069/1200/700" },
    { q: "What's my favorite sport to watch?", opts: ["Football", "Basketball", "Soccer", "Tennis"], img: "https://picsum.photos/id/1070/1200/700" },
    { q: "What's the first thing I do when I wake up?", opts: ["Check my phone", "Drink water", "Brush my teeth", "Go to the bathroom"], img: "https://picsum.photos/id/1074/1200/700" },
    { q: "What's my favorite holiday?", opts: ["Christmas", "New Year's", "Halloween", "Easter"], img: "https://picsum.photos/id/1076/1200/700" },
    { q: "What's my favorite dessert?", opts: ["Chocolate cake", "Apple pie", "Cheesecake", "Brownies"], img: "https://picsum.photos/id/1080/1200/700" },
    { q: "What's my favorite fruit?", opts: ["Apple", "Banana", "Orange", "Strawberry"], img: "https://picsum.photos/id/1083/1200/700" },
    { q: "What's my favorite candy?", opts: ["Skittles", "M&Ms", "Reese's", "Snickers"], img: "https://picsum.photos/id/111/1200/700" },
    { q: "What's my favorite TV show?", opts: ["Game of Thrones", "Friends", "The Office", "Breaking Bad"], img: "https://picsum.photos/id/1015/1200/700" },
    { q: "What's my favorite video game?", opts: ["Fortnite", "Minecraft", "Call of Duty", "Grand Theft Auto"], img: "https://picsum.photos/id/1018/1200/700" },
    { q: "What's my favorite social media app?", opts: ["Instagram", "Facebook", "Twitter", "TikTok"], img: "https://picsum.photos/id/1025/1200/700" },
    { q: "What's my favorite board game?", opts: ["Monopoly", "Scrabble", "Chess", "Checkers"], img: "https://picsum.photos/id/1062/1200/700" },
    { q: "What's my favorite card game?", opts: ["Poker", "Blackjack", "Uno", "Crazy Eights"], img: "https://picsum.photos/id/1069/1200/700" },
    { q: "What's my favorite genre of books?", opts: ["Fantasy", "Sci-Fi", "Mystery", "Horror"], img: "https://picsum.photos/id/1070/1200/700" },
    { q: "What's my favorite type of vacation?", opts: ["Beach", "City", "Mountains", "Cruise"], img: "https://picsum.photos/id/1074/1200/700" },
    { q: "What's my favorite subject in school?", opts: ["Math", "Science", "English", "History"], img: "https://picsum.photos/id/1076/1200/700" },
    { q: "What's my favorite hobby?", opts: ["Reading", "Writing", "Drawing", "Singing"], img: "https://picsum.photos/id/1080/1200/700" },
    { q: "What's my favorite animal?", opts: ["Dog", "Cat", "Rabbit", "Bird"], img: "https://picsum.photos/id/1083/1200/700" },
    { q: "What's my favorite drink?", opts: ["Coffee", "Tea", "Soda", "Water"], img: "https://picsum.photos/id/111/1200/700" },
    { q: "What's my favorite food?", opts: ["Pizza", "Jollof", "Burgers", "Pasta"], img: "https://picsum.photos/id/1015/1200/700" },
    { q: "What's my favorite season?", opts: ["Spring", "Summer", "Autumn", "Winter"], img: "https://picsum.photos/id/1018/1200/700" },
    { q: "What's my favorite movie?", opts: ["The Matrix", "The Godfather", "The Shawshank Redemption", "Pulp Fiction"], img: "https://picsum.photos/id/1025/1200/700" },
    { q: "What's my favorite singer?", opts: ["Michael Jackson", "Beyonce", "Adele", "Taylor Swift"], img: "https://picsum.photos/id/1062/1200/700" },
    { q: "What's my favorite actor?", opts: ["Tom Hanks", "Leonardo DiCaprio", "Johnny Depp", "Will Smith"], img: "https://picsum.photos/id/1069/1200/700" },
    { q: "What's my favorite actress?", opts: ["Angelina Jolie", "Jennifer Aniston", "Scarlett Johansson", "Emma Watson"], img: "https://picsum.photos/id/1070/1200/700" },
    { q: "What's my favorite sport?", opts: ["Football", "Basketball", "Soccer", "Tennis"], img: "https://picsum.photos/id/1074/1200/700" },
    { q: "What's my favorite book?", opts: ["The Lord of the Rings", "The Hobbit", "Harry Potter", "The Hunger Games"], img: "https://picsum.photos/id/1076/1200/700" },
];

const appContainer = document.getElementById('app');
let state = {
  quizId: null,
  creatorName: "",
  quizQuestions: [],
  currentQuestionIndex: 0,
  answers: [],
  creatorAnswers: []
};

// Utility function to pick a random subset of questions
function pickRandom(arr, n) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

// Function to render the current question step on the quiz page
function renderQuestion() {
  const qCard = document.getElementById('question-card');
  const qText = document.getElementById('q-text');
  const qImage = document.getElementById('q-image');
  const optionsList = document.getElementById('options-list');

  // Check if a question exists for the current index
  const currentQuestion = state.quizQuestions[state.currentQuestionIndex];
  if (!currentQuestion) {
      console.error("No question data found for this index.");
      return;
  }

  // Update question text and image
  qText.textContent = currentQuestion.q;
  qImage.src = currentQuestion.img;
  
  // Clear and render new options
  optionsList.innerHTML = '';
  currentQuestion.opts.forEach((opt, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('opt');
      optionDiv.textContent = opt;
      optionDiv.addEventListener('click', () => {
          // Deselect all other options
          Array.from(optionsList.children).forEach(o => o.classList.remove('selected'));
          // Select this option and save the answer
          optionDiv.classList.add('selected');
          state.answers[state.currentQuestionIndex] = index;
      });
      optionsList.appendChild(optionDiv);
  });
  
  // Update progress bar
  const progressBar = document.getElementById('progress-bar');
  const totalQuestions = state.quizQuestions.length;
  const progress = ((state.currentQuestionIndex + 1) / totalQuestions) * 100;
  if (progressBar) progressBar.style.width = `${progress}%`;

  // Update question counter
  const currentQ = document.getElementById('current-q');
  const totalQ = document.getElementById('total-q');
  if (currentQ) currentQ.textContent = state.currentQuestionIndex + 1;
  if (totalQ) totalQ.textContent = totalQuestions;

  // Show/hide navigation and submit buttons
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');

  if (prevBtn) prevBtn.style.visibility = state.currentQuestionIndex > 0 ? 'visible' : 'hidden';
  if (state.currentQuestionIndex === totalQuestions - 1) {
      if (nextBtn) nextBtn.style.display = 'none';
      if (submitBtn) submitBtn.style.display = 'flex';
  } else {
      if (nextBtn) nextBtn.style.display = 'flex';
      if (submitBtn) submitBtn.style.display = 'none';
  }

  // Restore selected option if an answer exists for this question
  if (state.answers[state.currentQuestionIndex] !== null) {
      optionsList.children[state.answers[state.currentQuestionIndex]].classList.add('selected');
  }
}

// Function to handle quiz navigation
function handleNavigation(direction) {
  if (direction === 'next' && state.currentQuestionIndex < state.quizQuestions.length - 1) {
      state.currentQuestionIndex++;
  } else if (direction === 'prev' && state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
  }
  renderQuestion();
}

// Function to handle quiz submission
async function handleSubmit() {
    const isCreator = new URLSearchParams(window.location.search).get('isCreator') === 'true';

    if (isCreator) {
        // Creator's submission
        const newQuizRef = push(ref(db, 'quizzes'));
        const creatorAnswers = state.answers;

        await set(newQuizRef, {
            creator: state.creatorName,
            questions: state.quizQuestions,
            answers: creatorAnswers,
            createdAt: Date.now()
        });
        const quizId = newQuizRef.key;
        window.location.href = `result.html?creator=true&quizId=${quizId}`;
    } else {
        // Friend's submission
        const quizId = state.quizId;
        const creatorAnswers = state.creatorAnswers;
        const friendAnswers = state.answers;
        let score = 0;

        for (let i = 0; i < creatorAnswers.length; i++) {
            if (creatorAnswers[i] === friendAnswers[i]) {
                score++;
            }
        }

        const friendName = prompt("Enter your name to see your score!");
        if (friendName) {
            const scoresRef = child(ref(db, `quizzes/${quizId}/scores`), friendName);
            await set(scoresRef, score);
            window.location.href = `result.html?quizId=${quizId}&friendName=${friendName}`;
        }
    }
}

// Function to handle the home page
function handleHome() {
    const startBtn = document.getElementById('start-quiz-btn');
    if (startBtn) {
        // Button on index.html is now an anchor tag, but keeping this for a fallback
        startBtn.addEventListener('click', () => {
            window.location.href = 'create.html';
        });
    }
}

// Function to handle the create page
function handleCreate() {
    const creatorForm = document.getElementById('creator-form');
    if (creatorForm) {
        creatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('creator-name').value;
            // Store creator's name and random questions in session storage
            sessionStorage.setItem('creatorName', name);
            sessionStorage.setItem('questions', JSON.stringify(pickRandom(QUESTIONS, 15)));
            // Redirect to the quiz page for the creator to answer
            window.location.href = 'quiz.html?isCreator=true';
        });
    }
}

// Function to handle the quiz page (both creator and friend)
async function handleQuiz() {
    const isCreator = new URLSearchParams(window.location.search).get('isCreator') === 'true';
    const quizId = new URLSearchParams(window.location.search).get('quiz');
    
    if (isCreator) {
        // Creator's flow: load questions from session storage
        state.creatorName = sessionStorage.getItem('creatorName');
        state.quizQuestions = JSON.parse(sessionStorage.getItem('questions'));
        state.answers = new Array(state.quizQuestions.length).fill(null);
        renderQuestion();
    } else if (quizId) {
        // Friend's flow: fetch quiz from Firebase
        const snapshot = await get(child(ref(db), `quizzes/${quizId}`));
        if (snapshot.exists()) {
            const quizData = snapshot.val();
            state.quizId = quizId;
            state.creatorName = quizData.creator;
            state.quizQuestions = quizData.questions;
            state.creatorAnswers = quizData.answers;
            state.answers = new Array(state.quizQuestions.length).fill(null);
            renderQuestion();
        } else {
            if (appContainer) appContainer.innerHTML = 'Quiz not found!';
        }
    } else {
        // Redirect to home if no valid parameters are found
        window.location.href = 'index.html';
    }

    // Add event listeners for navigation and submission
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => handleNavigation('next'));

    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => handleNavigation('prev'));

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.addEventListener('click', handleSubmit);
}

// Function to handle the result page
async function handleResult() {
    const quizId = new URLSearchParams(window.location.search).get('quizId');
    const friendName = new URLSearchParams(window.location.search).get('friendName');
    const isCreator = new URLSearchParams(window.location.search).get('creator') === 'true';

    const creatorNameEl = document.getElementById('creator-name');
    const scoreTextEl = document.getElementById('score-text');
    const friendNameEl = document.getElementById('friend-name');
    const quizRef = ref(db, `quizzes/${quizId}`);

    if (isCreator) {
        const snapshot = await get(quizRef);
        if (snapshot.exists()) {
            const creatorName = snapshot.val().creator;
            if (creatorNameEl) creatorNameEl.textContent = creatorName;
            const h2 = document.querySelector('h2');
            if (h2) h2.textContent = "Your Quiz Is Ready!";
            if (scoreTextEl) {
                scoreTextEl.innerHTML = `<p>Share this link with your friends to see how well they know you:</p>
                                        <div class="linkbox"><input type="text" value="${window.location.origin}/quiz.html?quiz=${quizId}" readonly>
                                        <button class="btn" onclick="copyLink()">Copy</button></div>`;
            }
        }
    } else if (quizId && friendName) {
        const quizSnapshot = await get(quizRef);
        if (quizSnapshot.exists()) {
            const creatorName = quizSnapshot.val().creator;
            if (creatorNameEl) creatorNameEl.textContent = creatorName;
        }
        const scoreRef = child(ref(db, `quizzes/${quizId}/scores`), friendName);
        const scoreSnapshot = await get(scoreRef);
        if (scoreSnapshot.exists()) {
            const score = scoreSnapshot.val();
            if (friendNameEl) friendNameEl.textContent = friendName;
            if (scoreTextEl) scoreTextEl.textContent = `${score} / 15`;
        } else {
            if (scoreTextEl) scoreTextEl.textContent = 'Score not found.';
        }
    } else {
        window.location.href = 'index.html';
    }
}

// Function to copy the quiz link to the clipboard
window.copyLink = function() {
    const linkInput = document.querySelector('.linkbox input');
    if (linkInput) {
        linkInput.select();
        document.execCommand('copy');
        // Use a simple, non-blocking way to show success instead of alert
        const copyBtn = document.querySelector('.linkbox button');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    }
};

// Main routing based on page URL
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/') {
        handleHome();
    } else if (path.includes('create.html')) {
        handleCreate();
    } else if (path.includes('quiz.html')) {
        handleQuiz();
    } else if (path.includes('result.html')) {
        handleResult();
    }
});

