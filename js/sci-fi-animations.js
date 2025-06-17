// Sci-Fi UI Animations - Hero Section Only
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    // Add intro animation class to hero section after page load
    setTimeout(() => {
        heroSection.classList.add('intro-anim-complete');
    }, 1000);
    
    // Animate UI elements on load - only in hero section
    const uiElements = heroSection.querySelectorAll('.ui-cross, .ui-border, .ui-circles, .ui-tics');
    
    uiElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.21, 0.61, 0.35, 1)';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 200 + (index * 100));
    });
    
    // Add pulsing animation to UI elements - only in hero section
    const redElements = heroSection.querySelectorAll('.cap, .batt, .ui-corner');
    redElements.forEach(element => {
        element.style.animation = 'pulse 2s ease-in-out infinite alternate';
    });
    
    // Add glowing effect to teal elements - only in hero section
    const tealElements = heroSection.querySelectorAll('.circle, .ui-inner-border');
    tealElements.forEach(element => {
        element.style.animation = 'glow 3s ease-in-out infinite alternate';
    });
    
    // Interactive hover effects - only for hero section
    heroSection.addEventListener('mouseenter', () => {
        const uiCross = heroSection.querySelector('.ui-cross');
        if (uiCross) uiCross.style.opacity = '0.8';
    });
    
    heroSection.addEventListener('mouseleave', () => {
        const uiCross = heroSection.querySelector('.ui-cross');
        if (uiCross) uiCross.style.opacity = '0.5';
    });
    
    // Scroll-based animations - only affect hero UI elements
    let lastScrollY = window.pageYOffset;
    
    window.addEventListener('scroll', () => {
        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        
        if (isHeroVisible) {
            const scrolled = window.pageYOffset - lastScrollY;
            const rate = scrolled * -0.5;
            
            // Parallax effect for UI elements - only in hero
            const uiCross = heroSection.querySelector('.ui-cross');
            if (uiCross) {
                uiCross.style.transform = `translateY(${rate}px)`;
            }
        }
        
        lastScrollY = window.pageYOffset;
    });
      // Add CSS animations dynamically - scoped to hero section only
    const style = document.createElement('style');
    style.textContent = `
        #home .ui-cross .border-vert,
        #home .ui-cross .border-horz {
            animation: scan 4s ease-in-out infinite;
        }
        
        #home .ui-tics .tic::before {
            animation: flicker 2s ease-in-out infinite;
        }
        
        #home .circle {
            animation: rotate 10s linear infinite;
        }
        
        @keyframes pulse {
            0% { 
                opacity: 0.6; 
                transform: scale(1);
                box-shadow: 0 0 5px var(--color-red);
            }
            100% { 
                opacity: 1; 
                transform: scale(1.1);
                box-shadow: 0 0 15px var(--color-red);
            }
        }
        
        @keyframes glow {
            0% { 
                box-shadow: 0 0 5px var(--color-teal);
                opacity: 0.7;
            }
            100% { 
                box-shadow: 0 0 20px var(--color-teal-2);
                opacity: 1;
            }
        }
        
        @keyframes scan {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
        }
        
        @keyframes flicker {
            0%, 100% { opacity: 0.8; }
            25% { opacity: 1; }
            50% { opacity: 0.6; }
            75% { opacity: 1; }
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

// Static Data Analyst Background for Projects Section
document.addEventListener('DOMContentLoaded', function() {
    initStaticDataBackground();
});

function initStaticDataBackground() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    // Create main background container
    const dataBg = document.createElement('div');
    dataBg.className = 'data-analyst-static-bg';
    projectsSection.insertBefore(dataBg, projectsSection.firstChild);
      // Create static data visualization elements
    createStaticDataElements(dataBg);
    
    // Create moving stars
    createMovingStars(dataBg);// Static Data Elements
    function createStaticDataElements(container) {
        // Create static grid pattern
        const gridContainer = document.createElement('div');
        gridContainer.className = 'static-grid';
        container.appendChild(gridContainer);

        // Create static chart icons
        const chartsContainer = document.createElement('div');
        chartsContainer.className = 'static-charts';
        container.appendChild(chartsContainer);

        // Create static bar chart
        const barChart = document.createElement('div');
        barChart.className = 'static-bar-chart';
        for (let i = 0; i < 6; i++) {
            const bar = document.createElement('div');
            bar.className = 'static-bar';
            bar.style.height = (30 + Math.random() * 40) + '%';
            barChart.appendChild(bar);
        }
        chartsContainer.appendChild(barChart);

        // Create static line chart
        const lineChart = document.createElement('div');
        lineChart.className = 'static-line-chart';
        const line = document.createElement('div');
        line.className = 'static-line';
        lineChart.appendChild(line);
        chartsContainer.appendChild(lineChart);

        // Create static pie chart
        const pieChart = document.createElement('div');
        pieChart.className = 'static-pie-chart';
        for (let i = 0; i < 4; i++) {
            const slice = document.createElement('div');
            slice.className = `static-pie-slice slice-${i + 1}`;
            pieChart.appendChild(slice);
        }
        chartsContainer.appendChild(pieChart);

        // Create static data points
        const dataPoints = document.createElement('div');
        dataPoints.className = 'static-data-points';
        for (let i = 0; i < 20; i++) {
            const point = document.createElement('div');
            point.className = 'data-point';
            point.style.left = Math.random() * 100 + '%';
            point.style.top = Math.random() * 100 + '%';
            dataPoints.appendChild(point);        }
        container.appendChild(dataPoints);
    }

    // Moving Stars
    function createMovingStars(container) {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'moving-stars';
        container.appendChild(starsContainer);

        // Create different sizes of stars
        const starSizes = [
            { count: 30, size: 1, speed: 20 },
            { count: 20, size: 2, speed: 15 },
            { count: 10, size: 3, speed: 10 }
        ];

        starSizes.forEach((starConfig, typeIndex) => {
            for (let i = 0; i < starConfig.count; i++) {
                const star = document.createElement('div');
                star.className = `moving-star star-size-${starConfig.size}`;
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDuration = (starConfig.speed + Math.random() * 10) + 's';
                star.style.animationDelay = (Math.random() * 5) + 's';
                starsContainer.appendChild(star);
            }
        });
    }// Add static CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .projects-section {
            position: relative;
            overflow: hidden;
        }

        .data-analyst-static-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, 
                rgba(2, 12, 27, 0.95) 0%, 
                rgba(7, 25, 82, 0.95) 25%,
                rgba(2, 48, 71, 0.95) 50%,
                rgba(0, 119, 182, 0.9) 75%,
                rgba(0, 180, 216, 0.85) 100%);
            pointer-events: none;
            z-index: -1;
        }

        /* Static Grid Pattern */
        .static-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            opacity: 0.3;
        }

        /* Static Charts Container */
        .static-charts {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        /* Static Bar Chart */
        .static-bar-chart {
            position: absolute;
            bottom: 20%;
            left: 10%;
            display: flex;
            align-items: flex-end;
            height: 80px;
            width: 100px;
            gap: 6px;
            opacity: 0.4;
        }

        .static-bar {
            width: 12px;
            background: linear-gradient(to top, 
                rgba(255, 107, 107, 0.8) 0%, 
                rgba(78, 205, 196, 0.8) 100%);
            border-radius: 2px 2px 0 0;
            border: 1px solid rgba(0, 255, 255, 0.3);
        }

        /* Static Line Chart */
        .static-line-chart {
            position: absolute;
            top: 30%;
            right: 15%;
            width: 120px;
            height: 60px;
            opacity: 0.4;
        }

        .static-line {
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, 
                rgba(138, 43, 226, 0.8) 0%, 
                rgba(0, 255, 255, 0.8) 50%, 
                rgba(255, 107, 107, 0.8) 100%);
            border-radius: 2px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }

        /* Static Pie Chart */
        .static-pie-chart {
            position: absolute;
            top: 60%;
            left: 70%;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            opacity: 0.4;
            overflow: hidden;
            border: 2px solid rgba(0, 255, 255, 0.3);
        }

        .static-pie-slice {
            position: absolute;
            width: 50%;
            height: 50%;
        }

        .static-pie-chart .slice-1 {
            background: rgba(255, 107, 107, 0.8);
            border-radius: 60px 0 0 0;
            transform-origin: 100% 100%;
        }

        .static-pie-chart .slice-2 {
            background: rgba(78, 205, 196, 0.8);
            border-radius: 0 60px 0 0;
            transform: rotate(90deg);
            transform-origin: 0% 100%;
        }

        .static-pie-chart .slice-3 {
            background: rgba(255, 217, 61, 0.8);
            border-radius: 0 0 60px 0;
            transform: rotate(180deg);
            transform-origin: 0% 0%;
        }

        .static-pie-chart .slice-4 {
            background: rgba(138, 43, 226, 0.8);
            border-radius: 0 0 0 60px;
            transform: rotate(270deg);
            transform-origin: 100% 0%;
        }

        /* Static Data Points */
        .static-data-points {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }        .data-point {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
        }

        /* Moving Stars */
        .moving-stars {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .moving-star {
            position: absolute;
            background: #ffffff;
            border-radius: 50%;
            animation: starMove linear infinite;
            opacity: 0.8;
        }

        .star-size-1 {
            width: 1px;
            height: 1px;
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
        }

        .star-size-2 {
            width: 2px;
            height: 2px;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
        }

        .star-size-3 {
            width: 3px;
            height: 3px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 1);
        }

        @keyframes starMove {
            0% {
                transform: translateX(-10px) translateY(-10px);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateX(-100vw) translateY(100vh);
                opacity: 0;
            }
        }

        /* Content Styling */
        .projects-section .container {
            position: relative;
            z-index: 1;
        }

        .projects-section .section-title {
            color: #ffffff;
            text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
            font-weight: 700;
        }

        .projects-section .section-description {
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        }

        /* Add subtle decorative elements */
        .data-analyst-static-bg::before {
            content: '';
            position: absolute;
            top: 10%;
            left: 5%;
            width: 150px;
            height: 100px;
            background: linear-gradient(45deg, 
                transparent 30%, 
                rgba(0, 255, 255, 0.1) 50%, 
                transparent 70%);
            border-radius: 10px;
            opacity: 0.5;
        }

        .data-analyst-static-bg::after {
            content: '';
            position: absolute;
            bottom: 15%;
            right: 10%;
            width: 120px;
            height: 80px;
            background: linear-gradient(-45deg, 
                transparent 30%, 
                rgba(138, 43, 226, 0.1) 50%, 
                transparent 70%);
            border-radius: 10px;
            opacity: 0.5;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .static-bar-chart {
                width: 70px;
                height: 50px;
                left: 5%;
            }
            
            .static-bar {
                width: 8px;
            }
            
            .static-line-chart {
                width: 80px;
                height: 40px;
                right: 10%;
            }
            
            .static-pie-chart {
                width: 40px;
                height: 40px;
                left: 60%;
            }

            .data-point {
                width: 3px;
                height: 3px;
            }
        }
    `;
    document.head.appendChild(style);
}
