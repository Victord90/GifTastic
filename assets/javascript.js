$(document).ready(function(){


    let players = ["Michael Jordan", "Kobe Bryant", "Steph Curry", "Kevin Durant"];



    function displayNames () {
        $("#gifs").empty();
        let player = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + player + "&api_key=CjNGByaxkP2CCVFXOKYVhWl0llZIjF5S&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function(response){
                console.log(response)
                var results = response.data;
                
                   for (var j = 0; j < results.length; j++){
                    var newPlayerdiv = $("<div>");
                    var rating = $("<p>").text("Rating: " + results[j].rating);
                    var gifURL = results[j].images.fixed_height_still.url;
                    var gif = $("<img>");
                    gif.attr("src", gifURL);
                    gif.attr("data-still", results[j].images.fixed_height_still.url);
                    gif.attr("data-animate", results[j].images.fixed_height.url);
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