const express = require('express');
const router = express.Router();
const asyncMiddleware = require("./functions").asyncMiddleware;
const htmlescape = require("./functions").htmlescape;
const register = require('./controller/registerController');
const login = require('./controller/loginController');

router.post('/', asyncMiddleware(async (req, res, next) => {
    if (req.body.email && req.body.password) {
        const t = login.verifyExistingUser(req.body.email, req.body.password);
        if (t == null){

            register.registerUser(req.body.first_name, req.body.second_name, req.body.email, req.body.password);
            var j = login.verifyExistingUser(req.body.email, req.body.password);
            console.log(j);
            res.send(j);
        }
    }
    res.render('login', {error: true, fromregister: false}); //Retour sur login avec une option indiquant une erreur
}));


module.exports = router;