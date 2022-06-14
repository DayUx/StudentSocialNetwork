var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
   first_name: {
         type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,

   },
    second_name: {
        type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,

    },
    email: {
        type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
            required: true,
            minlength: 10,
            maxlength: 150,
            trim: true,
    },
    profile_img: {
        type: String,
            default: "",
    },

});


module.exports = mongoose.model('Users', userSchema);



function verifyExistingUser(mail,mdp)  {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SocialNetwork");

        var tmp = null;
        dbo.collection("User").findOne({mail:mail, password:mdp}, {projection:{
                "password": 0,}
        }, function (err, result) {
            if (err) throw err;
            console.log(result);
            //console.log(result.name);

            tmp = result;
            // if (result.name != null) {
            //     return [name, profile_img, school_name, job, old_age];
            // }
            return tmp;
        });

    });
}