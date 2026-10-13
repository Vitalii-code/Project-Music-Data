// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getListenEvents, getSong, getUserIDs } from "./data.mjs";
import { populateSelector } from "./common.mjs";
import { findMostListenedArtist, findMostListenedSong } from "./processing.js";

const NO_DATA_MESSAGE = "No data to display";

function resetDisplay(display) {
  display.innerHTML = `<p>${NO_DATA_MESSAGE}</p>`;
}

function loadUserData(userID, display) {
  const listenEvents = getListenEvents(userID);

  console.log(findMostListenedSong(listenEvents));
  findMostListenedArtist(listenEvents);
}

function main() {
  const userSelector = document.getElementById("userSelector");
  const loginForm = document.getElementById("loginForm");
  const dataDisplay = document.getElementById("dataDisplay");

  populateSelector(userSelector, getUserIDs());

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentUserID = userSelector.value;

    resetDisplay(dataDisplay);
    loadUserData(currentUserID, dataDisplay);
  });
}

main();
