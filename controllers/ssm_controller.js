var router = require("express").Router();
var solar = require("../models/ssm_model");

//Main page
router.get("/", function(req, res) {
  solar.all(function(data) {
    res.render("index", { solars: data });
  });
});

//New planet
router.post("/api/solar", function(req, res) {
  solar.create(["name", "ate"], [req.body.name, req.body.ate], function(result) {
    res.json({ id: result.insertId });
  });
});

//Edit planet
router.put("/api/solar/:id", function(req, res) {
  var condition = `id = ${req.params.id}`;
  solar.update( { ate: req.body.ate }, condition, function(result) {
      if (!result.changedRows) res.status(404).end();
      else res.status(200).end();
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
