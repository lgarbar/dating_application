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
        question: "1. How do you feel about cats?",
        answers: [
            { text: "A. I love cats", correct: true, response: "Perfect. A real cat person. 🐾", subtitle: "Correct — you clearly understand my heart." },
            { text: "B. I hate cats", correct: false, response: "Oof. That one stings a little. 😬", subtitle: "Not quite — I think we need a cat introduction stat." },
            { text: "C. I've never really spent time with a cat", correct: true, response: "That just means the door is open for a new obsession. 🐈", subtitle: "Correct — you’re still a blank slate, and I’m very willing to fix that." },
            { text: "D. I'll love your cat, ofc", correct: true, response: "Now that’s the right answer. ❤️", subtitle: "Correct — I like a woman who knows how to appreciate the important things." }
        ]
    },
    {
        question: "2. What is my cat's name? (Hint: take a look at my profile)",
        answers: [
            { text: "A. Boots", correct: false, response: "Not quite. Cute name, wrong cat. 🐾", subtitle: "Incorrect — the answer is more dramatic than that." },
            { text: "B. Feline General Meowkora", correct: true, response: "Exactly. The queen has spoken. 👑", subtitle: "Correct — so you were paying attention." },
            { text: "C. Mittens", correct: false, response: "Cute, but not the right royal title. 😌", subtitle: "Incorrect — this is a very serious feline monarchy." },
            { text: "D. Kora", correct: true, response: "Kora is a strong contender, but the full title is the real answer. ✨", subtitle: "Correct — close enough to know the family vibe." }
        ]
    },
    {
        question: "3. What is my ideal date night activity?",
        answers: [
            { text: "A. Cooking a fancy meal from scratch together", correct: true, response: "That is actually peak romance. 🍽️", subtitle: "Correct — luxurious and cozy, exactly my kind of night." },
            { text: "B. Late-night drive with no destination and a good playlist", correct: true, response: "A perfect little adventure. 🚗🎶", subtitle: "Correct — spontaneous and a little cinematic." },
            { text: "C. Going to a loud club to dance all night", correct: false, response: "Oh no. I’d rather be cuddling than shouting over bass. 🎶", subtitle: "Incorrect — not my vibe, and honestly, I’m relieved." },
            { text: "D. Building a blanket fort and watching movies until we pass out", correct: true, response: "Elite tier. You get VIP access to the fort. 🏰✨", subtitle: "Correct — this is the sweetest kind of chaos." }
        ]
    },
    {
        question: "4. Who's the prettiest girl in the world?",
        answers: [
            { text: "A. Kora", correct: false, response: "She is gorgeous, but not the full answer. 😅", subtitle: "Incorrect — but a very fair guess." },
            { text: "B. Emme", correct: false, response: "Also a strong choice, but not the full picture. 💖", subtitle: "Incorrect — I love that you have taste." },
            { text: "C. Emme & Kora", correct: true, response: "Now that is the correct answer. 👑", subtitle: "Correct — you know what matters." },
            { text: "D. All of the Above", correct: true, response: "Exactly. You get it. ✨", subtitle: "Correct — the beauty is undeniable." }
        ]
    },
    {
        question: "5. Who will you be?",
        answers: [
            { text: "A. Yours", correct: true, response: "Aww. I like that answer. 💌", subtitle: "Correct — this one is very sweet." },
            { text: "B. Daniel's", correct: true, response: "I like that answer too, for very obvious reasons. 😘", subtitle: "Correct — you’re clearly keeping good company." },
            { text: "C. Kora's father's", correct: true, response: "My goodness. You are being unhinged in the best way. 🤣", subtitle: "Correct — and somehow, still the most accurate answer." },
            { text: "D. My baby", correct: true, response: "That’s the answer I wanted. 🫶", subtitle: "Correct — you just said the quiet part out loud." }
        ]
    },
    {
        question: "6-7. Watch this meme edit...",
        isVideo: true,
        videoFile: "assets/videos/6-7_meme_edit.mp4",
        response: "Please watch the following...",
    },
    {
        question: "8. What will our karaoke song be?",
        answers: [
            { text: "A. A Whole New World (Aladdin)", correct: true, response: "Classic. We are definitely doing this together. ✨", subtitle: "Correct — perfect little duet energy." },
            { text: "B. Firework (Katy Perry)", correct: true, response: "Absolutely. We’re about to be dramatic and loud. 🎤", subtitle: "Correct — very on-brand and very me." },
            { text: "C. Shallow (Lady Gaga)", correct: true, response: "You know exactly what kind of chemistry I’m talking about. 🎶", subtitle: "Correct — a little intense and a lot iconic." },
            { text: "D. Stay (Rihanna)", correct: true, response: "This one is spicy. I respect it. 🔥", subtitle: "Correct — you know the mood is serious." }
        ]
    }
];

