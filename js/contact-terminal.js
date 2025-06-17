// Data Processing Terminal Contact Section JavaScript
class DataTerminal {    constructor() {
        this.init();
        // EmailJS initialization is now handled by emailjs-contact.js
    }init() {
        this.updateClock();
        this.animateMetrics();
        this.setupForm();
        this.typeWriterEffect();
        
        // Update clock every second
        setInterval(() => this.updateClock(), 1000);
        
        // Animate tool status
        this.animateToolStatus();
        
        // EmailJS is now handled by emailjs-contact.js
        // this.initEmailJS();
    }initEmailJS() {
        // Initialize EmailJS with your public key
        emailjs.init({
            publicKey: "X8uflBQcYIdkLP9Vl",
        });
    }

    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        
        const timestampEl = document.getElementById('currentTime');
        if (timestampEl) {
            timestampEl.textContent = `${dateString} ${timeString}`;
        }
    }

    animateMetrics() {
        const metrics = document.querySelectorAll('.metric-value[data-target]');
        
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : 
                                     element.textContent.includes('h') ? 'h' : '');
            }, 40);
        };

        // Intersection Observer to trigger animations when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        });

        metrics.forEach(metric => observer.observe(metric));
    }

    typeWriterEffect() {
        const outputLines = document.querySelectorAll('.output-line .response');
        
        outputLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            
            setTimeout(() => {
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        line.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 30);
            }, index * 1000);
        });
    }

    animateToolStatus() {
        const toolItems = document.querySelectorAll('.tool-item');
        const statuses = ['ACTIVE', 'READY', 'STANDBY', 'PROCESSING'];
        
        toolItems.forEach((item, index) => {
            const statusEl = item.querySelector('.tool-status');
            if (statusEl && statusEl.textContent === 'READY') {
                setInterval(() => {
                    if (Math.random() > 0.7) {
                        const originalStatus = statusEl.textContent;
                        statusEl.textContent = 'ACTIVE';
                        statusEl.style.background = 'rgba(255, 193, 7, 0.3)';
                        statusEl.style.color = '#ffc107';
                        
                        setTimeout(() => {
                            statusEl.textContent = originalStatus;
                            statusEl.style.background = 'rgba(0, 255, 136, 0.2)';
                            statusEl.style.color = '#00ff88';
                        }, 2000);
                    }
                }, (index + 1) * 5000);
            }
        });
    }    setupForm() {
        const form = document.getElementById('terminalContactForm');
        if (!form) return;

        // Note: Form submission is now handled by emailjs-contact.js
        // This section only handles terminal-style visual effects

        // Add terminal-style input effects
        const inputs = form.querySelectorAll('.terminal-input, .terminal-select, .terminal-textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.addTerminalCursor(input);
            });

            input.addEventListener('blur', () => {
                this.removeTerminalCursor(input);
            });

            input.addEventListener('input', () => {
                this.updateTerminalOutput(input);
            });
        });
    }

    addTerminalCursor(input) {
        input.style.animation = 'terminalCursor 1s infinite';
    }

    removeTerminalCursor(input) {
        input.style.animation = '';
    }

    updateTerminalOutput(input) {
        // Create a dynamic terminal output showing what user is typing
        const terminalOutput = document.querySelector('.terminal-output');
        const existingDynamic = terminalOutput.querySelector('.dynamic-output');
        
        if (existingDynamic) {
            existingDynamic.remove();
        }

        if (input.value.trim()) {
            const dynamicLine = document.createElement('div');
            dynamicLine.className = 'output-line dynamic-output';
            dynamicLine.innerHTML = `
                <span class="prompt">user@terminal:~$</span>
                <span class="command">${input.name}="${input.value}"</span>
            `;
            terminalOutput.appendChild(dynamicLine);
            
            // Auto-scroll to bottom
            setTimeout(() => {
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, 100);
        }
    }    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('.execute-btn');
        const formData = new FormData(form);
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Show processing animation
        this.showProcessingAnimation();

        try {
            // Send email using EmailJS with correct service ID and template ID
            const serviceID = 'Adittoahosan_017';
            const templateID = 'template_czeb4gn';
            
            // Use EmailJS sendForm method to send the form data directly
            await emailjs.sendForm(serviceID, templateID, form);
            
            // Success
            setTimeout(() => {
                this.showSuccessMessage();
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                form.reset();
                
                // Clear dynamic output
                const dynamicOutput = document.querySelector('.dynamic-output');
                if (dynamicOutput) dynamicOutput.remove();
            }, 2000);

        } catch (error) {
            console.error('Email send failed:', error);
            
            // Show error message
            setTimeout(() => {
                this.showErrorMessage();
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        }
    }

    showProcessingAnimation() {
        const terminalOutput = document.querySelector('.terminal-output');
        const processingSteps = [
            'Encrypting message data...',
            'Validating contact parameters...',
            'Establishing secure connection...',
            'Transmitting to data analyst...',
            'Sending email via EmailJS...'
        ];

        processingSteps.forEach((step, i) => {
            setTimeout(() => {
                const processLine = document.createElement('div');
                processLine.className = 'output-line';
                processLine.innerHTML = `
                    <span class="prompt">system@terminal:~$</span>
                    <span class="response">${step}</span>
                `;
                terminalOutput.appendChild(processLine);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, i * 400);
        });
    }

    async simulateProcessing(formData) {
        const terminalOutput = document.querySelector('.terminal-output');
        const processingSteps = [
            'Encrypting message data...',
            'Validating contact parameters...',
            'Establishing secure connection...',
            'Transmitting to data analyst...',
            'Awaiting acknowledgment...'
        ];

        for (let i = 0; i < processingSteps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const processLine = document.createElement('div');
            processLine.className = 'output-line';
            processLine.innerHTML = `
                <span class="prompt">system@terminal:~$</span>
                <span class="response">${processingSteps[i]}</span>
            `;
            terminalOutput.appendChild(processLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    }    showSuccessMessage() {
        const terminalOutput = document.querySelector('.terminal-output');
        
        const successLine = document.createElement('div');
        successLine.className = 'output-line success';
        successLine.innerHTML = `
            <span class="response">✓ Email sent successfully! You'll receive a response within 24 hours.</span>
        `;
        terminalOutput.appendChild(successLine);
        
        // Clear processing messages after success
        setTimeout(() => {
            const processLines = terminalOutput.querySelectorAll('.output-line:not(.success)');
            processLines.forEach((line, index) => {
                if (index >= 4) { // Keep original 4 lines
                    line.remove();
                }
            });
        }, 2000);
    }

    showErrorMessage() {
        const terminalOutput = document.querySelector('.terminal-output');
        
        const errorLine = document.createElement('div');
        errorLine.className = 'output-line error';
        errorLine.innerHTML = `
            <span class="response">✗ Email transmission failed. Please try again or contact directly.</span>
        `;
        terminalOutput.appendChild(errorLine);
        
        // Clear processing messages after error
        setTimeout(() => {
            const processLines = terminalOutput.querySelectorAll('.output-line:not(.error)');
            processLines.forEach((line, index) => {
                if (index >= 4) { // Keep original 4 lines
                    line.remove();
                }
            });
        }, 2000);
    }
}

// Advanced visual effects
class TerminalEffects {
    constructor() {
        this.initEffects();
    }    initEffects() {
        this.createMatrixRain();
        this.createDataParticles();
    }

    createMatrixRain() {
        const codeRain = document.querySelector('.code-rain');
        if (!codeRain) return;

        const chars = '01 SELECT FROM WHERE GROUP BY ORDER LIMIT JOIN INNER LEFT RIGHT ';
        let rainText = '';
        
        for (let i = 0; i < 100; i++) {
            rainText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        codeRain.setAttribute('data-text', rainText);
        
        // Add CSS for matrix effect
        const style = document.createElement('style');
        style.textContent = `
            .code-rain::before {
                content: attr(data-text);
                position: absolute;
                top: 0;
                left: 0;
                color: rgba(0, 255, 136, 0.1);
                font-family: 'Courier New', monospace;
                font-size: 12px;
                line-height: 1.2;
                overflow: hidden;
                animation: matrixRain 15s linear infinite;
            }
            
            @keyframes matrixRain {
                0% { transform: translateY(-100%); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }    createDataParticles() {
        const background = document.querySelector('.terminal-background');
        if (!background) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00ff88;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${5 + Math.random() * 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            background.appendChild(particle);
        }

        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { opacity: 0; transform: translateY(0); }
                50% { opacity: 0.8; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DataTerminal();
    new TerminalEffects();
    
    // Add terminal cursor animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes terminalCursor {
            0%, 50% { border-right: 2px solid #00ff88; }
            51%, 100% { border-right: 2px solid transparent; }
        }
    `;
    document.head.appendChild(style);
});

// Add custom terminal commands (Easter egg)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        console.log(`
╔══════════════════════════════════════╗
║        DATA ANALYST TERMINAL         ║
║                                      ║
║  Available commands:                 ║
║  - help: Show this message           ║
║  - stats: Show portfolio stats       ║
║  - skills: List technical skills     ║
║  - contact: Focus contact form       ║
║                                      ║
║  Made with ❤️ for data insights     ║
╚══════════════════════════════════════╝
        `);
        
        // Focus the first input field
        const firstInput = document.querySelector('.terminal-input');
        if (firstInput) firstInput.focus();
    }
});
