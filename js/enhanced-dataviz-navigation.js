/**
 * Enhanced Data Visualization Navigation
 * 
 * This script provides enhanced navigation for the data visualization section, 
 * including keyboard accessibility, transition effects, and better visual feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initEnhancedDataVizNavigation();
});

function initEnhancedDataVizNavigation() {
  // Core navigation elements
  const prevBtn = document.getElementById('prevProjectBtn');
  const nextBtn = document.getElementById('nextProjectBtn');
  const projectItems = document.querySelectorAll('.dataviz-project-item');
  const previewPanels = document.querySelectorAll('.preview-panel');
  const mobileTabButtons = document.querySelectorAll('.mobile-tab');

  // Exit if elements aren't found
  if (!prevBtn || !nextBtn || projectItems.length === 0) {
    console.log('❌ Navigation elements not found');
    return;
  }

  // Add progress indicator
  createProgressIndicator(projectItems.length);

  // Get current project index
  function getCurrentProjectIndex() {
    for (let i = 0; i < projectItems.length; i++) {
      if (projectItems[i].classList.contains('active')) {
        return i;
      }
    }
    return 0;
  }

  // Create a visual progress indicator
  function createProgressIndicator(totalItems) {
    const container = document.querySelector('.preview-header');
    
    if (!container) return;
    
    // Create progress container
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('dataviz-progress');
    
    // Create indicator dots
    for (let i = 0; i < totalItems; i++) {
      const dot = document.createElement('span');
      dot.classList.add('progress-dot');
      dot.setAttribute('data-index', i);
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Go to project ${i + 1}`);
      
      // Add click event
      dot.addEventListener('click', () => {
        navigateToProject(i);
      });
      
      // Add keyboard event
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigateToProject(i);
        }
      });
      
      progressContainer.appendChild(dot);
    }
    
    // Insert after navigation buttons
    container.appendChild(progressContainer);
    
    // Update initial state
    updateProgressIndicator(getCurrentProjectIndex());
  }

  // Update progress indicator
  function updateProgressIndicator(currentIndex) {
    const dots = document.querySelectorAll('.progress-dot');
    
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-current', 'false');
      }
    });
  }

  // Update navigation buttons
  function updateNavigationButtons() {
    const currentIndex = getCurrentProjectIndex();
    
    // Update buttons state
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === projectItems.length - 1;
    
    // Update aria attributes for better accessibility
    prevBtn.setAttribute('aria-disabled', currentIndex === 0);
    nextBtn.setAttribute('aria-disabled', currentIndex === projectItems.length - 1);
    
    // Update progress indicator
    updateProgressIndicator(currentIndex);
    
    // Update preview title
    updatePreviewTitle(currentIndex);
  }

  // Update the preview title based on the current project
  function updatePreviewTitle(index) {
    const projectName = projectItems[index].querySelector('.project-name').textContent;
    const previewTitle = document.querySelector('.preview-title');
    
    if (previewTitle) {
      // Create a smooth transition effect
      previewTitle.style.opacity = '0';
      setTimeout(() => {
        previewTitle.textContent = projectName;
        previewTitle.style.opacity = '1';
      }, 200);
    }
  }

  // Navigate to a specific project
  function navigateToProject(index) {
    if (index >= 0 && index < projectItems.length) {
      // Get the current project ID
      const projectId = projectItems[index].getAttribute('data-project');
      
      // Smoothly transition between projects
      animateTransition(() => {
        // Update desktop project items
        projectItems.forEach((item, i) => {
          if (i === index) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        
        // Update mobile tabs
        mobileTabButtons.forEach(tab => {
          if (tab.getAttribute('data-project') === projectId) {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
        
        // Update preview panels
        previewPanels.forEach(panel => {
          if (panel.getAttribute('data-preview') === projectId) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
      
      // Update button states
      updateNavigationButtons();
      
      // Announce for screen readers
      announceProjectChange(projectItems[index].querySelector('.project-name').textContent);
    }
  }

  // Create a smooth transition effect
  function animateTransition(callback) {
    const previewContent = document.querySelector('.preview-content');
    
    if (!previewContent) {
      callback();
      return;
    }
    
    // Fade out
    previewContent.style.opacity = '0';
    previewContent.style.transform = 'translateY(10px)';
    
    // Wait for fade out to complete
    setTimeout(() => {
      // Make the change
      callback();
      
      // Fade in
      setTimeout(() => {
        previewContent.style.opacity = '1';
        previewContent.style.transform = 'translateY(0)';
      }, 50);
    }, 200);
  }

  // Announce project changes for screen readers
  function announceProjectChange(projectName) {
    const announcer = document.getElementById('dataviz-announcer');
    
    if (!announcer) {
      const newAnnouncer = document.createElement('div');
      newAnnouncer.id = 'dataviz-announcer';
      newAnnouncer.className = 'sr-only';
      newAnnouncer.setAttribute('aria-live', 'polite');
      document.body.appendChild(newAnnouncer);
      
      // Use the new announcer
      newAnnouncer.textContent = `Now viewing ${projectName}`;
    } else {
      announcer.textContent = `Now viewing ${projectName}`;
    }
  }

  // Add click event listeners to the project items
  projectItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      navigateToProject(index);
    });
  });

  // Add click events to navigation buttons
  prevBtn.addEventListener('click', () => {
    const currentIndex = getCurrentProjectIndex();
    if (currentIndex > 0) {
      navigateToProject(currentIndex - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    const currentIndex = getCurrentProjectIndex();
    if (currentIndex < projectItems.length - 1) {
      navigateToProject(currentIndex + 1);
    }
  });

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Only respond to keyboard navigation when the dataviz section is in viewport
    const datavizSection = document.querySelector('.dataviz-section');
    if (!isElementInViewport(datavizSection)) return;
    
    if (e.key === 'ArrowLeft') {
      const currentIndex = getCurrentProjectIndex();
      if (currentIndex > 0) {
        e.preventDefault();
        navigateToProject(currentIndex - 1);
      }
    } else if (e.key === 'ArrowRight') {
      const currentIndex = getCurrentProjectIndex();
      if (currentIndex < projectItems.length - 1) {
        e.preventDefault();
        navigateToProject(currentIndex + 1);
      }
    }
  });

  // Check if element is in viewport
  function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0
    );
  }

  // Handle touch swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  const previewContent = document.querySelector('.preview-content');
  
  if (previewContent) {
    previewContent.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    previewContent.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, go to next
      const currentIndex = getCurrentProjectIndex();
      if (currentIndex < projectItems.length - 1) {
        navigateToProject(currentIndex + 1);
      }
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, go to previous
      const currentIndex = getCurrentProjectIndex();
      if (currentIndex > 0) {
        navigateToProject(currentIndex - 1);
      }
    }
  }

  // Initialize
  updateNavigationButtons();
  console.log('✅ Enhanced data visualization navigation initialized');
}
