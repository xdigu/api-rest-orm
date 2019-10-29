
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    });

    User.associate = function (models) {
        User.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
    }

    return User;
}