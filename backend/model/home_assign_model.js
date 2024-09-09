module.exports = (sequelize, Sequelize) => {
    const homeAssignTable = sequelize.define("home_assign", {
        assign_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        home_id: {
            type: Sequelize.INTEGER,
        },
        assign_status: {
            type: Sequelize.BOOLEAN,
        },
        status: {
            type: Sequelize.STRING,
            default: "ACTIVE"
        },
    })
    return homeAssignTable;
}