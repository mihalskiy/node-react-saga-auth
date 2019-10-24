const {
    user,
    order,
    issue,
} = require('../controllers');
const path = require('path');


const verifyToken = require('../auth/verifyToken');

module.exports = (app) => {
    app.post('/sign-up', user.register);
    app.post('/sign-in', user.login);

    app.get('/orders',
      verifyToken,
      order.list);

    app.post('/order',
        verifyToken,
        order.create);

    app.post('/order/:id',
        verifyToken,
        order.update);

    app.post('/order/destroy/:id',
        verifyToken,
        order.destroy);

    app.get('/order/:id',
        verifyToken,
        order.single);

    // User issues routes
    app.get('/issue',
        verifyToken,
        issue.list);

    app.post('/issue',
        verifyToken,
        issue.create);

    app.post('/issue/:id',
        verifyToken,
        issue.update);

    app.post('/issue/destroy/:id',
        verifyToken,
        issue.destroy);

    app.get('/issue/:id',
        verifyToken,
        issue.single);

  app.use((req, res) => {
    res
        .status(404)
        .send('Sorry can\'t find that!');
  });

    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/build/index.html'))
    })
};

