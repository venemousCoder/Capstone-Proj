const fs = require("fs");
const url = require("url");
const mod = require("../models/myusers");
const spices = require("../models/spices");

//getting data from a json file

var items = fs.readFileSync("./public/items.json", "utf8");
let item = JSON.parse(items);

//middlewares


//routes controllers

function homeRoute(req, res) {
    res.render("home.ejs", { items: item });
}

//get all users controllers

function showSubs(req, res) {
    mod.user
        .find()
        .then((subs) => {
            subs.forEach((elm) => {
                elm.populate("spiceCourse").then((item) => {
                    return item.spiceCourse;
                });
            });
            setTimeout(() => {
                res.render("contact.ejs", { users: subs });
            }, 200);
        })
        .catch((err) => console.log(err));
}


//show a specific user


function showUserM(req, res, next) {
    mod.user
        .findById(req.params.id)
        .then((resul) => {
            resul.populate("spiceCourse").then((resu) => {
                res.locals.resul = resul;
                next();
            });
        })
        .catch((err) => {
            console.log(err);
            next();
        });
}
function showUser(req, res) {
    res.render("user.ejs", { user: res.locals.resul });
}

//update a user's profile controllers

function updateUserM(req, res, next) {
    mod.user
        .findById(req.params.id)
        .then((result) => {
            result
            res.locals.result = result;
            next();
        })
        .catch((err) => {
            console.log(err);
            next();
        });
}
function updateUser(req, res) {
    var updatedProfile = {
        userName: req.body.username,
        email: req.body.email,
        subscribed: req.body.subscribe,
    };
    mod.user.findByIdAndUpdate(res.locals.result._id, { $set: updatedProfile })
        .then(() => {
            res.render("user.ejs", { user: res.locals.result });
        })
        .catch((err) => {
            res.render("update.ejs", { user: res.locals.result, error: err || null });
            console.log(err);
        })
}
function updateUserGet(req, res) {
    res.render("update.ejs", { user: res.locals.result, error: null });
}

//delete controllers

function deleteUserM(req, res) {
    mod.user.findByIdAndDelete(req.params.id)
        .then((resu) => {
            res.redirect("/subs");
        })
        .catch((err) => {
            res.render("home.ejs");
            console.log(err);
        })
}

function deleteUser(req, res) {
    res.render("contact.ejs", { users: res.locals.result });
}


//other controllers
function spicesRoute(req, res, next) {
    res.redirect(res.locals.redirect);
    next();
}

function spicesRouteGetM(req, res, next) {
    spices.spicy.find()
        .then((spicer) => {
            res.locals.spicer = spicer
            next()
        })
        .catch((err) => {
            console.log(err)
            next()
        })
}

function spicesRouteGet(req, res,) {
    res.render('spicies.ejs', { spicer: res.locals.spicer });
}

function spicesRouteMiddleWare(req, res, next) {
    mod.user
        .create({
            userName: req.body.username,
            email: req.body.email,
            subscribed: req.body.subscribe,
        })
        .then(() => {
            res.locals.redirect = "/subs";
            next();
        })
        .catch((err) => {
            res.render("signin.ejs", { error: err || null });
            next();
        });
}

function loginRoute(req, res) {
    res.render("login.ejs");
}

function signinRoute(req, res) {
    res.render("signin.ejs", { error: null });
}

// error handling controller

function errRoute(req, res) {
    if (res.statusCode !== 404) {
        res.render("error.ejs", {
            error: res.statusCode,
            error1: res.statusMesssage,
        });
    } else {
        res.render("error.ejs", {
            error: (res.statusCode = 404),
            error1: res.statusMesssage,
        });
    }
}

module.exports = {
    signinRoute,
    spicesRoute,
    spicesRouteGetM,
    spicesRouteGet,
    spicesRouteMiddleWare,
    loginRoute,
    homeRoute,
    errRoute,
    showSubs,
    showUserM,
    showUser,
    updateUserM,
    updateUser,
    updateUserGet,
    deleteUserM,
    deleteUser,
};
