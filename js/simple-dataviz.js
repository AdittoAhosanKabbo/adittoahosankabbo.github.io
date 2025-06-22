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
    if (modalGithub) modalGithub.classList.add('social-btn-hidden');
    if (modalLinkedin) modalLinkedin.classList.add('social-btn-hidden');// Project links mapping
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
                modalGithub.classList.remove('social-btn-hidden');
                modalGithub.classList.add('social-btn-visible');
                modalGithub.onclick = () => window.open(links.github, '_blank');
                console.log('GitHub button shown for:', projectTitle); // Debug log
                
                // Handle LinkedIn button visibility
                if (links.linkedin && links.linkedin !== '#') {
                    modalLinkedin.classList.remove('social-btn-hidden');
                    modalLinkedin.classList.add('social-btn-visible');
                    modalLinkedin.onclick = () => window.open(links.linkedin, '_blank');
                    console.log('LinkedIn button shown for:', projectTitle); // Debug log
                } else {
                    modalLinkedin.classList.remove('social-btn-visible');
                    modalLinkedin.classList.add('social-btn-hidden');
                    modalLinkedin.onclick = null;
                    console.log('LinkedIn button hidden for:', projectTitle); // Debug log
                }
            } else {
                // Fallback: hide both buttons if no links found
                modalGithub.classList.remove('social-btn-visible');
                modalGithub.classList.add('social-btn-hidden');
                modalLinkedin.classList.remove('social-btn-visible');
                modalLinkedin.classList.add('social-btn-hidden');
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
    });    // Update navigation buttons state with enhanced visual feedback
    function updateNavigationButtons() {
        if (modalPrevBtn && modalNextBtn) {
            const isPrevDisabled = currentProjectIndex === 0;
            const isNextDisabled = currentProjectIndex === allProjectCards.length - 1;
            
            modalPrevBtn.disabled = isPrevDisabled;
            modalNextBtn.disabled = isNextDisabled;
            
            // Add visual feedback with smooth transitions using CSS classes
            if (isPrevDisabled) {
                modalPrevBtn.classList.remove('btn-enabled');
                modalPrevBtn.classList.add('btn-disabled');
            } else {
                modalPrevBtn.classList.remove('btn-disabled');
                modalPrevBtn.classList.add('btn-enabled');
            }
            
            if (isNextDisabled) {
                modalNextBtn.classList.remove('btn-enabled');
                modalNextBtn.classList.add('btn-disabled');
            } else {
                modalNextBtn.classList.remove('btn-disabled');
                modalNextBtn.classList.add('btn-enabled');
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
                // Add loading state using CSS classes
                modalIframe.classList.remove('modal-content-loaded');
                modalIframe.classList.add('modal-content-loading');
                
                const iframeSrc = enlargeBtn.getAttribute('data-iframe-src');
                const projectTitle = projectCard.querySelector('.simple-project-title').textContent;
                
                // Update modal content with animation using CSS classes
                modalTitle.classList.add('modal-title-transitioning');
                setTimeout(() => {
                    modalTitle.textContent = projectTitle;
                    modalTitle.classList.remove('modal-title-transitioning');
                    modalTitle.classList.add('modal-title-ready');
                }, 100);
                
                // Load new iframe content
                modalIframe.src = iframeSrc;
                
                // Reset iframe opacity when loaded using CSS classes
                modalIframe.onload = function() {
                    this.classList.remove('modal-content-loading');
                    this.classList.add('modal-content-loaded');
                };
                
                // Update social buttons with smooth transition
                setTimeout(() => {
                    const links = projectLinks[projectTitle];
                    if (links) {
                        modalGithub.classList.remove('social-btn-hidden');
                        modalGithub.classList.add('social-btn-visible');
                        modalGithub.onclick = () => window.open(links.github, '_blank');
                        
                        if (links.linkedin && links.linkedin !== '#') {
                            modalLinkedin.classList.remove('social-btn-hidden');
                            modalLinkedin.classList.add('social-btn-visible');
                            modalLinkedin.onclick = () => window.open(links.linkedin, '_blank');
                        } else {
                            modalLinkedin.classList.remove('social-btn-visible');
                            modalLinkedin.classList.add('social-btn-hidden');
                            modalLinkedin.onclick = null;
                        }
                    } else {
                        modalGithub.classList.remove('social-btn-visible');
                        modalGithub.classList.add('social-btn-hidden');
                        modalLinkedin.classList.remove('social-btn-visible');
                        modalLinkedin.classList.add('social-btn-hidden');
                    }
                }, 50);
                
                // Update navigation buttons
                updateNavigationButtons();
            }
        }
    }
      // Modal navigation event listeners with enhanced responsiveness
    if (modalPrevBtn) {        modalPrevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentProjectIndex > 0 && !this.disabled) {
                // Add click feedback using CSS class
                this.classList.add('btn-active-feedback');
                setTimeout(() => {
                    this.classList.remove('btn-active-feedback');
                }, 150);
                
                navigateToProject(currentProjectIndex - 1);
            }
        });
        
        // Add touch support for mobile
        modalPrevBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                this.classList.add('btn-touch-feedback');
            }
        });
        
        modalPrevBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                this.classList.remove('btn-touch-feedback');
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
                // Add click feedback using CSS class
                this.classList.add('btn-active-feedback');
                setTimeout(() => {
                    this.classList.remove('btn-active-feedback');
                }, 150);
                
                navigateToProject(currentProjectIndex + 1);
            }
        });
        
        // Add touch support for mobile
        modalNextBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                this.classList.add('btn-touch-feedback');
            }
        });
        
        modalNextBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                this.classList.remove('btn-touch-feedback');
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
                e.preventDefault();                if (currentProjectIndex > 0 && modalPrevBtn && !modalPrevBtn.disabled) {
                    // Add visual feedback for keyboard navigation using CSS class
                    modalPrevBtn.classList.add('btn-keyboard-feedback');
                    
                    setTimeout(() => {
                        modalPrevBtn.classList.remove('btn-keyboard-feedback');
                    }, 200);
                    
                    navigateToProject(currentProjectIndex - 1);
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentProjectIndex < allProjectCards.length - 1 && modalNextBtn && !modalNextBtn.disabled) {                    // Add visual feedback for keyboard navigation using CSS class
                    modalNextBtn.classList.add('btn-keyboard-feedback');
                    
                    setTimeout(() => {
                        modalNextBtn.classList.remove('btn-keyboard-feedback');
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
            this.classList.add('modal-content-loaded');
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
    });    // Add hover effects for better user experience
    const projectCardsForHover = document.querySelectorAll('.simple-project-card');
    projectCardsForHover.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('project-card-hover');
            this.classList.remove('project-card-normal');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.add('project-card-normal');
            this.classList.remove('project-card-hover');
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
                    entry.target.classList.remove('card-hidden');
                    entry.target.classList.add('card-visible');
                }
            });
        }, observerOptions);
          
        projectCardsForHover.forEach(card => {
            card.classList.add('card-hidden');
            observer.observe(card);
        });
    }

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
                handleSwipe();
                isSwiping = false;
                touchStartX = 0;
                touchEndX = 0;
            }
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 100; // Minimum distance for a swipe
            const swipeDistance = touchEndX - touchStartX;
            
            // Determine swipe direction and check if it meets threshold
            if (Math.abs(swipeDistance) < swipeThreshold) return;
              if (swipeDistance > 0) {
                // Swipe right - go to previous project
                if (currentProjectIndex > 0 && modalPrevBtn && !modalPrevBtn.disabled) {
                    // Add visual feedback using CSS class
                    modalPrevBtn.classList.add('btn-swipe-feedback');
                    
                    setTimeout(() => {
                        modalPrevBtn.classList.remove('btn-swipe-feedback');
                    }, 300);
                    
                    navigateToProject(currentProjectIndex - 1);
                }
            } else {
                // Swipe left - go to next project
                if (currentProjectIndex < allProjectCards.length - 1 && modalNextBtn && !modalNextBtn.disabled) {
                    // Add visual feedback using CSS class
                    modalNextBtn.classList.add('btn-swipe-feedback');
                      setTimeout(() => {
                        modalNextBtn.classList.remove('btn-swipe-feedback');
                    }, 300);
                    
                    navigateToProject(currentProjectIndex + 1);
                }
            }
        }
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
    if (modal && modal.classList.contains('active')) {
        // Adjust modal size if needed using CSS classes
        const modalContent = modal.querySelector('.simple-modal-content');
        if (modalContent) {
            if (window.innerWidth < 768) {
                modalContent.classList.remove('modal-desktop');
                modalContent.classList.add('modal-mobile');
            } else {
                modalContent.classList.remove('modal-mobile');
                modalContent.classList.add('modal-desktop');
            }
        }
    }
}, 250));
