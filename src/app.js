const express = require('express');
var routes = require("./routes");

const app = new express();
const port = 3000;

app.use("/", routes);
app.use(express.static('static'))

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})