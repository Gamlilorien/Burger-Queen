var orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
        // Find all from the burgers db table.
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    create: function(cols, vals, cb) {
        // Add a new item to the burgers table from user input.
        orm.insertOne("burgers", cols, vals, function(res) {
            cb(res);
        });
    },
    update: function(id, cb) {
        // Set existing burger to devoured!
        orm.updateOne("burgers", id, function(res) {
            //cb(res);
            console.log("why?")
        });
    }

//end of Burger VAR
}


//Now export for use in other files
module.exports = burger;