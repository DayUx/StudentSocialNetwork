var MongoClient = require('mongodb').MongoClient;
// creation db social_network
var url = "mongodb://localhost:30000/social_network";

class User {
	constructor(name, mail, passwd, profile_img, school_name, job, old_age) {
		this.name = name;
		this.mail = mail;
        this.password = passwd;
        this.profile_img = profile_img;
        this.school_name = school_name;
        this.job = job;
        this.old_age = old_age;
	}

	/**
     * it adds collections User and Message to mongodb social_network
     * To use this function, u should open a connection to your database
     * */
	createCollections() {
		// connection à la db cinema
        var dbo = db.db("social_network");
        // création de la collection
        dbo.createCollection("User", {
            bsonType: "object",
            required: ["name", "mail", "password", "profile_img", "school_name", "job", "old_age"],
            properties: {
            name: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            mail: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            password: {
                bsonType: "string",
                description: "must be an integer and is required"
            },
            profile_img: {
                bsonType: "string",
                description: "must be a string and is required"
                },
                school_name: {
                bsonType: "string",
                description: "must be a string and is required"
                },
            job: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            old_age: {
                bsonType: "int",
                description: "must be an integer and is required"
            }
            }
        });
        dbo.createCollection("School", {
            
          bsonType: "object",
          required: ["nom", "description", "ville","messages","users"],
          properties: {
          nom: {
              bsonType: "string",
              description: "must be a string and is required"
          },
          description: {
              bsonType: "string",
              description: "must be a string and is required"
          },
          ville:{
              bsonType: "string",
              description: "must be a string and is required"
          },
          messages:{
              bsonType: "array",
              items: {
                  bsonType: "object",
                  required: ["date", "message", "id_user"],
                  properties: {
                  date: {
                      bsonType: "string",
                      description: "must be a string and is required"
                  },
                  message: {
                      bsonType: "string",
                      description: "must be a string and is required"
                  },
                  id_user: {
                      bsonType: "string",
                      description: "must be a string and is required"
                      }
              }
          }},
          users: {
              bsonType: "array",
              items: {
                  user_id: {
                      bsonType: "string",
                      description: "must be a string and is required"
                  }
              }
          }
          }
        });
      }

  /**
   * Allows you to delete a user in the db
   * @param {*} nom name of the user you want to delete
   * @param {*} mail mail of the user you want to delete
   */
  deleteUser(nom, mail){
    var myquery = { nom: nom, mail: mail};
    dbo.collection("User").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  }
  /**
   * Allows you to delete a school in the db
   * @param {*} nom name of the school you want to delete
   * @param {*} ville city of the school you want to delete
   */
   deleteSchool(nom, ville){
    var myquery = { nom: nom, ville: ville};
    dbo.collection("School").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  }
  /**
   * Allows to insert some users in the table User
   * @param {*} name the names of the users
   * @param {*} mail the mails of the users
   * @param {*} password the password of the users
   * @param {*} profile_img the images link of the users
   * @param {*} school_name the school names of the users
   * @param {*} job the jobs of the users
   * @param {*} old_age the ages of the users
   */
    insertUsers(name, mail, password, profile_img, school_name, job, old_age){
      var myobj = []
      if (name.length == mail.length == profile_img.length == school_name.length == job.length == old_age.length && job.length != 0){
        for (i = 0; i < mail.length; i++){
          var data = {
              name: name[i], mail: mail[i], password: password[i], profile_img: profile_img[i], school_name: school_name[i], job: job[i], old_age: old_age[i]
          }
          myobj.push(data);
        }
        dbo.collection("User").insertMany(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      }else {
        console.log("We can't insert in table User cause the data haven't the same size.");
      }
      
    }
    /**
     * Allows to insert ONE school
     * @param {*} name 
     * @param {*} description 
     * @param {*} ville 
     */
    insertSchool(name, description, ville, users_id){
      var msg = []
      var usr = [{
        user_id: users_id
      }]
      var myobj = [
        {
          nom: name, description: description, ville: ville, messages: msg, users: usr
        }
      ]
      dbo.collection("School").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });     
    }

    verifyExistingUser(mail, mdp){
      var tmp = null;
      dbo.collection("User").findOne({name, profile_img, school_name, job, old_age}, {mail : mail, password: mdp}, function(err, result) {
        if (err) throw err;
          console.log(result.name);
          if (result.name != null){
            return [name, profile_img, school_name, job, old_age];
          }
        db.close();
      });
      return tmp;
    }
}

MongoClient.connect(url_user, function(err, db) {
  if (err) throw err;
  // connection à la db cinema
  var dbo = db.db("cinema");
  // création de la collection
  dbo.createCollection("Marque", {
    validator: {
       $jsonSchema: {
        bsonType: "object",
        required: [ "marque", "prix", "nom", "reference", "category", "list_taille", "fournisseur", "id_rayon" ],
        properties: {
           marque: {
              bsonType: "string",
              description: "must be a string and is required"
           },
           prix: {
              bsonType: "int",
              description: "must be an integer and is required"
           },
           nom: {
            bsonType: "string",
            description: "must be a string and is required"
            },
            reference: {
            bsonType: "int",
            description: "must be an integer and is required"
            },
           category: {
              enum: [ "Enfant", "Junior", "Senior", null ],
              description: "can only be one of the enum values and is required"
           },
           list_taille: {
            enum: [ "XS", "S", "M", "L", "XL", null ],
            description: "can only be one of the enum values and is required"
         },
           
           fournisseur: {
              bsonType: "object",
              required: [ "nom", "ville" ],
              properties: {
                 nom: {
                    bsonType: "string",
                    description: "must be a string and is required"
                 },
                 ville: {
                    bsonType: "string",
                    description: "must be a string and is required"
                 }
              }
              
           },
           id_rayon: {
            bsonType: [ "int" ],
            description: "must be a int and is required"
         }
        }
    }}, function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  }});
  // insertion
  var myobj = [
    { marque: "Nike", prix: 40, nom:"Airmax", reference: 168372, category: "Junior", list_taille: "S", fournisseur: { nom: "NikeFR", ville: "Troye"}
    },
    { marque: "QuikSilver", prix: 55, nom:"Short", reference: 381738, category: "Senior", list_taille: "XL", fournisseur: { nom: "NB_France", ville: "Lille"}
    },
  ]
  dbo.collection("cinema").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
  /**
  // delete une marque
  var myquery = { nom:'Airmax' };
  dbo.collection("cinema").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
  //list
  dbo.collection("cinema").findOne({acteurs}, {titre : 'Star Wars'}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
  // update
  var myquery = { nom: "Airmax" };
  var newvalues = { $set: {prix: 80" } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
  // list all
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
  // delete one
  var myquery = { nom: 'Airmax' };
  dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
  */
  db.close();

});