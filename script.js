// ========================================
// VALENTINE'S DAY WEBSITE - MAIN SCRIPT
// ========================================

// State Management
const state = {
    part1Attempts: 0,
    part2Attempts: 0,
    part3Attempts: 0,
    currentQuestion: 1,
    quizAnswered: false,
    q1Answered: false
};

const escalationAudioCache = {};
let escalationAudioUnlocked = false;

// Quiz Data
const quizData = [
    {
        question: "1. What is my cat's name?",
        answers: [
            { text: "A. Korra", correct: false },
            { text: "B. Feline General Koraline", correct: false },
            { text: "C. Meowkora", correct: false },
            { text: "D. Kora Bora", correct: false }
        ],
        response: "Wow, so you hate your future daughter? 💔",
        hint: "Try hovering over here",
        correctAnswer: "Feline General Meowkora"
    },
    {
        question: "2. What is my ideal ideal date night activity?",
        answers: [
            { text: "A. Cooking a fancy meal from scratch together", correct: true, response: "And then bake a sweet treat together 🧁" },
            { text: "B. Late-night drive with no destination and a good playlist", correct: true, response: "Correct, but you better add at least 1 PATD! song 🚗🎶" },
            { text: "C. Going to a loud club to dance all night", correct: false, response: "Oh.. HELL NAH" },
            { text: "D. Building a blanket fort and watching movies until we pass out", correct: true, response: "Elite tier. You get VIP access to the fort 🏰✨" }
        ]
    },
    {
        question: "3. What's my favorite thing to eat?",
        answers: [
            { text: "A. Sky's Vanilla Chai Cinnamon Snickerdoodles", correct: true, response: "They will be, I'm sure :))" },
            { text: "B. Quesadillas", correct: true, response: "Ofc. It's just a better sandwich 😌" },
            { text: "C. Sky's other cookie 👀", correct: true, response: "Maybe you'll see at some point just how true this is..." },
            { text: "D. Kora", correct: false, response: "Nah... but I do threaten to eat her probably once a week." }
        ]
    },
    {
        question: "4. What's the best painting medium?",
        answers: [
            { text: "A. Oil Pastels", correct: false, response: "HELL NO."},
            { text: "B. Acrylic", correct: false , response: "Nah... but not terrible"},
            { text: "C. Watercolor", correct: true, response: "a reasonable answer..."},
            { text: "D. Digital", correct: true, response: "The only correct answer."}
        ]
    },
    {
        question: "5. Who's the prettiest girl in the world?",
        answers: [
            { text: "A. Kora", correct: true, response: "Queen Kora 👑"},
            { text: "B. Chai", correct: true , response: "Cool and serene, like a mornign tea"},
            { text: "C. Poppie", correct: true, response: "Sweetheart like a PopTart"},
            { text: "D. Sky", correct: true, response: "Your eyes glow bright, a sun within the Sky, A beauty I hope to wake to every day. Hold close to me as endless years go by, And let your gentle heart be mine to stay"}
        ]
    },
    {
        question: "6-7. Watch this meme edit...",
        isVideo: true,
        videoFile: "assets/videos/6-7_meme_edit.mp4",
        response: "That's hilarious 😂"
    },
    {
        question: "8. Pick the best venue for our wedding to be:",
        answers: [
            { text: "A. A sun-drenched beach in Costa Rica", correct: true, response: "Back to my homeland 🥰" },
            { text: "B. A lush botanical garden surrounded by flowers", correct: true, response: "Accepted! Only if you promise not to sneeze down the aisle 🌸" },
            { text: "C. A cozy, twinkling-light backyard wedding", correct: true, response: "Immaculate vibes. Saving half the budget for the honeymoon 🕯️" },
            { text: "D. A court house in full casual clothes", correct: false, response: "So I'm reporting you to the IRS for Insider Trading and Tax Evasion 🚨" }
        ]
    },
    {
        question: "9. Whose are you?",
        answers: [
            { text: "A. Yours", correct: true, response: "Fiiinnneee... I guess I'll go out with you 💌" },
            { text: "B. Daniel's", correct: true, response: "Fiiinnneee... I guess I'll go out with you 💌" },
            { text: "C. Kora's father's", correct: true, response: "Fiiinnneee... I guess I'll go out with you 💌" },
            { text: "D. My baby's", correct: true, response: "Fiiinnneee... I guess I'll go out with you 💌" }
        ],
        hasEasterEgg: true
    }
];

