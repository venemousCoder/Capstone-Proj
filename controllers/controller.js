const fs = require('fs');
const url = require('url');
const mod = require('../models/myusers');
const spices = require('../models/spices');

//getting data from a json file

var items = fs.readFileSync('./public/items.json', 'utf8')
let item = JSON.parse(items);

//middlewares

function showSubs(req, res) {
    mod.user.find()
        .then((subs) => {
            subs.forEach((elm) => {
                // console.log(elm);
                elm.populate('spiceCourse')
                    .then((item) => {
                        return item.spiceCourse
                    })
            })
            setTimeout(() => {
                res.render('contact.ejs', { users: subs })
            }, 300)
        })
        .catch(err => console.log(err))
}

//routes

function homeRoute(req, res) {
    res.render('home.ejs', { 'items': item });
}
function courseSignUp(req, res) {
    spices.spicy.findOne()
}
function spicesRoute(req, res) {
    mod.user.create({
        userName: req.body.username,
        email: req.body.email,
        subscribed: req.body.subscribe
    }).then(() => {

        res.render('spicies.ejs',
            {
                "username": req.body.username,
                "email": req.body.email,
                "subscribed": req.body.subscribe,
                "spicer": spicer,
                "error": null
            }
        );
    })
        .catch((err) => {
            res.render('signin.ejs', { 'error': err || null });
        })
}
function loginRoute(req, res) {
    res.render('login.ejs');
}
function signinRoute(req, res) {
    res.render('signin.ejs', { 'error': null });
}

// error handling route

function errRoute(req, res) {
    if (res.statusCode !== 404) {
        res.render('error.ejs',
            {
                "error": res.statusCode,
                "error1": res.statusMesssage,
            }
        )
    } else {
        res.render('error.ejs',
            {
                "error": res.statusCode = 404,
                "error1": res.statusMesssage,
            }
        )

    }
}

module.exports = { signinRoute, spicesRoute, loginRoute, homeRoute, errRoute, showSubs, courseSignUp }