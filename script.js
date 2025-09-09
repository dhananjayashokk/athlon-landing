// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global variables
let currentReviewIndex = 0;
const reviewCards = document.querySelectorAll('.review-card');
const totalReviews = reviewCards.length;

// Booking Modal Functions
function openBookingModal(preselectedSport = '') {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Pre-select sport if provided
    if (preselectedSport) {
        const sportSelect = document.getElementById('sport-select');
        sportSelect.value = preselectedSport;
        updateBookingSummary();
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('booking-date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.querySelector('.booking-form').reset();
    updateBookingSummary();
}

function updateBookingSummary() {
    const sportSelect = document.getElementById('sport-select');
    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('time-slot');
    const durationSelect = document.getElementById('duration');
    
    const summaryResponse = document.getElementById('summary-sport');
    const summaryDateTime = document.getElementById('summary-datetime');
    const summaryTotal = document.getElementById('summary-total');
    
    // Update sport
    const selectedOption = sportSelect.selectedOptions[0];
    if (selectedOption && selectedOption.value) {
        summaryResponse.textContent = selectedOption.textContent.split(' - ')[0];
    } else {
        summaryResponse.textContent = '-';
    }
    
    // Update date & time
    if (dateInput.value && timeSelect.value) {
        const date = new Date(dateInput.value);
        const dateStr = date.toLocaleDateString('en-IN', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        summaryDateTime.textContent = `${dateStr}, ${timeSelect.value}`;
    } else {
        summaryDateTime.textContent = '-';
    }
    
    // Update total
    if (selectedOption && selectedOption.dataset.price && durationSelect.value) {
        const price = parseInt(selectedOption.dataset.price);
        const duration = parseInt(durationSelect.value);
        const total = price * duration;
        summaryTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
    } else {
        summaryTotal.textContent = '₹0';
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function openWhatsApp() {
    const phoneNumber = '919876543210'; // Replace with actual WhatsApp number
    const message = encodeURIComponent(
        'Hi! I would like to book a slot at Athlon Sports. Please help me with the availability and booking process.'
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

function openDirections() {
    const address = encodeURIComponent('Athlon Sports, Murar Road, Gate No. 3, Mulund West, Mumbai 400080');
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(googleMapsUrl, '_blank');
}

function submitBookingForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const sportSelect = document.getElementById('sport-select');
    const selectedOption = sportSelect.selectedOptions[0];
    
    if (!selectedOption || !selectedOption.value) {
        alert('Please select a sport');
        return;
    }
    
    const bookingDetails = {
        sport: selectedOption.textContent.split(' - ')[0],
        date: formData.get('date'),
        time: formData.get('time'),
        duration: formData.get('duration'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        price: selectedOption.dataset.price,
        total: parseInt(selectedOption.dataset.price) * parseInt(formData.get('duration'))
    };
    
    const phoneNumber = '919876543210'; // Replace with actual WhatsApp number
    const message = encodeURIComponent(
        `🏟️ *ATHLON SPORTS BOOKING REQUEST*\n\n` +
        `👤 *Name:* ${bookingDetails.name}\n` +
        `📱 *Phone:* ${bookingDetails.phone}\n\n` +
        `🏆 *Sport:* ${bookingDetails.sport}\n` +
        `📅 *Date:* ${new Date(bookingDetails.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n` +
        `⏰ *Time:* ${bookingDetails.time}\n` +
        `⏳ *Duration:* ${bookingDetails.duration} hour(s)\n\n` +
        `💰 *Total Amount:* ₹${bookingDetails.total.toLocaleString('en-IN')}\n\n` +
        `Please confirm availability and provide booking instructions. Thank you!`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Close modal after sending
    closeBookingModal();
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeCarousel();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeSportsShowcase();
    initializeStatCounters();
    createAdvancedParticleSystem();
    initializeMobileFeatures();
    initializeBookingSystem();
    
    // Mark page as loaded
    document.body.classList.add('loaded');
    
    // Hide loading screen with animation
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            loadingScreen.remove();
        }, 300);
    }
});

// Initialize Hero Animations
function initializeAnimations() {
    // Set initial states for all animated elements
    gsap.set('.title-line', { opacity: 0, y: 50 });
    gsap.set('.hero-subtitle', { opacity: 0, y: 30 });
    gsap.set('.hero-cta', { opacity: 0, y: 30 });
    gsap.set('.hero-stats', { opacity: 0, y: 30 });
    gsap.set('.sport-silhouette', { opacity: 0, scale: 0.5, rotation: -15 });
    gsap.set('.equipment-item', { opacity: 0, scale: 0.3, y: 50 });
    gsap.set('.mini-sport-icon', { scale: 0 });
    gsap.set('.nav-icon', { scale: 0, rotation: -180 });

    // Enhanced navigation entrance
    gsap.to('.mini-sport-icon', {
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.2
    });

    gsap.to('.nav-icon', {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "elastic.out(1, 0.75)",
        delay: 0.5
    });

    // Hero entrance sequence with enhanced effects
    const heroTL = gsap.timeline({ delay: 0.8 });
    
    heroTL
        .to('.title-line', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: "power3.out"
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, '-=0.3')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, '-=0.3')
        .to('.hero-stats', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, '-=0.3')
        .to('.sport-silhouette', {
            opacity: 0.6,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "elastic.out(1, 0.75)"
        }, '-=0.8')
        .to('.equipment-item', {
            opacity: 0.7,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)"
        }, '-=0.6');

    // Enhanced sports silhouettes animations with individual element movement
    initializeSportsAnimations();
    initializeFloatingElements();
    initializeParticleEffects();
    initializeNavigationAnimations();
    createHeroBubbleSystem();
    initializeEnhancedSportsAnimations();

    // Parallax background animation
    gsap.to('.arena-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to('.crowd-silhouette', {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to('.sports-silhouettes', {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Initialize Enhanced Sports Animations
function initializeSportsAnimations() {
    // Cricket animations with realistic physics
    gsap.to('.cricket', {
        y: -20,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Football with bouncing effect
    gsap.to('.football', {
        y: -15,
        rotation: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
    });

    // Tennis with racket swing simulation
    gsap.to('.tennis', {
        y: -25,
        rotation: 10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
    });

    // Archery with bow tension effect
    gsap.to('.archery', {
        y: -18,
        rotation: -5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
    });
}

// Initialize Floating Equipment Animations
function initializeFloatingElements() {
    // Create dynamic interactions between equipment items
    const equipmentItems = document.querySelectorAll('.equipment-item');
    
    equipmentItems.forEach((item) => {
        // Add mouse tracking for dynamic movement
        gsap.set(item, {
            transformOrigin: "center center"
        });
        
        // Create subtle attraction effect when hovering hero
        ScrollTrigger.create({
            trigger: ".hero",
            start: "top center",
            end: "bottom center",
            onUpdate: self => {
                const progress = self.progress;
                gsap.to(item, {
                    scale: 1 + (progress * 0.2),
                    duration: 0.3
                });
            }
        });
    });
}

// Initialize Particle Effects
function initializeParticleEffects() {
    // Add dynamic particle generation
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(45deg, var(--athletic-orange), var(--bright-blue));
            border-radius: 50%;
            pointer-events: none;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: 0.6;
        `;
        
        document.querySelector('.hero-particles').appendChild(particle);
        
        gsap.fromTo(particle, 
            { scale: 0, y: 20 },
            { 
                scale: 1, 
                y: -30,
                duration: 3 + Math.random() * 2,
                ease: "power2.out",
                onComplete: () => particle.remove()
            }
        );
    };

    // Generate particles periodically
    setInterval(createParticle, 2000);
}

// Initialize Enhanced Navigation Animations
function initializeNavigationAnimations() {
    // Add magnetic effect to navigation items
    const navLinks = document.querySelectorAll('.nav-links a');
    const navContainer = document.querySelector('.nav-container');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.nav-icon');
            const effect = this.querySelector('.nav-hover-effect');
            
            gsap.to(icon, {
                scale: 1.3,
                rotation: 15,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            
            gsap.to(effect, {
                scaleX: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.nav-icon');
            const effect = this.querySelector('.nav-hover-effect');
            
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(effect, {
                scaleX: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Add navigation particle burst on hover
    navContainer.addEventListener('mouseenter', function() {
        gsap.to('.nav-particle', {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
        });
    });
    
    navContainer.addEventListener('mouseleave', function() {
        gsap.to('.nav-particle', {
            scale: 1,
            opacity: 0.4,
            duration: 0.5,
            ease: "power2.out"
        });
    });
}

// Create Hero Bubble System
function createHeroBubbleSystem() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create bubble container if it doesn't exist
    let bubbleContainer = heroSection.querySelector('.hero-bubble-system');
    if (!bubbleContainer) {
        bubbleContainer = document.createElement('div');
        bubbleContainer.className = 'hero-bubble-system';
        bubbleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 4;
            overflow: hidden;
        `;
        heroSection.appendChild(bubbleContainer);
    }
    
    // Create floating bubbles
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'gsap-bubble';
        
        const size = Math.random() * 15 + 8;
        const startX = Math.random() * 100;
        const opacity = Math.random() * 0.4 + 0.1;
        
        bubble.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(74, 91, 245, 0.3));
            border-radius: 50%;
            border: 1px solid rgba(74, 91, 245, 0.2);
            left: ${startX}%;
            bottom: -20px;
            opacity: 0;
            pointer-events: none;
        `;
        
        bubbleContainer.appendChild(bubble);
        
        // Animate bubble upward with GSAP
        gsap.fromTo(bubble, {
            opacity: 0,
            y: 50,
            scale: 0.5,
            rotation: 0
        }, {
            opacity: opacity,
            y: -window.innerHeight - 100,
            scale: 1,
            rotation: 360,
            duration: Math.random() * 8 + 6,
            ease: "none",
            onComplete: () => {
                bubble.remove();
            }
        });
        
        // Add floating motion
        gsap.to(bubble, {
            x: Math.random() * 200 - 100,
            duration: Math.random() * 4 + 3,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
    }
    
    // Create bubbles periodically
    function startBubbleGeneration() {
        createBubble();
        gsap.delayedCall(Math.random() * 2 + 1, startBubbleGeneration);
    }
    
    // Start the bubble system
    startBubbleGeneration();
}

// Initialize Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Navbar scroll effect
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "scrolled", targets: ".navbar" }
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Mobile menu toggle
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('mobile-menu');
            navLinksContainer.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navLinksContainer.classList.remove('mobile-menu', 'active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Initialize Enhanced Scroll Effects
function initializeScrollEffects() {
    // Enhanced section header animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            onEnter: () => {
                element.classList.add('animate');
            }
        });
    });

    // Slide animations
    const slideLeftElements = document.querySelectorAll('.animate-slide-left');
    slideLeftElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            onEnter: () => {
                element.classList.add('animate');
            }
        });
    });

    const slideRightElements = document.querySelectorAll('.animate-slide-right');
    slideRightElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            onEnter: () => {
                element.classList.add('animate');
            }
        });
    });

    // Feature items with staggered animation
    const featureItems = document.querySelectorAll('.animate-feature');
    featureItems.forEach((item) => {
        const delay = parseInt(item.dataset.delay) || 0;
        ScrollTrigger.create({
            trigger: item,
            start: "top 85%",
            onEnter: () => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, delay);
            }
        });
    });

    // Sports cards animation
    const sportCards = document.querySelectorAll('.animate-sport-card');
    sportCards.forEach((card) => {
        const delay = parseInt(card.dataset.delay) || 0;
        ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            onEnter: () => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, delay);
            }
        });
    });

    // About section animations
    gsap.set('.feature-item', { opacity: 0, x: -50 });
    gsap.set('.arena-showcase', { opacity: 0, scale: 0.8 });

    ScrollTrigger.create({
        trigger: '.about',
        start: "top 60%",
        onEnter: () => {
            gsap.to('.feature-item', {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out"
            });
            
            gsap.to('.arena-showcase', {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.75)",
                delay: 0.3
            });
        }
    });

    // Sports cards animation
    gsap.set('.sport-card', { opacity: 0, y: 50 });

    ScrollTrigger.create({
        trigger: '.sports-grid',
        start: "top 70%",
        onEnter: () => {
            gsap.to('.sport-card', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });
        }
    });

    // Enhanced Facilities animation
    const facilityItems = document.querySelectorAll('.animate-facility');
    facilityItems.forEach((item) => {
        const delay = parseInt(item.dataset.delay) || 0;
        ScrollTrigger.create({
            trigger: item,
            start: "top 85%",
            onEnter: () => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, delay);
            }
        });
    });

    // Rates cards flip animation
    gsap.set('.rate-card', { opacity: 0, rotationX: -90 });

    ScrollTrigger.create({
        trigger: '.rates-grid',
        start: "top 70%",
        onEnter: () => {
            gsap.to('.rate-card', {
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                transformOrigin: "center bottom"
            });
        }
    });

    // Location section
    gsap.set('.detail-item', { opacity: 0, x: -30 });
    gsap.set('.map-placeholder', { opacity: 0, scale: 0.9 });

    ScrollTrigger.create({
        trigger: '.location',
        start: "top 70%",
        onEnter: () => {
            gsap.to('.detail-item', {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out"
            });
            
            gsap.to('.map-placeholder', {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.3
            });
        }
    });
}

// Initialize Interactive Elements
function initializeInteractiveElements() {
    // Sport cards hover effects
    const sportCards = document.querySelectorAll('.sport-card');
    sportCards.forEach(card => {
        const icon = card.querySelector('.sport-icon');
        
        card.addEventListener('mouseenter', function() {
            gsap.to(icon, {
                scale: 1.2,
                rotation: 10,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(card, {
                y: -10,
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "power2.out"
            });
            
            gsap.to(card, {
                y: 0,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    // Facility items hover effects
    const facilityItems = document.querySelectorAll('.facility-item');
    facilityItems.forEach(item => {
        const icon = item.querySelector('.facility-icon');
        
        item.addEventListener('mouseenter', function() {
            gsap.to(icon, {
                scale: 1.15,
                rotation: 15,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Rate cards hover effects
    const rateCards = document.querySelectorAll('.rate-card');
    rateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(card, {
                scale: 1.03,
                y: -8,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(card, {
                scale: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    // Button hover effects with ripple
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => ripple.remove()
            });
        });
    });

    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const isNumber = /^\d+$/.test(text.replace(',', ''));
        
        if (isNumber) {
            const finalNumber = parseInt(text.replace(',', ''));
            stat.textContent = '0';
            
            ScrollTrigger.create({
                trigger: '.hero-stats',
                start: "top 80%",
                onEnter: () => {
                    gsap.to(stat, {
                        textContent: finalNumber,
                        duration: 2,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            stat.textContent = Math.floor(this.targets()[0].textContent).toLocaleString();
                        }
                    });
                }
            });
        }
    });
}

// Initialize Reviews Carousel
function initializeCarousel() {
    const track = document.querySelector('.review-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.review-card');
    
    if (!track || !cards.length) return;

    let isAnimating = false;
    const cardWidth = 380; // card width + gap

    // Set initial position
    gsap.set(track, { x: 0 });

    // Auto-play carousel
    let autoPlayInterval = setInterval(nextSlide, 5000);

    function nextSlide() {
        if (isAnimating) return;
        
        isAnimating = true;
        currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
        
        gsap.to(track, {
            x: -currentReviewIndex * cardWidth,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                isAnimating = false;
            }
        });
    }

    function prevSlide() {
        if (isAnimating) return;
        
        isAnimating = true;
        currentReviewIndex = currentReviewIndex === 0 ? totalReviews - 1 : currentReviewIndex - 1;
        
        gsap.to(track, {
            x: -currentReviewIndex * cardWidth,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                isAnimating = false;
            }
        });
    }

    // Button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(autoPlayInterval);
            nextSlide();
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(autoPlayInterval);
            prevSlide();
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Pause auto-play on hover
    const carousel = document.querySelector('.reviews-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoPlayInterval);
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        
        // Visual feedback during drag
        gsap.set(track, {
            x: -currentReviewIndex * cardWidth + diffX * 0.3
        });
    });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        const diffX = currentX - startX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            // Snap back to current position
            gsap.to(track, {
                x: -currentReviewIndex * cardWidth,
                duration: 0.3,
                ease: "power2.out"
            });
        }
        
        isDragging = false;
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
}

// Utility Functions
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
    }
}

// Performance Optimization
const debouncedResize = debounce(() => {
    ScrollTrigger.refresh();
}, 300);

window.addEventListener('resize', debouncedResize);

// Intersection Observer for performance
const observeElements = document.querySelectorAll('.sport-card, .facility-item, .rate-card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

observeElements.forEach(el => {
    elementObserver.observe(el);
});

// Smooth scroll behavior for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement,
                    offsetY: 80
                },
                ease: "power2.inOut"
            });
        }
    });
});

// Add loading state management
window.addEventListener('load', () => {
    gsap.to('.loading-overlay', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            const loadingOverlay = document.querySelector('.loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.remove();
            }
        }
    });
});

// Easter egg - Konami code for fun animation
let konamiCode = [];
const konami = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA";

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konami) {
        // Trigger special animation
        gsap.to('.sport-silhouette', {
            rotation: 720,
            scale: 1.5,
            duration: 2,
            ease: "power2.inOut",
            stagger: 0.1,
            yoyo: true,
            repeat: 1
        });
        
        konamiCode = [];
    }
});

// Console message for developers
console.log(`
🏟️ Athlon Sports - India Landing Page
⚡ Built with GSAP, ScrollTrigger, and lots of sports passion!
🏏 Developed for Mumbai's premier multi-sports complex
📧 Contact: info@athlonsports.in
`);

// Initialize Enhanced Sports Showcase
function initializeSportsShowcase() {
    const showcaseButtons = document.querySelectorAll('.showcase-btn');
    const showcasePanels = document.querySelectorAll('.showcase-panel');
    
    showcaseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const sportType = this.dataset.sport;
            
            // Remove active class from all buttons and panels
            showcaseButtons.forEach(b => b.classList.remove('active'));
            showcasePanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel with animation
            const targetPanel = document.getElementById(`${sportType}-panel`);
            if (targetPanel) {
                // Add slight delay for smooth transition
                setTimeout(() => {
                    targetPanel.classList.add('active');
                    
                    // Animate stats numbers
                    const statNumbers = targetPanel.querySelectorAll('.stat-number');
                    animateStatNumbers(statNumbers);
                }, 200);
            }
        });
    });
    
    // Initialize first panel
    const firstPanel = document.querySelector('.showcase-panel');
    if (firstPanel) {
        const statNumbers = firstPanel.querySelectorAll('.stat-number');
        setTimeout(() => animateStatNumbers(statNumbers), 1000);
    }
}

// Initialize Stat Counters
function initializeStatCounters() {
    const statElements = document.querySelectorAll('.stat-number[data-target]');
    
    statElements.forEach(stat => {
        ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            onEnter: () => {
                animateStatNumbers([stat]);
            }
        });
    });
}

// Animate Statistics Numbers
function animateStatNumbers(statElements) {
    statElements.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const current = parseInt(stat.textContent);
        
        if (current !== target) {
            gsap.fromTo(stat, 
                { textContent: 0 },
                {
                    textContent: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        stat.textContent = Math.floor(this.targets()[0].textContent);
                    }
                }
            );
        }
    });
}

// Enhanced Sports Card Interactions
function initializeAdvancedSportsEffects() {
    const sportCards3D = document.querySelectorAll('.sport-card-3d');
    
    sportCards3D.forEach(card => {
        const particles = card.querySelectorAll('.particle');
        
        card.addEventListener('mouseenter', function() {
            // Activate particles
            particles.forEach((particle, index) => {
                gsap.to(particle, {
                    opacity: 1,
                    scale: 1.5,
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "power2.out"
                });
            });
            
            // Add glow effect
            gsap.to(card, {
                boxShadow: "0 30px 80px rgba(74, 91, 245, 0.4)",
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Deactivate particles
            particles.forEach(particle => {
                gsap.to(particle, {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            // Remove glow effect
            gsap.to(card, {
                boxShadow: "0 20px 60px rgba(74, 91, 245, 0.15)",
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        // Click to flip
        card.addEventListener('click', function(e) {
            // Don't flip if clicking on buttons
            if (e.target.matches('button') || e.target.closest('button')) {
                return;
            }
            
            const inner = card.querySelector('.card-inner');
            const isFlipped = card.classList.contains('flipped');
            
            if (isFlipped) {
                card.classList.remove('flipped');
                inner.style.transform = 'rotateY(0deg)';
            } else {
                card.classList.add('flipped');
                inner.style.transform = 'rotateY(180deg)';
            }
        });
    });
}

// GSAP Smooth Poster Randomizer Effect
function initializeSmoothPosterRandomizer() {
    const posters = document.querySelectorAll('.sport-card-3d');
    
    function randomizePositions() {
        posters.forEach((poster, index) => {
            const randomX = (Math.random() - 0.5) * 15;
            const randomY = (Math.random() - 0.5) * 15;
            
            gsap.to(poster, {
                x: randomX,
                y: randomY,
                duration: 2,
                delay: index * 0.1,
                ease: "power2.inOut",
                yoyo: true,
                repeat: 1
            });
        });
    }
    
    // Disable auto randomization to keep cards stable
    // setInterval(randomizePositions, 10000);
    
    // Disable scroll trigger randomization
    // ScrollTrigger.create({
    //     trigger: '.sports-grid-premium',
    //     start: "top 70%",
    //     onEnter: randomizePositions
    // });
}

// Advanced Particle System
function createAdvancedParticleSystem() {
    const sportsSection = document.querySelector('.sports');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(45deg, var(--primary-blue), var(--light-blue));
            border-radius: 50%;
            pointer-events: none;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: 0;
            z-index: 1;
        `;
        
        sportsSection.appendChild(particle);
        
        gsap.fromTo(particle, 
            { 
                opacity: 0, 
                scale: 0,
                y: 50,
                rotation: 0
            },
            { 
                opacity: 0.6, 
                scale: 1,
                y: -100,
                rotation: 360,
                duration: 4 + Math.random() * 3,
                ease: "power2.out",
                onComplete: () => {
                    particle.remove();
                }
            }
        );
    }
    
    // Create particles every 2 seconds
    setInterval(createParticle, 2000);
}

// Initialize all advanced effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeAdvancedSportsEffects();
        initializeSmoothPosterRandomizer();
        createAdvancedParticleSystem();
    }, 1000);
});

