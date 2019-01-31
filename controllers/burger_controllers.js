var express = require("express");
var router = express.Router();

//Require the model established in the burger.js file
var burger = require("../models/burger.js");

//We need 3 basic routes:
//Create the `router` for the app, and export the `router` at the end of your file.

        //#1 Home (ie show all)
        router.get("/", function(req, res) {
            burger.all(
                function(data) {
                    var hbsObject = {
                        burgers: data
                    };
                    //console.log(hbsObject);
                    //now send results to Handlebars template
                    res.render("index", hbsObject);
                }
            )
            
        });
  
 
        //#2 Add
        router.post("/api/burger", function(req, res) {
            burger.create([
                "burger_name"
            ], [
                req.body.burger_name
            ], function(result) {
                //now that the burger has been created, send back the ID
                res.json({id: resultinsertId});
            })
        });

        //#3 Update
        router.put("/api/burger/:id", function(req, res) {
            var condition = "id = " + req.params.id;

            console.log("condition", condition);

            burger.update({
                devoured: req.body.devoured
            }, condition, function(result) {
                if (result.changedRows == 0) {
                    //If no change to rows, then ID doesn't exist
                    return res.status(404).end();
                } else {
                    //otherwise return everything is Ok and end db connection.
                    res.status(200).end();
                }
            })
        });


module.exports = router;