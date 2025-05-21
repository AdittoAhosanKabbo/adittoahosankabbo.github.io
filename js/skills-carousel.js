/**
 * Skills Carousel - For infinite scrolling effect inspired by espressosys.com
 */
document.addEventListener('DOMContentLoaded', function() {
    // Clone items for infinite scroll effect
    const carousel = document.querySelector('.skills-carousel');
    if (!carousel) return;
    
    // Clone all items for a seamless loop
    const items = carousel.querySelectorAll('.skills-carousel-item');
    
    // Calculate total width for animation
    const singleWidth = Array.from(items).reduce((total, item) => {
        const styles = window.getComputedStyle(item);
        const width = parseFloat(styles.width);
        const marginLeft = parseFloat(styles.marginLeft);
        const marginRight = parseFloat(styles.marginRight);
        return total + width + marginLeft + marginRight;
    }, 0);
    
    // Clone all items for a seamless loop
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });
    
    // Update animation duration based on content width
    const totalItems = items.length;
    const duration = totalItems * 4; // 4 seconds per item
    carousel.style.animationDuration = `${duration}s`;
    
    // Update CSS animation end position
    document.documentElement.style.setProperty('--carousel-width', `-${singleWidth}px`);
    
    // Reset animation when it completes to prevent jump
    carousel.addEventListener('animationiteration', () => {
        // Slight pause effect at the end for visual appeal
        carousel.style.animationPlayState = 'paused';
        setTimeout(() => {
            carousel.style.animationPlayState = 'running';
        }, 100);
    });
    
    // Pause animation on hover for better user experience
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
    });
    
    // Update floating animation for staggered look
    items.forEach((item, index) => {
        // Set different animation delay for each item
        item.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Fix WebKitCSSMatrix for Safari
    let prevTranslate = 0;
    
    function getCurrentTranslate(element) {
        const style = window.getComputedStyle(element);
        const matrix = new DOMMatrix(style.transform);
        return matrix.m41; // X translation value
    }
    
    // Touch device support
    let touchStartX = 0;
    let touchEndX = 0;
    let currentTranslate = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        carousel.style.animationPlayState = 'paused';
        
        // Get current translation
        prevTranslate = getCurrentTranslate(carousel);
    });
    
    carousel.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
        const diff = touchEndX - touchStartX;
        currentTranslate = prevTranslate + diff;
        
        carousel.style.transform = `translateX(${currentTranslate}px)`;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', () => {
        // Reset to animation
        carousel.style.transform = '';
        carousel.style.animationPlayState = 'running';
    });
    
    // Ensure proper resizing
    window.addEventListener('resize', () => {
        // Recalculate animation duration on resize
        const newCarouselWidth = carousel.scrollWidth / 2;
        const newDuration = newCarouselWidth / 50;
        carousel.style.animationDuration = `${newDuration}s`;
    });
}); 