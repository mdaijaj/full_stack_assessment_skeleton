const { where } = require("sequelize");
const mainDb = require("../model/index");
const HomeModel = mainDb.homeModel;
const UserModel = mainDb.userModel;

exports.createHome = async (req, res) => {
    try {
        req.body.status="ACTIVE"
        const homeExits = await HomeModel.findOne({
            where: {street_address: req.body.street_address},
        })
        if(homeExits){
            return res.status(209).send({ code: 209, message: "address Street Allready Exits!" });
        }
        const response = await HomeModel.create(req.body);
        return res.status(200).send({ code: 200, message: "Data Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getAllHomeListByUserId = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);
          const getAllData = await HomeModel.findAll({
            where: {user_id: user_id ,status: "ACTIVE"},
        })
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


exports.editHomeDetails = async (req, res) => {
    try {
        const home_id = parseInt(req.params.home_id);
        const productdetails = await HomeModel.findOne({ where: { home_id:home_id } });
        if (!productdetails) {
            throw new BadRequestError("user not found");
        }else{
            const updateData = await HomeModel.update(req.body,{ where: { home_id: home_id } })
        } 
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};