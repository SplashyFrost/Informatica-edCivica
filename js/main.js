/* ============================================
   CYBERBULLISMO - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR SCROLL EFFECT ===
  const navbar = document.querySelector('.navbar');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // === MOBILE NAV TOGGLE ===
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = navToggle.querySelector('span');
      if (navLinks.classList.contains('open')) {
        icon.textContent = '✕';
      } else {
        icon.textContent = '☰';
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelector('span').textContent = '☰';
      });
    });
  }

  // === SCROLL REVEAL ANIMATIONS ===
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // === STAGGERED REVEAL FOR CARD GROUPS ===
  const staggerGroups = document.querySelectorAll('[data-stagger]');

  staggerGroups.forEach(group => {
    const children = group.children;
    const delay = parseInt(group.dataset.stagger) || 100;

    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Array.from(children).forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, i * delay);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    staggerObserver.observe(group);
  });

  // === HERO PARTICLES ===
  const particlesContainer = document.querySelector('.particles');

  if (particlesContainer) {
    const colors = [
      'rgba(168, 85, 247, 0.4)',
      'rgba(58, 143, 212, 0.3)',
      'rgba(230, 57, 70, 0.2)',
      'rgba(34, 211, 238, 0.3)'
    ];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (8 + Math.random() * 12) + 's';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.width = (2 + Math.random() * 4) + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particlesContainer.appendChild(particle);
    }
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // === ACTIVE NAV LINK HIGHLIGHT ===
  const sections = document.querySelectorAll('.section[id]');
  const navLinksList = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksList.forEach(link => {
          link.style.color = '';
          link.style.background = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#a855f7';
            link.style.background = 'rgba(168, 85, 247, 0.08)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // === TYPING GLITCH EFFECT ON HERO SUBTITLE ===
  const glitchLine = document.querySelector('.hero-title .line-accent');
  if (glitchLine) {
    setInterval(() => {
      glitchLine.style.textShadow = `
        ${-2 + Math.random() * 4}px 0 rgba(230, 57, 70, 0.5),
        ${-2 + Math.random() * 4}px 0 rgba(58, 143, 212, 0.5)
      `;
      setTimeout(() => {
        glitchLine.style.textShadow = 'none';
      }, 100);
    }, 4000);
  }

  // === COUNTER ANIMATION FOR STATS (if present) ===
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count);
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              entry.target.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              entry.target.textContent = Math.floor(current).toLocaleString();
            }
          }, 16);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => countObserver.observe(c));
  }

  // === HERO MOUSE PARALLAX ===
  const heroSection = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroSection && heroImage) {
    heroSection.addEventListener('mousemove', (e) => {
      // Calculate mouse position relative to the center of the screen
      const x = (window.innerWidth / 2 - e.pageX) / 40;
      const y = (window.innerHeight / 2 - e.pageY) / 40;
      
      // We apply it without disrupting the CSS levitate animation
      heroImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
    
    heroSection.addEventListener('mouseleave', () => {
      heroImage.style.transform = `translateX(0px) translateY(0px)`;
      heroImage.style.transition = 'transform 0.5s ease-out';
    });
    
    heroSection.addEventListener('mouseenter', () => {
      heroImage.style.transition = 'none';
    });
  }

  // === 3D TILT EFFECT FOR CARDS (Interactive Animation) ===
  const tiltCards = document.querySelectorAll('.feature-card, .form-card, .action-box, .stat-card, .team-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      // Get dimensions and position of the card
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      // Calculate center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Rotation intensity (max 10 degrees)
      const rotateX = ((y - centerY) / centerY) * -10; 
      const rotateY = ((x - centerX) / centerX) * 10;
      
      // Apply 3D transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      // Reset back to normal on leave
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    card.addEventListener('mouseenter', () => {
      // Remove transition for instant following
      card.style.transition = 'none';
    });
  });

  // === CUSTOM CURSOR GLOW EFFECT ===
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow) {
    // Aggiorna posizione del bagliore seguendo il mouse in modo liscio
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });

    // Effetto "active" se passi sopra link o card
    const interactables = document.querySelectorAll('a, button, .feature-card, .form-card, .action-box, .stat-card, .team-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
    });
  }

  // === SCROLL TO TOP BUTTON ===
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    // Mostra/nascondi il bottone
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    // Torna su animato
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // === CHART.JS CONFIGURATION ===
  const ctx = document.getElementById('cyberChart');
  
  if (ctx) {
    // Definiamo il tema globale (testi chiari)
    Chart.defaults.color = '#9898b0';
    Chart.defaults.font.family = "'Inter', sans-serif";

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Vessazioni Gen. (11-19)', 'Attacchi Maschi', 'Attacchi Femmine', 'Preadolescenti (11-13)'],
        datasets: [{
          label: 'Percentuale (%)',
          data: [34, 8.9, 6.6, 12.5], // Dati Istat 2025/2023
          backgroundColor: [
            'rgba(168, 85, 247, 0.8)', // Violet
            'rgba(230, 57, 70, 0.8)',  // Red
            'rgba(58, 143, 212, 0.8)', // Cyan
            'rgba(245, 158, 11, 0.8)'  // Gold
          ],
          borderColor: [
            'rgba(168, 85, 247, 1)',
            'rgba(230, 57, 70, 1)',
            'rgba(58, 143, 212, 1)',
            'rgba(245, 158, 11, 1)'
          ],
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: [
            'rgba(168, 85, 247, 1)',
            'rgba(230, 57, 70, 1)',
            'rgba(58, 143, 212, 1)',
            'rgba(245, 158, 11, 1)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Nascondo la legenda perché i colori sono custom
          },
          tooltip: {
            backgroundColor: 'rgba(20, 20, 31, 0.95)',
            titleColor: '#e8e8f0',
            bodyColor: '#e8e8f0',
            borderColor: 'rgba(168, 85, 247, 0.5)',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return context.parsed.y + ' % (Dati Istat 2025)';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 40,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawBorder: false
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          x: {
            grid: {
              display: false,
              drawBorder: false
            }
          }
        },
        animation: {
          duration: 2500,
          easing: 'easeOutQuart'
        }
      }
    });
  } // Chiusura blocco if (ctx) mancante
  
  // === PREVENT COPY, SELECT AND RIGHT-CLICK ===
  // Disabilita Menu a tendina del Tasto Destro (Context Menu)
  document.addEventListener('contextmenu', event => event.preventDefault()); 

  // Inibisce comandi da tastiera come Ctrl+C (Copia), Ctrl+A (Seleziona tutto)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'a' || e.key === 'x' || e.key === 'u' || e.key === 's')) {
      e.preventDefault();
    }
  });

  // Blocca l'evento nativo di copia nel browser (in caso l'utente cerchi vie alternative)
  document.addEventListener('copy', (e) => {
    e.preventDefault();
  });

});
