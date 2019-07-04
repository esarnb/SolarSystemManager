var express = require("express");
var exphbs = require("express-handlebars");
var Routes = require("./controllers/ssm_controller");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(Routes);
app.listen(PORT, function() {
  console.log("App is now listening at http://localhost:" + PORT);
});