// Mobile Features and Touch Support
function initializeMobileFeatures() {
    // Mobile menu functionality is handled in initializeNavigation()
    
    // Touch-friendly interactions for cards
    const cards = document.querySelectorAll('.sport-card-3d, .rate-card, .facility-item');
    cards.forEach(card => {
        let touchTimer = null;
        
        card.addEventListener('touchstart', function() {
            touchTimer = setTimeout(() => {
                card.classList.add('touch-active');
            }, 200);
        });
        
        card.addEventListener('touchend', function() {
            clearTimeout(touchTimer);
            setTimeout(() => {
                card.classList.remove('touch-active');
            }, 300);
        });
        
        card.addEventListener('touchcancel', function() {
            clearTimeout(touchTimer);
            card.classList.remove('touch-active');
        });
    });
    
    // Enhanced scroll behavior for mobile
    if (window.innerWidth <= 768) {
        // Reduce motion for better performance on mobile
        gsap.globalTimeline.timeScale(0.8);
        
        // Simplified animations for mobile
        const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
        if (mobileMediaQuery.matches) {
            // Disable complex animations on mobile for better performance
            gsap.set('.hero-particles, .sport-particles, .floating-equipment', {
                display: 'none'
            });
        }
    }
    
    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    // Touch swipe support for carousels
    const reviewTrack = document.querySelector('.review-track');
    if (reviewTrack) {
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        
        reviewTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        reviewTrack.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                e.preventDefault();
                const currentX = e.touches[0].clientX;
                const diffX = currentX - startX;
                currentTranslate = prevTranslate + diffX;
            }
        });
        
        reviewTrack.addEventListener('touchend', () => {
            const moved = currentTranslate - prevTranslate;
            
            if (moved < -50) {
                // Swipe left - next review
                document.querySelector('.next-btn')?.click();
            } else if (moved > 50) {
                // Swipe right - previous review
                document.querySelector('.prev-btn')?.click();
            }
            
            prevTranslate = currentTranslate;
        });
    }
}

