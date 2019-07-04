var orm = require("../config/orm.js");

var solar = {
  all: function(cb) {
    orm.all("solars", function(res) { cb(res) });
  },

  create: function(cols, vals, cb) {
    orm.create("solars", cols, vals, function(res) { cb(res) });
  },

  update: function(objColVals, condition, cb) {
    orm.update("solars", objColVals, condition, function(res)  { cb(res) });
  },

  delete: function(condition, cb) {
    orm.delete("solars", condition, function(res) { cb(res) });
  }
};

module.exports = solar;