var connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

var orm = {
    //method #1 selectAll
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], function(err, result) {
            if (err) throw err;
            // console.log(result);
            cb(result);
        })
    },

    //method #2 insertOne
    // INSERT INTO burgers SET ? [burger_name: burger, devoured: false]
    //example of we we need to recreate
    // INSERT INTO burgers (burger_name, devoured)
    // VALUES ("Blue Cheese Bacon Burger", 0),
    // ("Bacon Guacamole Burger", 0),
    // ("BBQ Chedder and Haystack Onions Burger", 0);
    insertOne: function( table, cols, vals, cb) {
        var queryString = "INSERT INTO " +table;
        
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        
        console.log("orm " +queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },

    //method #3 updateOne
    updateOne: function(tableInput, id, cb) {
        var queryString = "UPDATE ?? SET ? WHERE ?";
        var yum =
        {
            devoured: 1
        };
        var refID =
        {
            id: id
        };
        connection.query(queryString, [tableInput, yum, refID], function(err, result) {
            if (err) throw err;
            console.log(result);
            cb(result);
        })
    }

// End of ORM Variable
}

//now export this ORM model so it can be used elsewhere...
module.exports = orm;