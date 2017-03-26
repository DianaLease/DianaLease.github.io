$('#movie-search-form').keyup(function(e) {  // this function fires on keyup. as you type in the searchbar, it fires searchIMDB function
  e.preventDefault();
  $('.result').hide(); // while we wait for the API to respond, we hide the last search result for that split second
  var userSearchQuery = this.query.value;
  if (userSearchQuery.length > 2){
    searchOMDB(userSearchQuery)
  }
   // calling the next function with the text the user inputs, "this refers to the object you are talking about (here, movie search form)"
});

function searchOMDB(query) {
  // this is the function that makes the request with jQuerys's getJSON  http://www.ombdapi.com/?t=something
  $.getJSON('https://www.omdbapi.com/', {  // $ means "jQuery"
    t: query, // this query comes from the argument passed in parens above, which
    plot: "short",
    r: 'json'
  }, function(omdbData) { //this function fires after the network request finishes.
    if (omdbData.Response === "True"){
      renderMovie(omdbData);
      console.log(omdbData);
    // Things worked! Show the movie data by calling the renderMovie function, pass in the omdbData variable
    } else {
      // render an error here.
      renderError();
      console.log(omdbData);
    }
  });
}

function renderMovie(data) {
  $('.result').show(); // this shows the div with class "result"
  // we aren't done here! we need some more code to show the data and the
  $('#title').html(data.Title);
  $('#year').html(data.Year);
  $('#rated').html(data.Rated);
  $('#actors').html(data.Actors);
  $('#poster').attr('src',data.Poster)
  $('.error').hide();
}

function renderError() {
  $('.error').show();
}
