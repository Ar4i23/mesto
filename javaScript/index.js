document.getElementById("open-modal-btn").onclick = openModal;

function openModal() {
  document.getElementById("my-modal").classList.add("modal_open");
  let nameInput = document.querySelector(".profile__info-title").textContent;
  document.querySelector(".modal__input_modal_name").value = nameInput;
  let aboutInput = document.querySelector(
    ".profile__info-subtitle"
  ).textContent;
  document.querySelector(".modal__input_modal_about").value = aboutInput;
}

document.getElementById("close-my-modal-btn").onclick = closeModal;

function closeModal() {
  document.getElementById("my-modal").classList.remove("modal_open");
}

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let imputName = document.querySelector(".modal__input_modal_name").value;
  let newName = (document.querySelector(".profile__info-title").textContent =
    imputName);
  let inputAbout = document.querySelector(".modal__input_modal_about").value;
  let newAbout = (document.querySelector(
    ".profile__info-subtitle"
  ).textContent = inputAbout);
  closeModal();
});
