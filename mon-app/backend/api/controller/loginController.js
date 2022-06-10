var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

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

module.exports = {verifyExistingUser: verifyExistingUser};