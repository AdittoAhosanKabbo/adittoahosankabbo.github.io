// Simple Data Visualization Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('simpleDatavizModal');
    const modalIframe = document.getElementById('simpleModalIframe');
    const modalTitle = document.querySelector('.simple-modal-title');
    const modalClose = document.querySelector('.simple-modal-close');    const modalGithub = document.getElementById('simpleModalGithub');
    const modalLinkedin = document.getElementById('simpleModalLinkedin');
    const modalPrevBtn = document.getElementById('simpleModalPrev');
    const modalNextBtn = document.getElementById('simpleModalNext');
      // Get all enlarge and new tab buttons
    const enlargeButtons = document.querySelectorAll('.simple-enlarge-btn');
    const newTabButtons = document.querySelectorAll('.simple-newtab-btn');
      // Project navigation state
    let currentProjectIndex = 0;
    let allProjectCards = [];
    
    // Initialize modal buttons (hidden by default)
    if (modalGithub) modalGithub.style.display = 'none';
    if (modalLinkedin) modalLinkedin.style.display = 'none';    // Project links mapping
    const projectLinks = {        'Inventory Management': {
            github: 'https://github.com/AdittoAhosanKabbo/Inventory_Management_PowerBi_Project',
            linkedin: 'https://www.linkedin.com/posts/adittoahosankabbo_inventory-analaysis-dashboard-activity-7321133843392970752-fg6f?utm_source=share&utm_medium=member_desktop&rcm=ACoAADYmlAcBDC-p4HWCs6yFwh5eDLA4vA0uquE'
        },'HR Analytics': {
            github: 'https://github.com/AdittoAhosanKabbo/HR_Analytics_Power_Bi_Project',
            linkedin: 'https://www.linkedin.com/posts/adittoahosankabbo_hranalytics-powerbi-datavisualization-activity-7334990081918676993-oG9q?utm_source=share&utm_medium=member_desktop&rcm=ACoAADYmlAcBDC-p4HWCs6yFwh5eDLA4vA0uquE'
        },
        'Sales Performance Dashboard': {
            github: 'https://github.com/adittoahosankabbo/data-projects/tree/main/sales-dashboard',
            linkedin: '#'
        },
        'COVID-19 Global Analysis': {
            github: 'https://github.com/adittoahosankabbo/data-projects/tree/main/covid-analysis',
            linkedin: '#'
        }
    };      // Handle enlarge button clicks
    enlargeButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Store current project index and update project cards array
            currentProjectIndex = index;
            allProjectCards = Array.from(document.querySelectorAll('.simple-project-card'));
            
            const iframeSrc = this.getAttribute('data-iframe-src');
            const projectCard = this.closest('.simple-project-card');
            const projectTitle = projectCard.querySelector('.simple-project-title').textContent;
            
            // Set modal content
            modalTitle.textContent = projectTitle;
            modalIframe.src = iframeSrc;
            
            // Update navigation buttons state
            updateNavigationButtons();
              // Set project links and handle visibility
            const links = projectLinks[projectTitle];
            console.log('Project:', projectTitle, 'Links:', links); // Debug log
            
            if (links) {
                // Always show GitHub button (all projects have GitHub links)
                modalGithub.style.display = 'flex';
                modalGithub.onclick = () => window.open(links.github, '_blank');
                console.log('GitHub button shown for:', projectTitle); // Debug log
                
                // Handle LinkedIn button visibility
                if (links.linkedin && links.linkedin !== '#') {
                    modalLinkedin.style.display = 'flex';
                    modalLinkedin.onclick = () => window.open(links.linkedin, '_blank');
                    console.log('LinkedIn button shown for:', projectTitle); // Debug log
                } else {
                    modalLinkedin.style.display = 'none';
                    modalLinkedin.onclick = null;
                    console.log('LinkedIn button hidden for:', projectTitle); // Debug log
                }
            } else {
                // Fallback: hide both buttons if no links found
                modalGithub.style.display = 'none';
                modalLinkedin.style.display = 'none';
                console.log('No links found for:', projectTitle); // Debug log
            }
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
      // Handle new tab button clicks
    newTabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const iframeSrc = this.getAttribute('data-iframe-src');
            window.open(iframeSrc, '_blank');
        });
    });
      // Update navigation buttons state with enhanced visual feedback
    function updateNavigationButtons() {
        if (modalPrevBtn && modalNextBtn) {
            const isPrevDisabled = currentProjectIndex === 0;
            const isNextDisabled = currentProjectIndex === allProjectCards.length - 1;
            
            modalPrevBtn.disabled = isPrevDisabled;
            modalNextBtn.disabled = isNextDisabled;
            
            // Add visual feedback with smooth transitions
            modalPrevBtn.style.transition = 'all 0.3s ease';
            modalNextBtn.style.transition = 'all 0.3s ease';
            
            if (isPrevDisabled) {
                modalPrevBtn.style.opacity = '0.4';
                modalPrevBtn.style.transform = 'scale(0.9)';
            } else {
                modalPrevBtn.style.opacity = '1';
                modalPrevBtn.style.transform = 'scale(1)';
            }
            
            if (isNextDisabled) {
                modalNextBtn.style.opacity = '0.4';
                modalNextBtn.style.transform = 'scale(0.9)';
            } else {
                modalNextBtn.style.opacity = '1';
                modalNextBtn.style.transform = 'scale(1)';
            }
        }
    }
      // Navigate to specific project with smooth transitions
    function navigateToProject(index) {
        if (index >= 0 && index < allProjectCards.length && index !== currentProjectIndex) {
            currentProjectIndex = index;
            const projectCard = allProjectCards[index];
            const enlargeBtn = projectCard.querySelector('.simple-enlarge-btn');
            
            if (enlargeBtn) {
                // Add loading state
                modalIframe.style.opacity = '0.3';
                modalIframe.style.transition = 'opacity 0.2s ease';
                
                const iframeSrc = enlargeBtn.getAttribute('data-iframe-src');
                const projectTitle = projectCard.querySelector('.simple-project-title').textContent;
                
                // Update modal content with animation
                modalTitle.style.opacity = '0.7';
                setTimeout(() => {
                    modalTitle.textContent = projectTitle;
                    modalTitle.style.opacity = '1';
                }, 100);
                
                // Load new iframe content
                modalIframe.src = iframeSrc;
                
                // Reset iframe opacity when loaded
                modalIframe.onload = function() {
                    this.style.opacity = '1';
                    this.style.transition = 'opacity 0.3s ease';
                };
                
                // Update social buttons with smooth transition
                setTimeout(() => {
                    const links = projectLinks[projectTitle];
                    if (links) {
                        modalGithub.style.display = 'flex';
                        modalGithub.onclick = () => window.open(links.github, '_blank');
                        
                        if (links.linkedin && links.linkedin !== '#') {
                            modalLinkedin.style.display = 'flex';
                            modalLinkedin.onclick = () => window.open(links.linkedin, '_blank');
                        } else {
                            modalLinkedin.style.display = 'none';
                            modalLinkedin.onclick = null;
                        }
                    } else {
                        modalGithub.style.display = 'none';
                        modalLinkedin.style.display = 'none';
                    }
                }, 50);
                
                // Update navigation buttons
                updateNavigationButtons();
            }
        }
    }
      // Modal navigation event listeners with enhanced responsiveness
    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentProjectIndex > 0 && !this.disabled) {
                // Add click feedback
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                navigateToProject(currentProjectIndex - 1);
            }
        });
        
        // Add touch support for mobile
        modalPrevBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                this.style.transform = 'scale(1.1)';
            }
        });
        
        modalPrevBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                this.style.transform = '';
                if (currentProjectIndex > 0) {
                    navigateToProject(currentProjectIndex - 1);
                }
            }
        });
    }
    
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentProjectIndex < allProjectCards.length - 1 && !this.disabled) {
                // Add click feedback
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                navigateToProject(currentProjectIndex + 1);
            }
        });
        
        // Add touch support for mobile
        modalNextBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                this.style.transform = 'scale(1.1)';
            }
        });
        
        modalNextBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                this.style.transform = '';
                if (currentProjectIndex < allProjectCards.length - 1) {
                    navigateToProject(currentProjectIndex + 1);
                }
            }
        });
    }
    
    // Handle modal close
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear iframe src after animation
        setTimeout(() => {
            modalIframe.src = '';
        }, 300);
    }
    
    // Close modal on close button click
    modalClose.addEventListener('click', closeModal);
    
    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });    // Enhanced keyboard navigation with visual feedback
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentProjectIndex > 0 && modalPrevBtn && !modalPrevBtn.disabled) {
                    // Add visual feedback for keyboard navigation
                    modalPrevBtn.style.transform = 'scale(1.1)';
                    modalPrevBtn.style.background = '#3498db';
                    modalPrevBtn.style.color = 'white';
                    
                    setTimeout(() => {
                        modalPrevBtn.style.transform = '';
                        modalPrevBtn.style.background = '';
                        modalPrevBtn.style.color = '';
                    }, 200);
                    
                    navigateToProject(currentProjectIndex - 1);
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentProjectIndex < allProjectCards.length - 1 && modalNextBtn && !modalNextBtn.disabled) {
                    // Add visual feedback for keyboard navigation
                    modalNextBtn.style.transform = 'scale(1.1)';
                    modalNextBtn.style.background = '#3498db';
                    modalNextBtn.style.color = 'white';
                    
                    setTimeout(() => {
                        modalNextBtn.style.transform = '';
                        modalNextBtn.style.background = '';
                        modalNextBtn.style.color = '';
                    }, 200);
                    
                    navigateToProject(currentProjectIndex + 1);
                }
            }
        }
    });
    
    // Add loading state for iframes
    const iframes = document.querySelectorAll('.simple-iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    // Add smooth scroll to projects section if coming from navigation
    const projectsLinks = document.querySelectorAll('a[href="#projects"]');
    projectsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
      // Add hover effects for better user experience
    const projectCardsForHover = document.querySelectorAll('.simple-project-card');
    projectCardsForHover.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const iframe = this.querySelector('.simple-iframe');
            if (iframe) {
                iframe.style.transform = 'scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const iframe = this.querySelector('.simple-iframe');
            if (iframe) {
                iframe.style.transform = 'scale(1)';
            }
        });
    });
    
    // Intersection Observer for animation on scroll
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        projectCardsForHover.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
});

