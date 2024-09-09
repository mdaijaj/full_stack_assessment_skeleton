module.exports = (sequelize, Sequelize) => {
    const userTable = sequelize.define("home", {
        home_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        street_address: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        zip: {
            type: Sequelize.STRING,
        },
        sqft: {
            type: Sequelize.STRING,
        },
        beds: {
            type: Sequelize.STRING,
        },
        baths: {
            type: Sequelize.STRING,
        },
        list_price: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
    })
    return userTable;
}