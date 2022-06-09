const express = require('express');
const router = express.Router();
const social_network = require('social_network').user_dao;
const asyncMiddleware = require("./functions").asyncMiddleware;
const htmlescape = require("./functions").htmlescape;
const fonction = require('function');

router.get('/', asyncMiddleware(async (req, res, next) => {
    if (req.session.email) {
        res.redirect('home');
    }
    res.render('login', {error: false, fromregister: false});
}));

router.post('/', asyncMiddleware(async (req, res, next) => {
    if (req.body.email && req.body.password) {
        const t = fonction.verifyExistingUser(req.body.email, req.body.password);
        if (t != null){
            res.append(t);
        }
    
    }
    res.render('login', {error: true, fromregister: false}); //Retour sur login avec une option indiquant une erreur
}));

//Déconnecte l'utilisateur et le redirige vers l'index.
router.get('/disconnect', asyncMiddleware(async (req, res, next) => {
    req.session = null;
    res.redirect('/');
}));

module.exports = router;