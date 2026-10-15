import { getListenEvents } from "../js/data.mjs";
import {
  findMostConsecutiveListened,
  findMostListened,
  findMostListenedBySeconds,
  findSongsListenedEveryDay,
  findTopListened,
  onlyFridays,
} from "../js/processing.js";

const userOneListenEvents = getListenEvents("1");

test("findMostListenedSong returns the song listened to most often", () => {
  expect(findMostListened(userOneListenEvents, "ID")).toBe("song-8");
});

test("findMostListenedArtist returns the artist listened to most often", () => {
  expect(findMostListened(userOneListenEvents, "artist")).toBe("Frank Turner");
});

test("findSongsListenedEveryDay finds songs heard on every listening day", () => {
  expect(findSongsListenedEveryDay(getListenEvents("1"))).toEqual(["song-8"]);
  expect(findSongsListenedEveryDay(getListenEvents("2"))).toEqual([
    "song-4",
    "song-9",
  ]);
  expect(findSongsListenedEveryDay(getListenEvents("3"))).toEqual([]);
  expect(findSongsListenedEveryDay(getListenEvents("4"))).toEqual([]);
});

test("findTopListened returns genres ordered by listen count", () => {
  expect(findTopListened(getListenEvents("1"), "genre")).toEqual([
    "Pop",
    "Folk",
    "Punk",
  ]);
  expect(findTopListened(getListenEvents("2"), "genre")).toEqual(["Pop"]);
});

test("findMostListenedBySeconds returns the song listened to for the most time", () => {
  expect(findMostListenedBySeconds(userOneListenEvents)).toBe("song-7");
});

test("findMostListenedBySeconds can find the artist listened to for the most time", () => {
  expect(findMostListenedBySeconds(userOneListenEvents, "artist")).toBe(
    "Frank Turner",
  );
});

test("findMostListenedBySeconds can find the Friday song listened to for the most time", () => {
  expect(findMostListenedBySeconds(onlyFridays(userOneListenEvents))).toBe(
    "song-8",
  );
});

test("findMostListenedBySeconds adds listening time for repeated songs", () => {
  const listenEvents = [
    { song_id: "song-7" },
    { song_id: "song-8" },
    { song_id: "song-8" },
    { song_id: "song-8" },
  ];

  expect(findMostListenedBySeconds(listenEvents)).toBe("song-8");
});

test("findMostListenedBySeconds returns null when there are no listen events", () => {
  expect(findMostListenedBySeconds([])).toBeNull();
  expect(findMostListenedBySeconds(null)).toBeNull();
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

test("findMostConsecutiveListened finds the longest period of consecutive songs", () => {
  const consecutiveSong = findMostConsecutiveListened(userOneListenEvents);

  expect(consecutiveSong).toEqual(["song-1", 34]);
});
