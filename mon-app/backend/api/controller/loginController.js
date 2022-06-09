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
        dbo.collection("User").findOne({name, profile_img, school_name, job, old_age}, {
            mail: mail,
            password: mdp
        }, function (err, result) {
            if (err) throw err;
            console.log(result.name);
            if (result.name != null) {
                return [name, profile_img, school_name, job, old_age];
            }
            return tmp;
        });

    });
}

module.exports = {verifyExistingUser: verifyExistingUser};