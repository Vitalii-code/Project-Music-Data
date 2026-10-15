import { getUserIDs, getSong } from "./data.mjs";

export function populateSelector(selector, data) {
  if (!Array.isArray(data)) {
    throw new TypeError("populateSelector: data must be an array");
  }

  data.map((element) => {
    let opt = document.createElement("option");
    opt.value = element;
    opt.innerHTML = element;
    selector.append(opt);
  });
}

export class Song {
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