// ========================================
// PART 1: VALENTINE'S QUESTION
// ========================================

function initPart1() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    yesBtn.addEventListener('click', () => {
        showSection('quiz-section');
        initQuiz();
    });

    // alternating hemisphere flag for evasion
    state.part1NextLeft = true;

    noBtn.addEventListener('mouseover', (e) => {
        // stop evading after 20 attempts
        if (state.part1Attempts >= 20) return;

        state.part1Attempts++;
        updateAttemptsDisplay();

        // move to alternating hemisphere
        alternateHemisphereEvade(noBtn, 'part1NextLeft');

        if (state.part1Attempts % 5 === 0) {
            // Play escalation audio/images at 5,10,15,20
            showEscalationImage(state.part1Attempts);
        }

        // after 20 attempts, allow click to proceed to Q2
        if (state.part1Attempts === 20) {
            const finalize = () => {
                showSection('escalation-q2');
                initEscalationQ2();
                noBtn.removeEventListener('click', finalize);
            };
            noBtn.addEventListener('click', finalize);
        }
    });
}

function evadeButton(btn, event) {
    // Get the container bounds to constrain movement
    const container = btn.closest('.valentine-container') || btn.closest('.quiz-container');
    const container_rect = container.getBoundingClientRect();
    
    // Define safe area INSIDE the container with padding
    const padding = 20;
    const minX = container_rect.left + padding;
    const minY = container_rect.top + padding;
    const maxX = container_rect.right - btn.offsetWidth - padding;
    const maxY = container_rect.bottom - btn.offsetHeight - padding;

    // Generate random position within safe bounds
    const new_x = Math.random() * (maxX - minX) + minX;
    const new_y = Math.random() * (maxY - minY) + minY;

    // First time: switch to fixed positioning
    if (!btn.classList.contains('evading')) {
        btn.style.position = 'fixed';
        btn.style.left = btn.offsetLeft + 'px';
        btn.style.top = btn.offsetTop + 'px';
        btn.classList.add('evading');
    }
    
    // Always move to new random position
    btn.style.left = new_x + 'px';
    btn.style.top = new_y + 'px';
}

// New evasion: alternate between left and right hemispheres
function alternateHemisphereEvade(btn, stateFlagKey) {
    const padding = 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const midX = vw / 2;

    let minX, maxX;
    if (state[stateFlagKey]) {
        // left hemisphere
        minX = padding;
        maxX = Math.max(padding, midX - btn.offsetWidth - padding);
    } else {
        // right hemisphere
        minX = Math.min(vw - btn.offsetWidth - padding, midX + padding);
        maxX = vw - btn.offsetWidth - padding;
    }

    const minY = padding;
    const maxY = vh - btn.offsetHeight - padding;

    const new_x = (maxX > minX) ? (Math.random() * (maxX - minX) + minX) : minX;
    const new_y = (maxY > minY) ? (Math.random() * (maxY - minY) + minY) : minY;

    if (!btn.classList.contains('evading')) {
        btn.style.position = 'fixed';
        btn.classList.add('evading');
        btn.style.zIndex = '9999';
    }

    btn.style.left = `${Math.round(new_x)}px`;
    btn.style.top = `${Math.round(new_y)}px`;

    // toggle hemisphere for next move
    state[stateFlagKey] = !state[stateFlagKey];
}

function updateAttemptsDisplay() {
    const display = document.getElementById('attempts-display');
    display.textContent = `Attempts: ${state.part1Attempts}`;
}

function showEscalationImage(attemptCount) {
    const imageDiv = document.getElementById('escalation-image');
    const imageNum = (attemptCount / 5);
    const imagePath = `assets/images/escalation_${imageNum}.png`;

    imageDiv.innerHTML = `<img src="${imagePath}" alt="Escalation image ${imageNum}">`;

    preloadEscalationAudio(imageNum);
    playEscalationAudio(imageNum);
}

function preloadEscalationAudio(audioNum) {
    const audioPath = `assets/audio/escalation_${audioNum}.mp3`;
    if (!escalationAudioCache[audioNum]) {
        const audio = new Audio(audioPath);
        audio.preload = 'auto';
        audio.volume = 0.8;
        audio.muted = true;
        audio.play().catch(() => {
            // muted playback may still fail in some environments, but keep the object cached
        });
        escalationAudioCache[audioNum] = audio;
    }
}

