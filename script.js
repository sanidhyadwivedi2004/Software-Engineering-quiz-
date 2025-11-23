class QuizSystem {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.timePerQuestion = 30;
        this.currentTimer = this.timePerQuestion;
        this.timerInterval = null;
        this.startTime = null;
        this.endTime = null;
        this.studentData = {};
        this.shuffledQuestions = [];
        this.totalQuestions = 20;
        
        this.initializeEventListeners();
        this.initializeSettings();
        this.shuffleQuestions();
    }

    initializeEventListeners() {
        // Student form submission
        document.getElementById('student-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleStudentFormSubmission();
        });

        // Next button
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        // Generate achievement badge
        document.getElementById('generate-badge').addEventListener('click', () => {
            this.generateAchievementBadge();
        });

        // Retake quiz
        document.getElementById('retake-quiz').addEventListener('click', () => {
            this.resetQuiz();
        });

        // Show leaderboard
        document.getElementById('show-leaderboard').addEventListener('click', () => {
            this.showLeaderboard();
        });

        // Settings
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.showSettings();
        });

        // Settings modal controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-settings')) {
                this.hideSettings();
            }
        });

        // Theme toggle
        document.getElementById('theme-toggle-btn').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Settings changes
        document.getElementById('sound-effects').addEventListener('change', (e) => {
            this.soundEnabled = e.target.checked;
        });

        document.getElementById('dark-mode').addEventListener('change', (e) => {
            document.body.classList.toggle('dark-mode', e.target.checked);
            this.updateThemeToggleButton();
        });

        document.getElementById('timer-duration').addEventListener('input', (e) => {
            this.timePerQuestion = parseInt(e.target.value);
            document.getElementById('timer-value').textContent = `${e.target.value}s`;
        });
    }

    shuffleQuestions() {
        // Create a copy of the question bank and shuffle it
        const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
        // Take only the number of questions we want for the quiz
        this.shuffledQuestions = shuffled.slice(0, this.totalQuestions);
        
        // Shuffle options for each question
        this.shuffledQuestions.forEach(question => {
            const correctAnswer = question.options[question.correct];
            const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
            question.options = shuffledOptions;
            question.correct = shuffledOptions.indexOf(correctAnswer);
        });
    }

    handleStudentFormSubmission() {
        const name = document.getElementById('student-name').value.trim();
        const email = document.getElementById('student-email').value.trim();
        const studentId = document.getElementById('student-id').value.trim();

        if (!name || !email || !studentId) {
            alert('Please fill in all fields');
            return;
        }

        this.studentData = { name, email, studentId };
        
        // Track quiz start event
        this.trackEvent('quiz_started', {
            student_id: studentId
        });
        
        this.startQuiz();
    }

    startQuiz() {
        this.startTime = new Date();
        this.showScreen('quiz-screen');
        this.displayQuestion();
        this.startTimer();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    displayQuestion() {
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('question-options');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');

        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.totalQuestions}`;

        // Display question with typing animation
        this.typeWriterEffect(questionText, question.question);

        // Clear previous options and explanations
        optionsContainer.innerHTML = '';
        this.clearAnswerExplanation();

        // Create option elements with staggered animation
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.style.opacity = '0';
            optionElement.style.transform = 'translateY(20px)';
            
            optionElement.innerHTML = `
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            `;
            
            optionElement.addEventListener('click', () => {
                this.selectOption(index);
            });

            optionsContainer.appendChild(optionElement);

            // Animate option appearance
            setTimeout(() => {
                optionElement.style.transition = 'all 0.3s ease';
                optionElement.style.opacity = '1';
                optionElement.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Reset timer
        this.currentTimer = this.timePerQuestion;
        this.updateTimerDisplay();

        // Disable next button initially
        document.getElementById('next-btn').disabled = true;

        // Add question difficulty indicator
        this.addDifficultyIndicator(question);
    }

    selectOption(selectedIndex) {
        const options = document.querySelectorAll('.option');
        const question = this.shuffledQuestions[this.currentQuestionIndex];

        // Check if already answered (lock mechanism)
        if (options[0].classList.contains('locked')) {
            return; // Prevent changing answer
        }

        // Remove previous selections
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'wrong');
        });

        // Mark selected option
        options[selectedIndex].classList.add('selected');

        // Lock all options to prevent changes
        options.forEach(option => {
            option.classList.add('locked');
            option.style.pointerEvents = 'none';
        });

        // Show correct/wrong after a brief delay for better UX
        setTimeout(() => {
            const isCorrect = selectedIndex === question.correct;
            
            options.forEach((option, index) => {
                if (index === question.correct) {
                    option.classList.add('correct');
                } else if (index === selectedIndex && index !== question.correct) {
                    option.classList.add('wrong');
                }
            });

            // Calculate score with time bonus
            const timeBonus = Math.max(0, this.currentTimer - 10) * 0.2; // Bonus for quick answers
            if (isCorrect) {
                this.correctAnswers++;
                this.score += 5 + timeBonus; // Base points + time bonus
                this.playSound('correct');
            } else {
                this.wrongAnswers++;
                this.playSound('wrong');
            }

            // Track answer
            this.trackEvent('question_answered', {
                question_number: this.currentQuestionIndex + 1,
                is_correct: isCorrect,
                time_remaining: this.currentTimer,
                difficulty: question.difficulty || 'Medium'
            });

            // Enable next button
            document.getElementById('next-btn').disabled = false;

            // Stop timer
            clearInterval(this.timerInterval);

            // Show answer explanation
            this.showAnswerExplanation(question, isCorrect);
        }, 500);
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.currentTimer--;
            this.updateTimerDisplay();

            if (this.currentTimer <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        timerElement.textContent = this.currentTimer;
        
        // Add visual warning when time is running low
        if (this.currentTimer <= 5) {
            timerElement.style.color = '#f56565';
            timerElement.style.animation = 'pulse 0.5s infinite';
        } else if (this.currentTimer <= 10) {
            timerElement.style.color = '#f6ad55';
            timerElement.style.animation = 'none';
        } else {
            timerElement.style.color = 'white';
            timerElement.style.animation = 'none';
        }
    }

    timeUp() {
        clearInterval(this.timerInterval);
        this.wrongAnswers++;
        
        // Show correct answer
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        // Lock all options
        options.forEach(option => {
            option.classList.add('locked');
            option.style.pointerEvents = 'none';
        });
        
        options[question.correct].classList.add('correct');

        // Enable next button
        document.getElementById('next-btn').disabled = false;

        // Show time up message
        this.showTimeUpMessage();
    }

    showTimeUpMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'time-up-message';
        messageDiv.innerHTML = `
            <div style="background: #fed7d7; border: 1px solid #f56565; border-radius: 8px; padding: 15px; margin: 20px 0; color: #742a2a; text-align: center;">
                <i class="fas fa-clock"></i> Time's up! The correct answer is highlighted.
            </div>
        `;
        
        const questionContainer = document.querySelector('.question-container');
        questionContainer.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    nextQuestion() {
        clearInterval(this.timerInterval);
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.totalQuestions) {
            this.displayQuestion();
            this.startTimer();
        } else {
            this.endQuiz();
        }
    }

    endQuiz() {
        this.endTime = new Date();
        
        // Track quiz completion
        const finalScore = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        this.trackEvent('quiz_completed', {
            score: finalScore,
            correct_answers: this.correctAnswers,
            wrong_answers: this.wrongAnswers,
            time_taken: Math.floor((this.endTime - this.startTime) / 1000)
        });
        
        this.showResults();
    }

    showResults() {
        this.showScreen('results-screen');

        const finalScore = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        const timeTaken = this.calculateTimeTaken();

        // Update score display
        document.getElementById('final-score').textContent = `${finalScore}%`;
        document.getElementById('correct-count').textContent = this.correctAnswers;
        document.getElementById('wrong-count').textContent = this.wrongAnswers;
        document.getElementById('accuracy').textContent = `${finalScore}%`;
        document.getElementById('time-taken').textContent = timeTaken;

        // Show performance message
        this.showPerformanceMessage(finalScore);

        // Animate score circle
        this.animateScoreCircle(finalScore);

        // Save to leaderboard
        this.saveToLeaderboard();

        // Show confetti for high scores
        if (finalScore >= 80) {
            this.showConfetti();
        }

        // Generate detailed analytics
        this.generateAnalytics();

        // Generate achievements
        this.generateAchievements(finalScore);
    }

    calculateTimeTaken() {
        const totalTime = Math.floor((this.endTime - this.startTime) / 1000);
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        return `${minutes}m ${seconds}s`;
    }

    showPerformanceMessage(score) {
        const messageElement = document.getElementById('performance-message');
        let message = '';
        let className = '';

        if (score >= 90) {
            message = '🎉 Outstanding! You have excellent knowledge of software engineering concepts!';
            className = 'excellent';
        } else if (score >= 80) {
            message = '👏 Great job! You have a solid understanding of software engineering principles!';
            className = 'good';
        } else if (score >= 70) {
            message = '👍 Good work! You have a decent grasp of the fundamentals with room for improvement.';
            className = 'average';
        } else if (score >= 60) {
            message = '📚 Keep studying! You have basic knowledge but need to strengthen your understanding.';
            className = 'below-average';
        } else {
            message = '💪 Don\'t give up! Review the concepts and try again to improve your score.';
            className = 'needs-improvement';
        }

        messageElement.textContent = message;
        messageElement.className = `performance-message ${className}`;
    }

    animateScoreCircle(finalScore) {
        const scoreElement = document.getElementById('final-score');
        let currentScore = 0;
        const increment = finalScore / 50; // Animate over 50 steps

        const animation = setInterval(() => {
            currentScore += increment;
            if (currentScore >= finalScore) {
                currentScore = finalScore;
                clearInterval(animation);
            }
            scoreElement.textContent = `${Math.round(currentScore)}%`;
        }, 30);
    }

    generateAchievements(score) {
        const achievements = [];
        const timeTaken = (this.endTime - this.startTime) / 1000;
        
        // Score-based achievements
        if (score >= 95) {
            achievements.push({
                title: "Perfectionist",
                description: "Scored 95% or higher",
                icon: "fas fa-crown",
                color: "#ffd700",
                rarity: "legendary"
            });
        } else if (score >= 90) {
            achievements.push({
                title: "Excellence",
                description: "Scored 90% or higher",
                icon: "fas fa-star",
                color: "#ff6b6b",
                rarity: "epic"
            });
        } else if (score >= 80) {
            achievements.push({
                title: "High Achiever",
                description: "Scored 80% or higher",
                icon: "fas fa-medal",
                color: "#4ecdc4",
                rarity: "rare"
            });
        } else if (score >= 70) {
            achievements.push({
                title: "Good Performance",
                description: "Scored 70% or higher",
                icon: "fas fa-thumbs-up",
                color: "#45b7d1",
                rarity: "common"
            });
        }

        // Speed achievements
        if (timeTaken < 300) { // Less than 5 minutes
            achievements.push({
                title: "Speed Demon",
                description: "Completed in under 5 minutes",
                icon: "fas fa-bolt",
                color: "#f39c12",
                rarity: "rare"
            });
        } else if (timeTaken < 600) { // Less than 10 minutes
            achievements.push({
                title: "Quick Thinker",
                description: "Completed in under 10 minutes",
                icon: "fas fa-clock",
                color: "#3498db",
                rarity: "common"
            });
        }

        // Accuracy achievements
        const accuracy = (this.correctAnswers / this.totalQuestions) * 100;
        if (accuracy === 100) {
            achievements.push({
                title: "Flawless Victory",
                description: "100% accuracy - no wrong answers!",
                icon: "fas fa-gem",
                color: "#9b59b6",
                rarity: "legendary"
            });
        }

        // Streak achievements (simulated)
        const streak = this.calculateStreak();
        if (streak >= 10) {
            achievements.push({
                title: "Unstoppable",
                description: `${streak} correct answers in a row`,
                icon: "fas fa-fire",
                color: "#e74c3c",
                rarity: "epic"
            });
        } else if (streak >= 5) {
            achievements.push({
                title: "On Fire",
                description: `${streak} correct answers in a row`,
                icon: "fas fa-flame",
                color: "#f39c12",
                rarity: "rare"
            });
        }

        // Special achievements
        if (this.correctAnswers > 0 && this.wrongAnswers === 0) {
            achievements.push({
                title: "Perfect Score",
                description: "No incorrect answers",
                icon: "fas fa-trophy",
                color: "#ffd700",
                rarity: "legendary"
            });
        }

        // First time achievement
        const hasPlayedBefore = localStorage.getItem('hasPlayedQuiz');
        if (!hasPlayedBefore) {
            achievements.push({
                title: "First Steps",
                description: "Completed your first quiz",
                icon: "fas fa-baby",
                color: "#95a5a6",
                rarity: "common"
            });
            localStorage.setItem('hasPlayedQuiz', 'true');
        }

        this.displayAchievements(achievements);
        return achievements;
    }

    calculateStreak() {
        // This would calculate the longest streak of correct answers
        // For demo purposes, returning a random streak based on performance
        const performance = this.correctAnswers / this.totalQuestions;
        if (performance > 0.9) return Math.floor(Math.random() * 8) + 8;
        if (performance > 0.8) return Math.floor(Math.random() * 5) + 5;
        if (performance > 0.7) return Math.floor(Math.random() * 3) + 3;
        return Math.floor(Math.random() * 2) + 1;
    }

    displayAchievements(achievements) {
        const container = document.getElementById('achievements-container');
        container.innerHTML = '';

        achievements.forEach((achievement, index) => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement ${achievement.rarity}`;
            achievementElement.innerHTML = `
                <div class="achievement-icon" style="color: ${achievement.color}">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-content">
                    <h4 class="achievement-title">${achievement.title}</h4>
                    <p class="achievement-description">${achievement.description}</p>
                    <span class="achievement-rarity">${achievement.rarity.toUpperCase()}</span>
                </div>
            `;

            // Animate achievement appearance
            achievementElement.style.opacity = '0';
            achievementElement.style.transform = 'translateY(20px)';
            container.appendChild(achievementElement);

            setTimeout(() => {
                achievementElement.style.transition = 'all 0.5s ease';
                achievementElement.style.opacity = '1';
                achievementElement.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Store achievements
        this.userAchievements = achievements;
    }

    generateAchievementBadge() {
        const score = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        
        // Track badge generation
        this.trackEvent('badge_generated', {
            score: score,
            achievements_count: this.userAchievements ? this.userAchievements.length : 0
        });
        
        const badgeWindow = window.open('', '_blank', 'width=600,height=800');
        
        const badgeHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Achievement Badge - ${this.studentData.name}</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <style>
                    body {
                        margin: 0;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        font-family: 'Inter', sans-serif;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .badge-container {
                        background: white;
                        border-radius: 20px;
                        padding: 40px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                        text-align: center;
                        max-width: 500px;
                        width: 100%;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .badge-container::before {
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                        transform: rotate(45deg);
                        animation: shine 3s infinite;
                    }
                    
                    @keyframes shine {
                        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                        50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
                        100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                    }
                    
                    .badge-header {
                        margin-bottom: 30px;
                    }
                    
                    .badge-title {
                        font-size: 2rem;
                        font-weight: 800;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 10px;
                    }
                    
                    .badge-subtitle {
                        color: #718096;
                        font-size: 1rem;
                    }
                    
                    .badge-main {
                        margin: 40px 0;
                    }
                    
                    .score-badge {
                        width: 150px;
                        height: 150px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 30px;
                        box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
                        animation: pulse 2s infinite;
                    }
                    
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    
                    .score-text {
                        color: white;
                        font-size: 2.5rem;
                        font-weight: 800;
                    }
                    
                    .student-name {
                        font-size: 1.8rem;
                        font-weight: 700;
                        color: #2d3748;
                        margin-bottom: 10px;
                    }
                    
                    .completion-text {
                        color: #4a5568;
                        font-size: 1.1rem;
                        margin-bottom: 20px;
                    }
                    
                    .badge-stats {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                        margin: 30px 0;
                    }
                    
                    .stat-item {
                        background: #f7fafc;
                        padding: 15px;
                        border-radius: 12px;
                        border: 2px solid #e2e8f0;
                    }
                    
                    .stat-value {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #667eea;
                    }
                    
                    .stat-label {
                        font-size: 0.9rem;
                        color: #718096;
                        margin-top: 5px;
                    }
                    
                    .achievements-mini {
                        margin-top: 30px;
                    }
                    
                    .achievements-mini h4 {
                        color: #2d3748;
                        margin-bottom: 15px;
                        font-size: 1.1rem;
                    }
                    
                    .mini-achievements {
                        display: flex;
                        justify-content: center;
                        gap: 10px;
                        flex-wrap: wrap;
                    }
                    
                    .mini-achievement {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.2rem;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    }
                    
                    .badge-footer {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e2e8f0;
                        color: #718096;
                        font-size: 0.9rem;
                    }
                    
                    .download-btn {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        margin-top: 20px;
                        transition: transform 0.2s;
                    }
                    
                    .download-btn:hover {
                        transform: translateY(-2px);
                    }
                    
                    @media print {
                        body { background: white; }
                        .download-btn { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="badge-container">
                    <div class="badge-header">
                        <h1 class="badge-title">Achievement Unlocked!</h1>
                        <p class="badge-subtitle">Software Engineering Quiz Completion</p>
                    </div>
                    
                    <div class="badge-main">
                        <div class="score-badge">
                            <div class="score-text">${score}%</div>
                        </div>
                        
                        <div class="student-name">${this.studentData.name}</div>
                        <div class="completion-text">Successfully completed the Software Engineering Assessment</div>
                        
                        <div class="badge-stats">
                            <div class="stat-item">
                                <div class="stat-value">${this.correctAnswers}/${this.totalQuestions}</div>
                                <div class="stat-label">Correct Answers</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${this.calculateTimeTaken()}</div>
                                <div class="stat-label">Time Taken</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="achievements-mini">
                        <h4>Achievements Earned</h4>
                        <div class="mini-achievements">
                            ${this.userAchievements ? this.userAchievements.map(achievement => `
                                <div class="mini-achievement" style="background: ${achievement.color}20; color: ${achievement.color}" title="${achievement.title}">
                                    <i class="${achievement.icon}"></i>
                                </div>
                            `).join('') : ''}
                        </div>
                    </div>
                    
                    <div class="badge-footer">
                        <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p>Student ID: ${this.studentData.studentId}</p>
                        <button onclick="window.print()" class="download-btn">
                            <i class="fas fa-download"></i> Save Badge
                        </button>
                    </div>
                </div>
            </body>
            </html>
        `;

        badgeWindow.document.write(badgeHTML);
        badgeWindow.document.close();
    }

    resetQuiz() {
        // Reset all quiz data
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.currentTimer = this.timePerQuestion;
        this.startTime = null;
        this.endTime = null;
        
        // Clear any running timers
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // Shuffle questions again for a new experience
        this.shuffleQuestions();

        // Show welcome screen
        this.showScreen('welcome-screen');

        // Clear form data
        document.getElementById('student-form').reset();
    }

    typeWriterEffect(element, text) {
        element.textContent = '';
        let i = 0;
        const speed = 30;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }

    addDifficultyIndicator(question) {
        const difficulty = question.difficulty || 'Medium';
        const difficultyElement = document.createElement('div');
        difficultyElement.className = `difficulty-indicator ${difficulty.toLowerCase()}`;
        difficultyElement.innerHTML = `
            <i class="fas fa-star"></i>
            <span>${difficulty}</span>
        `;
        
        const questionContainer = document.querySelector('.question-container');
        questionContainer.insertBefore(difficultyElement, questionContainer.firstChild);
    }

    showAnswerExplanation(question, isCorrect) {
        const explanationDiv = document.createElement('div');
        explanationDiv.className = `answer-explanation ${isCorrect ? 'correct' : 'wrong'}`;
        explanationDiv.innerHTML = `
            <div class="explanation-header">
                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                <span>${isCorrect ? 'Correct!' : 'Incorrect'}</span>
            </div>
            <div class="explanation-text">
                ${question.explanation || 'No explanation available.'}
            </div>
        `;
        
        const questionContainer = document.querySelector('.question-container');
        questionContainer.appendChild(explanationDiv);

        // Animate explanation appearance
        setTimeout(() => {
            explanationDiv.style.opacity = '1';
            explanationDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    clearAnswerExplanation() {
        const existingExplanation = document.querySelector('.answer-explanation');
        const existingDifficulty = document.querySelector('.difficulty-indicator');
        if (existingExplanation) existingExplanation.remove();
        if (existingDifficulty) existingDifficulty.remove();
    }

    // Leaderboard functionality
    saveToLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
        const entry = {
            name: this.studentData.name,
            score: Math.round((this.correctAnswers / this.totalQuestions) * 100),
            time: this.calculateTimeTaken(),
            date: new Date().toISOString(),
            accuracy: Math.round((this.correctAnswers / this.totalQuestions) * 100)
        };
        
        leaderboard.push(entry);
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard.splice(10); // Keep top 10
        
        localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
        return leaderboard;
    }

    showLeaderboard() {
        // Track leaderboard view
        this.trackEvent('leaderboard_viewed');
        
        const leaderboard = this.saveToLeaderboard();
        const leaderboardDiv = document.createElement('div');
        leaderboardDiv.className = 'leaderboard-modal';
        leaderboardDiv.innerHTML = `
            <div class="leaderboard-content">
                <div class="leaderboard-header">
                    <h3><i class="fas fa-trophy"></i> Top Performers</h3>
                    <button class="close-leaderboard"><i class="fas fa-times"></i></button>
                </div>
                <div class="leaderboard-list">
                    ${leaderboard.map((entry, index) => `
                        <div class="leaderboard-entry ${entry.name === this.studentData.name ? 'current-user' : ''}">
                            <div class="rank">#${index + 1}</div>
                            <div class="player-info">
                                <div class="player-name">${entry.name}</div>
                                <div class="player-stats">${entry.accuracy}% • ${entry.time}</div>
                            </div>
                            <div class="player-score">${entry.score}%</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(leaderboardDiv);
        
        // Close leaderboard
        leaderboardDiv.querySelector('.close-leaderboard').addEventListener('click', () => {
            leaderboardDiv.remove();
        });
    }
    
    showConfetti() {
        const colors = ['#667eea', '#764ba2', '#48bb78', '#f6ad55', '#fc8181'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            confettiContainer.appendChild(confetti);
        }
        
        document.body.appendChild(confettiContainer);
        
        // Add confetti animation
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(-100vh) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }

    generateAnalytics() {
        const analytics = {
            totalQuestions: this.totalQuestions,
            correctAnswers: this.correctAnswers,
            wrongAnswers: this.wrongAnswers,
            accuracy: Math.round((this.correctAnswers / this.totalQuestions) * 100),
            timeTaken: this.calculateTimeTaken(),
            averageTimePerQuestion: Math.round((this.endTime - this.startTime) / (this.totalQuestions * 1000)),
            strongAreas: this.getStrongAreas(),
            improvementAreas: this.getImprovementAreas()
        };

        // Store analytics in localStorage for future reference
        localStorage.setItem(`quiz-analytics-${Date.now()}`, JSON.stringify(analytics));
        
        return analytics;
    }

    getStrongAreas() {
        // This would analyze question categories where user performed well
        // For demo purposes, returning sample data
        return ['Design Patterns', 'Version Control', 'Testing'];
    }

    getImprovementAreas() {
        // This would analyze question categories where user needs improvement
        // For demo purposes, returning sample data
        return ['Database Design', 'System Architecture', 'Security'];
    }

    // Sound effects (optional - can be enabled)
    playSound(type) {
        if (!this.soundEnabled) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            switch(type) {
                case 'correct':
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
                    break;
                case 'wrong':
                    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.1);
                    break;
                case 'tick':
                    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
                    break;
            }
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    showSettings() {
        document.getElementById('settings-modal').style.display = 'flex';
    }

    hideSettings() {
        document.getElementById('settings-modal').style.display = 'none';
    }

    // Initialize default settings
    initializeSettings() {
        this.soundEnabled = true;
        this.darkMode = false;
        this.updateThemeToggleButton();
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.body.classList.toggle('dark-mode', this.darkMode);
        this.updateThemeToggleButton();
        
        // Track theme change
        this.trackEvent('theme_changed', {
            theme: this.darkMode ? 'dark' : 'light'
        });
        
        // Update settings modal checkbox
        const darkModeCheckbox = document.getElementById('dark-mode');
        if (darkModeCheckbox) {
            darkModeCheckbox.checked = this.darkMode;
        }
    }

    updateThemeToggleButton() {
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            if (this.darkMode) {
                themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            } else {
                themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            }
        }
    }

    // Vercel Analytics Event Tracking
    trackEvent(eventName, eventData = {}) {
        if (typeof window !== 'undefined' && window.va) {
            try {
                window.va('event', {
                    name: eventName,
                    data: eventData
                });
                console.log(`Analytics: ${eventName}`, eventData);
            } catch (error) {
                console.error('Analytics tracking error:', error);
            }
        }
    }
}

// Initialize the quiz system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizSystem();
});

// Add some visual enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add floating particles background effect
    createFloatingParticles();
});

function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
    
    // Add CSS animation for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}