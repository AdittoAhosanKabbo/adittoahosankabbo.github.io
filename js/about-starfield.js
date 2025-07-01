// About section starfield animation matching hero section
document.addEventListener('DOMContentLoaded', function() {
    const aboutCanvas = document.getElementById('about-starfield-canvas');
    const aboutSection = document.getElementById('about');
    if (!aboutCanvas || !aboutSection) return;
    
    const aboutCtx = aboutCanvas.getContext('2d');
    let aboutStars = [];
    let aboutAnimationId;
    let aboutIsInViewport = false;
    
    function resizeAboutCanvas() {
        aboutCanvas.width = aboutSection.offsetWidth;
        aboutCanvas.height = aboutSection.offsetHeight;
    }
    
    function createAboutStars() {
        aboutStars = [];
        const numStars = Math.floor((aboutCanvas.width * aboutCanvas.height) / 8000); // Match hero density
        
        for (let i = 0; i < numStars; i++) {
            aboutStars.push({
                x: Math.random() * aboutCanvas.width,
                y: Math.random() * aboutCanvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.8 + 0.2,
                twinkle: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    function checkAboutViewport() {
        const aboutRect = aboutSection.getBoundingClientRect();
        aboutIsInViewport = aboutRect.bottom > 0 && aboutRect.top < window.innerHeight;
        
        // Only animate if about section is in viewport
        if (!aboutIsInViewport && aboutAnimationId) {
            cancelAnimationFrame(aboutAnimationId);
            aboutAnimationId = null;
        } else if (aboutIsInViewport && !aboutAnimationId) {
            animateAbout();
        }
    }
    
    function updateAboutStars() {
        aboutStars.forEach(star => {
            // Slow movement - match hero section
            star.y += star.speed;
            
            // Twinkling effect
            star.opacity += Math.sin(Date.now() * star.twinkle) * 0.01;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
            
            // Reset position when star goes off screen
            if (star.y > aboutCanvas.height) {
                star.y = -star.size;
                star.x = Math.random() * aboutCanvas.width;
            }
        });
    }
    
    function drawAboutStars() {
        aboutCtx.clearRect(0, 0, aboutCanvas.width, aboutCanvas.height);
        
        aboutStars.forEach(star => {
            aboutCtx.save();
            aboutCtx.globalAlpha = star.opacity;
            
            // Draw main star - match hero colors
            aboutCtx.fillStyle = '#afe3d7';
            aboutCtx.beginPath();
            aboutCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            aboutCtx.fill();
            
            // Add glow effect for larger stars
            if (star.size > 1.5) {
                aboutCtx.globalAlpha = star.opacity * 0.3;
                aboutCtx.fillStyle = '#00ffc3';
                aboutCtx.beginPath();
                aboutCtx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                aboutCtx.fill();
            }
            
            aboutCtx.restore();
        });
    }
    
    function animateAbout() {
        if (!aboutIsInViewport) return;
        
        updateAboutStars();
        drawAboutStars();
        aboutAnimationId = requestAnimationFrame(animateAbout);
    }
    
    function init() {
        resizeAboutCanvas();
        createAboutStars();
        checkAboutViewport();
    }
    
    // Initialize
    init();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeAboutCanvas();
        createAboutStars();
    });
    
    // Check viewport on scroll
    window.addEventListener('scroll', checkAboutViewport);
    
    // Pause animation when tab is not visible (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (aboutAnimationId) {
                cancelAnimationFrame(aboutAnimationId);
                aboutAnimationId = null;
            }
        } else if (aboutIsInViewport) {
            animateAbout();
        }
    });
    
    // Add interactive effect - stars react to mouse movement (match hero section)
    let mouseX = 0;
    let mouseY = 0;
    
    aboutSection.addEventListener('mousemove', (e) => {
        const aboutRect = aboutSection.getBoundingClientRect();
        mouseX = e.clientX - aboutRect.left;
        mouseY = e.clientY - aboutRect.top;
        
        // Add ripple effect near mouse
        aboutStars.forEach(star => {
            const dx = star.x - mouseX;
            const dy = star.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                star.opacity = Math.min(1, star.opacity + 0.3);
                star.size = Math.min(3, star.size * 1.2);
            }
        });
    });
    
    // Reset star properties gradually
    setInterval(() => {
        aboutStars.forEach(star => {
            if (star.size > 2) {
                star.size *= 0.98;
            }
            if (star.opacity > 0.8) {
                star.opacity *= 0.99;
            }
        });
    }, 100);
});
