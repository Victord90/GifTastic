$(document).ready(function(){


    let players = ["Michael Jordan", "Kobe Bryant", "Steph Curry", "Kevin Durant"];



    function displayNames () {
        $("#gifs").empty();
        let player = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + player + "&api_key=CjNGByaxkP2CCVFXOKYVhWl0llZIjF5S&limit=10";

    }








})