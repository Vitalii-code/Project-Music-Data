import { getSong } from "./data.mjs";

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

  // create a song class from listenEvent for easier access
  static fromListenEvent(listenEvent) {
    return new Song(listenEvent["song_id"], listenEvent);
  }
}
// listenEvent - a list of events to parse throuhg
// ofWhat - count occurances of what, for example count "ID" or "artist"
function countOccurances(listenEvents, property) {
  const songOccurances = {};
  // count song occurances
  for (const listenEvent of listenEvents) {
    const event = Song.fromListenEvent(listenEvent);

    if (Object.hasOwn(songOccurances, event[property])) {
      songOccurances[event[property]] += 1;
    } else {
      songOccurances[event[property]] = 1;
    }
  }

  return songOccurances;
}

// picks a thing that had the most occurances, be it artist or songs, returns ID and occurances
function pickOutMost(occurances) {
  const mostListened = {
    ID: 0,
    occurances: 0,
  };

  // pick out the most listened one
  Object.entries(occurances).forEach(([ID, occurances]) => {
    if (occurances > mostListened.occurances) {
      mostListened.ID = ID;
      mostListened.occurances = occurances;
    }
  });

  return mostListened;
}

// return id of the most listened thing by occurances
export function findMostListened(listenEvents, property) {
  const occurrences = countOccurances(listenEvents, property);
  const most = pickOutMost(occurrences);
  return most.ID;
}
