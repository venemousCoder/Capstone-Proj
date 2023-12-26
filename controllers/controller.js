const fs = require('fs');
const url = require('url');
const mod = require('../models/myusers');
const spices = require('../models/spices');

//getting data from a json file

var items = fs.readFileSync('./public/items.json', 'utf8')
let item = JSON.parse(items);

//middlewares

function showSubs(req, res) {
    mod.user.find({ subscribed: "on" })
        .then((subs) => {
            req.data = subs;
            res.send(req.data)
            // console.log(subs[17].spiceCourse);
            spices.spicy.find({ spiceName: "Blazing Garlic Powder" })
                .then((spicer) => {
                    subs[17].spiceCourse.push(spicer[0]._id);
                    subs[17].save()
                    spicer[0].save()
                    subs[17].populate('spiceCourse').then((test)=>{

                        console.log('\n test: \n',test);
                    })
                })
                .catch(err => console.log(err))
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