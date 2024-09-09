const db = require("../model/index");
const UserModel = db.userModel;


exports.createUser = async (req, res) => {
    try {
        const userExits = await UserModel.findOne({
            where: { username: req.body.username, status: "ACTIVE"},
        })
        if(userExits){
            return res.status(209).send({ code: 209, message: "User Allready Exits!" });
        }
        req.body.status="ACTIVE"
        req.body.assign_home_status=false
        const response = await UserModel.create(req.body);
        return res.status(200).send({ code: 200, message: "Data Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};


exports.getAllUsers = async (req, res) => {
    try {
        const getAllData = await UserModel.findAll({
            where: { status: "ACTIVE"}
        })
        if (getAllData.length>0) {
            return res.status(200).send({ code: 200, message: "Fetch All Data Successfully", data: getAllData });
        } else {
            return res.status(403).send({ code: 403, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code:  500, message: "Server Error" });
    };
};



exports.editUserDetails = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productdetails = await UserModel.findOne({ where: { productId:productId } });
        if (!productdetails) {
            throw new BadRequestError("user not found");
        }else{
            const updateData = await UserModel.update(req.body,{ where: { productId: productId } })
        } 
    } catch (error) {
        console.log(error)
        return res.status(500).send({ code: 500, message: "Server Error" });
    };
};