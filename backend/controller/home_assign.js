const mainDb = require("../model/index");
const HomeModel = mainDb.homeModel;
const UserModel = mainDb.userModel;
const HomeAssignModel= mainDb.homeAssignModel;


exports.createHomeAssign = async (req, res) => {
    try {
        req.body.status="ACTIVE"
        let userList= await UserModel.findAll({});
        let mainarr=[];
        for (const item of userList) {
            let homeExits = await HomeAssignModel.findOne({
                where: {home_id: req.body.home_id, user_id: item.user_id},
            })
            console.log("homeExits", homeExits)
            if(!homeExits){
                let newAssignment = {
                    ...req.body,
                    user_id: item.user_id
                };
                mainarr.push(newAssignment);
            }
        }
        if (mainarr.length > 0) {
            const response = await HomeAssignModel.bulkCreate(mainarr);
            return res.status(200).send({ code: 200, message: "Data Created Successfully!", data: response });
        } else {
            return res.status(200).send({ code: 200, message: "No new assignments needed." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getAllHomeListByUserId = async (req, res) => {
    try {
        const user_id = parseInt(req.params.userId);
        const getAllData = await HomeAssignModel.findAll({
            where: { status: "ACTIVE", user_id: user_id },
            include: [{
                model: HomeModel, 
            }]
        });
        if (getAllData.length>0) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getHomeDetailsByHomeId = async (req, res) => {
    try {
        const homeId = parseInt(req.params.homeId);
        const getSingleHome = await HomeModel.findOne({where: {status: "ACTIVE", home_id: homeId}})
        const getAllData = await HomeAssignModel.findAll({
            where: { status: "ACTIVE", home_id:  homeId},
            include: [
                {
                    model: mainDb.userModel, 
                }
            ]
        })
        
        let mainObj={
            homeDetails: getSingleHome,
            allUserList: getAllData
        }
        if (mainObj) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: mainObj });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};



exports.editHomeDetails = async (req, res) => {
    try {
        const homeId = parseInt(req.params.homeId);
        
        const getSingleHome = await HomeModel.findOne({
            where: { status: "ACTIVE", home_id: homeId }
        });
        
        if (!getSingleHome) {
            return res.status(404).send({ code: 404, message: "Home not found or inactive" });
        }
                
        for (const item of req.body.updatePayload) {
            await HomeAssignModel.update(
                { assign_status: item.assign_status },
                { where: { user_id: item.user_id, home_id: homeId } } 
            );
        }
        return res.status(200).send({ code: 200, message: "Home assignment updated successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ code: 500, message: "Server error" });
    }
};




/////////////// GetById accredition_logo_details ///////////////

exports.getByIdHomeDetails = async (req, res) => {
    try {
        const homeId = parseInt(req.params.homeId);
        const homeDetails = await HomeModel.findOne({ where: { home_id: homeId }}, {street_address: 1});
        const userList = await UserModel.findAll({ where: { status: "ACTIVE" }});
        let homeObject={
            home: homeDetails,
            user: userList
        }
        if (homeObject) {
            return res.status(200).send({ code: 200, message: "Fetch data by ID Successfully", data: homeObject });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error);
        
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};

/////////////// Delete accredition_logo_details ///////////////

exports.deleteHomeDetails = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const kpiDetailsdata = await HomeModel.findOne({ where: { productId: productId } });
        if (kpiDetailsdata) {
            await HomeModel.update({ status: "INACTIVE" }, { where: { productId: productId } });
            return res.status(200).send({ code: 200, message: "product is Deleted Successfully!" });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


