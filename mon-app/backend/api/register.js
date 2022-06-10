const express = require('express');
const router = express.Router();
const asyncMiddleware = require("./functions").asyncMiddleware;
const htmlescape = require("./functions").htmlescape;

router.post('/', asyncMiddleware(async (req, res, next) => {
    if (req.body.email && req.body.password) {
        const t = fonction.verifyExistingUser(req.body.email, req.body.password);
        if (t == null){
            const name = [req.body.name];
            const mail = [req.body.mail];
            const profile_img = [req.body.profile_img];
            const school = [req.body.school_name];
            const job = [req.body.job];
            const old_age = [req.body.old_age];
            fonction.insertUsers(name, mail, profile_img, school, job, old_age);
            res.append(fonction.verifyExistingUser(req.body.email, req.body.password));
        }
    }
    res.render('login', {error: true, fromregister: false}); //Retour sur login avec une option indiquant une erreur
}));


module.exports = router;