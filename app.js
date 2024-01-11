const express = require('express');
const ejs = require('ejs');
const control = require('./controllers/controller.js')
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');



//app and DB settings

//DB settings

mongoose.connect("mongodb://127.0.0.1:27017/spiciesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to db'))
    .catch(error => console.log(error.message))

//app settings

const router = express.Router()
const app = express();
app.set('view engine', ejs);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router)
router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
// app.use((req, res, next) => {
//     console.table(['Url', req.url, 'Path', req.path, 'Method', req.method, 'Query', req.body.email, 'Status', req.statusCode, 'Message', req.statusMessage])
//     next()
// })

//server port
let port = process.env_PORT || 8000


//routes


router.get('/', control.homeRoute)
router.get('/login', control.loginRoute)
router.get('/signin', control.signinRoute)
router.get('/subs', control.showSubs)
router.delete('/subs/delete/:id', control.deleteUserM,control.showSubs)
router.get('/user/:id', control.showUserM, control.showUser)
router.get('/update/:id', control.updateUserM, control.updateUserGet)
router.put('/update/:id/', control.updateUserM, control.updateUser,control.showUserM,control.showUser)
router.get('/spicies',control.spicesRouteGetM, control.spicesRouteGet);
router.post('/spicies', control.spicesRouteMiddleWare, control.spicesRoute);
router.all('*', control.errRoute)



//server connection

app.listen(port, (err) => {
    err ? console.log(err) : console.log('server listening at port ' + port)
})