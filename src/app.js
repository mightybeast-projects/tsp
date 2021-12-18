const express = require('express');
var bodyParser = require('body-parser');
var routes = require("./routes");

const app = new express();
const port = 3000;

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})