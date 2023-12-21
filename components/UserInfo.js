class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.nameElement = document.querySelector(`${nameSelector}`);
    this.jobElement = document.querySelector(`${jobSelector}`);
  }

  getUserInfo() {
    profileCard = document.querySelector(".profile");
    userInfo = {
      name: this.nameElement.textContent,
      job: this.jobElement.textContent,
    };
  }

  setUserInfo() {
    this.nameElement.textContent = document.querySelector("#name-edit").value;
    this.jobSelector.textContent = document.querySelector("#description").value;
  }
}
