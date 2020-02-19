// https://itunes.apple.com/us/rss/topsongs/all/limit=20/json

function addEventToAudio() {
    var song = document.getElementsByClassName('songUnique');
    for (var i = 0; i < song.length; i++) {
        song[i].addEventListener('click', function(e) {
            var target = e.target;
            var div = target.parentElement;
            var audio = div.getElementsByTagName('audio');
            for (var k = 0; k < song.length; k++) {
                var audiosecondTime = song[k].getElementsByTagName('audio');
                if (audiosecondTime[0].paused == false) {
                    audiosecondTime[0].pause();
                }
            }
            audio[0].play();
        })
    }
}

function renderSongs(responseData) {
    var song_container = document.getElementById('song_container');
    var songs = responseData.feed.entry;
    for (var i = 0; i < songs.length; i++) {
        var song = songs[i];
        var name = song['im:name'].label;
        var imgSrc = song['im:image'][0].label;
        var artist = song['im:artist'].label;
        var audioSrc = song.link[1].attributes.href;
        var id = song.id.attributes['im:id'];
        song_container.innerHTML += `
        <div class='songUnique'>
            <img src='${imgSrc}' width='50px' height='50px'>
            <audio src='${audioSrc}'></audio>
            <p style= 'font-weight: bold;' width='50px'>${name}</p>
            <div>${artist}</div>
        </div>
        `
    }
    addEventToAudio();
}

function renderAlbums(responseData) {
    var song_container = document.getElementById('song_container');
    var songs = responseData.feed.entry;
    for (var i = 0; i < songs.length; i++) {
        var song = songs[i];
        var name = song['im:name'].label;
        var imgSrc = song['im:image'][0].label;
        var artist = song['im:artist'].label;
        var id = song.id.attributes['im:id'];
        song_container.innerHTML += `
        <div class='songUnique'>
            <img src='${imgSrc}' width='50px' height='50px'>
            <p style= 'font-weight: bold;' width='50px' class='song_title'>${name}</p>
            <div>${artist}</div>
        </div>
        `
    }
}

async function fetchSong(top, num_song) {
    var rawData = await fetch(`https://itunes.apple.com/us/rss/${top}/all/limit=${num_song}/json`);
    var responseData = await rawData.json();
    if (top == 'topsongs') {
        renderSongs(responseData);
    } else {
        renderAlbums(responseData);
    }

}


var top_options = document.getElementById('top_options');
top_options.addEventListener('change', function() {
    var song_container = document.getElementById('song_container');
    song_container.innerHTML = '';
    fetchSong(top_options.value, num_song_options.value);
})

var num_song_options = document.getElementById('num_song_options');
num_song_options.addEventListener('change', function() {
    var song_container = document.getElementById('song_container');
    song_container.innerHTML = '';
    fetchSong(top_options.value, num_song_options.value);
})

fetchSong('topsongs', '20');