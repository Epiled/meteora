const BASE_URL = "http://localhost:3000/products";

let products = await listProducts();

async function listProducts() {
  const res = await fetch(`${BASE_URL}`);
  const listProducts = await res.json();

  console.table(listProducts);

  return listProducts;
}

async function searchProduct(searchTerm) {
  const res = await fetch(`${BASE_URL}?q=${searchTerm}`);
  const listProducts = await res.json();

  return listProducts;
}

export const productService = {
  products,
  searchProduct,
};
