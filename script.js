/**
 * KRISHNA PORTFOLIO - CORE JAVASCRIPT
 * 1. Cyberpunk 0-100% Preloader
 * 2. 3D Glowy Profile Tilt & Glare Effect
 * 3. 3D Project Depth Slider (Cards sliding & coming from the back)
 * 4. Student Typewriter Effect
 * 5. ScrollSpy & Mobile Navigation
 * 6. Interactive Copy & Form Handling with Toast
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. CYBERPUNK PRELOADER (0 to 100%)
    // ==========================================
    const preloader = document.getElementById('preloader');
    const preloaderCount = document.getElementById('preloaderCount');
    const preloaderBar = document.getElementById('preloaderBar');
    const preloaderStatus = document.getElementById('preloaderStatus');

    if (preloader && preloaderCount && preloaderBar && preloaderStatus) {
        let currentProgress = 0;
        const targetProgress = 100;
        
        // Status phrases matching progress thresholds
        const statusMessages = [
            { threshold: 15, text: "BOOTING SYSTEM KERNEL..." },
            { threshold: 35, text: "INITIALIZING STUDENT MODULES..." },
            { threshold: 55, text: "COMPILING CODE & ALGORITHMS..." },
            { threshold: 75, text: "RENDERING 3D CYBER MATRIX..." },
            { threshold: 92, text: "ENGAGING HOLOGRAM GRAPHICS..." },
            { threshold: 100, text: "ACCESS GRANTED. WELCOME!" }
        ];

        // Smooth randomized progress increment
        const progressTimer = setInterval(() => {
            const increment = Math.floor(Math.random() * 5) + 3;
            currentProgress = Math.min(currentProgress + increment, targetProgress);

            preloaderCount.textContent = currentProgress;
            preloaderBar.style.width = `${currentProgress}%`;

            // Update status text
            for (let i = 0; i < statusMessages.length; i++) {
                if (currentProgress <= statusMessages[i].threshold) {
                    preloaderStatus.textContent = statusMessages[i].text;
                    break;
                }
            }

            if (currentProgress >= targetProgress) {
                clearInterval(progressTimer);
                preloaderStatus.textContent = "SYSTEM READY // WELCOME TO KRISHNA KUMAR'S PORTFOLIO";

                // Smooth delay to showcase 100%, then dismiss
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    // Trigger hero stats animation
                    startHeroStats();
                }, 500);
            }
        }, 35);
    } else {
        startHeroStats();
    }

    // ==========================================
    // 2. DYNAMIC FOOTER YEAR
    // ==========================================
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 3. TOAST NOTIFICATION HELPER
    // ==========================================
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout = null;

    function showToast(message, iconClass = 'fa-solid fa-circle-check') {
        if (!toast || !toastMessage) return;

        const iconEl = toast.querySelector('.toast-icon');
        if (iconEl) {
            iconEl.className = `${iconClass} toast-icon`;
        }

        toastMessage.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // ==========================================
    // 4. STUDENT TYPEWRITER EFFECT
    // ==========================================
    const typewriterEl = document.getElementById('typewriter');
    const roles = [
        "2nd Year B.Tech CSE Student",
        "BRCM College Undergrad",
        "DSA & C++ Learner",
        "Aspiring Web Developer",
        "Python & AI Explorer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
        if (!typewriterEl) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 95;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2200; // Pause when word finishes
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ==========================================
    // 5. 3D GLOWY PROFILE CARD INTERACTIVE TILT
    // ==========================================
    const profileCard = document.getElementById('profileCard');
    const glareOverlay = document.getElementById('glareOverlay');

    if (profileCard) {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -16;
            const rotateY = ((x - centerX) / centerX) * 16;

            profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

            if (glareOverlay) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glareOverlay.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`;
                glareOverlay.style.opacity = '1';
            }
        });

        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            if (glareOverlay) {
                glareOverlay.style.opacity = '0';
            }
        });
    }

    // ==========================================
    // 6. NAVBAR STICKY & MOBILE DRAWER
    // ==========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allLinks = document.querySelectorAll('.links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('open');
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', !isOpen);
        });

        allLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ScrollSpy active link
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                allLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ==========================================
    // 7. HERO STATS COUNTER
    // ==========================================
    let statsCounted = false;
    function startHeroStats() {
        if (statsCounted) return;
        const statNums = document.querySelectorAll('.stat-num');
        statNums.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (!target) return;
            const duration = 1600;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
        statsCounted = true;
    }

    // ==========================================
    // 8. 3D PROJECT DEPTH SLIDER (SLIDING FROM BACK)
    // ==========================================
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderDots = document.getElementById('sliderDots');
    const slideCurrent = document.getElementById('slideCurrent');
    const slideTotal = document.getElementById('slideTotal');
    const allProjectCards = Array.from(document.querySelectorAll('.project-card-3d'));
    const filterBtns = document.querySelectorAll('.filter-btn');

    let visibleCards = [...allProjectCards];
    let currentIndex = 0;

    function render3DSlider() {
        const total = visibleCards.length;

        if (slideTotal) slideTotal.textContent = total;
        if (slideCurrent) slideCurrent.textContent = total > 0 ? (currentIndex + 1) : 0;

        // Render pagination dots
        if (sliderDots) {
            sliderDots.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.className = `dot-btn ${i === currentIndex ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    render3DSlider();
                });
                sliderDots.appendChild(dot);
            }
        }

        // Apply 3D perspective classes
        allProjectCards.forEach(card => {
            card.classList.remove('slide-active', 'slide-next', 'slide-prev', 'slide-hidden-right', 'slide-hidden-left');
            card.style.display = 'none'; // hide cards not in visible list
        });

        if (total === 0) return;

        visibleCards.forEach((card, idx) => {
            card.style.display = 'flex';

            // Calculate cyclic relative distance
            const diff = (idx - currentIndex + total) % total;

            if (diff === 0) {
                // Active Card in front
                card.classList.add('slide-active');
            } else if (diff === 1 || (total === 2 && diff === 1)) {
                // Next Card in background right
                card.classList.add('slide-next');
            } else if (diff === total - 1) {
                // Previous Card in background left
                card.classList.add('slide-prev');
            } else if (diff > 1 && diff <= Math.floor(total / 2)) {
                // Further right in depth
                card.classList.add('slide-hidden-right');
            } else {
                // Further left in depth
                card.classList.add('slide-hidden-left');
            }
        });
    }

    function goToNextSlide() {
        if (visibleCards.length === 0) return;
        currentIndex = (currentIndex + 1) % visibleCards.length;
        render3DSlider();
    }

    function goToPrevSlide() {
        if (visibleCards.length === 0) return;
        currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
        render3DSlider();
    }

    if (sliderNext) sliderNext.addEventListener('click', goToNextSlide);
    if (sliderPrev) sliderPrev.addEventListener('click', goToPrevSlide);

    // Clicking side cards slides them to center
    allProjectCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('slide-next')) {
                goToNextSlide();
            } else if (card.classList.contains('slide-prev')) {
                goToPrevSlide();
            }
        });
    });

    // Touch Swipe Support for 3D Slider
    const sliderStage = document.getElementById('sliderStage');
    let touchStartX = 0;
    let touchEndX = 0;

    if (sliderStage) {
        sliderStage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderStage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, { passive: true });
    }

    function handleSwipeGesture() {
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) {
            goToNextSlide();
        } else if (touchEndX > touchStartX + threshold) {
            goToPrevSlide();
        }
    }

    // Project Category Filtering with 3D slider reset
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (filterValue === 'all') {
                visibleCards = [...allProjectCards];
            } else {
                visibleCards = allProjectCards.filter(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    return categories.includes(filterValue);
                });
            }

            currentIndex = 0;
            render3DSlider();
        });
    });

    // Initialize 3D slider
    render3DSlider();

    // ==========================================
    // 9. COPY TERMINAL CODE & EMAIL
    // ==========================================
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const terminalCode = document.querySelector('.terminal-body code');
            if (terminalCode) {
                navigator.clipboard.writeText(terminalCode.innerText)
                    .then(() => showToast('Student profile JSON copied to clipboard!'))
                    .catch(() => showToast('Failed to copy', 'fa-solid fa-circle-xmark'));
            }
        });
    }

    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailText = document.getElementById('emailText');
    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailText.textContent.trim())
                .then(() => showToast('Email copied to clipboard!'))
                .catch(() => showToast('Failed to copy email', 'fa-solid fa-circle-xmark'));
        });
    }

    // ==========================================
    // 10. CONTACT FORM HANDLING
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const subjectError = document.getElementById('subjectError');
            const messageError = document.getElementById('messageError');

            let isValid = true;
            nameError.textContent = '';
            emailError.textContent = '';
            subjectError.textContent = '';
            messageError.textContent = '';

            if (!nameInput.value.trim()) {
                nameError.textContent = 'Please enter your name.';
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Please enter your email.';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (!subjectInput.value.trim()) {
                subjectError.textContent = 'Please enter a subject.';
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                messageError.textContent = 'Please enter your message.';
                isValid = false;
            }

            if (!isValid) return;

            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="btn-text">Sending...</span>
                <i class="fa-solid fa-spinner fa-spin"></i>
            `;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
                contactForm.reset();
                showToast('Thanks for reaching out! Krishna will respond soon.');
            }, 1200);
        });
    }

    // ==========================================
    // 11. BACK TO TOP
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 12. RESUME PHOTO VIEWER MODAL
    // ==========================================
    const resumePhotoModal = document.getElementById('resumePhotoModal');
    const heroResumeBtn = document.getElementById('heroResumeBtn');
    const navResumeTrigger = document.getElementById('navResumeTrigger');
    const closeResumePhotoBtn = document.getElementById('closeResumePhotoBtn');
    const closeResumePhotoBackdrop = document.getElementById('closeResumePhotoBackdrop');
    const closeResumePhotoFooterBtn = document.getElementById('closeResumePhotoFooterBtn');
    const resumePhotoImg = document.getElementById('resumePhotoImg');
    const resumeFallback = document.getElementById('resumeFallback');

    function openResumePhoto() {
        if (resumePhotoModal) {
            resumePhotoModal.classList.add('active');
            resumePhotoModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeResumePhoto() {
        if (resumePhotoModal) {
            resumePhotoModal.classList.remove('active');
            resumePhotoModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumePhoto);
    if (navResumeTrigger) navResumeTrigger.addEventListener('click', openResumePhoto);
    if (closeResumePhotoBtn) closeResumePhotoBtn.addEventListener('click', closeResumePhoto);
    if (closeResumePhotoBackdrop) closeResumePhotoBackdrop.addEventListener('click', closeResumePhoto);
    if (closeResumePhotoFooterBtn) closeResumePhotoFooterBtn.addEventListener('click', closeResumePhoto);

    // Auto-detect if resume.jpg or resume.png exists
    if (resumePhotoImg) {
        resumePhotoImg.addEventListener('error', function() {
            if (this.src.endsWith('resume.jpg')) {
                this.src = 'resume.png';
            } else {
                this.style.display = 'none';
                if (resumeFallback) resumeFallback.classList.add('show');
            }
        });
    }

    // ==========================================
    // 13. CERTIFICATES SLIDE-BY-SLIDE MODAL
    // ==========================================
    const certSliderModal = document.getElementById('certSliderModal');
    const heroCertBtn = document.getElementById('heroCertBtn');
    const navCertTrigger = document.getElementById('navCertTrigger');
    const closeCertBtn = document.getElementById('closeCertBtn');
    const closeCertBackdrop = document.getElementById('closeCertBackdrop');
    const closeCertFooterBtn = document.getElementById('closeCertFooterBtn');
    const certModalPrev = document.getElementById('certModalPrev');
    const certModalNext = document.getElementById('certModalNext');
    const certSlides = Array.from(document.querySelectorAll('.cert-slide'));
    const certCounter = document.getElementById('certCounter');
    const certModalDots = document.getElementById('certModalDots');

    let currentCertSlide = 0;
    const totalCertSlides = certSlides.length;

    function renderCertSlide(index) {
        if (totalCertSlides === 0) return;
        currentCertSlide = (index + totalCertSlides) % totalCertSlides;

        // Update slides
        certSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentCertSlide);
        });

        // Update counter
        if (certCounter) {
            certCounter.textContent = `${currentCertSlide + 1} / ${totalCertSlides}`;
        }

        // Render dots
        if (certModalDots) {
            certModalDots.innerHTML = '';
            for (let i = 0; i < totalCertSlides; i++) {
                const dot = document.createElement('button');
                dot.className = `cert-dot-btn ${i === currentCertSlide ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Go to certificate ${i + 1}`);
                dot.addEventListener('click', () => renderCertSlide(i));
                certModalDots.appendChild(dot);
            }
        }
    }

    function openCertModal() {
        if (certSliderModal) {
            certSliderModal.classList.add('active');
            certSliderModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            renderCertSlide(0);
        }
    }

    function closeCertModal() {
        if (certSliderModal) {
            certSliderModal.classList.remove('active');
            certSliderModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (heroCertBtn) heroCertBtn.addEventListener('click', openCertModal);
    if (navCertTrigger) navCertTrigger.addEventListener('click', openCertModal);
    if (closeCertBtn) closeCertBtn.addEventListener('click', closeCertModal);
    if (closeCertBackdrop) closeCertBackdrop.addEventListener('click', closeCertModal);
    if (closeCertFooterBtn) closeCertFooterBtn.addEventListener('click', closeCertModal);

    if (certModalNext) {
        certModalNext.addEventListener('click', () => renderCertSlide(currentCertSlide + 1));
    }
    if (certModalPrev) {
        certModalPrev.addEventListener('click', () => renderCertSlide(currentCertSlide - 1));
    }

    // Auto-detect missing cert photos and display elegant fallback
    document.querySelectorAll('.cert-photo').forEach(photo => {
        photo.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = this.parentElement.querySelector('.cert-img-fallback');
            if (fallback) fallback.classList.add('show');
        });
    });

    // Touch Swipe for Certificate Slider
    const certSlidesTrack = document.getElementById('certSlidesTrack');
    let certTouchStartX = 0;
    let certTouchEndX = 0;

    if (certSlidesTrack) {
        certSlidesTrack.addEventListener('touchstart', (e) => {
            certTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        certSlidesTrack.addEventListener('touchend', (e) => {
            certTouchEndX = e.changedTouches[0].screenX;
            if (certTouchEndX < certTouchStartX - 40) {
                renderCertSlide(currentCertSlide + 1);
            } else if (certTouchEndX > certTouchStartX + 40) {
                renderCertSlide(currentCertSlide - 1);
            }
        }, { passive: true });
    }

    // Global ESC & Keyboard Arrows handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (resumePhotoModal && resumePhotoModal.classList.contains('active')) closeResumePhoto();
            if (certSliderModal && certSliderModal.classList.contains('active')) closeCertModal();
        } else if (certSliderModal && certSliderModal.classList.contains('active')) {
            if (e.key === 'ArrowRight') renderCertSlide(currentCertSlide + 1);
            if (e.key === 'ArrowLeft') renderCertSlide(currentCertSlide - 1);
        }
    });

    // ==========================================
    // 12. FUTURISTIC LIVING BACKGROUND PARTICLES & MOUSE INTERACTION
    // ==========================================
    const bgCanvas = document.getElementById('bgCyberCanvas');
    const cursorAura = document.getElementById('cursorAmbientAura');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- A. Smooth Cursor Follower Aura ---
    let mouseX = -1000;
    let mouseY = -1000;
    let targetX = -1000;
    let targetY = -1000;
    let auraX = -1000;
    let auraY = -1000;
    let isMouseInWindow = false;

    if (cursorAura && !prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isMouseInWindow) {
                isMouseInWindow = true;
                auraX = targetX;
                auraY = targetY;
                cursorAura.classList.add('visible');
            }
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            isMouseInWindow = false;
            mouseX = -1000;
            mouseY = -1000;
            cursorAura.classList.remove('visible');
        });

        // Hover effect over interactive elements
        document.addEventListener('mouseover', (e) => {
            const interactiveEl = e.target.closest('a, button, .btn, .project-card-3d, .skill-card, .stat-pill, .social-card, .contact-card, .filter-btn, .photo-modal-close');
            if (interactiveEl) {
                cursorAura.classList.add('aura-hovering');
            }
        });

        document.addEventListener('mouseout', (e) => {
            const interactiveEl = e.target.closest('a, button, .btn, .project-card-3d, .skill-card, .stat-pill, .social-card, .contact-card, .filter-btn, .photo-modal-close');
            if (interactiveEl) {
                cursorAura.classList.remove('aura-hovering');
            }
        });

        // Smooth Lerp Animation Loop for Aura
        function updateCursorAura() {
            if (isMouseInWindow) {
                auraX += (targetX - auraX) * 0.085;
                auraY += (targetY - auraY) * 0.085;
                cursorAura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0)`;
            }
            requestAnimationFrame(updateCursorAura);
        }
        requestAnimationFrame(updateCursorAura);
    }

    // --- B. Subtle Neon Click Ripple ---
    if (!prefersReducedMotion) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('input, textarea')) return;

            const ripple = document.createElement('div');
            ripple.className = 'cursor-click-ripple';
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            ripple.style.width = '30px';
            ripple.style.height = '30px';
            document.body.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // --- C. Interactive Particles Canvas ---
    if (bgCanvas) {
        const ctx = bgCanvas.getContext('2d');
        if (ctx) {
            let width = 0;
            let height = 0;
            let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            let particles = [];
            let animFrameId = null;

            const particleColors = [
                { r: 255, g: 42, b: 109 },  // Neon Pink
                { r: 255, g: 0, b: 60 },   // Neon Red
                { r: 5, g: 217, b: 232 },  // Neon Cyan accent
                { r: 168, g: 85, b: 247 }  // Purple glow
            ];

            function resizeCanvas() {
                width = window.innerWidth;
                height = window.innerHeight;
                dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                bgCanvas.width = width * dpr;
                bgCanvas.height = height * dpr;
                ctx.scale(dpr, dpr);
            }

            class Particle {
                constructor() {
                    this.init(true);
                }

                init(randomY = false) {
                    this.x = Math.random() * width;
                    this.y = randomY ? Math.random() * height : height + 10;
                    this.vx = (Math.random() - 0.5) * 0.25;
                    this.vy = -(Math.random() * 0.28 + 0.08); // Gentle upward drift
                    this.radius = Math.random() * 1.1 + 0.8;
                    const colorIndex = Math.random() < 0.65 ? 0 : Math.random() < 0.85 ? 1 : Math.random() < 0.95 ? 2 : 3;
                    this.color = particleColors[colorIndex];
                    this.baseAlpha = Math.random() * 0.28 + 0.14;
                    this.pulseSpeed = Math.random() * 0.02 + 0.01;
                    this.pulsePhase = Math.random() * Math.PI * 2;
                }

                update() {
                    this.pulsePhase += this.pulseSpeed;
                    this.alpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.08;

                    // Mouse Interaction: Subtle natural deflection
                    if (mouseX > 0 && mouseY > 0) {
                        const dx = this.x - mouseX;
                        const dy = this.y - mouseY;
                        const dist = Math.hypot(dx, dy);
                        const maxDist = 110;

                        if (dist < maxDist && dist > 0) {
                            const force = (1 - dist / maxDist) * 1.2;
                            this.vx += (dx / dist) * force * 0.3;
                            this.vy += (dy / dist) * force * 0.3;
                        }
                    }

                    // Apply dampening to smoothly return to drift speed
                    this.vx *= 0.97;
                    if (this.vy > -0.08) this.vy -= 0.01;
                    if (this.vy < -0.36) this.vy *= 0.97;

                    this.x += this.vx;
                    this.y += this.vy;

                    // Screen wrap-around
                    if (this.y < -15) this.init(false);
                    if (this.x < -15) this.x = width + 10;
                    if (this.x > width + 15) this.x = -10;
                }

                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${Math.max(0, this.alpha)})`;
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }

            function initParticles() {
                resizeCanvas();
                const isMobile = window.innerWidth <= 768;
                const count = isMobile ? 20 : 45;
                particles = [];
                for (let i = 0; i < count; i++) {
                    particles.push(new Particle());
                }
            }

            function drawConnections() {
                const maxLineDist = 80;
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p1 = particles[i];
                        const p2 = particles[j];
                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dist = Math.hypot(dx, dy);

                        if (dist < maxLineDist) {
                            const lineAlpha = (1 - dist / maxLineDist) * 0.055;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(255, 42, 109, ${lineAlpha})`;
                            ctx.lineWidth = 0.7;
                            ctx.stroke();
                        }
                    }
                }
            }

            function renderParticles() {
                ctx.clearRect(0, 0, width, height);

                for (let i = 0; i < particles.length; i++) {
                    if (!prefersReducedMotion) {
                        particles[i].update();
                    }
                    particles[i].draw();
                }

                if (!prefersReducedMotion) {
                    drawConnections();
                }

                if (!prefersReducedMotion) {
                    animFrameId = requestAnimationFrame(renderParticles);
                }
            }

            initParticles();
            renderParticles();

            // Window resize handler with debounce
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    initParticles();
                    if (prefersReducedMotion) {
                        renderParticles();
                    }
                }, 200);
            });

            // Pause animation when tab is inactive to save battery/GPU
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    if (animFrameId) cancelAnimationFrame(animFrameId);
                } else if (!prefersReducedMotion) {
                    animFrameId = requestAnimationFrame(renderParticles);
                }
            });
        }
    }

});
