import { getListenEvents } from "../js/data.mjs";
import {
  findMostListenedArtist,
  findMostListenedSong,
} from "../js/processing.js";

const userOneListenEvents = getListenEvents("1");

test("findMostListenedSong returns the song listened to most often", () => {
  expect(findMostListenedSong(userOneListenEvents)).toBe("song-8");
});
