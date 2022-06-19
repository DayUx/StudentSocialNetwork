const School = require( '../model/schoolModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports.images = async (req, res, next) => {
    try {

        const token = req.headers['x-access-token'];
        const userJson = await jwt.verify(token, process.env.JWT_SECRET);
        const id_et_image = await School.find({"users.user_id": userJson.id}, { users: 0});
        return res.json({status : true, servers_id_and_image: id_et_image});
    }catch (e){
        next(e);
    }
};

module.exports.getSchools = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const userJson = await jwt.verify(token, process.env.JWT_SECRET);
        const schools = await School.find({"users.user_id":{$ne:userJson.id}},{ users: 0});
        return res.json({status : true, schools: schools});
    }catch (e){
        next(e);
    }
}

module.exports.createSchool = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const userJson = await jwt.verify(token, process.env.JWT_SECRET);
        const {nom, image,description} = req.body;
        const school = await School.create({
            nom: nom,
            image: image,
            users: [{user_id: userJson.id}],
            description: description,
        });
        delete school.users;
        return res.json({status : true, school: school});
    }catch (e){
        next(e);
    }
}

module.exports.joinSchool = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const userJson = await jwt.verify(token, process.env.JWT_SECRET);
        const {id_school} = req.body;
        const school = await School.findById(id_school);
        if(!school){
            return res.json({status : false, message: "School not found"});
        }else if(school.users.find(user => user.user_id === userJson.id)){
            return res.json({status : false, message: "You are already in this school"});
        }else {
            school.users.push({user_id: userJson.id});
            await school.save();
            delete school.users;
            return res.json({status : true, school: school});
        }
    }catch (e){
        next(e);
    }
}


module.exports.quitSchool = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const userJson = await jwt.verify(token, process.env.JWT_SECRET);
        const {id_school} = req.body;
        const school = await School.findById(id_school);
        if(!school){
            return res.json({status : false, message: "School not found"});

        }
        else if(!school.users.find(user => user.user_id === userJson.id)){
            return res.json({status : false, message: "You are not in this school"});

        }
        else {
            school.users = school.users.filter(user => user.user_id !== userJson.id);
            await school.save();
            delete school.users;
            return res.json({status : true, school: school});
        }
    }catch (e){
        next(e);
    }
}




module.exports.messages =  async (req, res, next) => {
    try {
        const msg = School.find({id: req.body.school_id});
        if (msg == null){
            for (let i = 0; i < msg; i++){
                delete msg[i].ville;
                delete msg[i].nom;
                delete msg[i].description;
                delete msg[i].users;
                delete msg[i].image;
            }
        }
        return msg;
    }catch (e){
        next(e);
    }
};