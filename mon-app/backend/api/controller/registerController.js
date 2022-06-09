function registerUser(name, mail, password, profile_img, school_name, job, old_age) {
    var myobj = []
    if (name.length == mail.length == profile_img.length == school_name.length == job.length == old_age.length && job.length != 0) {
        for (i = 0; i < mail.length; i++) {
            var data = {
                name: name[i],
                mail: mail[i],
                password: password[i],
                profile_img: profile_img[i],
                school_name: school_name[i],
                job: job[i],
                old_age: old_age[i]
            }
            myobj.push(data);
        }
        dbo.collection("User").insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    } else {
        console.log("We can't insert in table User cause the data haven't the same size.");
    }
}