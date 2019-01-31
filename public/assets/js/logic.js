//Encapsulate all in a function to prevent from triggering on page load
$(function() {
    //Devour Status
    $(".set-devour").on("click", function(event) {
        var id = $(this).data("id");
        var status = $(this).data("devoured");
        if (status === 0) {
            //then set to one
            status = 1
        } else {
            //otherwise default to 0
            status = 0
        };

        var devourState = {
            devoured: status
        };

        $.ajax("/api/burger/" + id, {
            type: "PUT",
            data: devourState
        }).then(
            function() {
                console.log("New Devour Status: ", devourState);
                location.reload();
            }
        )
    });

    //New Order
    $(".create-order").on("submit", function(event) {
        event.preventDefault();

        var newOrder = {
            burger_name: $(".newOrder").val().trim(),
            devoured: 0
        };

        //now send to the database
        $.ajax("/api/burger", {
            type: "POST",
            data: newOrder
        }).then(
            function() {
                console.log("burger added!");
                //now reload the page to view new order
                location.reload();

                //now clear the form data
                $(".newOrder").val("");
            }
        )
    });

//end function
})