// Initialize Enhanced Sports Animations
function initializeEnhancedSportsAnimations() {
    // Create dynamic sports ball interactions
    createDynamicSportsBalls();
    
    // Initialize celebration triggers
    initializeCelebrationTriggers();
    
    // Add interactive sports equipment
    addInteractiveSportsEquipment();
    
    // Create stadium atmosphere effects
    createStadiumAtmosphere();
}

// Create Dynamic Sports Balls
function createDynamicSportsBalls() {
    const sportsContainer = document.querySelector('.sports-balls');
    if (!sportsContainer) return;
    
    // Add mouse following effect for balls
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const heroRect = document.querySelector('.hero').getBoundingClientRect();
        mouseX = (e.clientX - heroRect.left) / heroRect.width;
        mouseY = (e.clientY - heroRect.top) / heroRect.height;
        
        // Subtle ball reactions to mouse movement
        const balls = document.querySelectorAll('.ball');
        balls.forEach((ball, index) => {
            const delay = index * 0.1;
            gsap.to(ball, {
                x: mouseX * 20 - 10,
                y: mouseY * 20 - 10,
                duration: 1 + delay,
                ease: "power2.out"
            });
        });
    });
    
    // Add ball collision effects
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => {
        ball.addEventListener('mouseenter', function() {
            // Create bounce effect
            gsap.to(ball, {
                scale: 1.3,
                rotation: 360,
                duration: 0.6,
                ease: "back.out(1.7)",
                onComplete: () => {
                    gsap.to(ball, {
                        scale: 1,
                        duration: 0.3
                    });
                }
            });
            
            // Create ripple effect
            createBallRipple(ball);
        });
    });
}

