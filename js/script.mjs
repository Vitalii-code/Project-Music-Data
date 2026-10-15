// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// TODO! make pressing enter submit the form

import { getListenEvents, getSong, getUserIDs } from "./data.mjs";
import { populateSelector, Song } from "./common.mjs";
import {
  findMostListened,
  findMostListenedBySeconds,
  findMostConsecutiveListened,
  onlyFridays,
} from "./processing.js";

const NO_DATA_MESSAGE = "No data to display";

function insertSongData(element, songTitle, artist) {
  if (artist === "") {
    element.innerText = NO_DATA_MESSAGE;
    return;
  }

  if (songTitle !== "") {
    element.innerText = `${songTitle} by ${artist}`;
  } else {
    element.innerText = artist;
  }
}

function displaySongResult(result, songID) {
  if (songID === null) {
    result.closest("section").hidden = true;
    return;
  }

  const song = new Song(songID);
  insertSongData(result, song.title, song.artist);
}

function loadUserData(userID, display) {
  const listenEvents = getListenEvents(userID);

  if (listenEvents.length === 0) {
    display.replaceChildren();
    display.innerHTML = `<p>${NO_DATA_MESSAGE}</p>`;
    return;
  }

  const reportTemplate = document.getElementById("reportTemplate");
  const report = reportTemplate.content.cloneNode(true);
  display.replaceChildren(report);

  // most listened song
  const mostListenedSongID = findMostListened(listenEvents);
  displaySongResult(
    display.querySelector('[data-result="most-listened-song"]'),
    mostListenedSongID,
  );

  // most listened artist
  const mostListenedArtist = findMostListened(listenEvents, "artist");
  insertSongData(
    display.querySelector('[data-result="most-listened-artist"]'),
    "",
    mostListenedArtist,
  );

  // filter out dates and certain times
  const filtered = onlyFridays(listenEvents);
  const fridayResult = display.querySelector(
    '[data-result="most-listened-song-on-friday"]',
  );

  if (filtered.length === 0) {
    fridayResult.closest("section").hidden = true;
  } else {
    const mostListenedOnFridaysID = findMostListened(filtered);
    displaySongResult(
      fridayResult,
      mostListenedOnFridaysID,
    );
  }

  displaySongResult(
    display.querySelector('[data-result="most-listened-by-seconds"]'),
    findMostListenedBySeconds(listenEvents),
  );

  displaySongResult(
    display.querySelector('[data-result="most-consecutive-listened"]'),
    findMostConsecutiveListened(listenEvents),
  );
}

function main() {
  const userSelector = document.getElementById("userSelector");
  const loginForm = document.getElementById("loginForm");
  const dataDisplay = document.getElementById("dataDisplay");
  const reportTemplate = document.getElementById("reportTemplate");

  populateSelector(userSelector, getUserIDs());
  dataDisplay.append(reportTemplate.content.cloneNode(true));

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentUserID = userSelector.value;

    loadUserData(currentUserID, dataDisplay);
  });
}

main();
