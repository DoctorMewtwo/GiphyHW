var Subjects = ["Cat" , "Dog" , "Bird" , "Snake" , "Kitten" , "Dolphin" , "Shark", "Puppy" , "Lizard" , "Mouse"];



  $(document).ready( function() {

    function loadButtons() {

        $("#Buttons").empty();
    
        for(i = 0; i < Subjects.length; i++)
        {
            var b = $("<button>").text(Subjects[i]);
            b.attr("data-animal" , Subjects[i]);
            b.attr("class" , "btn btn-primary subject");
            b.attr("data" , "still");
            $("#Buttons").append(b);
        }
    }

    loadButtons();

    $("#Submit").on("click" , function(event) {
        event.preventDefault();
    
        var subject = $("#Subject").val();
    
        Subjects.push(subject);
    
        loadButtons();
    
    })
    
    
    


    
});

$('body').on("click", ".subject", function (){

    $("#Gifs").empty();
    var person = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=ozJFPrSLEpYOgmn2w9kv2d2kRJwvJo7T&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) 
      {

        var results = response.data;


        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          console.log(results[i]);
          personImage.attr("data-still", results[i].images["fixed_height_still"].url);
          personImage.attr("data-animate", results[i].images["fixed_height"].url);
          personImage.attr("src" , results[i].images["fixed_height_still"].url);
          personImage.attr("data-state" , "still");
          personImage.attr("class" , "Image");
          

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#Gifs").prepend(gifDiv);
        }
      });
  });

$('body').on("click", ".Image", function (){

    var state = $(this).attr("data-state");

    console.log(state);

    if(state === "still")
    {
      $(this).attr("src" , $(this).attr("data-animate"));
      $(this).attr("data-state" , "animate");
    }

    if(state === "animate")
    {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state" , "still");
    }
  })