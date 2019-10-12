module.exports = (sequelize, DataTypes) => {
    const Issues = sequelize.define('Issues', {
        name: DataTypes.STRING,
        priority: DataTypes.STRING,
        issueMessage: DataTypes.STRING,
        userContacts: DataTypes.STRING,
    });
    return Issues;
};