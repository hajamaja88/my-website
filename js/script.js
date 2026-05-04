document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });
  }

  const bookingForm = document.querySelector('#booking-form');
  if (bookingForm) {
    const status = document.querySelector('#booking-status');
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const dateInput = bookingForm.querySelector('#date');
      const timeInput = bookingForm.querySelector('#time');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(dateInput.value);

      if (selectedDate < today) {
        status.textContent = 'Please choose today or a future date for your booking.';
        status.style.color = '#b24038';
        dateInput.focus();
        return;
      }

      if (timeInput.value < '08:00' || timeInput.value > '18:00') {
        status.textContent = 'Please choose a time between 08:00 and 18:00.';
        status.style.color = '#b24038';
        timeInput.focus();
        return;
      }

      status.textContent = 'Thank you. Your table request has been submitted successfully.';
      status.style.color = '#2e6b2e';
      bookingForm.reset();
    });
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const contactStatus = document.querySelector('#contact-status');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      contactStatus.textContent = 'Thanks for your message. We will get back to you soon.';
      contactStatus.style.color = '#2e6b2e';
      contactForm.reset();
    });
  }

  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    const newsletterStatus = document.querySelector('#newsletter-status');
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      newsletterStatus.textContent = 'You have been subscribed to our café updates.';
      newsletterStatus.style.color = '#2e6b2e';
      newsletterForm.reset();
    });
  }

  const galleryButtons = document.querySelectorAll('[data-gallery-index]');
  const lightbox = document.querySelector('#lightbox');

  if (galleryButtons.length && lightbox) {
    const images = Array.from(galleryButtons).map((button) => ({
      src: button.dataset.large,
      alt: button.dataset.alt,
      caption: button.dataset.caption
    }));

    const lightboxImage = lightbox.querySelector('#lightbox-image');
    const lightboxCaption = lightbox.querySelector('#lightbox-caption');
    const closeBtn = lightbox.querySelector('#lightbox-close');
    const prevBtn = lightbox.querySelector('#lightbox-prev');
    const nextBtn = lightbox.querySelector('#lightbox-next');
    let currentIndex = 0;

    const renderImage = (index) => {
      currentIndex = (index + images.length) % images.length;
      lightboxImage.src = images[currentIndex].src;
      lightboxImage.alt = images[currentIndex].alt;
      lightboxCaption.textContent = images[currentIndex].caption;
    };

    galleryButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        renderImage(index);
        lightbox.classList.add('open');
        closeBtn.focus();
      });
    });

    closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
    prevBtn.addEventListener('click', () => renderImage(currentIndex - 1));
    nextBtn.addEventListener('click', () => renderImage(currentIndex + 1));

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('open')) return;
      if (event.key === 'Escape') lightbox.classList.remove('open');
      if (event.key === 'ArrowLeft') renderImage(currentIndex - 1);
      if (event.key === 'ArrowRight') renderImage(currentIndex + 1);
    });
  }
});
