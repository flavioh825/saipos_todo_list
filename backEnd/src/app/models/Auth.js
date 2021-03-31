const axios = require('axios');

class Auth { 

  checkPasswordAuthorization(password) {
    return password === "TrabalheNaSaipos";
  }

  async validateEmail(email) {
    const API_KEY = '66a89d3a056eb4dc7a023a7c507e8a77';
    let res = await axios.get(`http://apilayer.net/api/check?access_key=${API_KEY}&email=${email}`);
    return res.data;
  }
}

module.exports = new Auth();