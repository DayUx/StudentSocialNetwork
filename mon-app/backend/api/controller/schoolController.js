const School = require( '../model/schoolModel');
const mongoose = require('mongoose');

module.exports.images = async (req, res, next) => {
    try {
        const id_et_image = await School.find({"users.id": req.body.id}, { image: 1});
        return res.json({status : true, servers_id_and_image: id_et_image});
    }catch (e){
        next(e);
    }
};

module.exports.getSchools = async (req, res, next) => {
    try {
        const schools = await School.find({},{ image: 1,nom: 1});
        return res.json({status : true, schools: schools});
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