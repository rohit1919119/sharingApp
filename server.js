const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');


app.use(express.json());
// import and connect database
const connectDB = require('./config/db.js');
connectDB();

app.set("views",path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));


// app.get('/', function(req, res) {
    //     res.send('Hello !')
    // });
    
    app.listen(PORT, function() {
        console.log(`file-sharing app listening on port ${PORT}!`)
    });