import { getSong } from "./data.mjs";

// create a song class from listenEvent for easier access
class Song {
  constructor(id, listenEvent = null) {
    this.ID = id;

    const info = getSong(id);
    if (!info) throw new Error(`No song found with ID ${id}`);

    this.artist = info.artist;
    this.title = info.title;
    this.durationSeconds = info["duration_seconds"];
    this.genre = info.genre;

    // Only set when created from a listen event
    this.timestamp = listenEvent?.["timestamp"] ?? null;
    this.secondsSinceMidnight = listenEvent?.["seconds_since_midnight"] ?? null;
  }

  static fromListenEvent(listenEvent) {
    return new Song(listenEvent["song_id"], listenEvent);
  }
}
// listenEvent - a list of events to parse throuhg
// ofWhat - count occurances of what, for example count "ID" or "artist"
function countOccurances(listenEvents, toCount) {
  const songOccurances = {};
  // count song occurances
  for (const listenEvent of listenEvents) {
    const event = Song.fromListenEvent(listenEvent);

    if (Object.hasOwn(songOccurances, event[toCount])) {
      songOccurances[event[toCount]] += 1;
    } else {
      songOccurances[event[toCount]] = 1;
    }
  }

  return songOccurances;
}

// return id of the most listened song by occurances
export function findMostListenedSong(listenEvents) {
  const songOccurances = countOccurances(listenEvents, "ID");

  const mostListenedSong = {
    ID: 0,
    occurances: 0,
  };

  // pick out the most listened one
  Object.entries(songOccurances).forEach(([songID, occurances]) => {
    if (occurances > mostListenedSong.occurances) {
      mostListenedSong.ID = songID;
      mostListenedSong.occurances = occurances;
    }
  });

  return mostListenedSong.ID;
}

// return id of the most listened artist by occurances
export function findMostListenedArtist(listenEvents) {
  const artistOccurances = countOccurances(listenEvents, "artist");

  const mostListenedArtist = {
    ID: 0,
    occurances: 0,
  };

  // pick out the most listened one
  Object.entries(artistOccurances).forEach(([songID, occurances]) => {
    if (occurances > mostListenedArtist.occurances) {
      mostListenedArtist.ID = songID;
      mostListenedArtist.occurances = occurances;
    }
  });

  return mostListenedArtist.ID;
}
