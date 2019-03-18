const register = require('./user/register');
const login = require('./user/login');
const order = require('./orders');

module.exports = {
    order,
    user: {
      register,
      login,
    },
};
