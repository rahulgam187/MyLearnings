// Theme switcher logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.removeItem('theme');
    }
});

// Hamburger menu logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Intersection Observer for animations (if on tech letter page)
if (document.querySelector('h2')) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('h2, table').forEach(el => {
        observer.observe(el);
    });
}

// Quiz Functionality
class QuizApp {
    constructor() {
        this.questionBank = {
            'cloud-revolution': [
                {
                    question: "What is the primary goal of digital transformation?",
                    options: ["Reduce the number of employees", "Improve business processes and customer experiences", "Increase paperwork", "Limit the use of technology"],
                    correct: [1],
                    type: "single"
                },
                {
                    question: "Which cloud era focuses on using cloud to drive innovation and adapt to market changes?",
                    options: ["VM Cloud era", "Infrastructure Cloud era", "Transformation Cloud era", "Hybrid Cloud era"],
                    correct: [2],
                    type: "single"
                },
                {
                    question: "What is the main difference between CapEx and OpEx in cloud computing?",
                    options: ["CapEx is recurring, OpEx is one-time", "CapEx is upfront investment, OpEx is pay-as-you-go", "There is no difference", "CapEx is only for software, OpEx is for hardware"],
                    correct: [1],
                    type: "single"
                },
                {
                    question: "What are the key pillars of digital transformation with Google Cloud? (Select all that apply)",
                    options: ["Infrastructure modernization", "Application development", "Manual record keeping", "Data management and analytics"],
                    correct: [0, 1, 3],
                    type: "multiple"
                },
                {
                    question: "Which of the following are challenges organizations face during digital transformation? (Select all that apply)",
                    options: ["Legacy systems", "Resistance to change", "Unlimited budgets", "Skills gap"],
                    correct: [0, 1, 3],
                    type: "multiple"
                },
                {
                    question: "What is the role of APIs in digital transformation? (Select all that apply)",
                    options: ["Facilitate integration between systems", "Increase manual work", "Enable automation", "Restrict data sharing"],
                    correct: [0, 2],
                    type: "multiple"
                }
            ],
            'shared-responsibility': [
                {
                    question: "According to the shared responsibility model, who is responsible for 'Security OF the Cloud'?",
                    options: ["The customer/consumer", "The cloud provider (Google Cloud)", "Both equally", "It depends on the service model"],
                    correct: [1],
                    type: "single"
                },
                {
                    question: "In the shared responsibility model, who is responsible for 'Security IN the Cloud'?",
                    options: ["The cloud provider", "The customer/consumer", "Google's security team", "Third-party vendors"],
                    correct: [1],
                    type: "single"
                },
                {
                    question: "Which service model gives customers the MOST responsibility in the shared responsibility model?",
                    options: ["SaaS (Software as a Service)", "PaaS (Platform as a Service)", "IaaS (Infrastructure as a Service)", "All have equal responsibility"],
                    correct: [2],
                    type: "single"
                },
                {
                    question: "What does 'If you configure or store it, you are responsible to secure it' refer to?",
                    options: ["Physical hardware security", "Data center security", "Customer's data, applications, and configurations", "Network infrastructure"],
                    correct: [2],
                    type: "single"
                },
                {
                    question: "In Google Cloud's shared responsibility model, which is typically the cloud provider's responsibility?",
                    options: ["User access management", "Data encryption keys", "Physical security of data centers", "Application-level security"],
                    correct: [2],
                    type: "single"
                }
            ],
            'google-cloud-services': [
                {
                    question: "Which Google Cloud product is primarily used for data warehousing?",
                    options: ["BigQuery", "Google Drive", "Google Sheets", "Google Docs"],
                    correct: [0],
                    type: "single"
                },
                {
                    question: "Which cloud service model provides the most control?",
                    options: ["SaaS", "PaaS", "IaaS", "FaaS"],
                    correct: [2],
                    type: "single"
                },
                {
                    question: "What is the main advantage of using Google Kubernetes Engine (GKE)? (Select all that apply)",
                    options: ["Manual server management", "Automated container orchestration", "Increased downtime", "Scalability of applications"],
                    correct: [1, 3],
                    type: "multiple"
                },
                {
                    question: "Which service would you use for serverless computing on Google Cloud? (Select all that apply)",
                    options: ["Compute Engine", "App Engine", "Cloud Functions", "Cloud Storage"],
                    correct: [1, 2],
                    type: "multiple"
                },
                {
                    question: "What does Google Cloud's Anthos platform help organizations achieve? (Select all that apply)",
                    options: ["Multi-cloud management", "On-premises only deployment", "Hybrid cloud operations", "Manual scaling"],
                    correct: [0, 2],
                    type: "multiple"
                },
                {
                    question: "Which Google Cloud service is best suited for storing unstructured data?",
                    options: ["Cloud SQL", "Cloud Storage", "BigQuery", "Cloud Functions"],
                    correct: [1],
                    type: "single"
                },
                {
                    question: "What is a key benefit of using Google Cloud's data analytics tools? (Select all that apply)",
                    options: ["Real-time insights", "Increased paperwork", "Manual data processing", "Automated reporting"],
                    correct: [0, 3],
                    type: "multiple"
                }
            ],
            'digital-transformation': [
                {
                    question: "Which of the following is NOT a benefit of Google Cloud for digital transformation?",
                    options: ["Scalability", "Manual data entry", "Security", "Cost efficiency"],
                    correct: [1],
                    type: "single"
                },
                {
                    question: "Google Cloud doesn't enables organizations to:",
                    options: ["Store data securely", "Run applications at scale", "Eliminate the need for any IT staff", "Analyze data in real time"],
                    correct: [2],
                    type: "single"
                },
                {
                    question: "Google Cloud's security model is based on which principle?",
                    options: ["Trust everything", "Zero trust", "Open access", "No encryption"],
                    correct: [1],
                    type: "single"
                }
            ]
        };

        this.topicInfo = {
            'cloud-revolution': {
                title: 'Cloud Revolution Quiz',
                description: 'Test your understanding of cloud eras, digital transformation drivers, and the evolution from traditional IT to cloud-native approaches.'
            },
            'shared-responsibility': {
                title: 'Shared Responsibility Model Quiz',
                description: 'Evaluate your knowledge of security responsibilities between cloud providers and customers across different service models.'
            },
            'google-cloud-services': {
                title: 'Google Cloud Services Quiz',
                description: 'Challenge yourself on GCP products, serverless computing, data analytics tools, and platform-specific capabilities.'
            },
            'digital-transformation': {
                title: 'Digital Transformation Quiz',
                description: 'Assess your understanding of business process transformation, organizational challenges, and technology adoption strategies.'
            },
            'comprehensive': {
                title: 'Comprehensive Google Cloud Quiz',
                description: 'The ultimate challenge! Questions from all categories to test your complete Google Cloud digital leadership knowledge.'
            }
        };

        this.selectedTopic = null;
        this.currentQuiz = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;

        this.initializeQuiz();
    }

