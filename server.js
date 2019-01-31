var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

//allow us to use static assets files
app.use(express.static("public"));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burger_controllers.js");

app.use(routes);

//start server and listener
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});