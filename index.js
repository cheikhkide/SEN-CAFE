   // Loading screen
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
      }, 1500);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll animations
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

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    // Toggle mobile menu (only if elements exist)
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('menu-mobile');
    const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
      });

      // Close menu when clicking on a link
      if (mobileMenuLinks.length) {
        mobileMenuLinks.forEach(link => {
          link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
          });
        });
      }

      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
        }
      });
    }


    // Service details modal
    function showDetails(type) {
      const details = {
        noir: 'Le café noir est préparé avec des grains 100% arabica torréfiés artisanalement.',
        lait: 'Notre café au lait combine espresso italien et lait velouté.',
        cappuccino: 'Cappuccino traditionnel avec une mousse de lait onctueuse.',
        nescafe: 'Nescafé premium pour une préparation rapide sans compromis.',
        grain: 'Grains fraîchement torréfiés disponibles en plusieurs origines.',
        machine: 'Machines professionnelles pour un café parfait à la maison.'
      };
      
      alert(details[type] || 'Information non disponible');
    }

    // Form submission with animation
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi...';
      
      setTimeout(() => {
        btn.innerHTML = 'Message envoyé! <i class="bx bx-check-circle"></i>';
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-success');
        
        setTimeout(() => {
          e.target.reset();
          btn.innerHTML = 'Envoyer <i class="bx bx-send"></i>';
          btn.classList.remove('btn-success');
          btn.classList.add('btn-warning');
        }, 2000);
      }, 1500);
    });

    // Add hover effect to cards
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
      });
    });

    // Mobile menu: close collapse when a link is clicked and animate overlay
    (function setupMobileMenu() {
      const navbarCollapse = document.getElementById('navbarNav');
      if (!navbarCollapse) return;

      // Add classes on show/hide for CSS animation
      navbarCollapse.addEventListener('show.bs.collapse', () => {
        navbarCollapse.classList.add('mobile-open');
      });

      navbarCollapse.addEventListener('hidden.bs.collapse', () => {
        navbarCollapse.classList.remove('mobile-open');
      });

      // Close collapse when any nav link or dropdown item is clicked (mobile)
      // Exclude dropdown toggles themselves so opening a dropdown doesn't immediately close the collapse
      const links = navbarCollapse.querySelectorAll('.nav-link:not([data-bs-toggle="dropdown"]), .dropdown-item');
      links.forEach(link => {
        link.addEventListener('click', () => {
          // Only auto-close on small screens where the toggler is visible
          const toggler = document.querySelector('.navbar-toggler');
          if (!toggler) return;
          const style = window.getComputedStyle(toggler);
          if (style.display === 'none') return;

          // Use Bootstrap Collapse API to hide
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        });
      });
    })();

    // Form submission to Google Apps Script Web App ou google sheets

    const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbweFTzF4bfYllcuM2kpMRU1F2kzzulRje-mNW-Pc67n54PNO8yDIQRNrPhqVV-7lqo/exec"; // remplace par ton URL Web App /exec

document.getElementById("envoyerBtn").addEventListener("click", function() {
  const data = {
    prenom: document.getElementById("prenom").value,
    nom: document.getElementById("nom").value,
    adresse: document.getElementById("adresse").value,
    telephone: document.getElementById("telephone").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  fetch(WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "no-cors" // empêche les erreurs CORS côté navigateur
  })
  .then(() => {
    alert("Commande envoyée avec succès !");
    document.getElementById("commandeForm").reset();
  })
  .catch(err => {
    alert("Erreur lors de l'envoi : " + err);
  });
});

// chekh


