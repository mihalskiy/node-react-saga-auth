module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    postAddress: DataTypes.STRING,
    message: DataTypes.STRING
  });
  return Orders;
};
