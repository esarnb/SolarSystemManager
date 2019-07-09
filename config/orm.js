var connection = require("../config/connection.js");

/**
 * 
 * @param {INTEGER} num is the amount of question marks to return.
 * 
 * Function returns a list of question marks as a string.
 */
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) { arr.push("?"); }
  return arr.toString();
}

/**
 * 
 * @param {OBJECT} ob is the object to be converted.
 * 
 * Function converts obj keys & values to sql ids & values
 */
function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) value = `'${value}'`;
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}


var orm = {
  //Display all planets to the user.
  selectAll: function(tableInput, cb) {
    connection.query(`SELECT * FROM ${tableInput}`, function(err, result) {
      if (err) throw err; cb(result);
    });
  },

  //Create a new planet and add it to the system.
  insertOne: function(table, cols, vals, cb) {
    connection.query(`INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`, vals, function(err, result) {
      if (err) throw err; cb(result);
    });
  },

  //Update a specific item's property.
  updateOne: function(table, objColVals, condition, cb) {
    connection.query(`UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`, function(err, result) {
      if (err) throw err; cb(result);
    });
  },

  //Delete a specific planet.
  delete: function(table, condition, cb) {
    connection.query(`DELETE FROM ${table} WHERE ${condition}`, function(err, result) {
      if (err) throw err; cb(result);
    });
  }
};

module.exports = orm;
