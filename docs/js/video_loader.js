
function random(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Generate a random 3-5 character code.
 **/
function generateCode() {
  var result = "";
  var charBank = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  var codeLength = 3 + Math.floor(Math.random() * 2);
  for (var i = 0; i < codeLength; i++)
    result += charBank.charAt(random(charBank.length));

  return result;
}

/**
 * Load a YouTube video and return the player object.
 **/
function loadVideo(divId, onPlayerReady, onPlayerStateChange) {
  var player;
  var searchTerm = generateCode();

  console.log("Searching for: '" + searchTerm + "'");
  var resultLimit = 50; // MAX for YouTube API.
  var url = 'https://www.googleapis.com/youtube/v3/search';
  var apiKey = 'AIzaSyAQ3rs4EQAvgS9p73BaOBtbJzPwfmCbuOA'; // 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc'; // 'AIzaSyBxXAIs6riiFaKq0soAPJkh82q5_wocrxw';
  var params = {
    part: 'snippet',
    key: apiKey,
    q: searchTerm,
    maxResults: resultLimit,
    type: 'video',
    videoEmbeddable: 'true',
    videoSyndicated: 'true',
    safeSearch: 'moderate'
  };

  $.getJSON(url, params, function(searchResults) {
    console.log("Found " + searchResults.items.length + " videos.");
    if (searchResults.items.length == 0)
      return loadVideo();

    var index = random(searchResults.items.length);
    console.log("Picking video #" + index);

    player = new YT.Player(divId, {
      width: '720',
      height: '360',
      videoId: searchResults.items[index].id.videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      },
      playerVars: {
        'autoplay': 0,
        'controls': 0,
        'disablekb': 1,
        'enablejsapi': 1,
        'iv_load_policy': 3,
        'modestbranding': 1,
        'rel': 0,
        'showinfo': 0
      }
    });
  });

  return player;
}
