const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../auth/config');

const {User} = require('../../models');

module.exports = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .send('Fields [email, password] are required');
  }

  const user = await User
    .findOne({
      where: {
          email,
      },
    });

  if (!user) {
    return res
      .status(404)
      .send({
        message: 'user Not Found',
      });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res
      .status(401)
      .end({
        auth: false,
        token: null,
      });
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    config.secret,
    {
      expiresIn: config.expireTime,
    }
  );

  return res
    .status(200)
    .send({
      auth: true,
      token,
    });
};
