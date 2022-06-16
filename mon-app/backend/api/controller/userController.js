const Users = require("../model/userModel");
const bcrypt = require("bcrypt");

const mongoose = require('mongoose');


module.exports.register = async (req, res, next) => {
    try {
        const {first_name, second_name, email, password} = req.body;
        const mailCheck = await Users.findOne({email: email});
        if (mailCheck) {
            return res.json({
                message: "Mail already used",
                status: false,
            });
        }
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            first_name: first_name,
            second_name: second_name,
            email: email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({status : true, user: user});
    }catch (e){
        next(e);
    }
};


module.exports.login = async (req,res, next) =>{
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({email: email});
        if (!user) {
            return res.json({
                message: "User not found",
                status: false,
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({
                message: "Password is invalid",
                status: false,
            });
        }
        delete user.password;
        return res.json({status : true, user: user});
    }catch (e){
        next(e);
    }

};