// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Initialize EmailJS with your Public Key
    (function(){
        emailjs.init({
            publicKey: "X8uflBQcYIdkLP9Vl",
        });
    })();

    // Get the form element from the HTML (using the actual form ID)
    const contactForm = document.getElementById('terminalContactForm');

    // Add a 'submit' event listener to the form
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent the default form submission behavior (which reloads the page)
            event.preventDefault();

            // Get the submit button and add loading state
            const submitBtn = contactForm.querySelector('.execute-btn');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            // Show processing in terminal if available
            showTerminalProcessing();            // Your specific EmailJS Service ID and Template IDs
            const serviceID = 'Adittoahosan_017';
            const adminTemplateID = 'template_czeb4gn';
            const userTemplateID = 'template_user_confirm';
            
            // First send email to admin
            emailjs.sendForm(serviceID, adminTemplateID, this)
                .then(() => {
                    console.log('Admin notification email sent successfully');
                    
                    // Then send confirmation email to user
                    return emailjs.sendForm(serviceID, userTemplateID, this);
                })
                .then(() => {
                    // This code runs if both emails were sent successfully
                    console.log('User confirmation email sent successfully');
                    showTerminalSuccess();
                    // Reset the form after successful submission
                    contactForm.reset();
                    
                    // Remove loading state
                    if (submitBtn) {
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                    }
                })
                .catch((err) => {
                    // This code runs if there was an error sending either email
                    console.error('EmailJS Error:', err);
                    showTerminalError(err);
                    
                    // Remove loading state
                    if (submitBtn) {
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                    }
                });
        });
    } else {
        console.error('Contact form not found! Make sure the form has id="terminalContactForm"');
    }

    // Function to show processing in terminal style
    function showTerminalProcessing() {
        const terminalOutput = document.querySelector('.terminal-output');
        if (terminalOutput) {            const processingSteps = [
                'Encrypting message data...',
                'Validating contact parameters...',
                'Establishing secure connection...',
                'Sending notification to admin...',
                'Sending confirmation to your email...',
                'Finalizing transmission...'
            ];

            processingSteps.forEach((step, i) => {
                setTimeout(() => {
                    const processLine = document.createElement('div');
                    processLine.className = 'output-line emailjs-process';
                    processLine.innerHTML = `
                        <span class="prompt">emailjs@terminal:~$</span>
                        <span class="response">${step}</span>
                    `;
                    terminalOutput.appendChild(processLine);
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }, i * 400);
            });
        }
    }

    // Function to show success in terminal
    function showTerminalSuccess() {
        const terminalOutput = document.querySelector('.terminal-output');
        if (terminalOutput) {
            setTimeout(() => {
                const successLine = document.createElement('div');
                successLine.className = 'output-line success emailjs-result';                successLine.innerHTML = `
                    <span class="response">✓ Message sent successfully! Admin notified and confirmation sent to your email. You'll receive a response within 24 hours.</span>
                `;
                terminalOutput.appendChild(successLine);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
                // Clean up processing messages after 3 seconds
                setTimeout(() => {
                    const processLines = terminalOutput.querySelectorAll('.emailjs-process');
                    processLines.forEach(line => line.remove());
                }, 3000);
            }, 2000);
        } else {
            // Fallback alert if no terminal output found
            alert('Your message has been sent successfully!');
        }
    }

    // Function to show error in terminal
    function showTerminalError(error) {
        const terminalOutput = document.querySelector('.terminal-output');
        if (terminalOutput) {
            setTimeout(() => {
                const errorLine = document.createElement('div');
                errorLine.className = 'output-line error emailjs-result';
                errorLine.innerHTML = `
                    <span class="response">✗ Email transmission failed. Please try again or contact directly.</span>
                `;
                terminalOutput.appendChild(errorLine);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
                // Clean up processing messages after 3 seconds
                setTimeout(() => {
                    const processLines = terminalOutput.querySelectorAll('.emailjs-process');
                    processLines.forEach(line => line.remove());
                }, 3000);
            }, 2000);
        } else {
            // Fallback alert if no terminal output found
            alert('Failed to send the message. Please try again. Error: ' + JSON.stringify(error));
        }
    }
});
