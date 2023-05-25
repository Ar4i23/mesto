export default class UserInfo {
  constructor(titleElement, subtitleElement, avatarProfilBg) {
    this._titleElement = titleElement;
    this._subtitleElement = subtitleElement;
    this._avatarProfilBg = avatarProfilBg;
  }

  setUserInfo(element) {
    this._avatarProfilBg.style.backgroundImage = `url(${element.avatar})`;
    this._titleElement.textContent = element.name;
    this._subtitleElement.textContent = element.about;
  }
}
