// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing animation for hero subtitle
const typingText = document.querySelector('.typing-text');
const text = 'Full Stack Developer';
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    } else {
        setTimeout(() => {
            index = 0;
            typingText.textContent = '';
            typeWriter();
        }, 3000);
    }
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 3000);
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in-on-scroll class to elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.about-content',
        '.project-card',
        '.blog-card',
        '.contact-content',
        '.tech-item'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in-on-scroll');
            observer.observe(el);
        });
    });
});

// Particle animation enhancement
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = Math.random() > 0.5 ? '#00d4ff' : '#7c3aed';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const animationDuration = Math.random() * 3000 + 2000;
    const drift = (Math.random() - 0.5) * 100;
    
    particle.animate([
        {
            transform: `translateY(0px) translateX(0px)`,
            opacity: particle.style.opacity
        },
        {
            transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px)`,
            opacity: 0
        }
    ], {
        duration: animationDuration,
        easing: 'linear'
    }).addEventListener('finish', () => {
        particle.remove();
    });
}

// Create particles periodically
setInterval(createParticle, 300);

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Resume download functionality
document.querySelectorAll('a[href="#"], .resume-btn').forEach(btn => {
    if (btn.textContent.includes('Resume') || btn.textContent.includes('Download')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a simple PDF-like content (in a real scenario, you'd link to an actual PDF)
            const resumeContent = `
                NANDA SAI SARATH
                Full Stack Developer
                
                Email: nanda.sarath@example.com
                Phone: +1 (555) 123-4567
                Location: Your City, Country
                
                SUMMARY
                Passionate Full Stack Developer with expertise in Java development and modern web technologies.
                
                TECHNICAL SKILLS
                • Languages: Java, JavaScript, Python
                • Frameworks: Spring Boot, React, Node.js
                • Databases: MySQL, PostgreSQL, MongoDB
                • Tools: Git, Docker, AWS
                
                EXPERIENCE
                Full Stack Developer | Company Name | 2022 - Present
                • Developed and maintained web applications using Java Spring Boot
                • Built responsive frontend interfaces with React
                • Implemented RESTful APIs and microservices architecture
                
                EDUCATION
                Bachelor of Computer Science | University Name | 2018 - 2022
                
                PROJECTS
                • E-Commerce Platform: Full-featured online store with payment integration
                • Task Management System: Collaborative project management tool
                • API Gateway Service: Microservices routing and authentication
            `;
            
            // Create and download a text file (simulate PDF download)
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Nanda_Sai_Sarath_Resume.txt';
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
            
            // Show success message
            alert('Resume downloaded successfully!');
        });
    }
});

// Add hover effects to cards
document.querySelectorAll('.project-card, .blog-card, .tech-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add glitch effect to name on hover
const nameElement = document.querySelector('.name');
if (nameElement) {
    nameElement.addEventListener('mouseenter', () => {
        nameElement.style.animation = 'glitch 0.3s ease-in-out';
    });
    
    nameElement.addEventListener('animationend', () => {
        nameElement.style.animation = '';
    });
}

// Add CSS for glitch effect
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0f;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loadingText = document.createElement('div');
    loadingText.textContent = 'Loading...';
    loadingText.style.cssText = `
        color: #00d4ff;
        font-size: 2rem;
        font-weight: 600;
        animation: pulse 1s infinite;
    `;
    
    loader.appendChild(loadingText);
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});