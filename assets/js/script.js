var topics = ["frodo baggins", "peregrin took", "samwise gamgee", "meriadoc brandybuck", "gandalf", "aragorn"];

function buttonAppend() {
    for (var i = 0; i < topics.length; i++) {
        var button = '<button type="button">' + topics[i] + '</button>';
        $("#button-space").append(button);
    }
}

buttonAppend();


$("#button-space").on("click", "button", function() {


    var queryTerm = $(this).text();
    var rand = Math.floor(Math.random() * 100);
    var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + queryTerm + '&limit=10&rating=g&offset=' + rand +'&api_key=dc6zaTOxFJmzC'

    $.ajax({
        url: queryUrl,
        method: "GET"
    })

    .done(function(results) {        
        for (var i = 0; i < (results.data.length); i++) {

            var imgStill = results.data[i].images.original_still.url;
            var imgAnimate = results.data[i].images.original.url;
            var imgTag = '<img src="' + imgStill + '" data-still="' + imgStill + '" data-animate="' + imgAnimate + '" data-state="still" class="gif">';
            //var image = '<div class="image">' + imgTag + '</div>';
            var rating = '<div class="rating"><p> Rating: ' + results.data[i].rating.toUpperCase() + '</p></div>';
            var response = '<div class="response">' + imgTag + rating + '</div>';
            $("#results").append(response);
        }

    });
});

$("#submit").on("click", function() {
    var newButton = $("#button-name").val().trim();
    topics.push(newButton);
    $("#button-space").empty();
    buttonAppend();
    return false;
});
    

$("#results").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
          var animate = $(this).attr("data-animate");
          $(this).attr("src", animate);
          $(this).attr("data-state", "animate");
        } else {
          var still = $(this).attr("data-still");
          $(this).attr("src", still);
          $(this).attr("data-state", "still");
        }
});