const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/testcontactDance');
}
const port = 8000;

// Define Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS 
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug');
});

app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug');
});

app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params);
});

app.get('/classinfo', (req, res) => {
    const params = {}
    res.status(200).render('classinfo.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
            res.send("This items has been saved to the database")
        }).catch(() => {
            res.status(400).send("Items was not saved to the database")
        })
        // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});