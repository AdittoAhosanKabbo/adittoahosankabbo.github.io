// Starfield Animation for Sci-Fi Hero Background - Hero Section Only
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starfield-canvas');
    const heroSection = document.getElementById('home');
    if (!canvas || !heroSection) return;
    
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId;
    let isInViewport = true;
    
    function resizeCanvas() {
        const heroRect = heroSection.getBoundingClientRect();
        canvas.width = heroRect.width;
        canvas.height = heroRect.height;
    }
    
    function createStars() {
        stars = [];
        const numStars = Math.floor((canvas.width * canvas.height) / 8000); // Density based on hero size
        
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
        const heroRect = heroSection.getBoundingClientRect();
        isInViewport = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        
        // Only animate if hero section is in viewport
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
        animate();
    }
    
    // Initialize
    init();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
    });
    
    // Check viewport on scroll
    window.addEventListener('scroll', checkViewport);
    
    // Pause animation when tab is not visible (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        } else if (isInViewport) {
            animate();
        }
    });
    
    // Add interactive effect - stars react to mouse movement (only in hero section)
    let mouseX = 0;
    let mouseY = 0;
    
    heroSection.addEventListener('mousemove', (e) => {
        const heroRect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - heroRect.left;
        mouseY = e.clientY - heroRect.top;
        
        // Add ripple effect near mouse
        stars.forEach(star => {
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
        stars.forEach(star => {
            if (star.size > 2) {
                star.size *= 0.98;
            }
            if (star.opacity > 0.8) {
                star.opacity *= 0.99;
            }
        });
    }, 100);
});

