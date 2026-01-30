document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-default');
    const navbar = document.getElementById('navbar');
    const navContainer = document.getElementById('nav-container');

    // Mobile Menu Toggle
    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('hidden');
            const isExpanded = navbarMenu.classList.contains('hidden') ? 'false' : 'true';
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Scroll Transformation Logic
    const handleScroll = () => {
        const navbar = document.getElementById('navbar');
        const navContainer = document.getElementById('nav-container');

        if (!navbar || !navContainer) return;

        const isDesktop = window.innerWidth >= 1024;

        if (window.scrollY > 50) {
            // Scrolled State (Pill Navbar)
            if (isDesktop) {
                navbar.classList.remove('w-full', 'top-0', 'py-4', 'bg-transparent', 'border-transparent');
                navbar.classList.add('top-4', 'w-auto', 'left-1/2', '-translate-x-1/2', 'rounded-full', 'py-2', 'px-6', 'bg-slate-200/80', 'backdrop-blur-xl', 'border', 'border-white/40', 'shadow-lg');

                navContainer.classList.remove('max-w-screen-2xl', 'px-6', 'lg:px-12');
                navContainer.classList.add('px-0', 'gap-4');
            } else {
                // Mobile Sticky
                navbar.classList.remove('bg-transparent', 'border-transparent', 'py-4', 'top-4', 'w-auto', 'left-1/2', '-translate-x-1/2', 'rounded-full', 'border-white/40', 'px-6', 'bg-slate-200/80', 'shadow-lg');
                navbar.classList.add('w-full', 'top-0', 'bg-white/90', 'backdrop-blur-md', 'border-b', 'border-slate-200', 'py-3', 'shadow-sm');

                navContainer.classList.add('max-w-screen-2xl', 'px-6', 'mx-auto');
                navContainer.classList.remove('px-0', 'gap-4');
            }
        } else {
            // Top State (Transparent)
            navbar.classList.add('w-full', 'top-0', 'py-4', 'bg-transparent', 'border-transparent');
            navbar.classList.remove('top-4', 'w-auto', 'left-1/2', '-translate-x-1/2', 'rounded-full', 'py-2', 'px-6', 'bg-slate-200/80', 'backdrop-blur-xl', 'border', 'border-white/40', 'shadow-lg', 'bg-white/90', 'backdrop-blur-md', 'border-b', 'border-slate-200', 'py-3', 'shadow-sm');

            navContainer.classList.add('max-w-screen-2xl', 'px-6', 'lg:px-12');
            navContainer.classList.remove('px-0', 'gap-4');
        }
    };

    // Init & Listen
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run immediately to handle anchor links

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            e.preventDefault();
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (!navbarMenu.classList.contains('hidden')) {
                    navbarMenu.classList.add('hidden');
                }

                const headerOffset = (navbar ? navbar.offsetHeight : 80) + 20; // Dynamic offset for accurate positioning
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Typewriter Effect
    const roles = ["Data Analyst", "Problem Solver", "Visualizer", "Tech Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetween = 2000;
    const typeWriterElement = document.getElementById('typewriter');

    function type() {
        if (!typeWriterElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => { isDeleting = true; type(); }, delayBetween);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
        }
    }

    // Start typewriter
    if (typeWriterElement) type();
});

/* =========================================
   Enlarge Modal Logic
   ========================================= */

// State Management
let currentModalType = 'dataviz'; // 'dataviz' or 'statistical'
let currentDatavizIndex = 0;
let currentStatisticalIndex = 0;

// Data Objects (Requested Structure)
const projectRepos = {
    // Mapping project IDs/Names to GitHub URLs (Populated dynamically for DataViz)
};

const linkedinPosts = {
    // Mapping project IDs/Names to LinkedIn URLs (Populated dynamically for DataViz)
};



// Helper to scrape DataViz projects from DOM
let datavizProjects = [];

