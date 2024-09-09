const homeController = require("../controller/home");
const userController = require("../controller/user");
const homeAssignController = require("../controller/home_assign");


module.exports = app => {
 
    // users 
    app.post("/api/user/create_user", userController.createUser );
    app.get("/api/user/find-all", userController.getAllUsers );
    app.post("/api/home/create-home", homeController.createHome );
    app.post("/api/home/home-assign", homeAssignController.createHomeAssign );
    app.get("/api/home/get-allHomeByUserId/:userId", homeAssignController.getAllHomeListByUserId );
    app.get("/api/home/get-homeDetailsByHomeId/:homeId", homeAssignController.getHomeDetailsByHomeId );
    app.put("/api/user/update-by-home/:homeId", homeAssignController.editHomeDetails );  


}
