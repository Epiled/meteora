import { productService } from "./productService.js";
import { modal } from "../js/modal.js";

const products = document.querySelector("[data-products]");

function createCard(id, title, description, price, image) {
  const card = document.createElement("div");

  const imageMobile = new Image();
  const imageTablet = new Image();
  const imageDesktop = new Image();

  imageDesktop.src = `./assets/images/Desktop/Imagens-Cards/${image}`;
  imageTablet.src = `./assets/images/Tablet/Imagens-Cards/${image}`;
  imageMobile.src = `./assets/images/Mobile/Imagens-Cards/${image}`;

  card.className = "product";
  card.innerHTML = `
        <picture>
          <source srcset="./assets/images/Desktop/Imagens-Cards/${image}" width="${imageDesktop.width}" height="${imageDesktop.height}">
          <source srcset="./assets/images/Tablet/Imagens-Cards/${image}" width="${imageTablet.width}" height="${imageTablet.height}">
          <img src="./assets/images/Mobile/Imagens-Cards/${image}" loading="lazy" width="${imageMobile.width}" height="${imageMobile.height}" alt="#" class="product__image">
        </picture>
        <div class="product__content">
          <h2 class="product__title">
            ${title}
          </h2>
          <p class="product__text">
            ${description}
          </p>
          <span class="product__price">
            R$ ${price}
          </span>
          <button class="product__button" data-modal-button="product" data-id="${id}">
            Veja mais
          </button>
        </div>
  `;

  const btn = card.querySelector("[data-modal-button]");
  btn.addEventListener("click", modal.activeModal);

  return card;
}

async function listProducts(list) {
  try {
    products.innerHTML = "";
    const listApi = list;
    listApi.forEach((element) => {
      products.appendChild(
        createCard(
          element.id,
          element.title,
          element.description,
          element.price,
          element.image,
        ),
      );
    });
  } catch (e) {
    listProducts.innerHTML = `<h2 class="message__title">Não foi possível carregar os vídeos</h2>`;
  }
}

listProducts(await productService.listProducts);

export const createProducts = {
  listProducts,
  products,
};
