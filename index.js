const express = require('express');
const app = express();
const port  = 3000

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());

// For URL encoded data
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index.js'))
app.use(express.static('public'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
    console.log(`Server is running in port: ${port}`)
})