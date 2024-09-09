const config = require("../config/index");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.homeModel = require("./home_model")(sequelize, Sequelize);
db.userModel = require("./user_model")(sequelize, Sequelize);
db.homeAssignModel = require("./home_assign_model")(sequelize, Sequelize);


/////////////////////////////// Relation ///////////////////////////////

db.homeAssignModel.belongsTo(db.homeModel, {
  throgh: "home",
  foreignKey: "home_id",
});


db.homeAssignModel.belongsTo(db.userModel, {
  throgh: "user",
  foreignKey: "user_id",
});



module.exports = db;