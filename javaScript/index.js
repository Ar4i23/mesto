const nameInputElement = document.querySelector(".modal__input_modal_name");
const aboutInputElement = document.querySelector(".modal__input_modal_about");
const titleElement = document.querySelector(".profile__info-title");
const subtitleElement = document.querySelector(".profile__info-subtitle");
console.log(nameInputElement.value);

document.getElementById("open-modal-btn").onclick = openModal;

function openModal() {
  document.getElementById("my-modal").classList.add("modal_open");

  const inputName = titleElement.textContent;
  nameInputElement.value = inputName;
  const inputAbout = subtitleElement.textContent;
  aboutInputElement.value = inputAbout;
}

document.getElementById("close-my-modal-btn").onclick = closeModal;

function closeModal() {
  document.getElementById("my-modal").classList.remove("modal_open");
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const inputName = nameInputElement.value;
  titleElement.textContent = inputName;
  const inputAbout = aboutInputElement.value;
  subtitleElement.textContent = inputAbout;
  closeModal();
});
