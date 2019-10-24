const Issue = require('../models').Issues;

module.exports = {
    create(req, res) {
      const {name, priority, issueMessage, userContacts} = req.body;
      return Issue
          .create({
              name: name,
              priority: priority,
              issueMessage: issueMessage,
              userContacts: userContacts
          })
          .then((issue) => res.status(201).send(issue))
          .catch((error) => res.status(400).send(error))
    },

    list(req, res) {
        return Issue
            .findAll({})
            .then((issues) => res.status(200).send(issues))
            .catch((error) => res.status(400).send(error));
    },

    single(req, res) {
        return Issue
            .findOne({ where: { id: req.params.id } })
            .then((issues) => res.status(200).send(issues))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        const {name, priority, issueMessage, userContacts} = req.body;
        return Issue
            .findOne({ where: { id: req.params.id } })
            .then(issue => {
                if (!issue) {
                    return res.status(404).send({
                        message: 'Issue Not Found',
                    });
                }
                return issue
                    .update({
                        name: name,
                        priority: priority,
                        issueMessage: issueMessage,
                        userContacts: userContacts
                    })
                    .then(() => res.status(200).send(issue))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        return Issue
            .findOne({ where: { id: req.params.id } })
            .then(issue => {
                if(!issue) {
                    return res.status(400).send({
                        message: 'Issue Not Found',
                    });
                }
                return issue
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};