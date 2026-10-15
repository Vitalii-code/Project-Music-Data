import { getListenEvents } from "../js/data.mjs";
import { findMostListened } from "../js/processing.js";

const userOneListenEvents = getListenEvents("1");

test("findMostListenedSong returns the song listened to most often", () => {
  expect(findMostListened(userOneListenEvents, "ID")).toBe("song-8");
});

test("findMostListenedArtist returns the artist listened to most often", () => {
  expect(findMostListened(userOneListenEvents, "artist")).toBe("Frank Turner");
});
