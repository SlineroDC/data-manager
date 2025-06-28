// // ======= Data Initialization =======
// let products = JSON.parse(localStorage.getItem('products')) || {
//   1: { id: 1, name: "Mouse", price: 30000 },
//   2: { id: 2, name: "Keyboard", price: 60000 },
//   3: { id: 3, name: "Monitor", price: 200000 }
// };

// // DOM Elements
// const displayList = document.getElementById('displayListProducts');
// const productForm = document.getElementById('productForm');
// const productIdInput = document.getElementById('productId');
// const productNameInput = document.getElementById('productName');
// const productPriceInput = document.getElementById('productPrice');
// const formMessage = document.getElementById('formMessage');

// // Render Functions 

// export function initProductApp() {
//   // Save initial products to localStorage if not there yet
//   if (!localStorage.getItem('products')) {
//     localStorage.setItem('products', JSON.stringify(products));
//   }
// }

// // Display all products
// export function showProducts() {
//   let output = '';
//   for (let key in products) {
//     const p = products[key];
//     output += `ID: ${p.id}, ${p.name}, $${p.price}\n`;
//   }
//   if (displayList) {
//     displayList.textContent = output || 'No products available.';
//   }
// }

// // Validar producto nuevo por ID y nombre
// function validateProduct(newProduct) {
//   if (!newProduct.id || !newProduct.name || !newProduct.price /*|| !newProduct.category*/) {
//     return { valid: false, message: 'All fields are required.' };
//   }
//   for (let key in products) {
//     if (String(products[key].id) === String(newProduct.id)) {
//       return { valid: false, message: 'Product ID already exists.' };
//     }
//     if (products[key].name.toLowerCase() === newProduct.name.toLowerCase()) {
//       return { valid: false, message: 'Product name already exists.' };
//     }
//   }
//   if (isNaN(newProduct.price) || newProduct.price <= 0) {
//     return { valid: false, message: 'Price must be a positive number.' };
//   }
//   return { valid: true };
// }

// // Add product handler (usa el id ingresado)
// function addProduct(event) {
//   event.preventDefault();
//   formMessage.textContent = '';

//   const newProduct = {
//     id: productIdInput.value.trim(),
//     name: productNameInput.value.trim(),
//     price: Number(productPriceInput.value)
//   };

//   const validation = validateProduct(newProduct);
//   if (!validation.valid) {
//     formMessage.textContent = validation.message;
//     return;
//   }

//   // Add product to structures
//   products[newProduct.id] = { ...newProduct };
//   localStorage.setItem('products', JSON.stringify(products));

//   // Clear form
//   productForm.reset();
//   formMessage.style.color = 'green';
//   formMessage.textContent = 'Product added successfully!';
//   // Always show the updated product list
//   showProducts();
// }

// // Edit product handler (busca por id)
// function editProduct(event) {
//   event.preventDefault();
//   formMessage.textContent = '';

//   const id = productIdInput.value.trim();
//   if (!products[id]) {
//     formMessage.textContent = 'Product ID not found.';
//     formMessage.style.color = 'red';
//     return;
//   }

//   products[id].name = productNameInput.value.trim();
//   products[id].price = Number(productPriceInput.value);
//   // category removed

//   localStorage.setItem('products', JSON.stringify(products));
//   productForm.reset();
//   formMessage.style.color = 'green';
//   formMessage.textContent = 'Product updated successfully!';

//   // Show the updated product list below the form
//   if (displayList) {
//     showProducts();
//   } else {
//     const info = document.createElement('pre');
//     info.textContent = `ID: ${id}, ${products[id].name}, $${products[id].price}`;
//     formMessage.parentNode.appendChild(info);
//   }
// }

// // Remove product handler (busca por id)
// function removeProduct(event) {
//   event.preventDefault();
//   formMessage.textContent = '';

//   const id = productIdInput.value.trim();
//   if (!products[id]) {
//     formMessage.textContent = 'Product ID not found.';
//     formMessage.style.color = 'red';
//     return;
//   }

//   delete products[id];
//   localStorage.setItem('products', JSON.stringify(products));
//   productForm.reset();
//   formMessage.style.color = 'green';
//   formMessage.textContent = 'Product removed successfully!';

//   // Show the updated product list below the form
//   if (displayList) {
//     showProducts();
//   } else {
//     const info = document.createElement('pre');
//     info.textContent = 'Product removed.';
//     formMessage.parentNode.appendChild(info);
//   }
// }
// if (displayList) {
//   showProducts();
// } else {
//   const info = document.createElement('pre');
//   info.textContent = 'Product removed.';
//   formMessage.parentNode.appendChild(info);
// }

// --- Product logic for Add Product page ---

// Get DOM elements
const productForm = document.getElementById('productForm');
const productIdInput = document.getElementById('productId');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const formMessage = document.getElementById('formMessage');
const displayList = document.getElementById('displayListProducts');

// Get products from localStorage or initialize empty object
function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || {};
}

// Save products to localStorage
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Show all products in the <pre>
function showProducts() {
  const products = getProducts();
  let output = '';
  for (let key in products) {
    const p = products[key];
    output += `ID: ${p.id}, ${p.name}, $${p.price}\n`;
  }
  if (displayList) {
    displayList.textContent = output || 'No products available.';
  }
}

// Validate product fields
function validateProduct(newProduct, products) {
  if (!newProduct.id || !newProduct.name || !newProduct.price) {
    return { valid: false, message: 'All fields are required.' };
  }
  for (let key in products) {
    if (String(products[key].id) === String(newProduct.id)) {
      return { valid: false, message: 'Product ID already exists.' };
    }
    if (products[key].name.toLowerCase() === newProduct.name.toLowerCase()) {
      return { valid: false, message: 'Product name already exists.' };
    }
  }
  if (isNaN(newProduct.price) || newProduct.price <= 0) {
    return { valid: false, message: 'Price must be a positive number.' };
  }
  return { valid: true };
}

// Add product handler
function addProduct(event) {
  event.preventDefault();
  formMessage.textContent = '';

  const products = getProducts();
  const newProduct = {
    id: productIdInput.value.trim(),
    name: productNameInput.value.trim(),
    price: Number(productPriceInput.value)
  };

  const validation = validateProduct(newProduct, products);
  if (!validation.valid) {
    formMessage.textContent = validation.message;
    formMessage.style.color = 'red';
    return;
  }

  products[newProduct.id] = { ...newProduct };
  saveProducts(products);

  productForm.reset();
  formMessage.style.color = 'green';
  formMessage.textContent = 'Product added successfully!';
  showProducts();
}

// Attach event only if form exists (for addProduct page)
if (productForm) {
  productForm.addEventListener('submit', addProduct);
  showProducts();
}

