
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv


function registerUser(first_name, second_name, mail, password) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SocialNetwork");
        dbo.collection("User").insert({
            first_name: first_name,
            second_name: second_name,
            mail: mail,
            password: password,
        }, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });

    });
}


module.exports = {registerUser: registerUser};