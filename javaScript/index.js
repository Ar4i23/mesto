document.getElementById("open-modal-btn").onclick = openModal;

function openModal() {
  document.getElementById("my-modal").classList.add("open");
  let nameInput = document.querySelector(".profile__info-title").innerHTML;
  document.querySelector(".modal__input_name").value = nameInput;
  let aboutInput = document.querySelector(".profile__info-subtitle").innerHTML;
  document.querySelector(".modal__input_about").value = aboutInput;
}

document.getElementById("close-my-modal-btn").onclick = closeModal;

function closeModal() {
  document.getElementById("my-modal").classList.remove("open");
}

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let imputName = document.querySelector(".modal__input_name").value;
  document.querySelector(".profile__info-title").innerHTML = imputName;
  let inputAbout = document.querySelector(".modal__input_about").value;
  document.querySelector(".profile__info-subtitle").innerHTML = inputAbout;
});
