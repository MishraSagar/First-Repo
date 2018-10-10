var searchElement = document.getElementById('search');
var containerElement = document.getElementsByClassName('container')[0];
var key = "AIzaSyAq-IQgvXgBT2f0XLDt6pctNwyB3xZjFHA";
var baseUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + key + "&q=";
var xhttp = new XMLHttpRequest();
var nextPageToken;
var results;

//This function initiates and sends AJAX request and pass the results in generateVideoSnippetElements function.
function searchVideos(maxItem, isScrolled, nextPageToken){
    if (isScrolled == false) {
        containerElement.innerHTML = '';
    }

    url = baseUrl + searchElement.value + "&maxResults=" + maxItem;

    if (typeof(nextPageToken) != "undefined") {
        url += "&pageToken=" + nextPageToken;
        console.log(url);
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            results = JSON.parse(this.responseText);
            generateVideoSnippetElements(results);
        }
    }

    xhttp.open("GET", url, true);
    xhttp.send();
}

//adds event listener to input element for dynamic searching
searchElement.addEventListener('keyup', function(){
    searchVideos(12, false);
});

//adds event listener to window to allow loading of more elements on scroll.
window.addEventListener('scroll', function() {
    var nextPageToken = results.nextPageToken;
    console.log(nextPageToken);

    if (document.body.offsetHeight <= window.innerHeight + document.body.scrollTop) {
        searchVideos(12, true, nextPageToken);
    }
});

//this function generates video snippet elements and adds them to DOM.
function generateVideoSnippetElements(results) {
    var row;
    var rowHtml;
    for (var i = 0; i < results.items.length; i++) {
        if (i % 4 == 0) {
            row = document.createElement('div');
            row.className = 'row';
            rowHtml = '';
        }
        rowHtml += '<div class="col-sm-6 col-md-3"><div class="content-block"><img src="' + results.items[i].snippet.thumbnails.medium.url + '"/> <div class="content"> <h4>' + results.items[i].snippet.title + '</h4><p class="channel">' + results.items[i].snippet.channelTitle + '</p> <p class="description">' + results.items[i].snippet.description + '</p></div></div></div>';
        if (i % 4 == 3) {
            row.innerHTML = rowHtml;
            containerElement.appendChild(row);
        }
    }
}
