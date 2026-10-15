import { Song } from "./common.mjs";

// listenEvent - a list of events to parse throuhg
// property - count occurances of what, for example count "ID" or "artist"
function countOccurances(listenEvents, property) {
  const occurances = {};
  // count song occurances
  for (const listenEvent of listenEvents) {
    const event = Song.fromListenEvent(listenEvent);

    if (Object.hasOwn(occurances, event[property])) {
      occurances[event[property]] += 1;
    } else {
      occurances[event[property]] = 1;
    }
  }

  return occurances;
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
export function findMostListened(listenEvents, property = "ID") {
  if (!Array.isArray(listenEvents) || listenEvents.length === 0) {
    return null;
  }

  const occurrences = countOccurances(listenEvents, property);
  const most = pickOutMost(occurrences);

  if (!most) {
    return null;
  }

  return most.ID;
}

export function findMostListenedBySeconds(listenEvents, property = "ID") {
  if (!Array.isArray(listenEvents) || listenEvents.length === 0) {
    return null;
  }

  const timeListened = {};

  for (const listenEvent of listenEvents) {
    const event = Song.fromListenEvent(listenEvent);
    const value = event[property];

    if (Object.hasOwn(timeListened, value)) {
      timeListened[value] += event.durationSeconds;
    } else {
      timeListened[value] = event.durationSeconds;
    }
  }

  const most = pickOutMost(timeListened);

  if (!most) {
    return null;
  }

  return most.ID;
}

export function findMostConsecutiveListened(listenEvents) {
  if (!Array.isArray(listenEvents) || listenEvents.length === 0) {
    return null;
  }

  const state = {
    bestCount: 0,
    bestSong: null,
    currentSong: null,
    currentCount: 0,
  };

  for (const listenEvent of listenEvents) {
    const event = Song.fromListenEvent(listenEvent);

    if (event.ID === state.currentSong) {
      state.currentCount += 1;
    } else {
      state.currentSong = event.ID;
      state.currentCount = 1;
    }

    if (state.currentCount > state.bestCount) {
      state.bestCount = state.currentCount;
      state.bestSong = state.currentSong;
    }
  }

  if (!state.bestSong) {
    return null;
  }

  return [state.bestSong, state.bestCount];
}

// only return events on Friday nights (between 5pm and 4am)?
// Any time on a Friday after 5pm
// Any time on a Saturday before 4am
export function onlyFridays(listenEvents) {
  const filtered = [];

  for (const i of listenEvents) {
    const song = Song.fromListenEvent(i);
    const songDate = new Date(song.timestamp);
    // What was the user's most often listened to song on Friday nights (between 5pm and 4am)?
    if (
      (songDate.getDay() === 5 && songDate.getHours() >= 17) ||
      (songDate.getDay() === 6 && songDate.getHours() < 4)
    ) {
      filtered.push(i);
    }
  }

  return filtered;
}
