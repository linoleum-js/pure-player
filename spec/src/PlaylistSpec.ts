

import Playlist from "../../src/Playlist";
import Track from "../../src/Track";

describe('Playlist', () => {
  let playlist: Playlist;

  const beforeEach = () => {
    playlist = new Playlist('plname');
  };

  it('should add track to playlist', () => {
    beforeEach();
    expect(playlist.hasTracks()).toBe(false);
    expect(playlist.getTracksNumber()).toBe(0);
    playlist.addTrack(new Track({
      streamUrlList: []
    }));
    expect(playlist.getTracksNumber()).toBe(1);
  });

  it('should remove track', () => {
    beforeEach();
    for (let i = 0; i < 3; i++) {
      playlist.addTrack(new Track({
        title: i.toString(),
        streamUrlList: []
      }));
    }
    expect(playlist.getTracksNumber()).toBe(3);
    playlist.removeTrack(playlist.getCurrentTrack());
    expect(playlist.getTracksNumber()).toBe(2);
    playlist.removeTrack(playlist.getCurrentTrack());
    expect(playlist.getTracksNumber()).toBe(1);
    playlist.removeTrack(playlist.getCurrentTrack());
    expect(playlist.getTracksNumber()).toBe(0);
    expect(playlist.hasTracks()).toBe(false);
  });

  it('should go to the next/prev track', () => {
    beforeEach();
    const number = 4;
    for (let i = 0; i < number; i++) {
      playlist.addTrack(new Track({
        title: i.toString(),
        streamUrlList: []
      }));
    }

    // not circular
    expect(playlist.getCurrentTrack().getTitle()).toBe('0');
    for (let i = 0; i < number + 1; i++) {
      playlist.nextTrack(false);
    }
    expect(playlist.getCurrentTrack().getTitle()).toBe('3');
    for (let i = 0; i < number + 1; i++) {
      playlist.prevTrack(false);
    }
    expect(playlist.getCurrentTrack().getTitle()).toBe('0');

    // circular
    playlist.prevTrack(true);
    expect(playlist.getCurrentTrack().getTitle()).toBe('3');
    playlist.nextTrack(true);
    expect(playlist.getCurrentTrack().getTitle()).toBe('0');
  });
});