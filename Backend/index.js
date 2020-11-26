const express = require('express');
const bodyParser = require('body-parser');
const Morgan = require('morgan');
const cors = require('cors')

// create express app
let app = express();

// log by using morgan
app.use(Morgan('combined'));


// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json({
    limit:'5mb'
}));
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(cors({credentials: true, origin: 'http://localhost:9528'}));

// define a root route
app.get('/', (req, res) => {
    res.send("Homepage");
});

require('./src/routes')(app);

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