    initializeQuiz() {
        // Only initialize if we're on the quiz page
        if (!document.getElementById('topic-selection')) return;

        this.bindEvents();
        this.showTopicSelection();
    }

    bindEvents() {
        const startBtn = document.getElementById('start-quiz-btn');
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');
        const retakeBtn = document.getElementById('retake-btn');
        const reviewBtn = document.getElementById('review-btn');
        const backToTopicsBtn = document.getElementById('back-to-topics-btn');

        if (startBtn) startBtn.addEventListener('click', () => this.startQuiz());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevQuestion());
        if (submitBtn) submitBtn.addEventListener('click', () => this.submitQuiz());
        if (retakeBtn) retakeBtn.addEventListener('click', () => this.retakeQuiz());
        if (reviewBtn) reviewBtn.addEventListener('click', () => this.toggleReview());
        if (backToTopicsBtn) backToTopicsBtn.addEventListener('click', () => this.showTopicSelection());
    }

    showTopicSelection() {
        document.getElementById('topic-selection').style.display = 'block';
        document.getElementById('quiz-start').style.display = 'none';
        document.getElementById('quiz-content').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'none';
        document.querySelector('.quiz-progress').style.display = 'none';
    }

    selectTopic(topicId) {
        this.selectedTopic = topicId;
        this.showQuizStart();
    }

    showQuizStart() {
        const topicInfo = this.topicInfo[this.selectedTopic];
        
        document.getElementById('topic-selection').style.display = 'none';
        document.getElementById('quiz-start').style.display = 'block';
        
        document.getElementById('selected-topic-title').textContent = topicInfo.title;
        document.getElementById('topic-description').textContent = topicInfo.description;
        
        if (this.selectedTopic === 'comprehensive') {
            document.getElementById('question-count').textContent = '12 questions from all topics';
        } else {
            const questionCount = this.questionBank[this.selectedTopic].length;
            document.getElementById('question-count').textContent = `${questionCount} questions`;
        }
    }

    startQuiz() {
        // Select questions based on topic
        if (this.selectedTopic === 'comprehensive') {
            // Get all questions and select 12 random ones
            const allQuestions = Object.values(this.questionBank).flat();
            this.currentQuiz = this.getRandomQuestions(allQuestions, 12);
        } else {
            // Use all questions from the selected topic
            this.currentQuiz = [...this.questionBank[this.selectedTopic]];
            // If topic has more than 8 questions, randomly select 8
            if (this.currentQuiz.length > 8) {
                this.currentQuiz = this.getRandomQuestions(this.currentQuiz, Math.min(8, this.currentQuiz.length));
            }
        }

        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.currentQuiz.length).fill(null);
        this.score = 0;

        // Show quiz content, hide start screen
        document.getElementById('quiz-start').style.display = 'none';
        document.getElementById('quiz-content').style.display = 'block';
        document.getElementById('quiz-results').style.display = 'none';
        document.querySelector('.quiz-progress').style.display = 'block';

        this.displayQuestion();
        this.updateProgress();
    }

    getRandomQuestions(questions, count) {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    displayQuestion() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const container = document.getElementById('question-container');
        
        const questionHtml = `
            <div class="question-text">
                ${this.currentQuestionIndex + 1}. ${question.question}
            </div>
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="quiz.selectOption(${index})">
                        <input type="${question.type === 'multiple' ? 'checkbox' : 'radio'}" 
                               name="question_${this.currentQuestionIndex}" 
                               value="${index}"
                               id="option_${index}">
                        <label class="option-text" for="option_${index}">${option}</label>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = questionHtml;

        // Restore previous answers
        if (this.userAnswers[this.currentQuestionIndex]) {
            const answers = Array.isArray(this.userAnswers[this.currentQuestionIndex]) 
                ? this.userAnswers[this.currentQuestionIndex] 
                : [this.userAnswers[this.currentQuestionIndex]];
            
            answers.forEach(answerIndex => {
                const option = container.querySelector(`input[value="${answerIndex}"]`);
                if (option) {
                    option.checked = true;
                    option.closest('.option').classList.add('selected');
                }
            });
        }

        this.updateNavigationButtons();
    }

    selectOption(optionIndex) {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const container = document.getElementById('question-container');
        
        if (question.type === 'multiple') {
            // Multiple selection
            const checkbox = container.querySelector(`input[value="${optionIndex}"]`);
            const option = checkbox.closest('.option');
            
            if (!this.userAnswers[this.currentQuestionIndex]) {
                this.userAnswers[this.currentQuestionIndex] = [];
            }
            
            if (checkbox.checked) {
                // Remove from selection
                checkbox.checked = false;
                option.classList.remove('selected');
                this.userAnswers[this.currentQuestionIndex] = 
                    this.userAnswers[this.currentQuestionIndex].filter(i => i !== optionIndex);
            } else {
                // Add to selection
                checkbox.checked = true;
                option.classList.add('selected');
                this.userAnswers[this.currentQuestionIndex].push(optionIndex);
            }
        } else {
            // Single selection
            container.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            container.querySelectorAll('input').forEach(input => input.checked = false);
            
            const selectedOption = container.querySelector(`input[value="${optionIndex}"]`);
            selectedOption.checked = true;
            selectedOption.closest('.option').classList.add('selected');
            
            this.userAnswers[this.currentQuestionIndex] = optionIndex;
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuiz.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.updateProgress();
        }
    }

    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
            this.updateProgress();
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');

        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        if (this.currentQuestionIndex === this.currentQuiz.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    updateProgress() {
        const counter = document.getElementById('question-counter');
        const progressFill = document.getElementById('progress-fill');
        
        counter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.currentQuiz.length}`;
        const progress = ((this.currentQuestionIndex + 1) / this.currentQuiz.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    submitQuiz() {
        this.calculateScore();
        this.showResults();
    }

    calculateScore() {
        this.score = 0;
        
        this.currentQuiz.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const correctAnswer = question.correct;
            
            if (question.type === 'multiple') {
                // For multiple choice, check if arrays match exactly
                if (Array.isArray(userAnswer) && userAnswer.length === correctAnswer.length) {
                    const sortedUser = [...userAnswer].sort();
                    const sortedCorrect = [...correctAnswer].sort();
                    if (sortedUser.every((val, i) => val === sortedCorrect[i])) {
                        this.score++;
                    }
                }
            } else {
                // For single choice
                if (userAnswer === correctAnswer[0]) {
                    this.score++;
                }
            }
        });
    }

    showResults() {
        document.getElementById('quiz-content').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        
        const percentage = Math.round((this.score / this.currentQuiz.length) * 100);
        
        document.getElementById('score-percentage').textContent = `${percentage}%`;
        document.getElementById('score-text').textContent = `You scored ${this.score} out of ${this.currentQuiz.length}`;
        
        // Performance message
        let message = '';
        if (percentage >= 90) {
            message = 'Excellent! You have outstanding Google Cloud digital leadership knowledge!';
        } else if (percentage >= 75) {
            message = 'Great job! You have a solid understanding. Keep learning!';
        } else if (percentage >= 60) {
            message = 'Good effort! There\'s room for improvement. Review the material and try again.';
        } else {
            message = 'Keep studying! Consider reviewing the tech letter content and retaking the quiz.';
        }
        
        document.getElementById('performance-message').textContent = message;
    }

    retakeQuiz() {
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('answer-review').style.display = 'none';
        this.showTopicSelection();
    }

    toggleReview() {
        const reviewDiv = document.getElementById('answer-review');
        const reviewBtn = document.getElementById('review-btn');
        
        if (reviewDiv.style.display === 'none' || reviewDiv.style.display === '') {
            this.showAnswerReview();
            reviewDiv.style.display = 'block';
            reviewBtn.textContent = 'Hide Review';
        } else {
            reviewDiv.style.display = 'none';
            reviewBtn.textContent = 'Review Answers';
        }
    }

    showAnswerReview() {
        const reviewContent = document.getElementById('review-content');
        let reviewHtml = '';
        
        this.currentQuiz.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const correctAnswer = question.correct;
            
            reviewHtml += `
                <div class="review-question">
                    <div class="review-question-text">
                        ${index + 1}. ${question.question}
                    </div>
                    ${question.options.map((option, optIndex) => {
                        const isCorrect = correctAnswer.includes(optIndex);
                        const isSelected = question.type === 'multiple' 
                            ? Array.isArray(userAnswer) && userAnswer.includes(optIndex)
                            : userAnswer === optIndex;
                        
                        let className = 'review-option';
                        if (isCorrect) className += ' correct';
                        if (isSelected && !isCorrect) className += ' incorrect';
                        if (isSelected) className += ' selected';
                        
                        return `
                            <div class="${className}">
                                ${isCorrect ? '✓' : (isSelected ? '✗' : '○')} ${option}
                                ${isCorrect ? ' (Correct Answer)' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        });
        
        reviewContent.innerHTML = reviewHtml;
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quiz = new QuizApp();
});
