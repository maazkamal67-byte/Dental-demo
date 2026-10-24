/**
 * Smile Haven Dental - Main Application Logic
 * Interactive features: Scroll progress, Navbar glass effect, Back-to-top,
 * Services filtering, Gallery lightbox, FAQ search, Contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS (Animate On Scroll) if available
  let aosLoaded = false;
  if (typeof AOS !== 'undefined') {
    try {
      AOS.init({
        once: true,
        duration: 750,
        easing: 'ease-out-cubic',
        offset: 50,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
      aosLoaded = true;
    } catch (err) {
      console.warn('AOS initialization note:', err);
    }
  }

  // Safety Fallback: Reveal every [data-aos] element after 1.5 seconds if AOS did not initialize
  setTimeout(() => {
    document.querySelectorAll('[data-aos]').forEach((el) => {
      if (!el.classList.contains('aos-animate')) {
        el.classList.add('aos-animate');
        el.classList.add('aos-fallback-visible');
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
      }
    });
  }, 1500);

  // 2. Scroll Progress & Navbar Transparency Transition
  const mainNavbar = document.getElementById('mainNavbar');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('btn-back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update scroll progress bar
    if (scrollProgressBar && docHeight > 0) {
      const progressPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    // Toggle frosted glass navbar
    if (mainNavbar) {
      if (scrollY > 30) {
        mainNavbar.classList.add('scrolled');
        mainNavbar.classList.remove('transparent');
      } else {
        mainNavbar.classList.remove('scrolled');
        mainNavbar.classList.add('transparent');
      }
    }

    // Toggle Back to Top button
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial state

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // 3. Services Filtering (services.html)
  const serviceFilterBtns = document.querySelectorAll('[data-service-filter]');
  const serviceCards = document.querySelectorAll('.service-item-wrapper');

  if (serviceFilterBtns.length > 0 && serviceCards.length > 0) {
    serviceFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetCategory = btn.getAttribute('data-service-filter');

        // Update active filter button
        serviceFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        serviceCards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');
          if (targetCategory === 'all' || cardCategory === targetCategory) {
            card.classList.remove('is-hidden');
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.classList.add('is-hidden');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
          }
        });

        // Refresh AOS positions
        if (typeof AOS !== 'undefined') {
          setTimeout(() => AOS.refresh(), 200);
        }
      });
    });
  }

  // 4. Contact Form: Service preselection via URL ?service=...
  const serviceSelect = document.getElementById('serviceSelect');
  if (serviceSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      // Find matching option
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (
          serviceSelect.options[i].text.toLowerCase().includes(serviceParam.toLowerCase()) ||
          serviceSelect.options[i].value.toLowerCase().includes(serviceParam.toLowerCase())
        ) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // 5. Contact Form: Date picker minimum date set to today
  const appointmentDateField = document.getElementById('appointmentDate');
  if (appointmentDateField) {
    const todayStr = new Date().toISOString().split('T')[0];
    appointmentDateField.setAttribute('min', todayStr);
  }

  // 6. Contact Form Validation & Submit (contact.html)
  const bookingForm = document.getElementById('bookingForm');
  const formSuccessCard = document.getElementById('formSuccessCard');
  const bookAnotherBtn = document.getElementById('bookAnotherBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');
      const service = document.getElementById('serviceSelect');
      const appointmentDate = document.getElementById('appointmentDate');
      const preferredTime = document.getElementById('preferredTime');

      let isFormValid = true;

      // Full Name
      if (!fullName.value.trim() || fullName.value.trim().length < 2) {
        fullName.classList.add('is-invalid');
        isFormValid = false;
      } else {
        fullName.classList.remove('is-invalid');
      }

      // Phone
      const phoneClean = phone.value.replace(/[\s\-\(\)\+]/g, '');
      if (!phoneClean || phoneClean.length < 7) {
        phone.classList.add('is-invalid');
        isFormValid = false;
      } else {
        phone.classList.remove('is-invalid');
      }

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.classList.add('is-invalid');
        isFormValid = false;
      } else {
        email.classList.remove('is-invalid');
      }

      // Service
      if (!service.value) {
        service.classList.add('is-invalid');
        isFormValid = false;
      } else {
        service.classList.remove('is-invalid');
      }

      // Date
      const todayStr = new Date().toISOString().split('T')[0];
      if (!appointmentDate.value || appointmentDate.value < todayStr) {
        appointmentDate.classList.add('is-invalid');
        isFormValid = false;
      } else {
        appointmentDate.classList.remove('is-invalid');
      }

      // Time
      if (!preferredTime.value) {
        preferredTime.classList.add('is-invalid');
        isFormValid = false;
      } else {
        preferredTime.classList.remove('is-invalid');
      }

      if (isFormValid) {
        // Display summary in success card
        const confirmName = document.getElementById('confirmName');
        const confirmService = document.getElementById('confirmService');
        const confirmDate = document.getElementById('confirmDate');
        const confirmTime = document.getElementById('confirmTime');

        if (confirmName) confirmName.textContent = fullName.value;
        if (confirmService) confirmService.textContent = service.options[service.selectedIndex].text;
        if (confirmDate) confirmDate.textContent = appointmentDate.value;
        if (confirmTime) confirmTime.textContent = preferredTime.value;

        bookingForm.style.display = 'none';
        if (formSuccessCard) {
          formSuccessCard.style.display = 'block';
          formSuccessCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });

    if (bookAnotherBtn && formSuccessCard) {
      bookAnotherBtn.addEventListener('click', () => {
        bookingForm.reset();
        document.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
        formSuccessCard.style.display = 'none';
        bookingForm.style.display = 'block';
      });
    }
  }

  // 7. FAQ Live Search (faq.html)
  const faqSearchInput = document.getElementById('faqSearchInput');
  const faqItems = document.querySelectorAll('.faq-item');
  const faqNoResults = document.getElementById('faqNoResults');

  if (faqSearchInput && faqItems.length > 0) {
    faqSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      faqItems.forEach((item) => {
        const questionText = item.querySelector('.accordion-button')?.textContent.toLowerCase() || '';
        const answerText = item.querySelector('.accordion-body')?.textContent.toLowerCase() || '';

        if (!query || questionText.includes(query) || answerText.includes(query)) {
          item.style.display = '';
          matchCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (faqNoResults) {
        faqNoResults.style.display = matchCount === 0 ? 'block' : 'none';
      }
    });
  }

  // 8. Gallery Category Filter & Lightbox (gallery.html)
  const galleryFilterBtns = document.querySelectorAll('[data-gallery-filter]');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  // Filter gallery cards
  if (galleryFilterBtns.length > 0 && galleryCards.length > 0) {
    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-gallery-filter');
        galleryFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        galleryCards.forEach((card) => {
          const cardCat = card.getAttribute('data-category');
          if (target === 'all' || cardCat === target) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox data collection and navigation
  let visibleCards = [];
  let currentLightboxIndex = 0;

  function updateVisibleGalleryCards() {
    visibleCards = Array.from(galleryCards).filter((card) => card.style.display !== 'none');
  }

  function openLightbox(index) {
    updateVisibleGalleryCards();
    if (visibleCards.length === 0) return;
    currentLightboxIndex = (index + visibleCards.length) % visibleCards.length;

    const targetCard = visibleCards[currentLightboxIndex];
    const imgEl = targetCard.querySelector('img');
    const titleEl = targetCard.querySelector('.gallery-overlay-title');
    const catEl = targetCard.querySelector('.gallery-overlay-cat');

    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'Clinic gallery image';
    }
    if (lightboxTitle) {
      lightboxTitle.textContent = `${titleEl ? titleEl.textContent : 'Clinic Image'} ${catEl ? '· ' + catEl.textContent : ''}`;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLightboxIndex + 1} of ${visibleCards.length}`;
    }

    if (lightboxModal) {
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (galleryCards.length > 0) {
    galleryCards.forEach((card) => {
      card.addEventListener('click', () => {
        updateVisibleGalleryCards();
        const cardIndex = visibleCards.indexOf(card);
        if (cardIndex !== -1) {
          openLightbox(cardIndex);
        }
      });
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentLightboxIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentLightboxIndex + 1);
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-container')) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(currentLightboxIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(currentLightboxIndex + 1);
    });
  }

  // 9. Graceful Image Error Fallback Handler
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', function () {
      this.classList.add('img-fallback');
      this.alt = 'Image representation';
    });
  });
});
