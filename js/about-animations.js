/**
 * Professional animations for About Me section
 */
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    // Initialize particle canvas with reduced intensity
    initParticleCanvas();
    
    // Add subtle mouse follow effect
    addMouseFollowEffect();
    
    // Add subtle ripple effect on click
    addRippleEffect();
      /**
     * Initialize the animated particle canvas background (reduced particle count and opacity)
     */
    function initParticleCanvas() {
        const canvas = document.getElementById('about-starfield-canvas');
        if (!canvas) return;
        
        // FIXED: Ensure canvas doesn't block scroll events
        canvas.style.pointerEvents = 'none';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '1';
        
        const ctx = canvas.getContext('2d');
        let width = aboutSection.offsetWidth;
        let height = aboutSection.offsetHeight;
          // Set canvas size
        canvas.width = width;
        canvas.height = height;
        
        // FIXED: Ensure canvas is properly positioned and doesn't block scrolling
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        // Particle settings - reduced count for cleaner look
        const particleCount = width > 768 ? 25 : 15;
        const particles = [];
        const connections = [];
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.5, // Smaller particles
                speedX: (Math.random() - 0.5) * 0.3, // Slower movement
                speedY: (Math.random() - 0.5) * 0.3, // Slower movement
                color: i % 5 === 0 ? 'rgba(0, 255, 195, 0.6)' : 'rgba(255, 255, 255, 0.4)'
            });
        }
        
        // Create some initial connections (fewer)
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                if (Math.random() > 0.985) { // Lower probability
                    connections.push({
                        from: i,
                        to: j,
                        opacity: Math.random() * 0.15 + 0.05 // Lower opacity
                    });
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                // Move particle
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Bounce off edges
                if (p.x < 0 || p.x > width) p.speedX *= -1;
                if (p.y < 0 || p.y > height) p.speedY *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
            
            // Draw connections
            connections.forEach(conn => {
                const p1 = particles[conn.from];
                const p2 = particles[conn.to];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Only draw connections within certain distance
                if (distance < 150) {
                    // Calculate opacity based on distance
                    const opacity = Math.min(0.5, Math.max(0.05, 1 - distance / 150)) * conn.opacity;
                    
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 255, 195, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Handle window resize
        function handleResize() {
            if (!canvas || !aboutSection) return;
            
            width = aboutSection.offsetWidth;
            height = aboutSection.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            
            // Ensure canvas properties are maintained after resize
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '1';
        }
        
        // Add resize listener with throttling
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 100);
        });
    }
    
    /**
     * Add subtle mouse follow effect (glowing orb)
     */
    function addMouseFollowEffect() {
        // Create glow element
        const glow = document.createElement('div');
        glow.className = 'mouse-glow';
        glow.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 195, 0.1), transparent 70%);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 5;
            opacity: 0;
            transition: opacity 0.5s ease;
            filter: blur(8px);
        `;
        aboutSection.appendChild(glow);
        
        // Track mouse movement
        aboutSection.addEventListener('mousemove', function(e) {
            const rect = aboutSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
            glow.style.opacity = '0.7';
        });
        
        // Hide when mouse leaves section
        aboutSection.addEventListener('mouseleave', function() {
            glow.style.opacity = '0';
        });
    }
    
    /**
     * Add subtle ripple effect on click
     */
    function addRippleEffect() {
        aboutSection.addEventListener('click', function(e) {
            const rect = aboutSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple element
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: rgba(0, 255, 195, 0.2);
                transform: translate(-50%, -50%) scale(0);
                pointer-events: none;
                z-index: 4;
                animation: rippleEffect 1.5s ease-out forwards;
            `;
            
            aboutSection.appendChild(ripple);
            
            // Add keyframes dynamically
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rippleEffect {
                    0% {
                        opacity: 0.7;
                        transform: translate(-50%, -50%) scale(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(15);
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Remove ripple after animation
            setTimeout(() => {
                aboutSection.removeChild(ripple);
                document.head.removeChild(style);
            }, 1500);
        });
    }
});