// Starfield Animation for About Section
document.addEventListener('DOMContentLoaded', function() {
    const aboutCanvas = document.getElementById('about-starfield-canvas');
    const aboutSection = document.getElementById('about');
    if (!aboutCanvas || !aboutSection) return;
    
    const aboutCtx = aboutCanvas.getContext('2d');
    let aboutStars = [];
    let aboutAnimationId;
    let aboutIsInViewport = false;

    function resizeAboutCanvas() {
        const aboutRect = aboutSection.getBoundingClientRect();
        aboutCanvas.width = aboutSection.offsetWidth;
        aboutCanvas.height = aboutSection.offsetHeight;
      }
      
      function createAboutStars() {
        aboutStars = [];
        const numStars = Math.floor((aboutCanvas.width * aboutCanvas.height) / 12000);
        
        for (let i = 0; i < numStars; i++) {
            const star = {
                x: Math.random() * aboutCanvas.width,
                y: Math.random() * aboutCanvas.height,
                size: Math.random() * 1.5 + 0.3,
                originalSize: Math.random() * 1.5 + 0.3,
                speed: Math.random() * 1.2 + 0.3,
                opacity: Math.random() * 0.6 + 0.2,
                direction: Math.random() * Math.PI * 2,
                trail: []
            };
            
            aboutStars.push(star);
        }
    }
    
    function checkAboutViewport() {
        const aboutRect = aboutSection.getBoundingClientRect();
        aboutIsInViewport = aboutRect.bottom > 0 && aboutRect.top < window.innerHeight;
        
        if (!aboutIsInViewport && aboutAnimationId) {
            cancelAnimationFrame(aboutAnimationId);
            aboutAnimationId = null;
        } else if (aboutIsInViewport && !aboutAnimationId) {
            animateAbout();
        }
    }
    
    function updateAboutStars() {
        aboutStars.forEach(star => {
            // Enhanced movement - falling effect with slight drift
            star.y += star.speed;
            star.x += Math.sin(star.y * 0.01) * 0.5;
            
            // Add to trail
            star.trail.push({ x: star.x, y: star.y, opacity: star.opacity });
            if (star.trail.length > 8) {
                star.trail.shift();
            }
            
            // Twinkling effect
            star.opacity += (Math.random() - 0.5) * 0.1;
            star.opacity = Math.max(0.1, Math.min(0.9, star.opacity));
            
            // Occasional size pulsing
            if (Math.random() < 0.005) {
                star.size = star.originalSize * (1 + Math.random() * 0.8);
            }
            
            // Reset position when star goes off screen
            if (star.y > aboutCanvas.height + 50) {
                star.y = -50;
                star.x = Math.random() * aboutCanvas.width;
                star.trail = [];
            }
            
            if (star.x < -50 || star.x > aboutCanvas.width + 50) {
                star.x = Math.random() * aboutCanvas.width;
            }
        });
    }
    
    function drawAboutStars() {
        aboutCtx.clearRect(0, 0, aboutCanvas.width, aboutCanvas.height);
        
        aboutStars.forEach(star => {
            // Draw trail
            star.trail.forEach((point, index) => {
                const trailOpacity = (star.opacity * index) / star.trail.length * 0.3;
                const trailSize = star.size * (index / star.trail.length) * 0.6;
                
                aboutCtx.globalAlpha = trailOpacity;
                aboutCtx.fillStyle = '#00ffc3';
                aboutCtx.beginPath();
                aboutCtx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
                aboutCtx.fill();
            });
            
            // Draw main star
            aboutCtx.globalAlpha = star.opacity;
            aboutCtx.fillStyle = '#ffffff';
            aboutCtx.shadowColor = '#00ffc3';
            aboutCtx.shadowBlur = star.size * 3;
            aboutCtx.beginPath();
            aboutCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            aboutCtx.fill();
            
            // Add sparkle effect for larger stars
            if (star.size > 1) {
                aboutCtx.globalAlpha = star.opacity * 0.8;
                aboutCtx.fillStyle = '#00ffc3';
                aboutCtx.beginPath();
                aboutCtx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
                aboutCtx.fill();
            }
            
            aboutCtx.shadowBlur = 0;
        });
        
        aboutCtx.globalAlpha = 1;
    }
    
    function animateAbout() {
        if (!aboutIsInViewport) return;
        
        updateAboutStars();
        drawAboutStars();
        
        aboutAnimationId = requestAnimationFrame(animateAbout);
    }
    
    // Initialize about starfield
    resizeAboutCanvas();
    createAboutStars();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeAboutCanvas();
        createAboutStars();
    });
    
    // Handle scroll
    window.addEventListener('scroll', checkAboutViewport);
    checkAboutViewport();
    
    // Mouse interaction for about stars
    aboutCanvas.addEventListener('mousemove', (e) => {
        const rect = aboutCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        aboutStars.forEach(star => {
            const dx = mouseX - star.x;
            const dy = mouseY - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                star.size = star.originalSize * (1 + force * 0.5);
                star.opacity = Math.min(0.9, star.opacity + force * 0.3);
            }
        });
    });
    
    // Reset about star properties
    setInterval(() => {
        aboutStars.forEach(star => {
            if (star.size > star.originalSize) {
                star.size = Math.max(star.originalSize, star.size * 0.98);
            }
            if (star.opacity > 0.6) {
                star.opacity = Math.max(0.2, star.opacity * 0.99);
            }
        });
    }, 150);
});
document.addEventListener('DOMContentLoaded', function() {
    const aboutCanvas = document.getElementById('about-starfield-canvas');
    const aboutSection = document.getElementById('about');
    if (!aboutCanvas || !aboutSection) return;
    
    const aboutCtx = aboutCanvas.getContext('2d');
    let aboutStars = [];
    let aboutAnimationId;
    let aboutIsInViewport = false;
    
    function resizeAboutCanvas() {
        const aboutRect = aboutSection.getBoundingClientRect();
        aboutCanvas.width = aboutSection.offsetWidth;
        aboutCanvas.height = aboutSection.offsetHeight;
    }
      function createAboutStars() {
        aboutStars = [];
        const numStars = Math.floor((aboutCanvas.width * aboutCanvas.height) / 6000); // More stars
        
        for (let i = 0; i < numStars; i++) {
            aboutStars.push({
                x: Math.random() * aboutCanvas.width,
                y: Math.random() * aboutCanvas.height,
                size: Math.random() * 3 + 0.5, // Bigger stars
                speed: Math.random() * 1.2 + 0.2, // Faster falling
                opacity: Math.random() * 0.8 + 0.3, // Brighter
                twinkle: Math.random() * 0.02 + 0.01,
                originalSize: 0,
                trail: [], // Add trail for falling effect
                angle: Math.random() * Math.PI * 2, // Random angle for varied movement
                drift: (Math.random() - 0.5) * 0.5 // Horizontal drift
            });
            aboutStars[i].originalSize = aboutStars[i].size;
        }
    }
    
    function checkAboutViewport() {
        const aboutRect = aboutSection.getBoundingClientRect();
        aboutIsInViewport = aboutRect.bottom > 0 && aboutRect.top < window.innerHeight;
        
        if (!aboutIsInViewport && aboutAnimationId) {
            cancelAnimationFrame(aboutAnimationId);
            aboutAnimationId = null;
        } else if (aboutIsInViewport && !aboutAnimationId) {
            animateAbout();
        }
    }
      function updateAboutStars() {
        aboutStars.forEach(star => {
            // Enhanced falling motion with drift
            star.y += star.speed;
            star.x += star.drift;
            
            // Add trail effect
            star.trail.push({x: star.x, y: star.y, opacity: star.opacity});
            if (star.trail.length > 8) {
                star.trail.shift();
            }
            
            // Enhanced twinkling with pulsing
            star.opacity += Math.sin(Date.now() * star.twinkle) * 0.02;
            star.size = star.originalSize + Math.sin(Date.now() * star.twinkle * 0.5) * 0.3;
            star.opacity = Math.max(0.2, Math.min(1.0, star.opacity));
            
            // Reset star when it goes off screen
            if (star.y > aboutCanvas.height + 10) {
                star.y = -star.size - Math.random() * 50;
                star.x = Math.random() * aboutCanvas.width;
                star.trail = [];
            }
            
            // Wrap horizontal movement
            if (star.x > aboutCanvas.width + 10) {
                star.x = -10;
            } else if (star.x < -10) {
                star.x = aboutCanvas.width + 10;
            }
        });
    }
      function drawAboutStars() {
        aboutCtx.clearRect(0, 0, aboutCanvas.width, aboutCanvas.height);
        
        aboutStars.forEach(star => {
            // Draw trail first
            star.trail.forEach((trailPoint, index) => {
                const trailOpacity = (index / star.trail.length) * star.opacity * 0.3;
                const trailSize = star.size * (index / star.trail.length) * 0.5;
                
                aboutCtx.save();
                aboutCtx.globalAlpha = trailOpacity;
                aboutCtx.fillStyle = '#59b29e';
                aboutCtx.beginPath();
                aboutCtx.arc(trailPoint.x, trailPoint.y, trailSize, 0, Math.PI * 2);
                aboutCtx.fill();
                aboutCtx.restore();
            });
            
            aboutCtx.save();
            aboutCtx.globalAlpha = star.opacity;
            
            // Draw main star with enhanced sci-fi colors
            aboutCtx.fillStyle = '#afe3d7';
            aboutCtx.beginPath();
            aboutCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            aboutCtx.fill();
            
            // Add bright glow
            if (star.size > 1.5) {
                aboutCtx.globalAlpha = star.opacity * 0.4;
                aboutCtx.fillStyle = '#00ffc3';
                aboutCtx.beginPath();
                aboutCtx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                aboutCtx.fill();
            }
            
            // Add inner bright core for larger stars
            if (star.size > 2) {
                aboutCtx.globalAlpha = star.opacity * 0.8;
                aboutCtx.fillStyle = '#ffffff';
                aboutCtx.beginPath();
                aboutCtx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
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
    
    function initAbout() {
        resizeAboutCanvas();
        createAboutStars();
        // Start animation when section comes into view
        checkAboutViewport();
    }
    
    // Initialize about starfield
    setTimeout(initAbout, 100); // Small delay to ensure DOM is ready
    
    // Handle window resize for about section
    window.addEventListener('resize', () => {
        resizeAboutCanvas();
        createAboutStars();
    });
    
    // Check viewport on scroll for about section
    window.addEventListener('scroll', checkAboutViewport);
    
    // Pause about animation when tab is not visible
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
    
    // Interactive effect for about section
    let aboutMouseX = 0;
    let aboutMouseY = 0;
    
    aboutSection.addEventListener('mousemove', (e) => {
        const aboutRect = aboutSection.getBoundingClientRect();
        aboutMouseX = e.clientX - aboutRect.left;
        aboutMouseY = e.clientY - aboutRect.top;
        
        // Subtle interaction effect
        aboutStars.forEach(star => {
            const dx = star.x - aboutMouseX;
            const dy = star.y - aboutMouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
                star.opacity = Math.min(0.9, star.opacity + 0.2);
                star.size = Math.min(2.5, star.size * 1.1);
            }
        });
    });
    
    // Reset about star properties
    setInterval(() => {
        aboutStars.forEach(star => {
            if (star.size > star.originalSize) {
                star.size = Math.max(star.originalSize, star.size * 0.98);
            }
            if (star.opacity > 0.6) {
                star.opacity = Math.max(0.2, star.opacity * 0.99);
            }
        });    }, 150);
});