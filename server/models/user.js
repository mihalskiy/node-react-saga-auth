module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
              isEmail: true // TODO: Write test
          }
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      isAdmin: {
          type: DataTypes.BOOLEAN,
      },
      telephone: {
          type: DataTypes.STRING,
      },
      password: {
          type: DataTypes.STRING,
      }
  });
  return User;
};
