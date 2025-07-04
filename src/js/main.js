
// Hamburger menu logic (must be here to work on every page)
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  const btn = document.getElementById('menuBtn');
  if (menu && btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('show');
    });
    // Use document, not window, for click event
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) {
        menu.classList.remove('show');
      }
    });
  } else {
    // Debug: log if elements are missing
    if (!menu) console.warn('Hamburger menu: #menu not found');
    if (!btn) console.warn('Hamburger menu: #menuBtn not found');
  }
});

//import funtions from dataMagnament









// Mailto handler for contact form
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const subject = encodeURIComponent('Contact from the Web');
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMenssage: ${message}`
      );
      window.location.href = `mailto:sebastianlinero15@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});