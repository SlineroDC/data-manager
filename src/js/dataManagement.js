export function initProducts() {
  if (!localStorage.getItem('products')) {
    const defaultProducts = [
      { id: 1, name: 'Laptop', price: 800 },
      { id: 2, name: 'Smartphone', price: 500 },
      { id: 3, name: 'Tablet', price: 300 }
    ];
    localStorage.setItem('products', JSON.stringify(defaultProducts));
  }
}

export function getProducts() {
  const productsStr = localStorage.getItem('products');
  if (!productsStr) return [];
  try {
    const products = JSON.parse(productsStr);
    return Array.isArray(products) ? products : [];
  } catch {
    return [];
  }
}

export function addProduct(product) {
  const products = getProducts();

  if (products.some(p => p.id === product.id)) {
    throw new Error('Product ID already exists. Use another ID.');
  }

  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
}

export function editProduct(updatedProduct) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === updatedProduct.id);

  if (index === -1) {
    throw new Error('Product not found to edit.');
  }

  products[index] = updatedProduct;
  localStorage.setItem('products', JSON.stringify(products));
}

export function removeProduct(id) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    throw new Error('Product not found to remove.');
  }

  products.splice(index, 1); // remove by index
  localStorage.setItem('products', JSON.stringify(products));
}
