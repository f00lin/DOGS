// capture webview
var webview=document.querySelector("webview");


// image sources
var imgurBase = "http://imgur.com/hot/time?q=";
var googleBase = "https://www.google.com/search?tbm=isch&q="
var bingBase = "http://www.bing.com/images/search?q=";
var baseURLS = [imgurBase, googleBase, bingBase];

// gif sources
var googleBase = "https://www.google.com/search?tbm=isch&q="
var bingBase = "http://www.bing.com/images/search?q=";
var gifBaseURLS = [googleBase, bingBase];

// video sources
var youtubeBase = "https://www.youtube.com/results?search_query=";
var videoBaseURLS = [youtubeBase];


// search terms
var primaryTerm = ["dogs", "puppies"];

var secondaryTerm = ["bad", "good", "dumb", "gif", "greedy", "naughty", "loving", "newborn", "cute", 
                     "loyal", "misbehaving", "playing", "running", "swimming", "fetching", "working", 
                     "beach", "in clothes"];

var breedTerm = ["boston terrier", "french bulldog"];




// random 50/50 tester
var randomYesNoTest = function() {
    var rand = Math.random();
    if(rand >= 0.5) {
        var answer = 0;
    }
    else {
        var answer = 1;
    }
    return answer
}


// returns a random item from a given array
var randomArrayChoice = function(array) {
    // generate a random number based on length of array 
    var rand = Math.random();
    rand *= array.length;
    rand = Math.floor(rand);
    // return that random selection
    return array[rand];
}


// selects a random site and performs a random search
var randomSitePics = function() {
    var baseURL = randomArrayChoice(baseURLS);
    if(baseURL === imgurBase) {
        var searchTerm = randomArrayChoice(primaryTerm);
    }
    else {
        var searchTerm = randomArrayChoice(primaryTerm) + "+" + randomArrayChoice(secondaryTerm);
    }
    webview.src = baseURL + searchTerm;
}


// restrict imgur search to wide terms
var imgurPics = function() {
    
    var baseURL = imgurBase;
    var searchTerm = randomArrayChoice(primaryTerm);
    
    webview.src = baseURL + searchTerm;
}


// more specific searches for other sources
var changePics = function(base) {
    
    var baseURL = base;
    var searchTerm = randomArrayChoice(primaryTerm) + "+" + randomArrayChoice(secondaryTerm);
    
    webview.src = baseURL + searchTerm;
}


// searches for particular types of content
var specialSearch = function(searchType) {
    
    switch(searchType){
        case 'video':
            var baseURL = randomArrayChoice(videoBaseURLS);
            var searchTerm = randomArrayChoice(primaryTerm) + "+" + randomArrayChoice(secondaryTerm);
            var source = baseURL + searchTerm;
            break;
        case 'gif':
            var baseURL = randomArrayChoice(gifBaseURLS);
            var searchTerm = randomArrayChoice(primaryTerm) + "+" + "gif";
            var source = baseURL + searchTerm;
            break;
        case 'breed':
            var baseURL = randomArrayChoice(baseURLS);
            // create random number
            var test = Math.random();
            // one third of the time add a second term to breed search...
            if(test >= 0.66 && baseURL != imgurBase) {
                var searchTerm = randomArrayChoice(breedTerm) + "+" + randomArrayChoice(secondaryTerm);
                var source = baseURL + searchTerm;
                break;
            }
            // ...one thrid of the time don't...
            else if(test >= 0.33) {
                var searchTerm = randomArrayChoice(breedTerm);
                var source = baseURL + searchTerm;
                break;
            }
            // ...for the other third do a video search
            else {
                var baseURL = randomArrayChoice(videoBaseURLS);
                var searchTerm = randomArrayChoice(breedTerm) + "+" + randomArrayChoice(secondaryTerm);
                var source = baseURL + searchTerm;
                break;
            }
        }
    webview.src = source;
}
            
            


// load random site and search
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#random').addEventListener('click', randomSitePics);
});



// load random search from specified site
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#random_imgur').addEventListener('click', function() {
        imgurPics();
    }, false)
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#random_bing').addEventListener('click', function() {
        changePics(bingBase);
    }, false)
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#random_google').addEventListener('click', function() {
        changePics(googleBase);
    }, false)
});



// load specific searches from random sites
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#random_gif').addEventListener('click', function() {
        specialSearch('gif');
    }, false)
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#random_video').addEventListener('click', function() {
        specialSearch('video');
    }, false)
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#random_breed').addEventListener('click', function() {
        specialSearch('breed');
    }, false)
});




// load random site and search at launch
document.addEventListener('DOMContentLoaded', function () { 
    randomSitePics();
}, false)
