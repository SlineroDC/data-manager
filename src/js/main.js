// main.js

import { initProductApp, showProducts, showUniqueProducts, showCategories } from './dataManagement.js';

window.addEventListener('DOMContentLoaded', () => {
  initProductApp();

  document.getElementById('btnListProducts').addEventListener('click', showProducts);
  document.getElementById('btnUniqueProducts').addEventListener('click', showUniqueProducts);
  document.getElementById('btnCategories').addEventListener('click', showCategories);
});
