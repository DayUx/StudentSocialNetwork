var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

function getChatSchool(name)  {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SocialNetwork");

        var tmp = null;
        dbo.collection("School").findOne({messages}, {
            name: name
        }, function (err, result) {
            if (err) throw err;
                console.log(result.name);
            if (result.messages != null) {
                return result.messages;
            }
            db.close();
        });
        return tmp;

    });
}

/**
 * Allows to get the school name of a user with their mail
 * @param {*} mail the mail of the user
 */
function getSchool(mail)  {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("SocialNetwork");

        var tmp = null;
        dbo.collection("User").findOne({school_name}, {
            mail: mail
        }, function (err, result) {
            if (err) throw err;
                console.log(result.mail);
            if (result.mail != null) {
                return result.mail;
            }
            db.close();
        });
        return tmp;

    });
}

module.exports = {getChatSchool: getChatSchool, getSchool, getSchool};