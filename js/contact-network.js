// Data Analyst Mind Contact Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const networkContainer = document.querySelector('.network-container');
    const nodes = document.querySelectorAll('.network-node');
    const centralPanel = document.querySelector('.central-panel');
    const dataStream = document.querySelector('.data-stream');
    
    if (!networkContainer) return;
    
    // Initialize the data analyst experience
    createNetworkCanvas();
    createDataStream();
    createLiveMetrics();
    addToolInteractions();
    handleAnalystForm();
    
    function createNetworkCanvas() {
        const canvas = document.createElement('div');
        canvas.className = 'network-canvas';
        canvas.innerHTML = `
            <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
                <!-- Main tool connections to central dashboard -->
                <line x1="150" y1="120" x2="500" y2="250" class="connection-line" style="animation-delay: 0s; stroke: #F2C811;" />
                <line x1="100" y1="250" x2="500" y2="250" class="connection-line" style="animation-delay: 0.5s; stroke: #217346;" />
                <line x1="170" y1="410" x2="500" y2="250" class="connection-line" style="animation-delay: 1s; stroke: #336791;" />
                <line x1="850" y1="140" x2="500" y2="250" class="connection-line" style="animation-delay: 1.5s; stroke: #306998;" />
                <line x1="880" y1="270" x2="500" y2="250" class="connection-line" style="animation-delay: 2s; stroke: #0077B5;" />
                <line x1="830" y1="420" x2="500" y2="250" class="connection-line" style="animation-delay: 2.5s; stroke: #333333;" />
                
                <!-- Data pipeline connections -->
                <line x1="150" y1="120" x2="100" y2="250" class="connection-line" style="animation-delay: 0.3s; opacity: 0.4; stroke: #90e0ef;" />
                <line x1="100" y1="250" x2="170" y2="410" class="connection-line" style="animation-delay: 0.8s; opacity: 0.4; stroke: #90e0ef;" />
                <line x1="850" y1="140" x2="880" y2="270" class="connection-line" style="animation-delay: 1.3s; opacity: 0.4; stroke: #90e0ef;" />
                <line x1="880" y1="270" x2="830" y2="420" class="connection-line" style="animation-delay: 1.8s; opacity: 0.4; stroke: #90e0ef;" />
            </svg>
        `;
        networkContainer.appendChild(canvas);
    }
    
    function createDataStream() {
        const streamData = [
            'SELECT * FROM opportunities WHERE skills IN ("Power BI", "SQL", "Python")',
            'INSERT INTO connections (name, email, project_type) VALUES...',
            'UPDATE career_goals SET status = "achieved" WHERE tool_mastery > 0.9',
            'CREATE INDEX ON projects (impact_score DESC)',
            'ANALYZE TABLE client_satisfaction COMPUTE STATISTICS',
            'WITH insights AS (SELECT visualization_type, COUNT(*) FROM dashboards...)'
        ];
        
        function addStreamLine() {
            const line = document.createElement('div');
            line.className = 'stream-line';
            line.textContent = streamData[Math.floor(Math.random() * streamData.length)];
            line.style.top = Math.random() * 100 + '%';
            line.style.animationDelay = Math.random() * 2 + 's';
            line.style.animationDuration = (10 + Math.random() * 10) + 's';
            dataStream.appendChild(line);
            
            // Remove line after animation
            setTimeout(() => {
                if (line.parentNode) line.parentNode.removeChild(line);
            }, 20000);
        }
        
        // Add initial lines and continue adding them
        for (let i = 0; i < 5; i++) {
            setTimeout(addStreamLine, i * 2000);
        }
        setInterval(addStreamLine, 3000);
    }
    
    function createLiveMetrics() {
        const responseRate = document.getElementById('responseRate');
        const avgResponse = document.getElementById('avgResponse');
        const satisfaction = document.getElementById('satisfaction');
        
        // Simulate live data updates
        setInterval(() => {
            if (Math.random() > 0.7) {
                const rates = ['97%', '98%', '99%', '100%'];
                responseRate.textContent = rates[Math.floor(Math.random() * rates.length)];
                responseRate.style.color = '#217346';
                setTimeout(() => responseRate.style.color = '#2A7C96', 1000);
            }
        }, 4000);
        
        setInterval(() => {
            if (Math.random() > 0.8) {
                const times = ['12h', '18h', '24h', '6h'];
                avgResponse.textContent = times[Math.floor(Math.random() * times.length)];
                avgResponse.style.color = '#306998';
                setTimeout(() => avgResponse.style.color = '#2A7C96', 1000);
            }
        }, 6000);
        
        setInterval(() => {
            if (Math.random() > 0.9) {
                const scores = ['4.8★', '4.9★', '5.0★'];
                satisfaction.textContent = scores[Math.floor(Math.random() * scores.length)];
                satisfaction.style.color = '#F2C811';
                setTimeout(() => satisfaction.style.color = '#2A7C96', 1000);
            }
        }, 8000);
    }
      function addToolInteractions() {
        nodes.forEach(node => {
            node.addEventListener('mouseenter', function() {
                // Highlight tool-specific connections
                const lines = document.querySelectorAll('.connection-line');
                lines.forEach(line => {
                    line.style.opacity = '1';
                    line.style.strokeWidth = '4';
                    line.style.filter = 'drop-shadow(0 0 8px currentColor)';
                });
                
                // Show tool insights in central panel
                const toolType = this.className.split(' ').find(cls => cls.startsWith('node-'));
                showToolInsight(toolType);
                
                // Add dashboard glow
                if (centralPanel) {
                    centralPanel.style.boxShadow = `
                        0 20px 60px rgba(42, 124, 150, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2),
                        0 0 50px rgba(42, 124, 150, 0.3)
                    `;
                }
            });
            
            node.addEventListener('mouseleave', function() {
                // Reset connections
                const lines = document.querySelectorAll('.connection-line');
                lines.forEach(line => {
                    line.style.opacity = '0.6';
                    line.style.strokeWidth = '2';
                    line.style.filter = 'none';
                });
                
                // Reset central panel
                if (centralPanel) {
                    centralPanel.style.boxShadow = `
                        0 20px 60px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `;
                }
            });
            
            // Handle tool-specific actions
            node.addEventListener('click', function() {
                const toolType = this.className.split(' ').find(cls => cls.startsWith('node-'));
                handleToolClick(toolType);
            });
        });
    }
    
    function showToolInsight(toolType) {
        const insights = {
            'node-powerbi': 'Creating interactive dashboards with 500K+ data points',
            'node-excel': 'Advanced pivot tables, VBA automation, statistical modeling',
            'node-sql': 'Complex queries, data warehousing, performance optimization',
            'node-python': 'Machine learning, pandas, scikit-learn, data visualization',
            'node-linkedin': 'Professional network analysis and engagement metrics',
            'node-github': 'Open source contributions and project management'
        };
        
        const subtitle = document.querySelector('.panel-subtitle');
        if (subtitle && insights[toolType]) {
            const originalText = subtitle.textContent;
            subtitle.textContent = insights[toolType];
            subtitle.style.color = '#2A7C96';
            setTimeout(() => {
                subtitle.textContent = originalText;
                subtitle.style.color = '#666';
            }, 2000);
        }
    }
    
    function handleToolClick(toolType) {
        const actions = {
            'node-powerbi': () => window.open('mailto:aditahosankabbo@gmail.com?subject=Power BI Project Inquiry', '_blank'),
            'node-excel': () => window.open('mailto:aditahosankabbo@gmail.com?subject=Excel Analytics Project', '_blank'),
            'node-sql': () => window.open('mailto:aditahosankabbo@gmail.com?subject=SQL Database Project', '_blank'),
            'node-python': () => window.open('mailto:aditahosankabbo@gmail.com?subject=Python ML Project', '_blank'),
            'node-linkedin': () => window.open('https://linkedin.com/in/adittoahosankabbo', '_blank'),
            'node-github': () => window.open('https://github.com/AdittoAhosanKabbo', '_blank')
        };
        
        if (actions[toolType]) {
            actions[toolType]();
            
            // Add click animation
            const clickedNode = document.querySelector(`.${toolType}`);
            if (clickedNode) {
                clickedNode.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    clickedNode.style.transform = '';
                }, 200);
            }
        }
    }
      function handleAnalystForm() {
        const form = document.getElementById('networkContactForm');
        if (!form) return;
        
        // Add SQL-style placeholder animation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontFamily = '"Courier New", monospace';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.style.fontFamily = 'var(--font-main)';
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            
            // Show processing state with data analyst terminology
            submitBtn.querySelector('.btn-text').textContent = 'Processing Query...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'linear-gradient(135deg, #666, #888)';
            
            // Add data processing visualization
            const processingSteps = [
                'Validating input parameters...',
                'Establishing database connection...',
                'Executing INSERT statement...',
                'Committing transaction...',
                'Query executed successfully!'
            ];
            
            let stepIndex = 0;
            const stepInterval = setInterval(() => {
                if (stepIndex < processingSteps.length) {
                    submitBtn.querySelector('.btn-text').textContent = processingSteps[stepIndex];
                    stepIndex++;
                } else {
                    clearInterval(stepInterval);
                }
            }, 600);
            
            // Add network data burst effect
            const burstEffect = document.createElement('div');
            burstEffect.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border: 3px solid #90e0ef;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: dataBurst 3s ease-out;
                pointer-events: none;
                z-index: 5;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes dataBurst {
                    0% { width: 0; height: 0; opacity: 1; border-width: 3px; }
                    50% { width: 300px; height: 300px; opacity: 0.7; border-width: 2px; }
                    100% { width: 600px; height: 600px; opacity: 0; border-width: 1px; }
                }
            `;
            document.head.appendChild(style);
            networkContainer.appendChild(burstEffect);
            
            // Simulate successful database insertion
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = 'Connection Established!';
                submitBtn.style.background = 'linear-gradient(135deg, #217346, #4CAF50)';
                
                // Update metrics to show successful contact
                const responseRate = document.getElementById('responseRate');
                responseRate.textContent = '100%';
                responseRate.style.color = '#217346';
                
                // Clean up effects
                burstEffect.remove();
                style.remove();
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = 'linear-gradient(135deg, #2A7C96, #90e0ef)';
                    responseRate.style.color = '#2A7C96';
                    
                    // Reset input font families
                    inputs.forEach(input => {
                        input.style.fontFamily = 'var(--font-main)';
                    });
                }, 3000);
            }, 3000);
        });
    }
    
    // Add periodic data pipeline activity
    function addDataPipelineActivity() {
        setInterval(() => {
            const randomLine = document.querySelectorAll('.connection-line')[Math.floor(Math.random() * 6)];
            if (randomLine) {
                const originalStroke = randomLine.style.stroke;
                randomLine.style.stroke = '#90e0ef';
                randomLine.style.strokeWidth = '5';
                randomLine.style.opacity = '1';
                randomLine.style.filter = 'drop-shadow(0 0 12px #90e0ef)';
                
                setTimeout(() => {
                    randomLine.style.stroke = originalStroke || '#2A7C96';
                    randomLine.style.strokeWidth = '2';
                    randomLine.style.opacity = '0.6';
                    randomLine.style.filter = 'none';
                }, 1200);
            }
        }, 2500);
    }
    
    // Start data pipeline activity after initial load
    setTimeout(addDataPipelineActivity, 3000);
});
