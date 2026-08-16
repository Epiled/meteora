import { productService } from "./productService.js";
import { createProduct } from "./createProduct.js";

const inputSearch = document.querySelector("[data-search-input]");
const buttonSearch = document.querySelector("[data-search-button]");
const list = createProduct.products;

buttonSearch.addEventListener("click", searchProduct);

async function searchProduct() {
  const searchTerm = inputSearch.value;
  const res = await productService.searchProduct(searchTerm);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  if (res == "") {
    list.innerHTML = `
    <h2 class="product__search">
      Nenhum produto encontrado com o termo ${searchTerm}
    </h2>
    `;
    return;
  }

  createProduct.listProducts(res);
}
