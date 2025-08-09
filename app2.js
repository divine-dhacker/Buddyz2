// app.js
import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, push, set, get, child, onValue, remove } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- UPDATED QUESTION BANK WITH IMAGES FOR OPTIONS ---
const QUESTIONS = [
    { 
        q: "What is my favorite way to spend a Friday night?", 
        img: "https://placehold.co/1200x700/D1C4E9/673AB7?text=Friday+Night",
        options: [
            { text: "Movie night at home", img: "https://placehold.co/300x200/B2EBF2/00BCD4?text=Movie+Night" },
            { text: "Going out with friends", img: "https://placehold.co/300x200/A5D6A7/4CAF50?text=Friends+Outing" },
            { text: "Reading a book", img: "https://placehold.co/300x200/F06292/EC407A?text=Reading+Book" },
            { text: "Playing video games", img: "https://placehold.co/300x200/FFE0B2/FF9800?text=Gaming" }
        ]
    },
    { 
        q: "Which superpower would I choose?", 
        img: "https://placehold.co/1200x700/BDBDBD/424242?text=Superpower",
        options: [
            { text: "Flying", img: "https://placehold.co/300x200/CFD8DC/607D8B?text=Flying" },
            { text: "Teleportation", img: "https://placehold.co/300x200/90CAF9/2196F3?text=Teleportation" },
            { text: "Invisibility", img: "https://placehold.co/300x200/C8E6C9/4CAF50?text=Invisibility" },
            { text: "Mind-reading", img: "https://placehold.co/300x200/FFCCBC/FF5722?text=Mind+Reading" }
        ]
    },
    { 
        q: "What is my favorite animal?", 
        img: "https://placehold.co/1200x700/F8BBD0/E91E63?text=Favorite+Animal",
        options: [
            { text: "Dog", img: "https://placehold.co/300x200/B39DDB/512DA8?text=Dog+Icon" },
            { text: "Cat", img: "https://placehold.co/300x200/DCE775/AFB42B?text=Cat+Icon" },
            { text: "Red Panda", img: "https://placehold.co/300x200/A1887F/5D4037?text=Red+Panda" },
            { text: "Dolphin", img: "https://placehold.co/300x200/81D4FA/039BE5?text=Dolphin" }
        ]
    },
    { 
        q: "Which food is my biggest craving?", 
        img: "https://placehold.co/1200x700/F06292/EC407A?text=Food+Craving",
        options: [
            { text: "Tacos", img: "https://placehold.co/300x200/FFCCBC/FF5722?text=Tacos" },
            { text: "Jollof Rice", img: "https://placehold.co/300x200/E57373/F44336?text=Jollof" },
            { text: "Burgers", img: "https://placehold.co/300x200/DCE775/AFB42B?text=Burger" },
            { text: "Sushi", img: "https://placehold.co/300x200/C5CAE9/3F51B5?text=Sushi" }
        ]
    },
    { 
        q: "What's my go-to karaoke song?", 
        img: "https://placehold.co/1200x700/A1887F/5D4037?text=Karaoke+Night",
        options: [
            { text: "Bohemian Rhapsody", img: "https://placehold.co/300x200/CFD8DC/607D8B?text=Bohemian" },
            { text: "Don't Stop Believin'", img: "https://placehold.co/300x200/F06292/EC407A?text=Journey" },
            { text: "Africa by Toto", img: "https://placehold.co/300x200/B2EBF2/00BCD4?text=Toto" },
            { text: "Single Ladies", img: "https://placehold.co/300x200/FFE0B2/FF9800?text=Beyonce" }
        ]
    },
    { 
        q: "What's my favorite season?", 
        img: "https://placehold.co/1200x700/BDBDBD/424242?text=Seasons",
        options: [
            { text: "Spring", img: "https://placehold.co/300x200/C8E6C9/4CAF50?text=Spring" },
            { text: "Summer", img: "https://placehold.co/300x200/FFF9C4/FFEB3B?text=Summer" },
            { text: "Autumn", img: "https://placehold.co/300x200/FFCCBC/FF5722?text=Autumn" },
            { text: "Winter", img: "https://placehold.co/300x200/E3F2FD/2196F3?text=Winter" }
        ]
    },
    { 
        q: "What is my dream car?", 
        img: "https://placehold.co/1200x700/FFCCBC/FF5722?text=Dream+Car",
        options: [
            { text: "Tesla Model S", img: "https://placehold.co/300x200/A5D6A7/4CAF50?text=Tesla" },
            { text: "Vintage Mustang", img: "https://placehold.co/300x200/D1C4E9/673AB7?text=Mustang" },
            { text: "Lamborghini", img: "https://placehold.co/300x200/EF9A9A/F44336?text=Lambo" },
            { text: "Volkswagen Bus", img: "https://placehold.co/300x200/FFF9C4/FFEB3B?text=VW+Bus" }
        ]
    },
    { 
        q: "Which book genre do I love most?", 
        img: "https://placehold.co/1200x700/DCE775/AFB42B?text=Book+Genres",
        options: [
            { text: "Fantasy", img: "https://placehold.co/300x200/CFD8DC/607D8B?text=Fantasy" },
            { text: "Mystery", img: "https://placehold.co/300x200/C5CAE9/3F51B5?text=Mystery" },
            { text: "Sci-Fi", img: "https://placehold.co/300x200/B39DDB/512DA8?text=Sci-Fi" },
            { text: "Thriller", img: "https://placehold.co/300x200/F06292/EC407A?text=Thriller" }
        ]
    },
    { 
        q: "What is my favorite holiday?", 
        img: "https://placehold.co/1200x700/A5D6A7/4CAF50?text=Holiday",
        options: [
            { text: "Christmas", img: "https://placehold.co/300x200/FFCDD2/F44336?text=Christmas" },
            { text: "Halloween", img: "https://placehold.co/300x200/FFECB3/FFC107?text=Halloween" },
            { text: "New Year's Eve", img: "https://placehold.co/300x200/C5CAE9/3F51B5?text=New+Years" },
            { text: "Thanksgiving", img: "https://placehold.co/300x200/E3F2FD/2196F3?text=Thanksgiving" }
        ]
    },
    { 
        q: "What's my go-to comfort food?", 
        img: "https://placehold.co/1200x700/EF9A9A/F44336?text=Comfort+Food",
        options: [
            { text: "Ice cream", img: "https://placehold.co/300x200/FFF9C4/FFEB3B?text=Ice+Cream" },
            { text: "Pizza", img: "https://placehold.co/300x200/CFD8DC/607D8B?text=Pizza" },
            { text: "Mac & Cheese", img: "https://placehold.co/300x200/A5D6A7/4CAF50?text=Mac+%26+Cheese" },
            { text: "Chocolate", img: "https://placehold.co/300x200/BDBDBD/424242?text=Chocolate" }
        ]
    },
    { 
        q: "What's my favorite genre of music?", 
        img: "https://placehold.co/1200x700/C5CAE9/3F51B5?text=Music",
        options: [
            { text: "Pop", img: "https://placehold.co/300x200/F06292/EC407A?text=Pop" },
            { text: "Rock", img: "https://placehold.co/300x200/D1C4E9/673AB7?text=Rock" },
            { text: "Hip-Hop", img: "https://placehold.co/300x200/B2EBF2/00BCD4?text=Hip-Hop" },
            { text: "Classical", img: "https://placehold.co/300x200/B39DDB/512DA8?text=Classical" }
        ]
    },
    { 
        q: "Where would I rather live?", 
        img: "https://placehold.co/1200x700/B39DDB/512DA8?text=Dream+Location",
        options: [
            { text: "Big city", img: "https://placehold.co/300x200/BDBDBD/424242?text=City" },
            { text: "Cozy cabin in the woods", img: "https://placehold.co/300x200/A5D6A7/4CAF50?text=Woods" },
            { text: "House by the beach", img: "https://placehold.co/300x200/81D4FA/039BE5?text=Beach" },
            { text: "Quiet suburban neighborhood", img: "https://placehold.co/300x200/C8E6C9/4CAF50?text=Suburb" }
        ]
    }
];

