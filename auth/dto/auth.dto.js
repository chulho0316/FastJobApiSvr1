class LoginDTO {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
    isValid() {
      return typeof this.username === 'string' && this.username.length > 0
          && typeof this.password === 'string' && this.password.length > 0;
    }
  }
  
  module.exports = LoginDTO;