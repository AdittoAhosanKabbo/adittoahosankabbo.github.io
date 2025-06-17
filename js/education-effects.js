/**
 * Professional Effects for Education Section - Matching About Me Section
 */
document.addEventListener('DOMContentLoaded', function() {
    const educationSection = document.getElementById('education');
    if (!educationSection) return;
    
    // Initialize starfield animation
    initEducationStarfield();
    
    // Add professional effects
    addProfessionalEffects();
    
    /**
     * Initialize starfield animation for education section
     */
    function initEducationStarfield() {
        const canvas = document.getElementById('education-starfield-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let stars = [];
        let animationId;
        let isInViewport = false;
        
        function resizeCanvas() {
            const sectionRect = educationSection.getBoundingClientRect();
            canvas.width = sectionRect.width;
            canvas.height = sectionRect.height;
        }
        
        function createStars() {
            stars = [];
            const numStars = Math.floor((canvas.width * canvas.height) / 8000); // Density similar to about section
            
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.5 + 0.1,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkle: Math.random() * 0.02 + 0.01
                });
            }
        }
        
        function checkViewport() {
            const sectionRect = educationSection.getBoundingClientRect();
            isInViewport = sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;
            
            // Only animate if education section is in viewport
            if (!isInViewport && animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            } else if (isInViewport && !animationId) {
                animate();
            }
        }
        
        function updateStars() {
            stars.forEach(star => {
                // Slow movement
                star.y += star.speed;
                
                // Twinkling effect
                star.opacity += Math.sin(Date.now() * star.twinkle) * 0.01;
                star.opacity = Math.max(0.1, Math.min(1, star.opacity));
                
                // Reset position when star goes off screen
                if (star.y > canvas.height) {
                    star.y = -star.size;
                    star.x = Math.random() * canvas.width;
                }
            });
        }
        
        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                ctx.save();
                ctx.globalAlpha = star.opacity;
                
                // Draw main star
                ctx.fillStyle = '#afe3d7';
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Add glow effect for larger stars
                if (star.size > 1.5) {
                    ctx.globalAlpha = star.opacity * 0.3;
                    ctx.fillStyle = '#00ffc3';
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                ctx.restore();
            });
        }
        
        function animate() {
            if (!isInViewport) return;
            
            updateStars();
            drawStars();
            animationId = requestAnimationFrame(animate);
        }
        
        function init() {
            resizeCanvas();
            createStars();
            checkViewport();
        }
        
        // Initialize
        init();
        
        // Event listeners
        window.addEventListener('resize', function() {
            resizeCanvas();
            createStars();
        });
        
        window.addEventListener('scroll', checkViewport);
        
        // Intersection Observer for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationId) {
                    animate();
                } else if (!entry.isIntersecting && animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(educationSection);
    }
    
    /**
     * Add subtle professional effects to the Education section
     */
    function addProfessionalEffects() {
        // Add subtle 3D hover effect to education content
        const educationContent = educationSection.querySelector('.education-content');
        if (educationContent) {
            educationSection.addEventListener('mousemove', function(e) {
                const { left, top, width, height } = educationSection.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;
                
                // Calculate rotation based on mouse position (very subtle effect)
                const rotateY = ((x - width / 2) / width) * 1; // max 1deg rotation
                const rotateX = ((y - height / 2) / height) * -0.5; // max 0.5deg rotation
                
                educationContent.style.transition = 'transform 0.2s ease-out';
                educationContent.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            educationSection.addEventListener('mouseleave', function() {
                educationContent.style.transition = 'transform 0.5s ease';
                educationContent.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg)';
            });
        }
        
        // Enhanced hover effect for highlighted text
        const highlightTexts = educationSection.querySelectorAll('.highlight-text');
        highlightTexts.forEach(text => {
            // Set custom property with character count for more accurate typing animation
            const textLength = text.textContent.length;
            text.style.setProperty('--char-count', textLength);
            
            // Add hover effect
            text.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 0 8px rgba(0, 255, 195, 0.8)';
                this.style.transition = 'text-shadow 0.3s ease, transform 0.2s ease';
                this.style.transform = 'translateY(-1px)';
            });
            
            text.addEventListener('mouseleave', function() {
                this.style.textShadow = 'none';
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Add subtle glow effect to certification links on hover
        const certLinks = educationSection.querySelectorAll('.cert-link');
        certLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 4px 15px rgba(0, 255, 195, 0.3)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
            });
        });
        
        // Add floating animation to section icons
        const sectionIcons = educationSection.querySelectorAll('.section-icon');
        sectionIcons.forEach((icon, index) => {
            // Stagger the animation delay
            const delay = index * 2000;
            
            function floatAnimation() {
                setTimeout(() => {
                    icon.style.animation = 'float 3s ease-in-out infinite';
                }, delay);
            }
            
            floatAnimation();
        });
    }
});

// Add CSS keyframes for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) scale(1);
        }
        50% {
            transform: translateY(-8px) scale(1.02);
        }
    }
`;
document.head.appendChild(style);
