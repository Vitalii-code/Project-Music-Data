// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// TODO! make pressing enter submit the form

import { getListenEvents, getSong, getUserIDs } from "./data.mjs";
import { populateSelector, Song } from "./common.mjs";
import { findMostListened, onlyFridays } from "./processing.js";

const NO_DATA_MESSAGE = "No data to display";

function resetDisplay(display) {
  display.innerHTML = `<p>${NO_DATA_MESSAGE}</p>`;
}

function insertSongData(selector, songTitle, artist) {
  if (songTitle !== "") {
    document.getElementById(selector).innerText = `${songTitle} by ${artist}`;
  } else {
    document.getElementById(selector).innerText = artist;
  }
}

function loadUserData(userID, display) {
  const listenEvents = getListenEvents(userID);

  const mostListenedSongID = findMostListened(listenEvents);
  const mostListenedSong = new Song(mostListenedSongID);

  insertSongData(
    "most-listened-song",
    mostListenedSong.title,
    mostListenedSong.artist,
  );

  const mostListenedArtist = findMostListened(listenEvents, "artist");
  console.log(mostListenedArtist);

  // const mostListenedArtist = new Song(mostListenedArtistID);

  insertSongData("most-listened-artist", "", mostListenedArtist);

  // filter out dates and certain times
  const filtered = onlyFridays(listenEvents);
  const mostListenedOnFridaysID = findMostListened(filtered);
  const mostListenedOnFridays = new Song(mostListenedOnFridaysID);

  insertSongData(
    "most-listened-song-on-friday",
    mostListenedOnFridays.title,
    mostListenedOnFridays.artist,
  );
}

function main() {
  const userSelector = document.getElementById("userSelector");
  const loginForm = document.getElementById("loginForm");
  const dataDisplay = document.getElementById("dataDisplay");

  populateSelector(userSelector, getUserIDs());

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentUserID = userSelector.value;

    // resetDisplay(dataDisplay);
    loadUserData(currentUserID, dataDisplay);
  });
}

main();
