// main.js

import { initProductApp, showProducts, showUniqueProducts, showCategories } from './dataManagement.js';

window.addEventListener('DOMContentLoaded', () => {
  initProductApp();

  document.getElementById('btnListProducts').addEventListener('click', showProducts);
  document.getElementById('btnUniqueProducts').addEventListener('click', showUniqueProducts);
  document.getElementById('btnCategories').addEventListener('click', showCategories);
});


// Mailto handler for contact form
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const subject = encodeURIComponent('Contacto desde la web');
      const body = encodeURIComponent(
        `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
      );
      window.location.href = `mailto:sebastianlinero15@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});