const appContainer = document.getElementById('app');
let state = {
  quizId: null,
  creatorName: "",
  quizQuestions: [],
  creatorAnswers: [],
  friendAnswers: [],
  currentQuestionIndex: 0,
};

// Utility functions
function pickRandom(arr, n) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    // Using custom alert in real app, not native alert()
    const alertBox = document.createElement('div');
    alertBox.textContent = 'Link copied to clipboard!';
    alertBox.style = "position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.2);";
    document.body.appendChild(alertBox);
    setTimeout(() => {
        document.body.removeChild(alertBox);
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
  document.body.removeChild(textarea);
}

// Function to toggle hamburger menu
function toggleMenu() {
    const menuOverlay = document.getElementById('menu-overlay');
    if (menuOverlay) {
        menuOverlay.classList.toggle('open');
    }
}

// Function to handle the home page logic
function handleHome() {
  const startBtn = document.getElementById('start-quiz-btn');
  if (startBtn) {
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
      sessionStorage.setItem('creatorName', name);
      // Select 15 random questions and store them
      const selectedQuestions = pickRandom(QUESTIONS, 12);
      sessionStorage.setItem('questions', JSON.stringify(selectedQuestions));
      window.location.href = 'quiz.html?isCreator=true';
    });
  }
}

// Function to handle the quiz page (both creator and friend)
function handleQuiz() {
  const isCreator = new URLSearchParams(window.location.search).get('isCreator') === 'true';
  const quizId = new URLSearchParams(window.location.search).get('quiz');
  
  if (isCreator) {
    state.creatorName = sessionStorage.getItem('creatorName');
    state.quizQuestions = JSON.parse(sessionStorage.getItem('questions'));
    state.creatorAnswers = new Array(state.quizQuestions.length).fill(null);
    document.getElementById('page-title').textContent = `Your Quiz for ${state.creatorName}`;
    renderQuizStep(isCreator);
  } else if (quizId) {
    get(child(ref(db), `quizzes/${quizId}`)).then(snapshot => {
      if (snapshot.exists()) {
        const quizData = snapshot.val();
        state.quizId = quizId;
        state.creatorName = quizData.creator;
        state.quizQuestions = quizData.questions;
        state.creatorAnswers = quizData.answers;
        state.friendAnswers = new Array(state.quizQuestions.length).fill(null);
        document.getElementById('page-title').textContent = `The ${state.creatorName} Quiz`;
        renderQuizStep(isCreator);
      } else {
        appContainer.innerHTML = `<div class="card"><h2>Quiz not found!</h2><p>The quiz you are looking for may have expired or been deleted.</p><a href="index.html" class="btn">Go Home</a></div>`;
      }
    });
  } else {
    window.location.href = 'index.html';
  }
}

