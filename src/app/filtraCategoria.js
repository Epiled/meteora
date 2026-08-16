import { productService } from "./productService.js";
import { createProducts } from "./createProduct.js";

const buttons = document.querySelectorAll("[data-category]");

buttons.forEach((btn) => {
  btn.addEventListener("click", filterProducts);
});

async function filterProducts() {
  const category = this.dataset.category;
  const res = await filterByCategory(category);

  createProducts.listProducts(res);
}

async function filterByCategory(category) {
  let list = await productService.listProducts;
  let result = list.filter((product) => product.category == category);
  return result;
}