function playEscalationAudio(audioNum) {
    let audio = escalationAudioCache[audioNum];
    if (!audio) {
        preloadEscalationAudio(audioNum);
        audio = escalationAudioCache[audioNum];
    }
    audio.muted = false;
    audio.currentTime = 0;
    audio.play().catch(err => {
        console.warn('Escalation audio play failed:', err);
    });
}

function handleEscalationQ2() {
    showSection('escalation-q2');
    initEscalationQ2();
}

// ========================================
// ESCALATION QUESTION 2: "So you hate me?"
// ========================================

function initEscalationQ2() {
    const noBtn = document.getElementById('q2YesBtn');
    const yesBtn = document.getElementById('q2NoBtn');

    // Quick No route: clicking No sends user to the quiz immediately
    noBtn.addEventListener('click', () => {
        showSection('quiz-section');
        initQuiz();
    });

    // The Yes button is evasive in this screen (matches part1 No behavior)
    state.part2NextLeft = true;
    yesBtn.addEventListener('mouseover', (e) => {
        if (state.part2Attempts >= 20) return;

        state.part2Attempts++;
        updateQ2AttemptsDisplay();
        alternateHemisphereEvade(yesBtn, 'part2NextLeft');

        if (state.part2Attempts % 5 === 0) {
            showQ2EscalationImage(state.part2Attempts);
        }

        if (state.part2Attempts === 20) {
            // allow click to proceed to Q3 after 20 evasion attempts
            const finalize = () => {
                showSection('escalation-q3');
                initEscalationQ3();
                yesBtn.removeEventListener('click', finalize);
            };
            yesBtn.addEventListener('click', finalize);
        }
    });
}

function updateQ2AttemptsDisplay() {
    const display = document.getElementById('q2-attempts-display');
    display.textContent = `Attempts: ${state.part2Attempts}`;
}

function showQ2EscalationImage(attemptCount) {
    const imageDiv = document.getElementById('q2-escalation-image');
    const imageNum = (attemptCount / 5) + 4; // Continuing from image 5+
    const imagePath = `assets/images/escalation_${imageNum}.png`;

    imageDiv.innerHTML = `<img src="${imagePath}" alt="Escalation image ${imageNum}">`;

    // Preload and play the matching audio cue at 5/10/15/20 on screen 2
    const audioIndex = attemptCount / 5; // 1..4
    preloadEscalationAudio(audioIndex);
    playEscalationAudio(audioIndex);
}

// ========================================
// ESCALATION QUESTION 3: "Does your mom know you're gay?"
// ========================================

function initEscalationQ3() {
    const yesBtn = document.getElementById('q3YesBtn');
    const noBtn = document.getElementById('q3NoBtn');

    // Remove any previously added next button
    const existing = document.getElementById('q3-next-btn');
    if (existing) existing.remove();

    // Optionally show a little image, then reveal Next button after a short delay
    setTimeout(() => {
        const container = document.querySelector('#escalation-q3 .first_date-container');
        const next = document.createElement('button');
        next.id = 'q3-next-btn';
        next.className = 'btn btn-next';
        next.textContent = 'Next Question →';
        next.style.marginTop = '18px';
        next.addEventListener('click', () => {
            showSection('quiz-section');
            initQuiz();
        });
        container.appendChild(next);
    }, 1200);
}

function showCatLaughingImage() {
    const resultDiv = document.getElementById('q3-result');
    resultDiv.innerHTML = `<img src="assets/images/cat_laughing.png" alt="Cat laughing">`;
}

// ========================================
// QUIZ SECTION
// ========================================

function initQuiz() {
    state.currentQuestion = 1;
    showQuestion(1);
}

