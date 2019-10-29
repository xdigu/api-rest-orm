
module.exports = (sequelize, DataTypes) => {

    const Address = sequelize.define("Address", {
        street: DataTypes.STRING,
        city: DataTypes.STRING,
        zip_code: DataTypes.STRING,
    });

    Address.associate = function (models) {
        Address.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }

    return Address;
}