document.addEventListener('DOMContentLoaded', () => {
    // Gather DataViz projects from the grid
    const projectCards = document.querySelectorAll('.simple-project-card');

    projectCards.forEach((card, index) => {
        const title = card.querySelector('h4').textContent.trim();
        const enlargeBtn = card.querySelector('button[data-iframe-src]');
        const iframeSrc = enlargeBtn ? enlargeBtn.getAttribute('data-iframe-src') : '';
        const dashboardSrc = enlargeBtn ? enlargeBtn.getAttribute('data-dashboard-src') : null;

        // Grab links: 1st anchor is GitHub, 2nd is LinkedIn
        const links = card.querySelectorAll('.simple-project-links a');
        const githubUrl = links[0] ? links[0].getAttribute('href') : '#';
        const linkedinUrl = links[1] ? links[1].getAttribute('href') : '#';

        datavizProjects.push({
            id: `dataviz-${index}`,
            title: title,
            iframeSrc: iframeSrc,
            dashboardSrc: dashboardSrc,
            repo: githubUrl,
            linkedin: linkedinUrl
        });

        // Attach Click Listener to Enlarge Button
        if (enlargeBtn) {
            enlargeBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                // Context-Aware State Detection
                let initialMode = 'video';
                const vidEl = card.querySelector('.simple-project-preview video');
                // If video is hidden, user is viewing dashboard
                if (vidEl && vidEl.classList.contains('hidden')) {
                    initialMode = 'dashboard';
                }

                // Check if Excel Project
                if (title.toLowerCase().includes('foodpanda') || title.toLowerCase().includes('excel')) {
                    currentModalType = 'excel';
                } else {
                    currentModalType = 'dataviz';
                }
                currentDatavizIndex = index;
                openModal(iframeSrc, githubUrl, linkedinUrl, title, dashboardSrc, initialMode);
            });
        }
    });



    // Modal Navigation Listeners
    document.getElementById('modalPrevBtn').addEventListener('click', () => navigateModal(-1));
    document.getElementById('modalNextBtn').addEventListener('click', () => navigateModal(1));

    // Outside Click & Escape Key
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('myModal');
        if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
        if (document.getElementById('myModal').style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
        }
    });
});

