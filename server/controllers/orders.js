const Order = require('../models').Orders;

module.exports = {
  create(req, res) {
      const {name, email, phone, postAddress, message} = req.body;
      return Order
      .create({
          name: name,
          phone: phone,
          email: email,
          postAddress: postAddress,
          message: message
      })
      .then((order) => res.status(201).send(order))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Order
      .findAll({})
      .then((orders) => res.status(200).send(orders))
      .catch((error) => res.status(400).send(error));
  },

    single(req, res) {
        return Order
            .findOne({ where: { id: req.params.id } })
            .then((orders) => res.status(200).send(orders))
            .catch((error) => res.status(400).send(error));
    },

  update(req, res) {
      const {name, email, phone, postAddress, message} = req.body;
    return Order
      .findOne({ where: { id: req.params.id } })
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }
        return order
          .update({
              name: name,
              email: email,
              phone: phone,
              postAddress: postAddress,
              message: message
          })
          .then(() => res.status(200).send(order))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Order
      .findOne({ where: { id: req.params.id } })
      .then(order => {
        if (!order) {
          return res.status(400).send({
            message: 'Order Not Found',
          });
        }
        return order
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
