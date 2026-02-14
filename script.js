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
        response: "Wow, so you hate your daughter? 💔",
        hint: "Try hovering over here",
        correctAnswer: "Feline General Meowkora"
    },
    {
        question: "2. What is my favorite beverage?",
        answers: [
            { text: "A. Diet Coke", correct: true, response: "Wow, the boringly correct answer smh 🤓" },
            { text: "B. Milk", correct: false, response: "Only if it's Alison's Milk 😌" },
            { text: "C. Skittles Water", correct: false },
            { text: "D. Alison's Milk", correct: true, response: "Mmm mommy's milk 🥛🤤" }
        ]
    },
    {
        question: "3. What's the best video game of all time?",
        answers: [
            { text: "A. Batman: Arkham City", correct: false, response: "THIS GIRL KNOWS BALL" },
            { text: "B. Legend of Zelda", correct: false, response: "Nah. Cringe." },
            { text: "C. Catan", correct: false, response: "Fine... I'll allow it..." },
            { text: "D. Super Smash Bros Ultimate", correct: false, response: "HeLl NAh, tHAt GaME iS CrinGe" }
        ]
    },
    {
        question: "4-5. Who's my greatest rival and what's their greatest power?",
        answers: [
            { text: "A. Sweet treats and their power against my waistline", correct: false },
            { text: "B. The outdoors and its power to be cringe", correct: false },
            { text: "C. New Jersey Drivers and their power to be lunatics", correct: false },
            { text: "D. Thea and her power to 6-7", correct: true, response: "Correct!" }
        ]
    },
    {
        question: "6-7. Watch this meme edit...",
        isVideo: true,
        videoFile: "assets/videos/6-7_meme_edit.mp4",
        response: "That's hilarious 😂"
    },
    {
        question: "8. I am...?",
        answers: [
            { text: "A. Costa Rican", response: "The bare minimum 🥰" },
            { text: "B. Dominican", response: "So I'm reporting you to the IRS for Insider Trading and Tax Evasion" },
            { text: "C. Puerto Rican", response: "So I'm reporting you to the IRS for Insider Trading and Tax Evasion" },
            { text: "D. Bruh... you better not answer C", response: "So I'm reporting you to the IRS for Insider Trading and Tax Evasion" }
        ]
    },
    {
        question: "9. Whose are you?",
        answers: [
            { text: "A. Yours", response: "Fiiinnneee... I guess I'll be your Valentine 💌" },
            { text: "B. Daniel's", response: "Fiiinnneee... I guess I'll be your Valentine 💌" },
            { text: "C. Daddy's", response: "Fiiinnneee... I guess I'll be your Valentine 💌" },
            { text: "D. My baby's", response: "Fiiinnneee... I guess I'll be your Valentine 💌" }
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

    noBtn.addEventListener('mouseover', (e) => {
        state.part1Attempts++;
        updateAttemptsDisplay();
        evadeButton(noBtn, e);
        
        if (state.part1Attempts % 5 === 0) {
            showEscalationImage(state.part1Attempts);
        }

        if (state.part1Attempts === 20) {
            handleEscalationQ2();
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

function updateAttemptsDisplay() {
    const display = document.getElementById('attempts-display');
    display.textContent = `Attempts: ${state.part1Attempts}`;
}

function showEscalationImage(attemptCount) {
    const imageDiv = document.getElementById('escalation-image');
    const imageNum = (attemptCount / 5);
    const imagePath = `assets/images/escalation_${imageNum}.png`;
    
    imageDiv.innerHTML = `<img src="${imagePath}" alt="Escalation image ${imageNum}">`;
    
    // Always play audio after displaying image
    playEscalationAudio(imageNum);
}

function playEscalationAudio(audioNum) {
    try {
        const audioPath = `assets/audio/escalation_${audioNum}.mp3`;
        const audio = new Audio(audioPath);
        audio.volume = 0.7;
        
        // Attempt to play immediately
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Autoplay succeeded
                })
                .catch(error => {
                    // Autoplay was likely prevented, try muted approach
                    console.warn('Autoplay blocked, attempting with user consent');
                    audio.muted = false;
                    audio.play().catch(err => {
                        console.warn('Audio failed to play:', err);
                    });
                });
        }
    } catch (error) {
        console.warn('Audio playback error:', error);
    }
}

function handleEscalationQ2() {
    showSection('escalation-q2');
    initEscalationQ2();
}

// ========================================
// ESCALATION QUESTION 2: "So you hate me?"
// ========================================

function initEscalationQ2() {
    const yesBtn = document.getElementById('q2YesBtn');
    const noBtn = document.getElementById('q2NoBtn');

    yesBtn.addEventListener('click', () => {
        showSection('escalation-q3');
        initEscalationQ3();
    });

    noBtn.addEventListener('mouseover', (e) => {
        state.part2Attempts++;
        updateQ2AttemptsDisplay();
        evadeButton(noBtn, e);

        if (state.part2Attempts % 5 === 0) {
            showQ2EscalationImage(state.part2Attempts);
        }

        if (state.part2Attempts === 20) {
            showSection('escalation-q3');
            initEscalationQ3();
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
    
    // Play audio with the image
    playEscalationAudio(imageNum);
}

// ========================================
// ESCALATION QUESTION 3: "Does your mom know you're gay?"
// ========================================

function initEscalationQ3() {
    const yesBtn = document.getElementById('q3YesBtn');
    const noBtn = document.getElementById('q3NoBtn');

    const handleClick = () => {
        showCatLaughingImage();
        setTimeout(() => {
            showSection('quiz-section');
            initQuiz();
        }, 2000);
    };

    yesBtn.addEventListener('click', handleClick);
    noBtn.addEventListener('click', handleClick);
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
                    setTimeout(() => {
                        state.currentQuestion++;
                        showQuestion(state.currentQuestion);
                    }, 2000);
                } else {
                    showResponse("Try Again");
                    setTimeout(() => {
                        showQuestion(questionNum);
                    }, 1500);
                }
            });
        }
        // Question 9 special logic
        else if (questionNum === 9) {
            // For button B (index 1), skip - it's handled exclusively by addQ9EasterEgg()
            if (index !== 1) {
                btn.addEventListener('click', () => {
                    showResponse("Fiiinnneee... I guess I'll be your Valentine 💌");
                    setTimeout(() => {
                        showFinalSection();
                    }, 2000);
                });
            }
        }
        // Regular questions
        else {
            btn.addEventListener('click', () => {
                showResponse(answer.response || answer.text);
                setTimeout(() => {
                    state.currentQuestion++;
                    showQuestion(state.currentQuestion);
                }, 2000);
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
                }, 2000);
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
            setTimeout(() => {
                showFinalSection();
            }, 2000);
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

function showResponse(responseText, index = null) {
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
    
    setTimeout(() => {
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => {
            questionDisplay.classList.remove('hidden');
            responseDisplay.classList.add('hidden');
            if (state.currentQuestion < quizData.length) {
                state.currentQuestion++;
                showQuestion(state.currentQuestion);
            } else {
                showFinalSection();
            }
        };
    }, 2000);
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
