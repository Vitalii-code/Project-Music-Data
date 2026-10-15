import { getListenEvents } from "../js/data.mjs";
import { findMostListened, onlyFridays } from "../js/processing.js";

const userOneListenEvents = getListenEvents("1");

test("findMostListenedSong returns the song listened to most often", () => {
  expect(findMostListened(userOneListenEvents, "ID")).toBe("song-8");
});

test("findMostListenedArtist returns the artist listened to most often", () => {
  expect(findMostListened(userOneListenEvents, "artist")).toBe("Frank Turner");
});

test("onlyFridays returns the Friday night events from the available listen data", () => {
  const fridayNightEvents = onlyFridays(userOneListenEvents);

  expect(fridayNightEvents).toHaveLength(48);
  expect(fridayNightEvents[0]).toEqual(userOneListenEvents[39]);
  expect(fridayNightEvents.at(-1)).toEqual(userOneListenEvents[668]);
});

test("onlyFridays excludes events outside the Friday night window", () => {
  const fridayNightEvents = onlyFridays(userOneListenEvents);

  expect(fridayNightEvents).not.toContain(userOneListenEvents[38]);
  expect(fridayNightEvents).not.toContain(userOneListenEvents[50]);
  expect(fridayNightEvents).not.toContain(userOneListenEvents[669]);
});