// ========================================
// PART 1: VALENTINE'S QUESTION
// ========================================

function initIntroProfile() {
    const introBtn = document.getElementById('intro-interest-btn');
    if (introBtn) {
        introBtn.addEventListener('click', () => {
            showSection('part1');
        });
    }
}

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
    
    if (question.isVideo) {
        questionDisplay.innerHTML = `
            <h2>${question.question}</h2>
            <video controls style="max-width: 100%; margin: 30px 0; border-radius: 20px;">
                <source src="${question.videoFile}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        
        const responseDisplay = document.getElementById('response-display');
        responseDisplay.classList.remove('hidden');
        document.getElementById('response-text').innerHTML = `
            <span class="response-label response-correct">Correct</span>
            <span class="response-message">${question.response}</span>
        `;
        document.getElementById('response-media').innerHTML = '';
        
        const nextBtn = document.getElementById('next-question-btn');
        nextBtn.classList.add('hidden');
        
        setTimeout(() => {
            nextBtn.classList.remove('hidden');
            nextBtn.onclick = () => {
                questionDisplay.innerHTML = `<h2></h2><div id="answers-container" class="answers-container"></div>`;
                responseDisplay.classList.add('hidden');
                state.currentQuestion++;
                showQuestion(state.currentQuestion);
            };
        }, 1000);
        return;
    }

    if (!questionDisplay.querySelector('h2')) {
        questionDisplay.innerHTML = `<h2></h2><div id="answers-container" class="answers-container"></div>`;
    }
    questionDisplay.querySelector('h2').textContent = question.question;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    question.answers.forEach((answer) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn full-width';
        btn.textContent = answer.text;

        btn.addEventListener('click', () => {
            showResponse(answer.response || answer.text, {
                isCorrect: Boolean(answer.correct)
            });
        });
        
        answersContainer.appendChild(btn);
    });
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
    
    const isCorrect = options.isCorrect === true;
    const labelText = isCorrect ? 'Correct' : 'Incorrect';
    const labelClass = isCorrect ? 'response-correct' : 'response-incorrect';

    responseTextElement.innerHTML = `
        <span class="response-label ${labelClass}">${labelText}</span>
        <span class="response-message">${responseText}</span>
    `;
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
                showQuestion(state.currentQuestion);
            }
        };
    }, 1000);
}

function showFinalSection() {
    showSection('final-section');
}

function initDateFlow() {
    const finalNextBtn = document.getElementById('final-next-btn');
    const dateOptionsNext = document.getElementById('date-options-next');
    const dateSchedulingNext = document.getElementById('date-scheduling-next');
    const confirmationImage = document.getElementById('confirmation-image');

    if (finalNextBtn) {
        finalNextBtn.addEventListener('click', () => {
            showSection('date-options-section');
        });
    }

    if (dateOptionsNext) {
        dateOptionsNext.addEventListener('click', () => {
            const dateChoice = document.getElementById('date-choice');
            if (dateChoice) {
                dateChoice.setAttribute('aria-label', dateChoice.value);
            }
            showSection('date-scheduling-section');
        });
    }

    if (dateSchedulingNext) {
        dateSchedulingNext.addEventListener('click', () => {
            const dateInput = document.getElementById('date-input');
            const timeInput = document.getElementById('time-input');
            const selectedDate = dateInput && dateInput.value ? dateInput.value : 'a date soon';
            const selectedTime = timeInput && timeInput.value ? timeInput.value : 'at a sweet time';

            if (confirmationImage) {
                confirmationImage.innerHTML = `
                    <div class="date-summary-card">
                        <p><strong>Plan:</strong> ${document.getElementById('date-choice')?.value || 'A cute date'}</p>
                        <p><strong>When:</strong> ${selectedDate} at ${selectedTime}</p>
                    </div>
                `;
            }
            showSection('date-confirmation-section');
        });
    }
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
    initIntroProfile();
    initPart1();
    initDateFlow();
});
