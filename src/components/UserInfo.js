export default class UserInfo {
    constructor({ name, about, avatar }) {
        this._userName = document.querySelector(name);
        this._userAbout = document.querySelector(about);
        this._userAvatar = document.querySelector(avatar);
    }
    getUserInfo() {
        return { name: this._userName.textContent, about: this._userAbout.textContent };
    }
    setUserInfo(name, about, avatar) {
        if (name)
            this._userName.textContent = name;
        if (about)
            this._userAbout.textContent = about;
        if (avatar)
            this._userAvatar.src = avatar;
    }
}