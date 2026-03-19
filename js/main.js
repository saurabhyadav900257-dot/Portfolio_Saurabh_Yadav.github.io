// ============================================
// PREMIUM PORTFOLIO - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    setupScrollProgress();
    setupNavigation();
    setupThemeToggle();
    setupParticleAnimation();
    setupScrollAnimations();
    setupFormHandling();
    setupSmoothScroll();
    setupHoverEffects();
    removeLoadingScreen();
}

// ============================================
// 1. SCROLL PROGRESS BAR
// ============================================

function setupScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// 2. NAVIGATION & MENU TOGGLE
// ============================================

function setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Menu toggle functionality
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when link is clicked or when clicking outside
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
            updateActiveNavLink(this.getAttribute('href'));
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function updateActiveNavLink(href) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('a[href="' + href + '"]')?.classList.add('active');
}

// ============================================
// 3. DARK/LIGHT MODE TOGGLE
// ============================================

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const body = document.body;

    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ============================================
// 4. PARTICLE ANIMATION
// ============================================

function setupParticleAnimation() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle array
    const particles = [];
    const particleCount = 50;

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = 'rgba(0, 212, 255, ' + (Math.random() * 0.5 + 0.1) + ')';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connecting lines between particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = 'rgba(0, 212, 255, ' + (0.2 - distance / 750) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// 5. SCROLL ANIMATIONS (AOS)
// ============================================

function setupScrollAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Intersection Observer for custom animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// ============================================
// 6. FORM HANDLING & VALIDATION
// ============================================

function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('.form-input');
        
        // Real-time validation
        formInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                // Remove error class on input
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    const errorSpan = input.parentElement.querySelector('.form-error');
                    if (errorSpan) {
                        errorSpan.classList.remove('show');
                    }
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                return;
            }

            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('.btn-submit');
            const originalText = submitButton.innerHTML;
            const formStatus = this.querySelector('.form-status');

            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual backend call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                if (formStatus) {
                    formStatus.classList.add('success');
                    formStatus.classList.remove('error');
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                    formStatus.style.display = 'block';
                }
                
                submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                submitButton.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.style.display = 'none';
                    }
                }, 5000);
            }, 1500);
        });
    }
}

/**
 * Validate individual form field
 * @param {HTMLElement} field - Form input field
 * @returns {boolean} - Validation result
 */
function validateField(field) {
    let isValid = true;
    let errorMessage = '';
    const fieldName = field.name;
    const fieldValue = field.value.trim();

    // Check if field is empty
    if (!fieldValue) {
        isValid = false;
        errorMessage = 'This field is required';
    } 
    // Email validation
    else if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    // Name validation (at least 2 characters)
    else if (fieldName === 'fullName' && fieldValue.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters';
    }
    // Subject validation
    else if (fieldName === 'subject' && fieldValue.length < 3) {
        isValid = false;
        errorMessage = 'Subject must be at least 3 characters';
    }
    // Message validation
    else if (fieldName === 'message' && fieldValue.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    }

    // Update UI based on validation
    const errorSpan = field.parentElement.querySelector('.form-error');
    
    if (!isValid) {
        field.classList.add('error');
        if (errorSpan) {
            errorSpan.textContent = errorMessage;
            errorSpan.classList.add('show');
        }
    } else {
        field.classList.remove('error');
        if (errorSpan) {
            errorSpan.classList.remove('show');
        }
    }

    return isValid;
}

// ============================================
// 7. SMOOTH SCROLL
// ============================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 8. HOVER EFFECTS & INTERACTIONS
// ============================================

function setupHoverEffects() {
    // Project card 3D tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Skill progress animations
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const width = entry.target.parentElement.parentElement.querySelector('.skill-percent').textContent;
                entry.target.style.width = width;
                entry.target.classList.add('animated');
            }
        });
    });

    skillProgressBars.forEach(bar => progressObserver.observe(bar));

    // Number counter animation
    const counters = document.querySelectorAll('.number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.innerText === '0') {
                const target = parseInt(entry.target.getAttribute('data-number'));
                animateCounter(entry.target, target);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    
    const counter = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.innerText = target;
            clearInterval(counter);
        } else {
            element.innerText = Math.ceil(current);
        }
    }, 30);
}

// ============================================
// 9. REMOVE LOADING SCREEN
// ============================================

function removeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }
    }, 1800);
}

// ============================================
// 10. UTILITY FUNCTIONS
// ============================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const args = arguments;
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// 11. PERFORMANCE & OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Service Worker registration (for PWA)
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js');
}