// Create Ball Ripple Effect
function createBallRipple(ball) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
    `;
    
    ball.appendChild(ripple);
    
    gsap.fromTo(ripple, 
        { scale: 0, opacity: 1 },
        {
            scale: 3,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => ripple.remove()
        }
    );
}

// Initialize Celebration Triggers
function initializeCelebrationTriggers() {
    const celebrations = document.querySelectorAll('.action-element');
    
    // Trigger celebrations based on scroll or interactions
    ScrollTrigger.create({
        trigger: '.hero',
        start: "top center",
        end: "bottom center",
        onUpdate: self => {
            const progress = self.progress;
            
            // Trigger different celebrations based on scroll progress
            if (progress > 0.3 && progress < 0.4) {
                triggerCelebration('goal-celebration');
            } else if (progress > 0.6 && progress < 0.7) {
                triggerCelebration('wicket-celebration');
            } else if (progress > 0.9) {
                triggerCelebration('ace-celebration');
            }
        }
    });
    
    // Random celebration triggers
    setInterval(() => {
        const randomCelebration = ['goal-celebration', 'wicket-celebration', 'ace-celebration'];
        const celebration = randomCelebration[Math.floor(Math.random() * randomCelebration.length)];
        triggerCelebration(celebration);
    }, 12000); // Every 12 seconds
}

// Trigger Celebration Function
function triggerCelebration(celebrationType) {
    const celebration = document.querySelector(`.${celebrationType}`);
    if (!celebration) return;
    
    // Show celebration with animation
    gsap.timeline()
        .set(celebration, { opacity: 1, scale: 0 })
        .to(celebration, {
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
        })
        .to(celebration.querySelector('.celebration-icon'), {
            rotation: 360,
            duration: 0.6,
            ease: "power2.inOut"
        }, 0.2)
        .to(celebration, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            delay: 1.5,
            ease: "power2.in"
        });
    
    // Create celebration particles
    createCelebrationParticles(celebration);
}

// Create Celebration Particles
function createCelebrationParticles(celebration) {
    const particleCount = 8;
    const celebrationRect = celebration.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${celebrationRect.left + celebrationRect.width / 2}px;
            top: ${celebrationRect.top + celebrationRect.height / 2}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        gsap.to(particle, {
            x: x,
            y: y,
            scale: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
}

// Add Interactive Sports Equipment
function addInteractiveSportsEquipment() {
    const equipmentItems = document.querySelectorAll('.equipment-item');
    
    equipmentItems.forEach((item, index) => {
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            gsap.to(item, {
                scale: 1.2,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Show trail effect
            const trail = item.querySelector('.equipment-trail');
            if (trail) {
                gsap.to(trail, {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(item, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Hide trail effect
            const trail = item.querySelector('.equipment-trail');
            if (trail) {
                gsap.to(trail, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        });
        
        // Add click effects
        item.addEventListener('click', function() {
            // Create equipment-specific animation
            if (item.classList.contains('cricket-bat')) {
                createCricketSwingEffect(item);
            } else if (item.classList.contains('football-boot')) {
                createFootballKickEffect(item);
            } else if (item.classList.contains('tennis-racket')) {
                createTennisServeEffect(item);
            } else if (item.classList.contains('archery-bow')) {
                createArcheryShootEffect(item);
            }
        });
    });
}

// Create Equipment-Specific Effects
function createCricketSwingEffect(item) {
    const icon = item.querySelector('.equipment-icon');
    gsap.timeline()
        .to(item, { rotation: -30, duration: 0.2 })
        .to(item, { rotation: 45, duration: 0.3, ease: "power2.out" })
        .to(item, { rotation: 0, duration: 0.2 });
    
    // Create ball trajectory
    createSportsTrajectory(item, '🏏');
}

function createFootballKickEffect(item) {
    gsap.timeline()
        .to(item, { y: -20, rotation: -15, duration: 0.2 })
        .to(item, { y: 10, rotation: 25, duration: 0.3 })
        .to(item, { y: 0, rotation: 0, duration: 0.2 });
    
    createSportsTrajectory(item, '⚽');
}

function createTennisServeEffect(item) {
    gsap.timeline()
        .to(item, { rotation: -45, y: -15, duration: 0.2 })
        .to(item, { rotation: 30, y: -5, duration: 0.3 })
        .to(item, { rotation: 0, y: 0, duration: 0.2 });
    
    createSportsTrajectory(item, '🎾');
}

function createArcheryShootEffect(item) {
    gsap.timeline()
        .to(item, { scale: 1.3, duration: 0.3 })
        .to(item, { scale: 1, duration: 0.2 })
        .set(item, { transformOrigin: "center center" });
    
    createSportsTrajectory(item, '🏹');
}

// Create Sports Trajectory Effect
function createSportsTrajectory(originElement, emoji) {
    const trajectory = document.createElement('div');
    trajectory.textContent = emoji;
    trajectory.style.cssText = `
        position: absolute;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 100;
    `;
    
    const rect = originElement.getBoundingClientRect();
    const heroRect = document.querySelector('.hero').getBoundingClientRect();
    
    trajectory.style.left = (rect.left - heroRect.left) + 'px';
    trajectory.style.top = (rect.top - heroRect.top) + 'px';
    
    document.querySelector('.hero').appendChild(trajectory);
    
    // Animate trajectory
    const endX = Math.random() * 200 + 100;
    const endY = -(Math.random() * 100 + 50);
    
    gsap.to(trajectory, {
        x: endX,
        y: endY,
        rotation: 360,
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => trajectory.remove()
    });
}

// Create Stadium Atmosphere
function createStadiumAtmosphere() {
    // Add crowd noise visualization
    const crowdCheer = document.querySelector('.crowd-cheer');
    if (crowdCheer) {
        setInterval(() => {
            gsap.to(crowdCheer, {
                scale: 1.5,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        }, 8000);
    }
    
    // Dynamic stadium lights
    const lightBeams = document.querySelectorAll('.light-beam');
    lightBeams.forEach((beam, index) => {
        setInterval(() => {
            gsap.to(beam, {
                opacity: Math.random() * 0.8 + 0.2,
                duration: 0.5,
                ease: "power2.inOut"
            });
        }, 2000 + (index * 500));
    });
    
    // Interactive scoreboard
    const scoreBoard = document.querySelector('.score-board');
    if (scoreBoard) {
        scoreBoard.addEventListener('mouseenter', function() {
            gsap.to(scoreBoard, {
                scale: 1.1,
                boxShadow: '0 0 30px rgba(74, 91, 245, 1)',
                duration: 0.3
            });
        });
        
        scoreBoard.addEventListener('mouseleave', function() {
            gsap.to(scoreBoard, {
                scale: 1,
                boxShadow: '0 0 10px rgba(74, 91, 245, 0.5)',
                duration: 0.3
            });
        });
    }
}

// Initialize Booking System
function initializeBookingSystem() {
    const bookingForm = document.querySelector('.booking-form');
    const sportSelect = document.getElementById('sport-select');
    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('time-slot');
    const durationSelect = document.getElementById('duration');
    
    if (!bookingForm) return;
    
    // Add event listeners for form updates
    [sportSelect, dateInput, timeSelect, durationSelect].forEach(element => {
        if (element) {
            element.addEventListener('change', updateBookingSummary);
        }
    });
    
    // Handle form submission
    bookingForm.addEventListener('submit', submitBookingForm);
    
    // Set today as minimum date
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('bookingModal');
            if (modal && modal.style.display === 'flex') {
                closeBookingModal();
            }
        }
    });
}

// Export functions for potential external use
window.AthlonSports = {
    nextSlide: () => document.querySelector('.next-btn')?.click(),
    prevSlide: () => document.querySelector('.prev-btn')?.click(),
    scrollToSection: (sectionId) => {
        const element = document.querySelector(sectionId);
        if (element) {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: element, offsetY: 80 },
                ease: "power2.inOut"
            });
        }
    },
    switchSport: (sportType) => {
        const btn = document.querySelector(`[data-sport="${sportType}"]`);
        if (btn) btn.click();
    },
    openBookingModal: openBookingModal,
    closeBookingModal: closeBookingModal,
    openWhatsApp: openWhatsApp
};
