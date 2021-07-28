export default class UserInfo {
    constructor({ name, about }) {
        this._userName = document.querySelector(name);
        this._userAbout = document.querySelector(about);
    }
    getUserInfo() {
        return { name: this._userName.value, about: this._userAbout.value };
    }
    setUserInfo(name, about) {
        this._userName.value = name;
        this._userAbout.value = about;
    }
}