// Open Modal Function
function openModal(iframeSrc, githubUrl, linkedinUrl, title, dashboardSrc = null, initialMode = 'video') {
    const modal = document.getElementById('myModal');
    const iframeWrapper = document.getElementById('iframeWrapper');
    const loadingSpinner = document.querySelector('.modal-loading');

    // Update Social Links in Header
    const ghLink = document.querySelector('.github-repo-link');
    const liLink = document.querySelector('.linkedin-post-link');
    const titleEl = document.querySelector('.modal-title');

    if (ghLink) {
        ghLink.setAttribute('href', githubUrl || '#');

        if (githubUrl && githubUrl.includes('kaggle.com')) {
            // Kaggle Style for Repo Button
            ghLink.className = 'github-repo-link flex items-center justify-center w-10 h-10 bg-sky-50 rounded-lg text-sky-600 hover:text-white hover:bg-sky-500 transition-all shadow-sm transform hover:scale-105';
            ghLink.innerHTML = '<i class="fab fa-kaggle text-xl"></i>';
            ghLink.setAttribute('title', 'View on Kaggle');
        } else {
            // Default GitHub Style
            ghLink.className = 'github-repo-link flex items-center justify-center w-10 h-10 bg-slate-50 rounded-lg text-slate-700 hover:text-white hover:bg-slate-900 transition-all shadow-sm transform hover:scale-105';
            ghLink.innerHTML = '<i class="fab fa-github text-xl"></i>';
            ghLink.setAttribute('title', 'View Code');
        }
    }

    if (liLink) {
        liLink.setAttribute('href', linkedinUrl || '#');

        // Dynamic Icon & Style based on URL
        if (linkedinUrl && linkedinUrl.includes('kaggle.com')) {
            // Kaggle Style
            liLink.className = 'linkedin-post-link flex items-center justify-center w-10 h-10 bg-sky-50 rounded-lg text-sky-600 hover:text-white hover:bg-sky-500 transition-all shadow-sm transform hover:scale-105';
            liLink.innerHTML = '<i class="fab fa-kaggle text-xl"></i>';
            liLink.setAttribute('title', 'View on Kaggle');
        } else {
            // LinkedIn Style (Default)
            liLink.className = 'linkedin-post-link flex items-center justify-center w-10 h-10 bg-slate-50 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 transition-all shadow-sm transform hover:scale-105';
            liLink.innerHTML = '<i class="fab fa-linkedin-in text-xl"></i>';
            liLink.setAttribute('title', 'View Post');
        }
    }

    if (titleEl) titleEl.textContent = title || 'Project Preview';

    // Show Modal
    modal.style.display = 'flex';

    // Reset Content
    iframeWrapper.innerHTML = '';
    iframeWrapper.style.flexDirection = 'row'; // Reset default
    loadingSpinner.style.display = 'flex';

    // --- Excel Gallery Mode ---
    // Strict check: Only if modal type is explicitly Excel (set by listener/nav) 
    // or title matches specific Excel project keywords. Removed src check to prevent false positives.
    const isExcelProject = currentModalType === 'excel' || (title && title.toLowerCase().includes('foodpanda') && !title.toLowerCase().includes('sales'));

    if (isExcelProject && typeof excelImages !== 'undefined') {
        loadingSpinner.style.display = 'none';

        // Flex Container (Column) for proper scaling
        const container = document.createElement('div');
        container.className = 'w-full h-full flex flex-col pointer-events-auto';

        // 1. Main Image Area (Slider)
        const imgContainer = document.createElement('div');
        imgContainer.className = 'flex-1 w-full relative min-h-0 flex items-center justify-center py-2 px-12'; // Added px-12 for arrows

        const slider = document.createElement('div');
        slider.className = 'w-full h-full max-h-[65vh] flex overflow-x-auto snap-x snap-mandatory scroll-smooth';
        slider.style.scrollbarWidth = 'none';

        excelImages.forEach(src => {
            const isVideo = src.toLowerCase().endsWith('.mp4');
            const el = document.createElement(isVideo ? 'video' : 'img');
            el.src = src;
            el.className = 'min-w-full h-full object-contain snap-center flex-shrink-0';
            if (isVideo) el.controls = true;
            slider.appendChild(el);
        });

        // Initial Scroll Position
        setTimeout(() => {
            if (slider.offsetWidth) slider.scrollTo({ left: slider.offsetWidth * currentExcelIndex, behavior: 'auto' });
        }, 10);

        imgContainer.appendChild(slider);

        // Helper to update thumbs only
        const updateThumbs = (idx) => {
            const domThumbs = thumbRow.querySelectorAll('img');
            domThumbs.forEach((t, i) => {
                if (i === idx) {
                    t.className = `w-28 h-20 object-cover rounded-lg border-2 cursor-pointer transition-all hover:scale-105 border-green-500 opacity-100 ring-2 ring-green-500/50`;
                } else {
                    t.className = `w-28 h-20 object-cover rounded-lg border-2 cursor-pointer transition-all hover:scale-105 border-white/20 opacity-60 hover:opacity-100`;
                }
            });
        };

        // Scroll listener updates Index + Thumbs (Reaction)
        slider.addEventListener('scroll', () => {
            const newIndex = Math.round(slider.scrollLeft / slider.offsetWidth);
            if (newIndex !== currentExcelIndex) {
                currentExcelIndex = newIndex;
                updateThumbs(currentExcelIndex);
            }
        });

        // Action: Scroll to Specific Slide (Triggers scroll event -> updates thumbs)
        const scrollToSlide = (idx) => {
            slider.scrollTo({ left: slider.offsetWidth * idx, behavior: 'smooth' });
        };

        container.appendChild(imgContainer);

        // 2. Thumbnails Area with Integrated Navigation (Below Image)
        const thumbRow = document.createElement('div');
        thumbRow.className = 'flex gap-4 justify-center items-center p-4 w-full flex-shrink-0 bg-slate-900/50 backdrop-blur-sm z-50';

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.onclick = (e) => {
            e.stopPropagation();
            const total = excelImages.length;
            const nextIdx = (currentExcelIndex - 1 + total) % total;
            scrollToSlide(nextIdx);
        };
        thumbRow.appendChild(prevBtn);

        // Thumbs
        excelImages.forEach((src, idx) => {
            const isVideo = src.toLowerCase().endsWith('.mp4');
            const t = document.createElement(isVideo ? 'video' : 'img');
            t.src = src;
            if (isVideo) t.muted = true; // Muted for thumbnail
            t.className = `w-28 h-20 object-cover rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${idx === currentExcelIndex ? 'border-green-500 opacity-100 ring-2 ring-green-500/50' : 'border-white/20 opacity-60 hover:opacity-100'}`;
            // IMPORTANT: Click calls Action
            t.onclick = (e) => {
                e.stopPropagation();
                scrollToSlide(idx);
            };
            thumbRow.appendChild(t);
        });

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.onclick = (e) => {
            e.stopPropagation();
            const total = excelImages.length;
            const nextIdx = (currentExcelIndex + 1) % total;
            scrollToSlide(nextIdx);
        };
        thumbRow.appendChild(nextBtn);

        container.appendChild(thumbRow);
        iframeWrapper.appendChild(container);
        return; // Done
    }

    // --- Standard Mode (DataViz / Statistical) ---
    const isImage = iframeSrc.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;
    const isVideo = iframeSrc.toLowerCase().endsWith('.mp4');

    // Dual Mode (Video + Dashboard)
    if (isVideo && dashboardSrc) {
        const wrapper = document.createElement('div');
        wrapper.className = 'w-full h-full max-h-[75vh] relative group mx-auto'; // Limited height

        // Video
        const video = document.createElement('video');
        video.src = iframeSrc;
        video.className = 'w-full h-full object-contain pointer-events-auto';
        video.controls = true;
        video.autoplay = (initialMode === 'video');

        // Iframe (Hidden)
        const iframe = document.createElement('iframe');
        iframe.src = dashboardSrc;
        iframe.className = 'w-full h-full hidden fade-in';
        iframe.allowFullscreen = true;

        // Apply Initial Mode Visibility
        if (initialMode === 'dashboard') {
            video.classList.add('hidden');
            iframe.classList.remove('hidden');
        } else {
            // Force play for video mode
            setTimeout(() => {
                video.play().catch(e => console.log('Autoplay prevented:', e));
            }, 100);
        }

        wrapper.appendChild(video);
        wrapper.appendChild(iframe);

        // Toggle Controls
        const toggle = document.createElement('div');
        toggle.className = 'absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-white/20 rounded-full p-1.5 flex shadow-xl z-50 scale-100 transition-all';

        const vidBtnClass = initialMode === 'video'
            ? 'px-5 py-2 rounded-full text-sm font-bold bg-slate-900 text-white shadow-sm transition-all transform scale-105'
            : 'px-5 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all';

        const dashBtnClass = initialMode === 'dashboard'
            ? 'px-5 py-2 rounded-full text-sm font-bold bg-slate-900 text-white shadow-sm transition-all transform scale-105'
            : 'px-5 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all';

        toggle.innerHTML = `
            <button id="modal-toggle-video" class="${vidBtnClass}">Video</button>
            <button id="modal-toggle-dashboard" class="${dashBtnClass}">Live Dashboard</button>
        `;
        wrapper.appendChild(toggle);

        iframeWrapper.appendChild(wrapper);
        loadingSpinner.style.display = 'none';

        // Event Delegation for Toggle
        wrapper.addEventListener('click', (e) => {
            const btnVid = document.getElementById('modal-toggle-video');
            const btnDash = document.getElementById('modal-toggle-dashboard');

            if (e.target === btnVid) {
                video.style.display = 'block';
                iframe.style.display = 'none';
                video.play();
                btnVid.className = 'px-5 py-2 rounded-full text-sm font-bold bg-slate-900 text-white shadow-sm transition-all transform scale-105';
                btnDash.className = 'px-5 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all';
            }
            if (e.target === btnDash) {
                video.style.display = 'none';
                iframe.style.display = 'block';
                video.pause();
                btnVid.className = 'px-5 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all';
                btnDash.className = 'px-5 py-2 rounded-full text-sm font-bold bg-slate-900 text-white shadow-sm transition-all transform scale-105';
            }
        });

    } else if (isVideo) {
        const video = document.createElement('video');
        video.src = iframeSrc;
        video.className = 'w-full h-full max-h-[75vh] object-contain pointer-events-auto';
        video.controls = true;
        video.autoplay = true;
        // Explicit play attempt
        setTimeout(() => {
            video.play().catch(e => console.log('Autoplay prevented:', e));
        }, 100);
        video.onloadeddata = () => {
            loadingSpinner.style.display = 'none';
            video.classList.add('fade-in');
        };
        iframeWrapper.appendChild(video);
    } else if (isImage) {
        const img = document.createElement('img');
        img.src = iframeSrc;
        img.className = 'w-full h-full object-contain pointer-events-auto';
        img.onload = () => {
            loadingSpinner.style.display = 'none';
            img.classList.add('fade-in');
        };
        iframeWrapper.appendChild(img);
    } else {
        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.allowFullscreen = true;

        iframe.onload = () => {
            loadingSpinner.style.display = 'none';
            iframe.classList.add('fade-in');
        };
        iframeWrapper.appendChild(iframe);
    }
}

