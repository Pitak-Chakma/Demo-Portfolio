/**
 * AK Ashikur Rahman - Portfolio Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Initialize Theme
    initTheme();
    
    // Initialize Swiper Sliders
    initSwipers();
    
    // Initialize Particles.js
    initParticles();
    
    // Initialize Lazy Loading
    initLazyLoading();
    
    // Initialize Form Validation
    initFormValidation();
    
    // Initialize Modern Video Slider
    initVideoSlider();
});

/**
 * Theme Toggle Functionality
 */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Always start with light mode regardless of system preference
    let currentTheme = 'light';
    
    // Apply light theme on initial load
    document.body.setAttribute('data-theme', currentTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        currentTheme = newTheme;
    });
}

/**
 * Initialize Swiper Sliders
 */
function initSwipers() {
    // Achievements Slider
    new Swiper('.achievements-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        pagination: {
            el: '.achievements-slider .swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.achievements-slider .swiper-button-next',
            prevEl: '.achievements-slider .swiper-button-prev'
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });
    
    // Skills Slider
    new Swiper('.skills-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.skills-slider .swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.skills-slider .swiper-button-next',
            prevEl: '.skills-slider .swiper-button-prev'
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });
    
    // Initialize Masonry Grid
    const initMasonryGrid = () => {
        const masonryGallery = document.querySelector('.masonry-gallery');
        
        if (!masonryGallery) return;
        
        // Add fade-in animation to masonry items
        const masonryItems = document.querySelectorAll('.masonry-item');
        
        // Set initial opacity for animation
        masonryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            // Add click event for lightbox effect
            const content = item.querySelector('.masonry-content');
            content.addEventListener('click', function() {
                const img = this.querySelector('img');
                const caption = this.querySelector('.masonry-caption').textContent;
                
                // Simple lightbox effect
                const lightbox = document.createElement('div');
                lightbox.className = 'masonry-lightbox';
                lightbox.style.position = 'fixed';
                lightbox.style.top = '0';
                lightbox.style.left = '0';
                lightbox.style.width = '100%';
                lightbox.style.height = '100%';
                lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
                lightbox.style.display = 'flex';
                lightbox.style.alignItems = 'center';
                lightbox.style.justifyContent = 'center';
                lightbox.style.flexDirection = 'column';
                lightbox.style.zIndex = '9999';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.style.maxHeight = '80vh';
                lightboxImg.style.maxWidth = '90%';
                lightboxImg.style.borderRadius = '8px';
                
                const lightboxCaption = document.createElement('div');
                lightboxCaption.textContent = caption;
                lightboxCaption.style.color = 'white';
                lightboxCaption.style.marginTop = '20px';
                lightboxCaption.style.fontSize = '1.2rem';
                
                lightbox.appendChild(lightboxImg);
                lightbox.appendChild(lightboxCaption);
                
                // Close on click
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
                
                document.body.appendChild(lightbox);
            });
        });
        
        // Animate items when they come into view
        function revealItems() {
            masonryItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInView) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Initial check
        revealItems();
        
        // Check on scroll
        window.addEventListener('scroll', revealItems);
    };
    
    // Initialize all components when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initMasonryGrid();
    });
    
    // Note: Performances section now uses custom video slider
}

/**
 * Initialize Modern Video Slider
 */
function initVideoSlider() {
    const slides = document.querySelectorAll('.video-slide');
    const progressFill = document.querySelector('.progress-fill');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    let autoplayInterval;
    const autoplayDelay = 8000;
    
    // Initialize slider
    function initSlider() {
        // Initialize backgrounds for slides and thumbnails
        slides.forEach((slide, index) => {
            const videoId = slide.getAttribute('data-video-id');
            
            // Use more reliable thumbnail format for main slides
            slide.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;
            
            // Create dots
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDotsContainer.appendChild(dot);
            
            // Setup thumbnails with more reliable format
            if (thumbnails[index]) {
                thumbnails[index].style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;
                thumbnails[index].addEventListener('click', () => goToSlide(index));
            }
        });
        
        // Set initial active slide
        updateSlider();
        startAutoplay();
        
        // Add click events to play buttons
        slides.forEach(slide => {
            slide.addEventListener('click', function(e) {
                // Only play if clicking the play button or its parent
                const target = e.target;
                if (target.closest('.play-icon') || target.closest('.slide-content')) {
                    playVideo(this);
                }
            });
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Boundary check
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Stop any currently playing videos before changing slides
        stopAllVideos();
        
        currentIndex = index;
        updateSlider();
        resetAutoplay();
    }
    
    // Update slider state
    function updateSlider() {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentIndex) slide.classList.add('active');
        });
        
        // Update dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentIndex) dot.classList.add('active');
        });
        
        // Update thumbnails
        thumbnails.forEach((thumb, index) => {
            thumb.classList.remove('active');
            if (index === currentIndex) thumb.classList.add('active');
        });
        
        // Update progress bar
        const progressPercentage = ((currentIndex + 1) / slides.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    // Function to stop all playing videos
    function stopAllVideos() {
        slides.forEach(slide => {
            const iframe = slide.querySelector('iframe');
            if (iframe) {
                // Replace the iframe with the original content
                const videoId = slide.getAttribute('data-video-id');
                slide.innerHTML = `
                    <div class="slide-content">
                        <div class="play-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                `;
                
                // Reset the background image
                slide.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;
            }
        });
    }
    
    // Play video
    function playVideo(slide) {
        const videoId = slide.getAttribute('data-video-id');
        
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`);
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        
        // Replace slide content with iframe
        slide.innerHTML = '';
        slide.appendChild(iframe);
        
        // Stop autoplay when a video is playing
        stopAutoplay();
    }
    
    // Start autoplay
    function startAutoplay() {
        stopAutoplay(); // Clear any existing interval
        autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, autoplayDelay);
    }
    
    // Stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Reset autoplay
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Pause autoplay on hover
    const sliderContainer = document.querySelector('.video-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }
    
    // Initialize if elements exist
    if (slides.length > 0) {
        initSlider();
    }
}

/**
 * Initialize Particles.js for Hero Section
 */
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.7,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.5,
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: false
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    }
                }
            },
            retina_detect: true
        });
    }
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('lazy-loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.classList.add('lazy-loaded');
        });
    }
}

/**
 * Contact Form Validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            
            // Reset previous errors
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
                const errorEl = group.querySelector('.error-message');
                if (errorEl) errorEl.remove();
            });
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            }
            
            // If valid, simulate form submission
            if (isValid) {
                // In a real implementation, you would send data to a server
                // For now, we'll simulate a successful submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate server request
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Your message has been sent successfully!';
                    contactForm.appendChild(successMessage);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
}

/**
 * Helper function to display form error message
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    formGroup.appendChild(errorMessage);
}

/**
 * Helper function to validate email format
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize YouTube previews with the new structure
function initYouTubePreviews() {
    const containers = document.querySelectorAll('.youtube-container');
    
    containers.forEach(container => {
        const videoId = container.getAttribute('data-video-id');
        
        // Set the thumbnail as background
        container.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`;
        
        // Click event to load the video
        container.addEventListener('click', function() {
            const iframe = document.createElement('iframe');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`);
            
            // Remove the play button and overlay
            this.innerHTML = '';
            this.appendChild(iframe);
            iframe.style.width = '100%';
            iframe.style.height = '100%';
        });
    });
}