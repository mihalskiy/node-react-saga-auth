module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    friends: DataTypes.STRING,
    post_address: DataTypes.STRING,
    message: DataTypes.STRING
  });
  return Orders;
};
