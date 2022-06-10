var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

    /**
     * 
     * @param {*} name 
     * @returns 
     */
 getChatSchool(name){
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
}

