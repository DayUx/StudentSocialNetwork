import School from '../model/schoolModel'
const mongoose = require('mongoose');

module.exports.images = async (req, res, next) => {
    try {
        const id_et_image = School.find({"users.id": req.body.id});
        if (id_et_image == null){
            for (let i = 0; i < id_et_image; i++){
                
                delete id_et_image[i].ville;
                delete id_et_image[i].nom;
                delete id_et_image[i].description;
                delete id_et_image[i].messages;
                delete id_et_image[i].users;
            }
        }
        return id_et_image;
    }catch (e){
        next(e);
    }
};

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