function showQuestion(questionNum) {
    const questionDisplay = document.getElementById('question-display');
    const responseDisplay = document.getElementById('response-display');
    
    responseDisplay.classList.add('hidden');
    questionDisplay.classList.remove('hidden');
    
    const question = quizData[questionNum - 1];
    
    // Handle special video question (6-7)
    if (question.isVideo) {
        // Clear any previous question structure first
        questionDisplay.innerHTML = `
            <h2>${question.question}</h2>
            <video controls style="max-width: 100%; margin: 30px 0; border-radius: 20px;">
                <source src="${question.videoFile}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        
        const responseDisplay = document.getElementById('response-display');
        responseDisplay.classList.remove('hidden');
        document.getElementById('response-text').textContent = '';
        document.getElementById('response-media').innerHTML = '';
        
        const nextBtn = document.getElementById('next-question-btn');
        nextBtn.classList.add('hidden');
        
        setTimeout(() => {
            nextBtn.classList.remove('hidden');
            nextBtn.onclick = () => {
                // IMPORTANT: Clear the video and restore structure for next question
                questionDisplay.innerHTML = `<h2></h2><div id="answers-container" class="answers-container"></div>`;
                responseDisplay.classList.add('hidden');
                state.currentQuestion++;
                showQuestion(state.currentQuestion);
            };
        }, 1000);
        return;
    }

    // Regular question
    // Make sure the structure is preserved
    if (!questionDisplay.querySelector('h2')) {
        questionDisplay.innerHTML = `<h2></h2><div id="answers-container" class="answers-container"></div>`;
    }
    questionDisplay.querySelector('h2').textContent = question.question;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn full-width';
        btn.textContent = answer.text;
        
        // Question 1 special logic
        if (questionNum === 1) {
            btn.addEventListener('click', () => {
                if (!state.q1Answered) {
                    // Show the wrong answer response BUT keep questions visible
                    const responseDisplay = document.getElementById('response-display');
                    const responseTextElement = document.getElementById('response-text');
                    const responseMedia = document.getElementById('response-media');
                    
                    responseTextElement.textContent = question.response;
                    responseMedia.innerHTML = '';
                    responseDisplay.classList.remove('hidden');
                    
                    // After showing wrong answer, set up hover hint
                    setTimeout(() => {
                        showHint(question.hint);
                    }, 5000);
                }
            });
        }
        // Question 4-5 special logic
        else if (questionNum === 4) {
            btn.addEventListener('click', () => {
                if (answer.correct) {
                    showResponse(answer.response);
                } else {
                    showResponse("Try Again", {advance: false});
                }
            });
        }
        // Question 9 special logic
        else if (questionNum === 9) {
            // For button B (index 1), skip - it's handled exclusively by addQ9EasterEgg()
            if (index !== 1) {
                btn.addEventListener('click', () => {
                    showResponse("Fiiinnneee... I guess I'll be your Valentine 💌");
                });
            }
        }
        // Regular questions
        else {
            btn.addEventListener('click', () => {
                showResponse(answer.response || answer.text);
            });
        }
        
        answersContainer.appendChild(btn);
    });

    // Question 1 special: hover hint for bottom right
    if (questionNum === 1 && !state.q1Answered) {
        addQ1HoverHint(questionDisplay);
    }

    // Question 9 special: easter egg hover
    if (questionNum === 9) {
        addQ9EasterEgg(questionDisplay);
    }
}

function addQ1HoverHint(questionDisplay) {
    const hintZone = document.createElement('div');
    hintZone.style.position = 'fixed';
    hintZone.style.bottom = '0';
    hintZone.style.right = '0';
    hintZone.style.width = '200px';
    hintZone.style.height = '200px';
    hintZone.style.zIndex = '999';
    
    let hintShown = false;
    
    hintZone.addEventListener('mouseenter', () => {
        if (!hintShown && !state.q1Answered) {
            hintShown = true;
            const answersContainer = document.getElementById('answers-container');
            const buttons = answersContainer.querySelectorAll('.answer-btn');
            buttons[1].textContent = 'B. Feline General Meowkora'; // Correct answer
            buttons[1].style.background = 'var(--pastel-red)';
            buttons[1].style.color = 'white';
            
            state.q1Answered = true;
            
            buttons[1].addEventListener('click', () => {
                showResponse("YESSS! You're not a disappointment 💕");
                // Use the normal Next button flow instead of auto-advancing
                const nextBtn = document.getElementById('next-question-btn');
                setTimeout(() => {
                    nextBtn.classList.remove('hidden');
                    nextBtn.onclick = () => {
                        state.currentQuestion = 2;
                        showQuestion(2);
                    };
                }, 1000);
            });
        }
    });
    
    document.body.appendChild(hintZone);
}

function addQ9EasterEgg(questionDisplay) {
    const easterEggZone = document.createElement('div');
    easterEggZone.style.position = 'fixed';
    easterEggZone.style.bottom = '0';
    easterEggZone.style.right = '0';
    easterEggZone.style.width = '200px';
    easterEggZone.style.height = '200px';
    easterEggZone.style.zIndex = '9999';
    easterEggZone.style.cursor = 'pointer';
    
    let easterEggActive = false;
    
    easterEggZone.addEventListener('mouseenter', () => {
        const answersContainer = document.getElementById('answers-container');
        const buttons = answersContainer.querySelectorAll('.answer-btn');
        if (!easterEggActive) {
            easterEggActive = true;
            buttons[1].textContent = 'B. Erwin Smith\'s';
            buttons[1].style.background = 'var(--pastel-red)';
            buttons[1].style.color = 'white';
        }
    });
    
    easterEggZone.addEventListener('mouseleave', () => {
        const answersContainer = document.getElementById('answers-container');
        const buttons = answersContainer.querySelectorAll('.answer-btn');
        easterEggActive = false;
        buttons[1].textContent = 'B. Daniel\'s';
        buttons[1].style.background = '';
        buttons[1].style.color = '';
    });
    
    // Add the ONLY click listener for button B
    const answersContainer = document.getElementById('answers-container');
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    buttons[1].addEventListener('click', () => {
        // Check if easter egg is active
        if (buttons[1].textContent.includes('Erwin')) {
            playErwinEdit();
        } else {
            // Normal response
            showResponse("Fiiinnneee... I guess I'll be your Valentine 💌");
        }
    });
    
    document.body.appendChild(easterEggZone);
}

function playErwinEdit() {
    const responseDisplay = document.getElementById('response-display');
    const responseMedia = document.getElementById('response-media');
    const responseText = document.getElementById('response-text');
    
    responseDisplay.classList.remove('hidden');
    document.getElementById('question-display').classList.add('hidden');
    
    responseText.textContent = '';
    responseMedia.innerHTML = `
        <video controls autoplay style="max-width: 100%; margin: 30px 0; border-radius: 20px;">
            <source src="assets/videos/erwin_smith_edit.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
    
    setTimeout(() => {
        showFinalSection();
    }, 4000);
}

function showHint(hintText) {
    // Try to show in escalation section (for Part 1-3 questions)
    const escalationTextDiv = document.getElementById('escalation-text');
    if (escalationTextDiv && !escalationTextDiv.classList.contains('hidden')) {
        escalationTextDiv.textContent = hintText;
    } else {
        // For quiz section, show as an overlay hint
        const hintOverlay = document.createElement('div');
        hintOverlay.id = 'hint-overlay';
        hintOverlay.style.position = 'fixed';
        hintOverlay.style.bottom = '30px';
        hintOverlay.style.right = '30px';
        hintOverlay.style.padding = '15px 25px';
        hintOverlay.style.background = 'var(--pastel-pink)';
        hintOverlay.style.border = '3px solid var(--pastel-purple)';
        hintOverlay.style.borderRadius = '15px';
        hintOverlay.style.fontSize = '18px';
        hintOverlay.style.fontWeight = 'bold';
        hintOverlay.style.color = 'var(--pastel-purple)';
        hintOverlay.style.zIndex = '500';
        hintOverlay.style.animation = 'fadeIn 0.5s ease-in';
        hintOverlay.textContent = hintText;
        
        document.body.appendChild(hintOverlay);
    }
}

function showResponse(responseText, options = {}) {
    const responseDisplay = document.getElementById('response-display');
    const questionDisplay = document.getElementById('question-display');
    const responseTextElement = document.getElementById('response-text');
    const responseMedia = document.getElementById('response-media');
    
    questionDisplay.classList.add('hidden');
    responseDisplay.classList.remove('hidden');
    
    responseTextElement.textContent = responseText;
    responseMedia.innerHTML = '';
    
    const nextBtn = document.getElementById('next-question-btn');
    nextBtn.classList.add('hidden');
    const advance = options.advance !== undefined ? options.advance : true;

    setTimeout(() => {
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => {
            questionDisplay.classList.remove('hidden');
            responseDisplay.classList.add('hidden');
            if (advance) {
                if (state.currentQuestion < quizData.length) {
                    state.currentQuestion++;
                    showQuestion(state.currentQuestion);
                } else {
                    showFinalSection();
                }
            } else {
                // stay on same question for retry
                showQuestion(state.currentQuestion);
            }
        };
    }, 1000);
}

function showFinalSection() {
    showSection('final-section');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showSection(sectionId) {
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initPart1();
});
