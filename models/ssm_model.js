var orm = require("../config/orm.js");

var solar = {
  //Show all planets
  all: function(cb) {
    orm.selectAll("solars", function(res) { cb(res) });
  },

  //Create a new planet
  create: function(cols, vals, cb) {
    orm.insertOne("solars", cols, vals, function(res) { cb(res) });
  },

  //Update a specific planet
  update: function(objColVals, condition, cb) {
    orm.updateOne("solars", objColVals, condition, function(res)  { cb(res) });
  },

  //Delete a specific planet
  delete: function(condition, cb) {
    orm.delete("solars", condition, function(res) { cb(res) });
  }
};

module.exports = solar;