document.getElementById("open-modal-btn").onclick = openModal;

function openModal() {
  document.getElementById("my-modal").classList.add("open");
  let infoTitle = document.querySelector(".profile__info-title").innerText;
  let infoInputTitle = (document.querySelector(".modal__input-name").value =
    infoTitle);
  let infoSubtitle = document.querySelector(
    ".profile__info-subtitle"
  ).innerText;
  let infoInputSubtitle = (document.querySelector(".modal__input-about").value =
    infoSubtitle);
}

document.getElementById("close-my-modal-btn").onclick = closeModal;

function closeModal() {
  document.getElementById("my-modal").classList.remove("open");
}

document.querySelector(".modal__button").onclick = myClick;

function myClick() {
  let imputName = document.querySelector(".modal__input-name").value;
  document.querySelector(".profile__info-title").innerHTML = imputName;
  let imputAbout = document.querySelector(".modal__input-about").value;
  document.querySelector(".profile__info-subtitle").innerHTML = imputAbout;
}
