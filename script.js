// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Consent Mode v2 defaults
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);} // define early
    window.gtag = gtag;
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Floating Telegram button
    const telegramBtn = document.getElementById('telegramFloatBtn');
    let isTelegramVisible = false;
    let lastScrollY = window.scrollY;

    function showTelegramButton() {
        if (!isTelegramVisible) {
            telegramBtn.classList.add('show');
            isTelegramVisible = true;
        }
    }

    function hideTelegramButton() {
        if (isTelegramVisible) {
            telegramBtn.classList.remove('show');
            isTelegramVisible = false;
        }
    }

    // Show button after scrolling down 300px
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 300) {
            showTelegramButton();
        } else {
            hideTelegramButton();
        }
        
        lastScrollY = currentScrollY;
    });

    // Show button after 3 seconds on page load
    setTimeout(() => {
        if (window.scrollY > 100) {
            showTelegramButton();
        }
    }, 3000);

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }

    // Initialize airplane animation
    initAirplaneAnimation();

    // Cookie banner inject
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-container">
        <div class="cookie-text">Мы используем файлы cookie. Подробнее в <a href="privacy.html" target="_blank">Политике конфиденциальности</a>.</div>
        <div class="cookie-actions">
          <button id="cookie-accept" class="btn btn-primary">Принять все</button>
          <button id="cookie-reject" class="btn btn-secondary">Только необходимые</button>
        </div>
      </div>`;
    document.body.appendChild(banner);

    const accept = document.getElementById('cookie-accept');
    const reject = document.getElementById('cookie-reject');

    const hideBanner = () => { banner.style.display = 'none'; };
    const saveConsent = (v) => { try { localStorage.setItem('cookie_consent_v2', v); } catch(e) {} };
    const existing = (() => { try { return localStorage.getItem('cookie_consent_v2'); } catch(e) { return null; }})();
    if (existing) { hideBanner(); }

    accept?.addEventListener('click', () => {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
      saveConsent('granted');
      hideBanner();
    });

    reject?.addEventListener('click', () => {
      gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
      saveConsent('denied');
      hideBanner();
    });
});

// Russian cities coordinates (better spaced)
const russianCities = [
    { name: "Москва", x: 0.65, y: 0.25 },
    { name: "Санкт-Петербург", x: 0.55, y: 0.15 },
    { name: "Екатеринбург", x: 0.78, y: 0.22 },
    { name: "Новосибирск", x: 0.88, y: 0.18 },
    { name: "Казань", x: 0.62, y: 0.32 },
    { name: "Нижний Новгород", x: 0.58, y: 0.28 },
    { name: "Самара", x: 0.72, y: 0.35 },
    { name: "Омск", x: 0.82, y: 0.28 },
    { name: "Ростов-на-Дону", x: 0.58, y: 0.45 },
    { name: "Уфа", x: 0.75, y: 0.38 }
];

// Spanish cities coordinates (geographically correct in bottom-left corner)
const spanishCities = [
    { name: "Мадрид", x: 0.20, y: 0.70 },
    { name: "Барселона", x: 0.30, y: 0.65 },
    { name: "Валенсия", x: 0.25, y: 0.75 },
    { name: "Севилья", x: 0.08, y: 0.80 },
    { name: "Бильбао", x: 0.15, y: 0.60 },
    { name: "Малага", x: 0.12, y: 0.85 },
    { name: "Сарагоса", x: 0.22, y: 0.68 },
    { name: "Мурсия", x: 0.30, y: 0.78 },
    { name: "Пальма", x: 0.35, y: 0.72 },
    { name: "Лас-Пальмас", x: 0.05, y: 0.90 }
];

// Airplane Animation
class Airplane {
    constructor(canvas, ctx, startCity, endCity, airplaneImage) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.startCity = startCity;
        this.endCity = endCity;
        this.airplaneImage = airplaneImage;
        this.x = startCity.x * canvas.width;
        this.y = startCity.y * canvas.height;
        this.targetX = endCity.x * canvas.width;
        this.targetY = endCity.y * canvas.height;
        this.size = 20; // Размер самолетика
        this.speed = 0.5;
        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        this.opacity = 0.8;
        this.isActive = true;
        this.progress = 0;
        this.flightTime = 0;
        this.maxFlightTime = 300; // 5 seconds at 60fps
    }

    update() {
        if (!this.isActive) return;

        this.flightTime++;
        this.progress = this.flightTime / this.maxFlightTime;

        // Update position along the path
        this.x = this.startCity.x * this.canvas.width + (this.targetX - this.startCity.x * this.canvas.width) * this.progress;
        this.y = this.startCity.y * this.canvas.height + (this.targetY - this.startCity.y * this.canvas.height) * this.progress;

        // Update angle to face direction of travel
        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);

        // Trail removed - no more growing stick

        // Check if flight is complete
        if (this.flightTime >= this.maxFlightTime) {
            this.isActive = false;
        }
    }

    draw() {
        if (!this.isActive) return;

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.globalAlpha = this.opacity;

        // Trail removed - no more "stick" growing behind airplane

        // Draw airplane image from SVG file
        if (this.airplaneImage) {
            const imageWidth = this.size * 2;
            const imageHeight = this.size * 1.2;
            this.ctx.drawImage(
                this.airplaneImage, 
                -imageWidth/2, 
                -imageHeight/2, 
                imageWidth, 
                imageHeight
            );
        }

        this.ctx.restore();
    }

}

function initAirplaneAnimation() {
    const canvas = document.getElementById('airplaneCanvas');
    const ctx = canvas.getContext('2d');
    
    let airplanes = [];
    let animationId;
    let lastFlightTime = 0;
    let airplaneImage = null;
    const flightInterval = 5000; // 5 seconds

    // Load airplane SVG
    function loadAirplaneImage() {
        const img = new Image();
        img.onload = function() {
            airplaneImage = img;
            console.log('Airplane SVG loaded successfully!');
        };
        img.onerror = function() {
            console.error('Failed to load airplane.svg');
        };
        img.src = 'airplane.svg';
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function drawMap() {
        // Draw world map background
        ctx.fillStyle = 'rgba(30, 50, 80, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw continents (simplified)
        ctx.fillStyle = 'rgba(50, 80, 50, 0.2)';
        
        // Europe
        ctx.beginPath();
        ctx.ellipse(canvas.width * 0.5, canvas.height * 0.4, canvas.width * 0.15, canvas.height * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Russia
        ctx.beginPath();
        ctx.ellipse(canvas.width * 0.7, canvas.height * 0.25, canvas.width * 0.2, canvas.height * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw city markers
        ctx.fillStyle = 'rgba(255, 100, 100, 0.9)';
        russianCities.forEach(city => {
            ctx.beginPath();
            ctx.arc(city.x * canvas.width, city.y * canvas.height, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // City name with background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(city.x * canvas.width + 6, city.y * canvas.height - 18, city.name.length * 7, 14);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.font = 'bold 10px Arial';
            ctx.fillText(city.name, city.x * canvas.width + 8, city.y * canvas.height - 6);
            ctx.fillStyle = 'rgba(255, 100, 100, 0.9)';
        });

        ctx.fillStyle = 'rgba(100, 255, 100, 0.9)';
        spanishCities.forEach(city => {
            ctx.beginPath();
            ctx.arc(city.x * canvas.width, city.y * canvas.height, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // City name with background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(city.x * canvas.width + 6, city.y * canvas.height - 18, city.name.length * 7, 14);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.font = 'bold 10px Arial';
            ctx.fillText(city.name, city.x * canvas.width + 8, city.y * canvas.height - 6);
            ctx.fillStyle = 'rgba(100, 255, 100, 0.9)';
        });
    }

    function createNewFlight() {
        const startCity = russianCities[Math.floor(Math.random() * russianCities.length)];
        const endCity = spanishCities[Math.floor(Math.random() * spanishCities.length)];
        const airplane = new Airplane(canvas, ctx, startCity, endCity, airplaneImage);
        airplanes.push(airplane);
    }

    function animate() {
        const currentTime = Date.now();
        
        // Create new flight every 5 seconds ONLY if airplane image is loaded
        if (currentTime - lastFlightTime > flightInterval && airplaneImage) {
            createNewFlight();
            lastFlightTime = currentTime;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw map
        drawMap();

        // Update and draw airplanes
        airplanes = airplanes.filter(airplane => {
            airplane.update();
            airplane.draw();
            return airplane.isActive;
        });

        animationId = requestAnimationFrame(animate);
    }

    function handleResize() {
        resizeCanvas();
    }

    // Initialize
    loadAirplaneImage();
    resizeCanvas();
    animate();

    // Handle resize
    window.addEventListener('resize', handleResize);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .spain-feature, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
