// Enhanced debug version of EmailJS integration
console.log('EmailJS Debug script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing EmailJS debug...');

    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS library not loaded! Check if CDN is accessible.');
        alert('EmailJS library not loaded. Check internet connection and CDN.');
        return;
    }
    console.log('✅ EmailJS library is available');

    // Initialize EmailJS with your Public Key
    try {
        emailjs.init({
            publicKey: "X8uflBQcYIdkLP9Vl",
        });
        console.log('✅ EmailJS initialized successfully');
    } catch (error) {
        console.error('❌ EmailJS initialization failed:', error);
        alert('EmailJS initialization failed: ' + error.message);
        return;
    }

    // Get the form element
    const contactForm = document.getElementById('terminalContactForm');
    console.log('Contact form search result:', contactForm);

    if (!contactForm) {
        console.error('❌ Contact form with ID "terminalContactForm" not found!');
        
        // List all forms on the page for debugging
        const allForms = document.querySelectorAll('form');
        console.log('📋 All forms found on page:', allForms.length);
        allForms.forEach((form, index) => {
            console.log(`Form ${index + 1}:`, {
                id: form.id || 'NO ID',
                class: form.className || 'NO CLASS',
                element: form
            });
        });
        
        // Check if form exists but with different ID
        const possibleForms = document.querySelectorAll('form[id*="contact"], form[class*="contact"], form[id*="terminal"], form[class*="terminal"]');
        if (possibleForms.length > 0) {
            console.log('🔍 Possible contact forms found:', possibleForms);
        }
        
        alert('Contact form not found! Check console for details.');
        return;
    }

    console.log('✅ Contact form found:', {
        id: contactForm.id,
        class: contactForm.className,
        fields: contactForm.querySelectorAll('input, select, textarea').length
    });

    // Check form fields
    const formFields = {
        name: contactForm.querySelector('[name="name"]'),
        email: contactForm.querySelector('[name="email"]'),
        subject: contactForm.querySelector('[name="subject"]'),
        message: contactForm.querySelector('[name="message"]')
    };
    
    console.log('📝 Form fields check:');
    Object.entries(formFields).forEach(([key, field]) => {
        if (field) {
            console.log(`✅ ${key}: Found (${field.tagName.toLowerCase()})`);
        } else {
            console.log(`❌ ${key}: NOT FOUND`);
        }
    });

    // Remove any existing event listeners to avoid conflicts
    const newForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(newForm, contactForm);
    console.log('🔄 Form cloned to remove existing event listeners');
    
    // Add fresh event listener
    newForm.addEventListener('submit', function(event) {
        console.log('🚀 Form submit event triggered');
        event.preventDefault();
        
        // Get form data for debugging
        const formData = new FormData(this);
        console.log('📊 Form data:');
        const dataObj = {};
        for (let [key, value] of formData.entries()) {
            console.log(`  ${key}: "${value}"`);
            dataObj[key] = value;
        }
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'message'];
        const missingFields = requiredFields.filter(field => !dataObj[field] || dataObj[field].trim() === '');
        
        if (missingFields.length > 0) {
            console.error('❌ Missing required fields:', missingFields);
            alert('Please fill in all required fields: ' + missingFields.join(', '));
            return;
        }
        
        console.log('✅ All required fields are filled');        // Your specific EmailJS Service ID and Template IDs
        const serviceID = 'Adittoahosan_017';
        const adminTemplateID = 'template_czeb4gn';
        const userTemplateID = 'template_user_confirm';
        
        console.log('📧 Attempting to send emails with configuration:', {
            serviceID,
            adminTemplateID,
            userTemplateID,
            formElement: this.tagName,
            formId: this.id
        });

        // Add visual feedback
        const submitBtn = this.querySelector('button[type="submit"]') || this.querySelector('.execute-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            console.log('✅ Submit button disabled and text updated');
        }        // Use EmailJS to send the form data - first to admin, then to user
        emailjs.sendForm(serviceID, adminTemplateID, this)
            .then((adminResponse) => {
                console.log('🎉 Admin EmailJS SUCCESS:', {
                    status: adminResponse.status,
                    text: adminResponse.text,
                    fullResponse: adminResponse
                });
                
                console.log('📧 Now sending confirmation email to user...');
                
                // Send confirmation to user
                return emailjs.sendForm(serviceID, userTemplateID, this);
            })
            .then((userResponse) => {
                console.log('🎉 User EmailJS SUCCESS:', {
                    status: userResponse.status,
                    text: userResponse.text,
                    fullResponse: userResponse
                });
                
                alert('✅ Both emails sent successfully!\n\nAdmin notification and user confirmation have been sent.');
                newForm.reset();
                console.log('📝 Form reset completed');
            })
            .catch((error) => {
                console.error('💥 EmailJS ERROR:', {
                    name: error.name,
                    message: error.message,
                    status: error.status,
                    text: error.text,
                    fullError: error
                });
                
                let errorMessage = 'Failed to send email.\n\n';
                if (error.status) {
                    errorMessage += 'Status: ' + error.status + '\n';
                }
                if (error.text) {
                    errorMessage += 'Details: ' + error.text + '\n';
                }
                errorMessage += '\nCheck console for full error details.';
                
                alert('❌ ' + errorMessage);
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Execute Connection';
                    console.log('🔄 Submit button re-enabled');
                }
            });
    });
    
    console.log('✅ Form event listener added successfully');
    console.log('🎯 Setup completed - ready to test form submission');
});
