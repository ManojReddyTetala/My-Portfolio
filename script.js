// --- Improved & Optimized Javascript ---

document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links li a');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const cursorGlow = document.getElementById('cursor-glow');

  // 1. Custom Cursor Glow (Mouse Tracking with Animation)
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      // Using animate for a smooth trailing/lag effect which feels premium
      cursorGlow.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 800, fill: "forwards" });
    }, { passive: true });
  }

  // 2. Optimized Scroll Observer (RAF/Throttling Pattern)
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  function handleScroll() {
    // Navbar solid background
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll Progress Bar calculation with robust math
    if (scrollProgressBar) {
      const scrollTotal = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrollPosition = (scrollTotal / height) * 100;
        scrollProgressBar.style.width = scrollPosition + '%';
      }
    }
  }

  // 3. Mobile Navbar Toggle (Robust event listeners)
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      hamburger.innerHTML = navLinks.classList.contains('nav-active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // 4. Premium Smooth Scrolling for Anchor Links (Adds Navbar Offset)
  // Fixes the issue where clicking an anchor scrolls elements behind the navbar.
  navItems.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#') && targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement && navbar) {
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 5. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" // Triggers slightly before element comes fully into view
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Important: Unobserve target after animation to save processing power!
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));
  }

  // 6. Typewriter Effect (with robust null checks and animation classes)
  const typewriterElement = document.getElementById("typewriter");
  const cursorElement = document.querySelector(".cursor");

  if (typewriterElement) {
    const textToType = "Building intelligent solutions with code and creativity";
    let charIndex = 0;

    function type() {
      if (charIndex < textToType.length) {
        if (cursorElement && !cursorElement.classList.contains("typing")) {
          cursorElement.classList.add("typing");
        }
        typewriterElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, 80); // Speed tweaked for better pacing
      } else {
        if (cursorElement) {
          cursorElement.classList.remove("typing");
        }
        // Add a premium gradient to the text once typing concludes
        typewriterElement.classList.add("typed-done");
      }
    }

    // Start typing after initial fade-in load animation (1.2s delay)
    setTimeout(type, 1200);
  }

  // 7. Ripple Effect for Buttons (Optimized DOM reflow handling)
  const buttons = document.querySelectorAll('.ripple');
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = 'ripple-span';

      this.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });
  });

  // 8. Floating Chat Widget Toggle
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatPopup = document.getElementById('chat-popup');
  const closeChatBtn = document.getElementById('close-chat');

  if (chatToggleBtn && chatPopup) {
    chatToggleBtn.addEventListener('click', () => {
      chatPopup.classList.toggle('show');
    });

    if (closeChatBtn) {
      closeChatBtn.addEventListener('click', () => {
        chatPopup.classList.remove('show');
      });
    }

    // Close on click outside the widget
    document.addEventListener('click', (e) => {
      if (!chatPopup.contains(e.target) && !chatToggleBtn.contains(e.target)) {
        chatPopup.classList.remove('show');
      }
    });
  }

});
