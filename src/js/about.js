document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Animate stats numbers
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // Adjust speed of counting
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };
        updateCount();
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.about-hero');
        const heroContent = document.querySelector('.hero-title');
        
        if (heroSection && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // Smooth scroll for navigation links
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

    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add hover effect to team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        const socialLinks = card.querySelector('.social-links');
        
        card.addEventListener('mouseenter', () => {
            socialLinks.style.transform = 'translateY(0)';
            socialLinks.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            socialLinks.style.transform = 'translateY(10px)';
            socialLinks.style.opacity = '0';
        });
    });

    // Intersection Observer for revealing elements
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.mission-points .point').forEach(point => {
        revealOnScroll.observe(point);
        point.style.opacity = '0';
        point.style.transform = 'translateX(-20px)';
        point.style.transition = 'all 0.5s ease';
    });

    // Add loading animation to images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // Add dynamic background effect
    const heroSection = document.querySelector('.about-hero');
    if (heroSection) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;
            
            heroSection.style.backgroundPosition = `${xPos}px ${yPos}px`;
        });
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
});

// Add CSS for scroll progress bar
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #FA6F71, #FA6F71);
        z-index: 9999;
        transition: width 0.2s ease;
    }

    .revealed {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }

    img {
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    img.loaded {
        opacity: 1;
    }

    .social-links {
        transform: translateY(10px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .feature-icon i {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style); 