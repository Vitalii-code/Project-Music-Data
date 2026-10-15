import { Song } from "../js/common.mjs";
import { getListenEvents } from "../js/data.mjs";

const userOneListenEvents = getListenEvents("1");

test("User count is correct", () => {
  const mockSong = Song.fromListenEvent(userOneListenEvents[0]);

  expect(mockSong.title).toBe("Tonight We Fly");
});
