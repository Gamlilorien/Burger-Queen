var connection = require("./connection.js");


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
    insertOne: function(tableInput, textInput) {
        var queryString = "INSERT INTO ?? SET ?";
        var dbEntry =
        {
            burger_name: textInput,
            devoured: 0
        };
        connection.query(queryString, [tableInput, dbEntry], function(err, result) {
            if (err) throw err;
            console.log(result);
        })
    },

    //method #3 updateOne
    updateOne: function(tableInput, id) {
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
        })
    }

// End of ORM Variable
}

//now export this ORM model so it can be used elsewhere...
module.exports = orm;