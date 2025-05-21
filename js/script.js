// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');

// Performance optimization flag
let isScrolling = false;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the website
    initWebsite();
    
    // Initialize particles.js with reduced particle count for better performance
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 40, // Reduced from 80
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": false // Disable retina detection for better performance
        });
    }
    
    // Start typing animation
    if (typedTextElement && cursor) {
        setTimeout(typeText, 1000);
    }
    
    // Only initialize non-critical features when browser is idle
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            initScrollAnimations();
        });
    } else {
        setTimeout(initScrollAnimations, 1000);
    }
});

// Window scroll event with throttling for better performance
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        window.requestAnimationFrame(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateNavActiveState();
            isScrolling = false;
        });
    }
});

// Mobile menu toggle with improved animation
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        // Toggle mobile menu
        navLinks.classList.toggle('active');
        
        // Change menu toggle animation
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        // Prevent body scrolling when mobile menu is open
        document.body.classList.toggle('menu-open');
        
        // Accessibility
        const isExpanded = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Add backdrop for mobile menu when open
        if (isExpanded) {
            if (!document.querySelector('.mobile-menu-backdrop')) {
                const backdrop = document.createElement('div');
                backdrop.classList.add('mobile-menu-backdrop');
                document.body.appendChild(backdrop);
                
                // Close menu when clicking outside
                backdrop.addEventListener('click', () => {
                    closeMenu();
                });
            }
        } else {
            const backdrop = document.querySelector('.mobile-menu-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }
    });
}

// Function to close the mobile menu
function closeMenu() {
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        
        // Reset menu toggle
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
        
        // Re-enable body scrolling
        document.body.classList.remove('menu-open');
        
        // Accessibility
        menuToggle.setAttribute('aria-expanded', false);
        
        // Remove backdrop
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// Contact form submit handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic form validation
        if (!name || !email || !message) {
            showFormMessage('Please fill out all required fields', 'error');
            return;
        }
        
        // Here you would typically send the form data to a server
        // Since we don't have a backend set up, we'll simulate a successful submission
        
        // Simulate form submission
        showFormMessage('Your message has been sent! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Initialize website
function initWebsite() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get navbar height for offset
                const navbarHeight = navbar.offsetHeight;
                
                // Scroll to the target element with offset
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set initial ARIA attributes for mobile menu
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    }
}

// Type text animation
function typeText() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursor.classList.contains('typing')) {
            cursor.classList.add('typing');
        }
        
        typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        cursor.classList.remove('typing');
        setTimeout(eraseText, 2000);
    }
}

// Erase text animation
function eraseText() {
    if (charIndex > 0) {
        if (!cursor.classList.contains('typing')) {
            cursor.classList.add('typing');
        }
        
        typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        cursor.classList.remove('typing');
        textArrayIndex++;
        
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        
        setTimeout(typeText, 1000);
    }
}

// Show form submission messages
function showFormMessage(message, type) {
    // Check if a message element already exists
    let messageElement = document.querySelector('.form-message');
    
    // If not, create a new one
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        contactForm.appendChild(messageElement);
    }
    
    // Set the message content and style
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    
    // Add styles based on the message type
    if (type === 'error') {
        messageElement.style.color = '#ff3333';
    } else {
        messageElement.style.color = '#33cc33';
    }
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Initialize scroll animations
function initScrollAnimations() {
    // Use IntersectionObserver instead of scroll events for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });
    
    // Apply to elements
    document.querySelectorAll('.skill-item, .project-card, .timeline-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Update active state in navigation based on scroll position (called by throttled scroll event)
function updateNavActiveState() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}
