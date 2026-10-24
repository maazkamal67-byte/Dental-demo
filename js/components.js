/**
 * Smile Haven Dental - Reusable Components (Navbar & Footer)
 * Injects identical header and footer across all pages and highlights current page.
 */

(function () {
  function getCurrentPageKey() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('about.html')) return 'about';
    if (path.includes('services.html')) return 'services';
    if (path.includes('team.html')) return 'team';
    if (path.includes('gallery.html')) return 'gallery';
    if (path.includes('faq.html')) return 'faq';
    if (path.includes('contact.html')) return 'contact';
    return 'index';
  }

  function renderNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    const current = getCurrentPageKey();

    const navLinks = [
      { key: 'index', label: 'Home', href: 'index.html' },
      { key: 'about', label: 'About', href: 'about.html' },
      { key: 'services', label: 'Services', href: 'services.html' },
      { key: 'team', label: 'Team', href: 'team.html' },
      { key: 'gallery', label: 'Gallery', href: 'gallery.html' },
      { key: 'faq', label: 'FAQ', href: 'faq.html' },
      { key: 'contact', label: 'Contact', href: 'contact.html' },
    ];

    const desktopLinksHtml = navLinks
      .map(
        (link) => `
        <li class="nav-item">
          <a class="nav-link ${current === link.key ? 'active' : ''}" 
             ${current === link.key ? 'aria-current="page"' : ''} 
             href="${link.href}">
            ${link.label}
          </a>
        </li>`
      )
      .join('');

    const offcanvasLinksHtml = navLinks
      .map(
        (link) => `
        <li class="nav-item mb-2">
          <a class="offcanvas-nav-link ${current === link.key ? 'active' : ''}" 
             ${current === link.key ? 'aria-current="page"' : ''} 
             href="${link.href}">
            ${link.label}
          </a>
        </li>`
      )
      .join('');

    container.innerHTML = `
      <!-- Top Scroll Progress Indicator -->
      <div id="scroll-progress" aria-hidden="true"></div>

      <!-- Main Navigation -->
      <nav class="navbar navbar-expand-lg site-navbar transparent" id="mainNavbar">
        <div class="container">
          <!-- Brand Logo -->
          <a class="brand-mark" href="index.html" aria-label="Smile Haven Dental Home">
            <div class="brand-icon-wrapper" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2C8 2 6 5 6 9c0 4 1 7 2 11 1 3 3 2 4 0 1 2 3 3 4 0 1-4 2-7 2-11 0-4-2-7-6-7z"/>
                <path d="M9 10c1 0 2-1 3-1s2 1 3 1"/>
              </svg>
            </div>
            <span class="brand-text">Smile Haven Dental</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button class="navbar-toggler border-0 p-2 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNavOffcanvas" aria-controls="mobileNavOffcanvas" aria-label="Toggle navigation menu">
            <i class="bi bi-list fs-2"></i>
          </button>

          <!-- Desktop Center Navigation Links -->
          <div class="collapse navbar-collapse justify-content-center" id="desktopNav">
            <ul class="navbar-nav align-items-center gap-1">
              ${desktopLinksHtml}
            </ul>
          </div>

          <!-- Desktop Right: Phone & Book CTA -->
          <div class="d-none d-lg-flex align-items-center gap-3">
            <a href="tel:0000000000" class="nav-phone-link" aria-label="Call clinic at 0000 000 0000">
              <i class="bi bi-telephone text-teal"></i>
              <span>0000 000 0000</span>
            </a>
            <a href="contact.html" class="btn-primary-teal btn-pulse btn-shine">
              <span>Book Appointment</span>
              <i class="bi bi-arrow-right-short fs-5"></i>
            </a>
          </div>
        </div>
      </nav>

      <!-- Offcanvas Mobile Navigation Menu -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="mobileNavOffcanvas" aria-labelledby="mobileNavLabel">
        <div class="offcanvas-header border-bottom py-3">
          <div class="d-flex align-items-center gap-2" id="mobileNavLabel">
            <div class="brand-icon-wrapper" style="width: 36px; height: 36px; font-size: 1rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2C8 2 6 5 6 9c0 4 1 7 2 11 1 3 3 2 4 0 1 2 3 3 4 0 1-4 2-7 2-11 0-4-2-7-6-7z"/>
              </svg>
            </div>
            <span class="fw-bold text-navy" style="font-family: var(--font-serif); font-size: 1.2rem;">Smile Haven</span>
          </div>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close menu"></button>
        </div>
        <div class="offcanvas-body d-flex flex-direction-column justify-content-between p-4">
          <ul class="navbar-nav">
            ${offcanvasLinksHtml}
          </ul>
          <div class="pt-4 border-top mt-auto">
            <div class="mb-3">
              <a href="tel:0000000000" class="d-flex align-items-center gap-2 text-dark text-decoration-none fw-semibold">
                <i class="bi bi-telephone-fill text-teal"></i>
                <span>0000 000 0000</span>
              </a>
              <small class="text-muted d-block mt-1">Sample booking helpline</small>
            </div>
            <a href="contact.html" class="btn-primary-teal w-100 justify-content-center text-center">
              <span>Book Appointment</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    const container = document.getElementById('footer-container');
    if (!container) return;

    container.innerHTML = `
      <!-- Wave Divider above footer -->
      <div class="wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,20 1200,50 L1200,120 L0,120 Z" fill="#0B2545"></path>
        </svg>
      </div>

      <!-- Footer Content -->
      <footer class="site-footer">
        <div class="container footer-top">
          <div class="row g-4 g-lg-5">
            <!-- Col 1: Brand Info -->
            <div class="col-lg-4 col-md-6">
              <div class="d-flex align-items-center gap-2 mb-3">
                <div class="brand-icon-wrapper" style="width: 36px; height: 36px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2C8 2 6 5 6 9c0 4 1 7 2 11 1 3 3 2 4 0 1 2 3 3 4 0 1-4 2-7 2-11 0-4-2-7-6-7z"/>
                  </svg>
                </div>
                <h3 class="footer-brand-title mb-0">Smile Haven Dental</h3>
              </div>
              <p class="footer-blurb">
                Providing calm, gentle dental care in a welcoming, unhurried atmosphere. Dedicated to long-term oral health and patient comfort.
              </p>
              <div class="footer-social-links" aria-label="Social media placeholders">
                <a href="#facebook" class="social-btn" aria-label="Facebook (Placeholder)"><i class="bi bi-facebook"></i></a>
                <a href="#instagram" class="social-btn" aria-label="Instagram (Placeholder)"><i class="bi bi-instagram"></i></a>
                <a href="#linkedin" class="social-btn" aria-label="LinkedIn (Placeholder)"><i class="bi bi-linkedin"></i></a>
                <a href="#youtube" class="social-btn" aria-label="YouTube (Placeholder)"><i class="bi bi-youtube"></i></a>
              </div>
            </div>

            <!-- Col 2: Quick Links -->
            <div class="col-lg-2 col-md-6 col-6">
              <h4 class="footer-heading">Quick Links</h4>
              <ul class="footer-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="team.html">Our Team</a></li>
                <li><a href="gallery.html">Clinic Gallery</a></li>
                <li><a href="faq.html">Common Questions</a></li>
                <li><a href="contact.html">Contact & Booking</a></li>
              </ul>
            </div>

            <!-- Col 3: Services -->
            <div class="col-lg-3 col-md-6 col-6">
              <h4 class="footer-heading">Services</h4>
              <ul class="footer-links">
                <li><a href="services.html">Check-ups & Cleaning</a></li>
                <li><a href="services.html">Restorative Fillings</a></li>
                <li><a href="services.html">Teeth Whitening</a></li>
                <li><a href="services.html">Dental Implants</a></li>
                <li><a href="services.html">Clear Aligners</a></li>
                <li><a href="services.html">Children's Dentistry</a></li>
                <li><a href="services.html">Emergency Dental Care</a></li>
              </ul>
            </div>

            <!-- Col 4: Contact & Sample Hours -->
            <div class="col-lg-3 col-md-6">
              <h4 class="footer-heading">Sample Clinic Info</h4>
              <div class="footer-contact-item">
                <i class="bi bi-geo-alt"></i>
                <span>123 Sample Street, Your City</span>
              </div>
              <div class="footer-contact-item">
                <i class="bi bi-telephone"></i>
                <a href="tel:0000000000" class="text-white text-decoration-none">0000 000 0000</a>
              </div>
              <div class="footer-contact-item">
                <i class="bi bi-envelope"></i>
                <a href="mailto:hello@example.com" class="text-white text-decoration-none">hello@example.com</a>
              </div>
              <div class="mt-3 pt-3 border-top border-secondary border-opacity-25">
                <small class="text-teal d-block fw-semibold mb-1">Opening Hours (Sample):</small>
                <small class="d-block text-white-50">Mon – Fri: 8:30 AM – 5:30 PM</small>
                <small class="d-block text-white-50">Sat: 9:00 AM – 1:00 PM</small>
                <small class="d-block text-white-50">Sun & Public Holidays: Closed</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
          <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-center text-md-start">
            <div>
              &copy; 2026 Smile Haven Dental. Sample website, concept demo.
            </div>
            <div class="footer-disclaimer">
              Content on this site is placeholder text for demonstration purposes only.
            </div>
          </div>
        </div>
      </footer>

      <!-- Back to Top Button -->
      <button id="btn-back-to-top" type="button" aria-label="Scroll back to top">
        <i class="bi bi-arrow-up"></i>
      </button>
    `;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderNavbar();
      renderFooter();
    });
  } else {
    renderNavbar();
    renderFooter();
  }
})();
