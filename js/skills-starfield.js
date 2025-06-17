// Enhanced Shooting Stars Animation for Skills Section
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    const shootingStarsContainer = skillsSection?.querySelector('.shooting-stars');
    
    if (!skillsSection || !shootingStarsContainer) return;
    
    let shootingStarsArray = [];
    let isInViewport = false;
    let animationInterval;
    
    // Check if skills section is in viewport
    function checkViewport() {
        const rect = skillsSection.getBoundingClientRect();
        isInViewport = rect.bottom > 0 && rect.top < window.innerHeight;
        
        if (isInViewport && !animationInterval) {
            startShootingStars();
        } else if (!isInViewport && animationInterval) {
            stopShootingStars();
        }
    }
      // Create a shooting star element
    function createShootingStar() {
        const star = document.createElement('div');
        star.className = 'dynamic-shooting-star';
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #fff, transparent);
            border-radius: 50%;
            box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.5);
            opacity: 0;
            pointer-events: none;
            z-index: 5;
        `;
        
        // Random starting position
        const startY = Math.random() * skillsSection.offsetHeight * 0.8;
        const startX = -100;
        const endX = skillsSection.offsetWidth + 100;
        const endY = startY - (Math.random() * 200 + 100);
        
        star.style.left = startX + 'px';
        star.style.top = startY + 'px';
        
        shootingStarsContainer.appendChild(star);
        
        // Animate the shooting star
        let progress = 0;
        const duration = 2000 + Math.random() * 2000; // 2-4 seconds
        const startTime = Date.now();
        
        function animateStar() {
            const elapsed = Date.now() - startTime;
            progress = elapsed / duration;
            
            if (progress <= 1) {
                // Calculate position
                const currentX = startX + (endX - startX) * progress;
                const currentY = startY + (endY - startY) * progress;
                
                // Calculate opacity (fade in, bright, fade out)
                let opacity;
                if (progress < 0.1) {
                    opacity = progress / 0.1;
                } else if (progress > 0.8) {
                    opacity = (1 - progress) / 0.2;
                } else {
                    opacity = 1;
                }
                
                // Calculate width (trail effect)
                const width = Math.min(100, progress * 150);
                
                star.style.left = currentX + 'px';
                star.style.top = currentY + 'px';
                star.style.opacity = opacity;
                star.style.width = width + 'px';
                
                requestAnimationFrame(animateStar);
            } else {
                // Remove the star
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
                // Remove from array
                const index = shootingStarsArray.indexOf(star);
                if (index > -1) {
                    shootingStarsArray.splice(index, 1);
                }
            }
        }
        
        shootingStarsArray.push(star);
        requestAnimationFrame(animateStar);
    }
    
    // Start creating shooting stars
    function startShootingStars() {
        if (animationInterval) return;
        
        animationInterval = setInterval(() => {
            if (isInViewport && Math.random() < 0.3) { // 30% chance every interval
                createShootingStar();
            }
        }, 1500); // Check every 1.5 seconds
    }
    
    // Stop creating shooting stars
    function stopShootingStars() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
    }
    
    // Initialize
    checkViewport();
    
    // Listen for scroll events
    window.addEventListener('scroll', checkViewport);
    
    // Listen for resize events
    window.addEventListener('resize', () => {
        checkViewport();
    });
    
    // Clean up on visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopShootingStars();
        } else if (isInViewport) {
            startShootingStars();
        }
    });
    
    // Add some twinkling effect to existing stars
    function addTwinkleEffect() {
        const starLayers = skillsSection.querySelectorAll('.stars');
        
        starLayers.forEach((layer, index) => {
            // Add random opacity variations
            const originalAnimation = layer.style.animation;
            layer.style.animation = originalAnimation + `, twinkle ${4 + index}s infinite ease-in-out alternate`;
        });
    }
    
    // Apply twinkling effect after a short delay
    setTimeout(addTwinkleEffect, 1000);
});
