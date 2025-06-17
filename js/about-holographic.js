/**
 * Professional Holographic Effects for About Me Section
 */
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    // Add professional effects
    addProfessionalEffects();
    
    /**
     * Add subtle professional effects to the About section
     */
    function addProfessionalEffects() {
        // Add subtle 3D hover effect to about content
        const aboutContent = aboutSection.querySelector('.about-content');
        if (aboutContent) {
            aboutSection.addEventListener('mousemove', function(e) {
                const { left, top, width, height } = aboutSection.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;
                
                // Calculate rotation based on mouse position (very subtle effect)
                const rotateY = ((x - width / 2) / width) * 1; // max 1deg rotation
                const rotateX = ((y - height / 2) / height) * -0.5; // max 0.5deg rotation
                
                aboutContent.style.transition = 'transform 0.2s ease-out';
                aboutContent.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            aboutSection.addEventListener('mouseleave', function() {
                aboutContent.style.transition = 'transform 0.5s ease';
                aboutContent.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg)';
            });
        }
        
        // Enhanced hover effect for highlighted text
        const highlightTexts = aboutSection.querySelectorAll('.highlight-text');
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
                this.style.textShadow = '0 0 6px rgba(0, 255, 195, 0.3)';
                this.style.transform = 'translateY(0)';
            });
        });
    }
});
