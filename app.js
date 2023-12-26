const express = require('express');
const ejs = require('ejs');
const control = require('./controllers/controller.js')
const path = require('path');
const mongoose = require('mongoose');

//app and DB settings

//DB settings

mongoose.connect("mongodb://127.0.0.1:27017/spiciesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to db'))
    .catch(error => console.log(error.message))

//app settings

const app = express();
app.set('view engine', ejs);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use((req, res, next) => {
//     console.table(['Url', req.url, 'Path', req.path, 'Method', req.method, 'Query', req.body.email, 'Status', req.statusCode, 'Message', req.statusMessage])
//     next()
// })

//server port
let port = process.env_PORT || 3000


//routes

app.get('/', control.homeRoute)
app.get('/login', control.loginRoute)
app.get('/signin', control.signinRoute)
app.get('/subs', control.showSubs)
app.post('/spicies', control.spicesRoute);
app.get('*', control.errRoute)
app.post('*', control.errRoute)



//server connection

app.listen(port, (err) => {
    err ? console.log(err) : console.log('server listening at port ' + port)
})