var router = require("express").Router();
var solar = require("../models/ssm_model");

//Main page
router.get("/", function(req, res) {
  solar.all(function(data) {
    res.render("index", { solars: data });
  });
});

//All Planets
router.get("/api/solar", function(req, res) {
  solar.all(function(data) {
    res.json(data)
  });
});

//New planet
router.post("/api/solar/new", function(req, res) {
  solar.create(["name", "ate"], [req.body.name, req.body.ate], function(result) {
    res.json({ id: result.insertId });
  });
});

//Edit planet
router.put("/api/solar/:id", function(req, res) {
  var condition = `id = ${req.params.id}`;
  solar.update( { name: req.body.name, color: req.body.color }, condition, function(result) {
      res.status(200).end();
    }
  );
});

//Remove planet
router.delete("/api/solar/:id", function(req, res) {
  var condition = `id = ${req.params.id}`;
  solar.delete(condition, function(result) {
      if (!result.affectedRows) res.status(404).end();
      else res.status(200).end();
    }
  );
});

module.exports = router;