function renderQuizStep(isCreator) {
    const question = state.quizQuestions[state.currentQuestionIndex];
    if (!question) {
        if (isCreator) {
            saveQuizToFirebase();
        } else {
            calculateFriendScore();
        }
        return;
    }

    const html = `
        <div class="question-card">
            <img src="${question.img}" alt="Question image" class="q-image" />
            <div style="font-size: 20px; font-weight: 600; margin-top: 12px;">
                ${state.currentQuestionIndex + 1}. ${question.q}
            </div>
            <div class="options">
                ${question.options.map((opt, i) => `
                    <div class="opt" data-option="${opt.text}">
                        <img src="${opt.img}" alt="${opt.text}" />
                        <span>${opt.text}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div style="margin-top: 18px; display: flex; justify-content: flex-end;">
            <button id="next-btn" class="btn" disabled>Next</button>
        </div>
    `;

    appContainer.innerHTML = html;
    
    const progressPercent = ((state.currentQuestionIndex + 1) / state.quizQuestions.length) * 100;
    document.querySelector('.progress .bar').style.width = `${progressPercent}%`;

    const options = appContainer.querySelectorAll('.opt');
    const nextBtn = document.getElementById('next-btn');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            nextBtn.disabled = false;
            if (isCreator) {
                state.creatorAnswers[state.currentQuestionIndex] = opt.dataset.option;
            } else {
                state.friendAnswers[state.currentQuestionIndex] = opt.dataset.option;
            }
        });
    });

    nextBtn.addEventListener('click', () => {
        state.currentQuestionIndex++;
        renderQuizStep(isCreator);
    });
}

function saveQuizToFirebase() {
  const quizzesRef = ref(db, 'quizzes');
  const newQuizRef = push(quizzesRef);
  set(newQuizRef, {
    creator: state.creatorName,
    questions: state.quizQuestions,
    answers: state.creatorAnswers,
    createdAt: new Date().toISOString()
  }).then(() => {
    const quizId = newQuizRef.key;
    displayShareLink(quizId);
  }).catch(error => {
    appContainer.innerHTML = `<div class="card"><h2>Error!</h2><p>Could not save your quiz. Please try again.</p></div>`;
  });
}

function displayShareLink(quizId) {
    const quizLink = `${window.location.origin}/quiz.html?quiz=${quizId}`;
    const html = `
        <div class="question-card">
            <h2>Your Quiz is Ready!</h2>
            <p>Share this link with your friends to see who knows you best:</p>
            <div class="linkbox">
                <input type="text" value="${quizLink}" readonly />
                <button class="btn" onclick="copyToClipboard('${quizLink}')">Copy</button>
            </div>
            <p style="margin-top: 18px;">Quiz ID: <b>${quizId}</b></p>
        </div>
    `;
    appContainer.innerHTML = html;
}

function calculateFriendScore() {
    let score = 0;
    const params = new URLSearchParams(window.location.search);
    const friendName = params.get('friendName');
    
    for (let i = 0; i < state.creatorAnswers.length; i++) {
        if (state.creatorAnswers[i] === state.friendAnswers[i]) {
            score++;
        }
    }

    window.location.href = `result.html?score=${score}&total=${state.quizQuestions.length}&creator=${state.creatorName}&friend=${friendName}`;
}

function handleResult() {
  const params = new URLSearchParams(window.location.search);
  const score = params.get('score');
  const total = params.get('total');
  const creatorName = params.get('creator');
  const friendName = params.get('friend');

  const html = `
      <div class="question-card">
          <h2>${friendName} vs ${creatorName}</h2>
          <p style="font-size: 24px; font-weight: 700; color: var(--accent);">You got ${score} out of ${total} correct!</p>
          <div style="margin-top: 18px;">
            <a href="index.html" class="btn">Play Again</a>
          </div>
      </div>
  `;
  appContainer.innerHTML = html;
}

// Main routing based on page URL
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.menu-btn, .close-btn').forEach(btn => {
      btn.addEventListener('click', toggleMenu);
  });
  
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

