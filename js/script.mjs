// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getListenEvents, getUserIDs } from "./data.mjs";
import { populateSelector, Song } from "./common.mjs";
import {
  findMostListened,
  findMostListenedBySeconds,
  findMostConsecutiveListened,
  findSongsListenedEveryDay,
  findTopListened,
  onlyFridays,
} from "./processing.js";

const NO_DATA_MESSAGE = "This user didn't listen to any songs.";

function insertSongData(element, songTitle, artist) {
  if (!artist) {
    element.closest("section").hidden = true;
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

function displayConsecutiveResult(result, consecutiveResult) {
  if (consecutiveResult === null) {
    result.closest("section").hidden = true;
    return;
  }

  const [songID, listenCount] = consecutiveResult;
  const song = new Song(songID);
  result.innerText = `${song.artist} - ${song.title} (${listenCount} listens)`;
}

function displaySongList(section, list, getLabel) {
  if (list.length === 0) {
    section.hidden = true;
    return;
  }

  const result = section.querySelector("[data-result]");
  for (const value of list) {
    const item = document.createElement("li");
    item.innerText = getLabel(value);
    result.append(item);
  }
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
    '[data-result="most-listened-song-on-friday-count"]',
  );

  if (filtered.length === 0) {
    fridayResult.closest("section").hidden = true;
  } else {
    const mostListenedOnFridaysID = findMostListened(filtered);
    displaySongResult(fridayResult, mostListenedOnFridaysID);
  }

  displaySongResult(
    display.querySelector('[data-result="most-listened-by-seconds"]'),
    findMostListenedBySeconds(listenEvents),
  );

  insertSongData(
    display.querySelector('[data-result="most-listened-artist-by-seconds"]'),
    "",
    findMostListenedBySeconds(listenEvents, "artist"),
  );

  const fridayTimeResult = display.querySelector(
    '[data-result="most-listened-song-on-friday-by-seconds"]',
  );
  if (filtered.length === 0) {
    fridayTimeResult.closest("section").hidden = true;
  } else {
    displaySongResult(fridayTimeResult, findMostListenedBySeconds(filtered));
  }

  displayConsecutiveResult(
    display.querySelector('[data-result="most-consecutive-listened"]'),
    findMostConsecutiveListened(listenEvents),
  );

  displaySongList(
    display.querySelector('[data-section="every-day-songs"]'),
    findSongsListenedEveryDay(listenEvents),
    (songID) => {
      const song = new Song(songID);
      return `${song.artist} - ${song.title}`;
    },
  );

  displaySongList(
    display.querySelector('[data-section="top-genres"]'),
    findTopListened(listenEvents, "genre"),
    (genre) => genre,
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

    loadUserData(currentUserID, dataDisplay);
  });

  userSelector.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && userSelector.value) {
      event.preventDefault();
      loginForm.requestSubmit();
    }
  });
}

main();
