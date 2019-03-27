const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../../auth/config');

const {User} = require('../../models');

module.exports = async (req, res) => {
  const {
    email,
    password,
    name,
    s_password,
  } = req.body.payload;

  if (!name || !password || !email || !s_password) {
    return res
      .status(400)
      .send('Fields [s_password, email, password] are required');
  }
  const hashedPassword = bcrypt.hashSync(password, 8);

  let user;
  try {
    user = await User.findOne({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send(error);
  }

  if (!user) {
    try {
      const createdUser = await User
        .create({
          email: email,
          name: name,
          password: hashedPassword,
        });

      const token = jwt.sign(
        {
          userId: createdUser.id,
        },
        config.secret,
        {
          expiresIn: config.expireTime,
        }
      );

      return res
        .status(200)
        .json({
          auth: true,
          token,
          id: createdUser.id,
          userName: createdUser.userName,
        });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .send(error);
    }
  } else {
    return res.
      status(400)
      .send('Email already exist!')
        .end({
          auth: false,
          token: null,
        });
  }
};
