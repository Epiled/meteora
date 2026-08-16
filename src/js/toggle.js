const toggleButton = document.querySelector("[data-toggle]");
const buttonLines = document.querySelectorAll("[data-toggle-line]");

const navigation = document.querySelector("[data-navigation]");

toggleButton.addEventListener("click", () => {
  buttonLines.forEach((line) => {
    line.toggleAttribute("data-toggle-line-active");
  });
  navigation.classList.toggle("header__navigation--active");
});
