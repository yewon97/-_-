// login.js
const HIDDEN_CLASSNAME = "hide";
const USERNAME_KEY = 'username';

class Greeting {
  constructor(loginForm, loginInput, greeting) {
    this.loginForm = loginForm;
    this.loginInput = loginInput;
    this.greeting = greeting;
  }

  init() {
    const USERNAME = this.checkLogin();
    if (!USERNAME) {
      this.loginForm.addEventListener("submit", this.onSubmitLogin.bind(this));
      return;
    }
    
    this.onLoginSuccess(USERNAME);
  }

  onSubmitLogin(e) {
    e.preventDefault();
    const USERNAME = this.username;
    const isValid = this.validate(USERNAME);
    if (!isValid) return;

    this.onLoginSuccess(USERNAME);
    this.setLocalStorage(USERNAME_KEY, USERNAME);
  }

  onLoginSuccess(username) {
    this.loginForm.classList.add(HIDDEN_CLASSNAME);
    this.greeting.innerHTML = `Hello ${username}!`;
    this.greeting.classList.remove(HIDDEN_CLASSNAME);
  }

  checkLogin() {
    const USERNAME = this.getLocalStorage(USERNAME_KEY);
    return USERNAME;
  }

  get username() {
    return this.loginInput.value;
  }

  getLocalStorage(key) {
    return localStorage.getItem(key);
  }

  setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  validate(username) {
    if (!username) {
      alert("Please write your name!");
      return false;
    }
    if (username.length > 15) {
      alert("Your name is too long!");
      return false;
    }
    return true;
  }
}

class LoginFactory {
  static create() {
    const loginForm = document.getElementById("login-form");
    const loginInput = loginForm.querySelector("input");
    const greeting = document.getElementById("greeting");
    return new Greeting(loginForm, loginInput, greeting);
  }
}

export { LoginFactory };
