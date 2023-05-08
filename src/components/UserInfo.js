export default class UserInfo {
  constructor({ titleElement, subtitleElement }) {
    this._titleElement = titleElement;
    this._subtitleElement = subtitleElement;
  }
  getUserInfo() {
    const infoUser = {
      name: this._titleElement.textContent,
      about: this._subtitleElement.textContent,
    };
    return infoUser;
  }
  setUserInfo(element) {
    this._titleElement.textContent = element.name;
    this._subtitleElement.textContent = element.about;
  }
}