// Close Modal Function
function closeModal() {
    const modal = document.getElementById('myModal');
    const iframeWrapper = document.getElementById('iframeWrapper');

    modal.style.display = 'none';

    // Clear iframe/image
    setTimeout(() => {
        iframeWrapper.innerHTML = '';
    }, 200);
}

// Map Index to Project (Navigation Logic)
function navigateModal(direction) {
    // Default (DataViz/Excel) Navigation
    if ((currentModalType === 'dataviz' || currentModalType === 'excel') && datavizProjects.length > 0) {
        const total = datavizProjects.length;
        currentDatavizIndex = (currentDatavizIndex + direction + total) % total;
        const p = datavizProjects[currentDatavizIndex];

        // Auto-update type for next project
        if (p.title.toLowerCase().includes('excel') || p.title.toLowerCase().includes('foodpanda')) {
            currentModalType = 'excel';
        } else {
            currentModalType = 'dataviz';
        }

        // Reload Modal
        openModal(p.iframeSrc, p.repo, p.linkedin, p.title, p.dashboardSrc);
    }
}

// --- Excel Project Gallery Logic ---
const excelImages = [
    'assets/images/FOODPANDA%20SALES/foodpandasalescov.png',
    'assets/images/FOODPANDA%20SALES/Foodpanda_sales_01.png',
    'assets/images/FOODPANDA%20SALES/Foodpanda_sales_02.png',
    'assets/images/FOODPANDA%20SALES/Foodpanda_sales_03.png',
    'assets/images/FOODPANDA%20SALES/INSIGHTS.png',
    'assets/images/FOODPANDA%20SALES/FOODPANDA%20SALES%20ANALYSIS.mp4'
];
let currentExcelIndex = 0;