// Utility functions for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize handler for responsive modal
window.addEventListener('resize', debounce(() => {
    const modal = document.getElementById('simpleDatavizModal');
    if (modal.classList.contains('active')) {
        // Adjust modal size if needed
        const modalContent = modal.querySelector('.simple-modal-content');
        if (window.innerWidth < 768) {
            modalContent.style.width = '98%';
            modalContent.style.height = '95%';
        } else {
            modalContent.style.width = '95%';
            modalContent.style.height = '90%';
        }
    }
}, 250));

// Add swipe gesture support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    if (modal) {
        modal.addEventListener('touchstart', function(e) {
            if (modal.classList.contains('active')) {
                touchStartX = e.changedTouches[0].screenX;
                isSwiping = true;
            }
        }, { passive: true });
        
        modal.addEventListener('touchmove', function(e) {
            if (isSwiping && modal.classList.contains('active')) {
                e.preventDefault(); // Prevent scrolling
            }
        }, { passive: false });
        
        modal.addEventListener('touchend', function(e) {
            if (isSwiping && modal.classList.contains('active')) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipeGesture();
                isSwiping = false;
            }
        }, { passive: true });
    }
    
    function handleSwipeGesture() {
        const swipeThreshold = 50; // Minimum distance for swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous project
                if (currentProjectIndex > 0 && modalPrevBtn && !modalPrevBtn.disabled) {
                    // Add visual feedback
                    modalPrevBtn.style.transform = 'scale(1.2)';
                    modalPrevBtn.style.background = '#3498db';
                    modalPrevBtn.style.color = 'white';
                    
                    setTimeout(() => {
                        modalPrevBtn.style.transform = '';
                        modalPrevBtn.style.background = '';
                        modalPrevBtn.style.color = '';
                    }, 300);
                    
                    navigateToProject(currentProjectIndex - 1);
                }
            } else {
                // Swipe left - go to next project
                if (currentProjectIndex < allProjectCards.length - 1 && modalNextBtn && !modalNextBtn.disabled) {
                    // Add visual feedback
                    modalNextBtn.style.transform = 'scale(1.2)';
                    modalNextBtn.style.background = '#3498db';
                    modalNextBtn.style.color = 'white';
                    
                    setTimeout(() => {
                        modalNextBtn.style.transform = '';
                        modalNextBtn.style.background = '';
                        modalNextBtn.style.color = '';
                    }, 300);
                    
                    navigateToProject(currentProjectIndex + 1);
                }
            }
        }
    }
