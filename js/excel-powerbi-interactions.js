// Excel and Power BI Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== EXCEL INTERACTIONS =====
    const excelCells = document.querySelectorAll('.excel-cell');
    const formulaInput = document.querySelector('.excel-formula-input');
    const nameBox = document.querySelector('.excel-name-box');
    
    // Add click interaction to Excel cells
    if (excelCells.length > 0) {
        excelCells.forEach((cell, index) => {
            cell.addEventListener('click', function() {
                // Remove previous selection
                excelCells.forEach(c => c.classList.remove('selected'));
                
                // Add selection to clicked cell
                this.classList.add('selected');
                this.style.background = 'linear-gradient(to bottom, #cce7ff 0%, #a6d2ff 100%)';
                this.style.border = '2px solid #0078d4';
                
                // Calculate cell position
                const rowIndex = Math.floor(index / 3) + 1;
                const colIndex = index % 3;
                const colLetter = String.fromCharCode(65 + colIndex);
                
                // Update name box
                if (nameBox) {
                    nameBox.textContent = `${colLetter}${rowIndex}`;
                }
                
                // Update formula based on cell content
                const cellContent = this.textContent.trim();
                if (formulaInput && cellContent) {
                    if (this.classList.contains('header-cell')) {
                        formulaInput.textContent = `"${cellContent}"`;
                    } else if (this.classList.contains('name-cell')) {
                        formulaInput.textContent = `=CONCATENATE("Name: ", "${cellContent}")`;
                    } else if (this.classList.contains('role-cell')) {
                        formulaInput.textContent = `=UPPER("${cellContent}")`;
                    } else if (cellContent.includes('✓')) {
                        formulaInput.textContent = `=IF(TRUE, "${cellContent}", "✗ Inactive")`;
                    } else {
                        formulaInput.textContent = `"${cellContent}"`;
                    }
                }
            });
            
            // Reset cell styling on mouse leave
            cell.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.background = '';
                    this.style.border = '';
                }
            });
        });
    }
    
    // Excel ribbon button interactions
    const excelRibbonIcons = document.querySelectorAll('.excel-ribbon-icon');
    excelRibbonIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            this.style.background = '#0078d4';
            this.style.color = '#ffffff';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '';
                this.style.color = '';
            }, 150);
        });
    });
    
    // Excel window control interactions
    const excelControlBtns = document.querySelectorAll('.excel-control-btn');
    excelControlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('close')) {
                this.style.background = '#e81123';
                this.style.color = '#ffffff';
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                }, 200);
            } else {
                this.style.background = '#0078d4';
                this.style.color = '#ffffff';
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                }, 200);
            }
        });
    });
    
    // ===== POWER BI INTERACTIONS =====
    const powerbiNavItems = document.querySelectorAll('.powerbi-nav-item');
    const powerbiKpiCards = document.querySelectorAll('.powerbi-kpi-card');
    const progressFills = document.querySelectorAll('.progress-fill');
    
    // Navigation item clicks
    powerbiNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            powerbiNavItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // KPI card hover effects
    powerbiKpiCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Animate progress bars on page load
    setTimeout(() => {
        progressFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            fill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                fill.style.width = width;
            }, 500);
        });
    }, 1000);
    
    // Power BI window control interactions
    const powerbiControlBtns = document.querySelectorAll('.powerbi-control-btn');
    powerbiControlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('close')) {
                this.style.background = '#e81123';
                this.style.color = '#ffffff';
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                }, 200);
            } else {
                this.style.background = 'rgba(255, 255, 255, 0.2)';
                setTimeout(() => {
                    this.style.background = '';
                }, 200);
            }
        });
    });
    
    // Typing effect for Excel formula bar
    if (formulaInput) {
        const originalFormula = formulaInput.textContent;
        formulaInput.textContent = '';
        let i = 0;
        
        function typeFormula() {
            if (i < originalFormula.length) {
                formulaInput.textContent += originalFormula.charAt(i);
                i++;
                setTimeout(typeFormula, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeFormula, 1500);
    }
    
    // Update status bar messages
    setTimeout(() => {
        const excelStatusLeft = document.querySelector('.excel-status-left');
        const powerbiStatusLeft = document.querySelector('.status-left span');
        
        if (excelStatusLeft) {
            excelStatusLeft.textContent = 'Ready';
        }
        
        if (powerbiStatusLeft) {
            powerbiStatusLeft.textContent = 'Connected to Personal Data';
        }
    }, 2500);
    
    // Add realistic data refresh animation for Power BI
    setInterval(() => {
        const statusRight = document.querySelector('.status-right span');
        if (statusRight) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            statusRight.textContent = `Last refresh: ${timeString}`;
        }
    }, 30000); // Update every 30 seconds
      // ===== SQL TYPING EFFECT =====
    
    // SQL Query Typing Effect
    const sqlQueryInput = document.querySelector('.sql-query-input');
    
    if (sqlQueryInput) {
        // Get the plain text SQL from data attribute
        const plainTextSql = sqlQueryInput.getAttribute('data-sql-content') || sqlQueryInput.textContent;
        
        // Clear the content initially for typing effect
        sqlQueryInput.innerHTML = '';
        
        let sqlIndex = 0;
        let currentLine = 1;
        
        // SQL syntax highlighting function
        function applySqlSyntaxHighlighting(text) {
            // Split by lines to maintain formatting
            const lines = text.split('\n');
            const highlightedLines = lines.map(line => {
                let highlightedLine = line;
                
                // SQL keywords (case insensitive)
                highlightedLine = highlightedLine.replace(/\b(SELECT|FROM|WHERE|ORDER\s+BY|DESC|ASC|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|JOIN|INNER|LEFT|RIGHT|GROUP\s+BY|HAVING|UNION|DISTINCT|AS|AND|OR|NOT|IN|LIKE|BETWEEN|NULL|IS|EXISTS)\b/gi, 
                    '<span style="color: #569cd6;">$1</span>');
                
                // Column names and identifiers
                highlightedLine = highlightedLine.replace(/\b(FullName|Role|IntermediateSkill|Experience|CurrentFocus|Status)\b/g, 
                    '<span style="color: #9cdcfe;">$1</span>');
                
                // Table names
                highlightedLine = highlightedLine.replace(/\b(AboutMe_Profile)\b/g, 
                    '<span style="color: #dcdcaa;">$1</span>');
                
                // String literals
                highlightedLine = highlightedLine.replace(/'([^']*)'/g, '<span style="color: #ce9178;">\'$1\'</span>');
                
                return highlightedLine;
            });
            
            return highlightedLines.join('\n');
        }
        
        function typeSqlQuery() {
            if (sqlIndex < plainTextSql.length) {
                const currentChar = plainTextSql.charAt(sqlIndex);
                
                // Get current content up to the current index
                let currentContent = plainTextSql.substring(0, sqlIndex + 1);
                
                // Apply syntax highlighting to the current content
                const highlightedContent = applySqlSyntaxHighlighting(currentContent);
                
                // Add blinking cursor
                sqlQueryInput.innerHTML = highlightedContent + '<span class="sql-cursor">|</span>';
                
                sqlIndex++;                // Variable typing speed for very fast effect
                let typingSpeed = 20; // Very fast default speed
                
                // Very fast for all characters
                if (currentChar === ' ') {
                    typingSpeed = 8; // Super fast for whitespace
                } else if (currentChar === '\n') {
                    typingSpeed = 30; // Minimal pause at line breaks
                } else if (/[A-Z]/.test(currentChar)) {
                    typingSpeed = 25; // Very fast for uppercase (keywords)
                }
                
                setTimeout(typeSqlQuery, typingSpeed);
            } else {
                // Remove cursor when typing is complete
                const finalContent = applySqlSyntaxHighlighting(plainTextSql);
                sqlQueryInput.innerHTML = finalContent;
                
                // Add completion effect
                sqlQueryInput.classList.add('sql-typing-complete');
                setTimeout(() => {
                    sqlQueryInput.classList.remove('sql-typing-complete');
                }, 500);
                
                // Update SQL status
                setTimeout(() => {
                    const sqlStatus = document.querySelector('.sql-query-status');
                    if (sqlStatus) {
                        sqlStatus.innerHTML = '<i class="fas fa-check-circle"></i> Query executed successfully. (1 row affected)';
                        sqlStatus.style.color = '#4fc3f7';
                        sqlStatus.style.opacity = '0';
                        sqlStatus.style.animation = 'fadeIn 0.5s ease-in forwards';
                    }
                }, 800);
            }
        }
          // Start SQL typing immediately (no delay)
        setTimeout(() => {
            console.log('🔄 Starting SQL typing effect...');
            typeSqlQuery();
        }, 100);
    }

    console.log('✅ Excel and Power BI containers initialized');
});
