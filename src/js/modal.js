import { productService } from "../app/productService.js";

const product = await productService.listProducts;
const modals = [...document.querySelectorAll("[data-modal]")];

const modalType = {
  product: modals.find((item) => item.dataset.modal === "product"),
  newsletter: modals.find((item) => item.dataset.modal === "newsletter"),
};

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    closeModal(e.target, modal);
  });
});

function closeModal(btn, modal) {
  if (
    btn.hasAttribute("data-modal-close") ||
    btn.parentNode.hasAttribute("data-modal-close")
  ) {
    modal.dataset.state = "";
  }
}

function closeAllModals(list) {
  list.forEach((item) => {
    item.dataset.state = "";
  });
}

async function activeModal() {
  closeAllModals(modals);
  const target = this.dataset.modalBtn;
  const modal = modalType[target];

  if (modalType[target].dataset.modal === "product") {
    const productId = parseInt(this.dataset.id) - 1;
    fillModalProduct(modal, productId);
    return;
  }

  modal.dataset.state = "active";
}

function createColor(nome, cor) {
  const label = document.createElement("label");
  label.className = "modal__label";
  label.for = nome;
  label.innerHTML = `
        <input type="radio" name="colorChoose" id="${nome}" class="modal__input" style="background: ${cor};">
        ${nome}`;

  return label;
}

function createSize(size) {
  const label = document.createElement("label");
  label.className = "modal__label";
  label.for = size;
  label.innerHTML = `
  <label for="${size}" class="modal__label">
    <input type="radio" name="sizeChoose" id="${size}" class="modal__input">
    ${size}
  </label>
  `;

  return label;
}

function fillModalProduct(modal, productId) {
  modal.dataset.state = "active";
  modal.querySelector("[data-image-desktop]").srcset =
    `./assets/images/Desktop/Imagens-cards/${product[productId].image}`;
  modal.querySelector("[data-image-tablet]").srcset =
    `./assets/images/Tablet/Imagens-cards/${product[productId].image}`;
  modal.querySelector("[data-image-mobile]").srcset =
    `./assets/images/Mobile/Imagens-cards/${product[productId].image}`;
  modal.querySelector("[data-modal-product]").textContent =
    product[productId].title;
  modal.querySelector("[data-modal-description]").textContent =
    product[productId].description;
  modal.querySelector("[data-modal-price]").textContent =
    product[productId].price;

  const fieldColors = modal.querySelector("[data-modal-colors]");
  fieldColors.innerHTML = "";
  product[productId].colors.forEach((color) => {
    fieldColors.appendChild(createColor(color.name, color.hash));
  });

  const fieldSizes = modal.querySelector("[data-modal-sizes]");
  fieldSizes.innerHTML = "";
  product[productId].sizes.forEach((size) => {
    fieldSizes.appendChild(createSize(size));
  });
}

export const modal = {
  activeModal,
};
