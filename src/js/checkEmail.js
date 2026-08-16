import { modal } from "./modal.js";

const form = document.querySelector("[data-form]");
const inputEmail = form.querySelector("[data-email]");
const errorContainer = form.querySelector("[data-error-message]");
const buttonModal = form.querySelector("[data-modal-button]");

const errorsType = ["valueMissing", "typeMismatch", "tooShort", "customError"];

const messages = {
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um e-mail válido.",
  },
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputEmail.addEventListener("blur", (e) => {
  checkField(e.target);
});

inputEmail.addEventListener("invalid", (e) => {
  e.preventDefault();
});

function checkField(field) {
  let message = "";

  errorsType.forEach((erro) => {
    if (field.validity[erro]) {
      message = messages[field.name][erro];
    }
  });

  let isFieldValid = field.checkValidity();

  if (!isFieldValid) {
    errorContainer.textContent = message;
    buttonModal.removeEventListener("click", modal.activeModal);
  } else {
    errorContainer.textContent = "";
    buttonModal.addEventListener("click", modal.activeModal);
  }
}
