const express = require('express');
const router = express.Router();
const asyncMiddleware = require("./functions").asyncMiddleware;
const htmlescape = require("./functions").htmlescape;
const login = require('./controller/loginController');


router.get('/', asyncMiddleware(async (req, res, next) => {
    if (req.session.email) {
        res.redirect('home');
    }
    res.render('login', {error: false, fromregister: false});
}));

router.post('/', asyncMiddleware(async (req, res, next) => {
    //console.log(req.body);
    //console.log(login)
    if (req.body.email && req.body.password) {
        const t = login.verifyExistingUser(req.body.email, req.body.password);
        if (t != null){
            res.send(t);
        }

    } else {
        console.log("error");
        res.send("error");
    }
    //res.render('login', {error: true, fromregister: false}); //Retour sur login avec une option indiquant une erreur
}));

//Déconnecte l'utilisateur et le redirige vers l'index.
router.get('/disconnect', asyncMiddleware(async (req, res, next) => {
    req.session = null;
    res.redirect('/');
}));

module.exports = router;