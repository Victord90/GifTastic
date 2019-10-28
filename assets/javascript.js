$(document).ready(function(){


    var players = ["Michael Jordan", "Kobe Bryant", "Steph Curry", "Kevin Durant"];



    function displayNames() {
        $("#gifs").empty();
        var player = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CjNGByaxkP2CCVFXOKYVhWl0llZIjF5S&q=" + player + "&limit=10&rating=PG&lang=en";


        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(queryURL)
                var results = response.data;
                
                
                   for (var i = 0; i < results.length; i++){
                    var newPlayerdiv = $("<div>");
                    var rating = results[i].rating
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var gifURL = results[i].images.fixed_height_still.url;
                    var gif = $("<img>");
                    gif.attr("src", gifURL);
                    gif.attr("data-still", results[i].images.fixed_height_still.url);
                    gif.attr("data-animate", results[i].images.fixed_height.url);
                    gif.attr("data-state", "still");
                    gif.addclass("animate-gif");

                    newPlayerdiv.append(rating);
                    newPlayerdiv.append(gif);
                   
                    $("#gifs").prepend(newPlayerdiv);
                    
                    
                }
            });
        }

        function renderButton() {

            $("#buttons").empty();

            for (var i = 0; i < players.length; i++){
                

                var newButton = $("<button>");

                newButton.attr("data-name", players[i]);
                newButton.text(players[i]);
                $("#buttons").append(newButton);

            }

    }

    $("#add-player").on("click", function(event) {
        event.preventDefault();


        var newPlayer = $("#adding-player").val().trim();


        players.push(newPlayer);
        console.log(players);


        renderButton();


    });

    function runGif (){
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    }

    $(document).on("click", ".player", displayNames);
    $(document).on("click", ".animate-gif", runGif);





    renderButton();
});