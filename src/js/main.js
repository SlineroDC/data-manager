import { initProducts, getProducts, addProduct, editProduct, removeProduct } from './dataManagement.js';

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const menu = document.getElementById('menu');
  const menuBtn = document.getElementById('menuBtn');

  if (menu && menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) {
        menu.classList.remove('show');
      }
    });
  }

  // Initialize default products if none exist
  initProducts();

  // Elements for product listing and add/edit form
  const displayListProducts = document.getElementById('displayListProducts');
  const btnListProducts = document.getElementById('btnListProducts');
  const productForm = document.getElementById('productForm');
  const formMessage = document.getElementById('formMessage');

  // Remove form elements
  const removeForm = document.getElementById('removeForm');
  const removeIdInput = removeForm ? removeForm.querySelector('#removeProductId') : null;
  const removeMessage = removeForm ? document.getElementById('removeMessage') : null;

  // Function to display products list
  function refreshProductList() {
    if (!displayListProducts) return;

    const products = getProducts();
    displayListProducts.innerHTML = '';

    if (products.length === 0) {
      displayListProducts.textContent = 'No products to show.';
      return;
    }

    products.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('product'); // for consistent styling
      div.textContent = `ID: ${p.id} - Name: ${p.name} - Price: $${p.price.toFixed(2)}`;
      displayListProducts.appendChild(div);
    });
  }

  // Show list on page load or button click
  refreshProductList();

  if (btnListProducts) {
    btnListProducts.addEventListener('click', refreshProductList);
  }

  // Add/Edit product form logic
  if (productForm && formMessage) {
    const inputId = productForm.querySelector('#productId');
    const inputName = productForm.querySelector('#productName');
    const inputPrice = productForm.querySelector('#productPrice');

    // Autocomplete on product ID input change (for edit)
    if (inputId) {
      inputId.addEventListener('change', () => {
        const idVal = parseInt(inputId.value.trim());
        if (isNaN(idVal)) {
          formMessage.textContent = '';
          inputName.value = '';
          inputPrice.value = '';
          inputId.disabled = false;
          return;
        }

        const products = getProducts();
        const found = products.find(p => p.id === idVal);

        if (found) {
          inputName.value = found.name;
          inputPrice.value = found.price;
          inputId.disabled = true;
          formMessage.textContent = 'Edit name and price, then submit.';
          formMessage.style.color = 'blue';
        } else {
          inputName.value = '';
          inputPrice.value = '';
          inputId.disabled = false;
          formMessage.textContent = 'ID not found, new product will be added.';
          formMessage.style.color = 'green';
        }
      });
    }

    // Handle form submit for add or edit
    productForm.addEventListener('submit', e => {
      e.preventDefault();

      const id = parseInt(inputId.value.trim());
      const name = inputName.value.trim();
      const price = parseFloat(inputPrice.value.trim());

      if (!id || !name || isNaN(price) || price <= 0) {
        formMessage.textContent = 'Fill all fields correctly.';
        formMessage.style.color = 'red';
        return;
      }

      const products = getProducts();
      const existing = products.find(p => p.id === id);

      try {
        if (existing) {
          editProduct({ id, name, price });
          formMessage.textContent = `Product "${name}" updated successfully.`;
        } else {
          addProduct({ id, name, price });
          formMessage.textContent = `Product "${name}" added successfully.`;
        }
        formMessage.style.color = 'green';

        productForm.reset();
        inputId.disabled = false;
        refreshProductList();
      } catch (error) {
        formMessage.textContent = error.message;
        formMessage.style.color = 'red';
      }
    });
  }

  // Remove product form logic
  if (removeForm && removeIdInput && removeMessage) {
    removeForm.addEventListener('submit', e => {
      e.preventDefault();

      const idToRemove = Number(removeIdInput.value.trim());
      if (isNaN(idToRemove)) {
        removeMessage.textContent = 'Please enter a valid product ID.';
        removeMessage.style.color = 'red';
        return;
      }

      const products = getProducts();
      const found = products.find(p => p.id === idToRemove);

      if (!found) {
        removeMessage.textContent = `Product ID ${idToRemove} not found.`;
        removeMessage.style.color = 'red';
        return;
      }

      try {
        removeProduct(idToRemove); // remove product from storage
        removeMessage.textContent = `Product ID ${idToRemove} removed successfully.`;
        removeMessage.style.color = 'green';
        removeForm.reset();
        refreshProductList(); // update product list view
      } catch (error) {
        removeMessage.textContent = error.message;
        removeMessage.style.color = 'red';
      }
    });
  }
});
