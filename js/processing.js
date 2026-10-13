import { getSong } from "./data.mjs";

// create a song class from listenEvent for easier access
class Song {
  constructor(listenEvent) {
    this.ID = listenEvent["song_id"];
    const additionalInfo = getSong(this.ID);

    this.timestamp = listenEvent["timestamp"];
    this.secondsSinceMidnight = listenEvent["timestamp"];
    this.artist = additionalInfo.artist;
    this.title = additionalInfo.title;
    this.durationSeconds = additionalInfo["duration_seconds"];
    this.genre = additionalInfo.genre;
  }
}

export function findMostListenedSong(listenEvents) {
  const songOccurances = {};

  // count song occurances
  for (const event of listenEvents) {
    const song = new Song(event);

    if (Object.hasOwn(songOccurances, song.ID)) {
      songOccurances[song.ID] += 1;
    } else {
      songOccurances[song.ID] = 1;
    }
  }

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

export function findMostListenedArtist(listenEvents) {
  const song = new Song(listenEvents[0]);
  // console.log(song);
}
