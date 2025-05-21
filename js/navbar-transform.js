/**
 * Navbar Transformation - Inspired by jansenharris.com
 * Handles the transition between the initial artistic state and the minimalist transformed state
 */
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.navbar .menu-toggle');
  const navLinks = document.querySelector('.navbar .nav-links');
  const navLinksItems = document.querySelectorAll('.navbar .nav-links li a');
  const progressBar = document.querySelector('.scroll-progress');
  const heroSection = document.getElementById('home');
  
  // Set initial navbar state
  function initializeNavbar() {
    navbar.classList.add('initial');
  }
  
  // Handle scroll events
  function handleScroll() {
    const heroHeight = heroSection ? heroSection.offsetHeight - 100 : 500;
    
    // Check if scrolled past the hero section
    if (window.scrollY > heroHeight) {
      // Switch to transformed state
      navbar.classList.remove('initial');
      navbar.classList.add('transformed');
    } else {
      // Switch to initial state
      navbar.classList.add('initial');
      navbar.classList.remove('transformed');
    }
    
    // Update active link based on current section
    updateActiveLink();
    
    // Update progress bar
    if (progressBar) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop) / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      progressBar.style.width = scrollPercentRounded + '%';
    }
  }
  
  // Update active link based on current scroll position
  function updateActiveLink() {
    // Get current scroll position with offset
    let scrollPosition = window.scrollY + 100; 
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Loop through sections to find the one in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinksItems.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.navbar .nav-links li a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  // Toggle mobile menu
  function setupMobileMenu() {
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
    }
  }
  
  // Close mobile menu when a link is clicked
  function setupNavLinkClicks() {
    navLinksItems.forEach(link => {
      link.addEventListener('click', function() {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        // Smooth scroll to section
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          const targetSection = document.querySelector(href);
          if (targetSection) {
            event.preventDefault();
            
            // Calculate position with navbar offset
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
  
  // Initialize everything
  function init() {
    initializeNavbar();
    setupMobileMenu();
    setupNavLinkClicks();
    updateActiveLink();
    handleScroll(); // Initial call to set correct state
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', function() {
      // Reset mobile menu on resize
      if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
      // Recalculate scroll positions
      handleScroll();
    });
  }
  
  // Start everything
  init();
}); 