let isExcelAutoScrolling = false;

function updateExcelVisuals(index) {
    const thumbs = document.querySelectorAll('.excel-thumb');

    // Update active thumb style
    thumbs.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.remove('border-transparent', 'opacity-60');
            thumb.classList.add('border-green-500', 'opacity-100');
        } else {
            thumb.classList.add('border-transparent', 'opacity-60');
            thumb.classList.remove('border-green-500', 'opacity-100');
        }
    });

    // Also update the Enlarge Button URL
    const enlargeBtn = document.querySelector('button[data-iframe-src*="Foodpanda"]');
    if (enlargeBtn) {
        enlargeBtn.setAttribute('data-iframe-src', excelImages[index]);
    }
}

function updateExcelGallery() {
    const slider = document.getElementById('excelSlider');

    // Safety check
    if (!slider) return;

    isExcelAutoScrolling = true;

    // Scroll to Slide
    slider.scrollTo({
        left: slider.offsetWidth * currentExcelIndex,
        behavior: 'smooth'
    });

    updateExcelVisuals(currentExcelIndex);

    // Unlock after animation
    setTimeout(() => { isExcelAutoScrolling = false; }, 600);
}

document.addEventListener('DOMContentLoaded', () => {

    // Slider Scroll Listener (Sync Swipe)
    const slider = document.getElementById('excelSlider');
    if (slider) {
        slider.addEventListener('scroll', () => {
            if (isExcelAutoScrolling) return; // Ignore scroll events triggered by buttons

            const index = Math.round(slider.scrollLeft / slider.offsetWidth);
            if (index !== currentExcelIndex) {
                currentExcelIndex = index;
                updateExcelVisuals(currentExcelIndex);
            }
        });
    }

    // Thumbnails
    const thumbs = document.querySelectorAll('.excel-thumb');
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentExcelIndex = index;
            updateExcelGallery();
        });
    });

    // Arrows
    const prevBtn = document.getElementById('excelPrevBtn');
    const nextBtn = document.getElementById('excelNextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const total = excelImages.length;
            currentExcelIndex = (currentExcelIndex - 1 + total) % total;
            updateExcelGallery();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const total = excelImages.length;
            currentExcelIndex = (currentExcelIndex + 1) % total;
            updateExcelGallery();
        });
    }
});

// --- Project Card Media Toggle ---
window.toggleProjectView = function (projectId, viewType) {
    const vid = document.getElementById(`vid-${projectId}`);
    const iframe = document.getElementById(`iframe-${projectId}`);
    const btnVid = document.getElementById(`btn-${projectId}-video`);
    const btnIframe = document.getElementById(`btn-${projectId}-iframe`);

    if (!vid || !iframe || !btnVid || !btnIframe) return;

    const activeClass = 'px-4 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white shadow-sm transition-all transform scale-105';
    const inactiveClass = 'px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all opacity-80 hover:opacity-100';

    if (viewType === 'video') {
        vid.classList.remove('hidden');
        iframe.classList.add('hidden');

        btnVid.className = activeClass;
        btnIframe.className = inactiveClass;

        vid.play();
    } else {
        vid.classList.add('hidden');
        iframe.classList.remove('hidden');

        btnVid.className = inactiveClass;
        btnIframe.className = activeClass;

        vid.pause();
    }
};

// Global Rule: Enforce One Video Playing at a Time
document.addEventListener('play', (e) => {
    if (e.target.tagName === 'VIDEO') {
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach(v => {
            if (v !== e.target && !v.paused) {
                v.pause();
            }
        });
    }
}, true); // Use Capture Phase to catch all play events

