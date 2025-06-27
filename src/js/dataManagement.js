// dataManagement.js


const menu = document.getElementById('menu');
  const btn = document.getElementById('menuBtn');

  // Toggle the dropdown menu on button click
  btn.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  // Close menu if clicked outside
  window.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      menu.classList.remove('show');
    }
  });


// ======= Data Initialization =======
let products = JSON.parse(localStorage.getItem('products')) || {
  1: { id: 1, name: "Mouse", price: 30000 },
  2: { id: 2, name: "Keyboard", price: 60000 },
  3: { id: 3, name: "Monitor", price: 200000 }
};

let setProducts = new Set(Object.values(products));

let mapCategories = new Map([
  ["Peripherals", "Mouse"],
  ["Input", "Keyboard"],
  ["Display", "Monitor"]
]);

// ======= DOM Elements =======
const displayList = document.getElementById('displayListProducts');
const displayUnique = document.getElementById('displayUniqueProducts');
const displayCategories = document.getElementById('displayCategories');

// ======= Render Functions =======

export function initProductApp() {
  // Save initial products to localStorage if not there yet
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(products));
  }
}

export function showProducts() {
  let output = '';
  for (let key in products) {
    const p = products[key];
    output += `ID: ${p.id}, ${p.name}, $${p.price}\n`;
  }
  displayList.textContent = output || 'No products available.';
}

export function showUniqueProducts() {
  let output = '';
  for (let p of setProducts) {
    output += `${p.name} - $${p.price}\n`;
  }
  displayUnique.textContent = output || 'No unique products available.';
}

export function showCategories() {
  let output = '';
  mapCategories.forEach((productName, category) => {
    output += `Category: ${category} -> Product: ${productName}\n`;
  });
  displayCategories.textContent = output || 'No categories available.';
}
// dataManagement.js

// ... (mismo código anterior)

const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productCategoryInput = document.getElementById('productCategory');
const formMessage = document.getElementById('formMessage');

// Validate new product — no empty, no duplicates by name (case insensitive)
function validateProduct(newProduct) {
  if (!newProduct.name || !newProduct.price || !newProduct.category) {
    return { valid: false, message: 'All fields are required.' };
  }
  for (let key in products) {
    if (products[key].name.toLowerCase() === newProduct.name.toLowerCase()) {
      return { valid: false, message: 'Product already exists.' };
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

  const newProduct = {
    id: Object.keys(products).length + 1,
    name: productNameInput.value.trim(),
    price: Number(productPriceInput.value),
    category: productCategoryInput.value.trim()
  };

  const validation = validateProduct(newProduct);
  if (!validation.valid) {
    formMessage.textContent = validation.message;
    return;
  }

  // Add product to structures
  products[newProduct.id] = { id: newProduct.id, name: newProduct.name, price: newProduct.price };
  setProducts.add(products[newProduct.id]);
  mapCategories.set(newProduct.category, newProduct.name);

  // Save to localStorage
  localStorage.setItem('products', JSON.stringify(products));

  // Clear form
  productForm.reset();
  formMessage.style.color = 'green';
  formMessage.textContent = 'Product added successfully!';

  // Refresh displays (optional: you can call one or all)
  showProducts();
  showUniqueProducts();
  showCategories();
}
