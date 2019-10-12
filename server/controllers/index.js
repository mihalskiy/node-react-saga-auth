const register = require('./user/register');
const login = require('./user/login');
const order = require('./orders');
const issue = require('./issues');

module.exports = {
    order,
    issue,
    user: {
      register,
      login,
    },
};
