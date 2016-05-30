
import PlaylistManager from "../../src/PlaylistManager";
import Track from "../../src/Track";

describe('PlaylistManager', () => {
  let playlistManager: PlaylistManager;
  const beforeEach = () => {
    playlistManager = new PlaylistManager();
  };

  it('should create, change and remove playlist', () => {
    beforeEach();
    expect(playlistManager.getCurrentPlaylist().getName()).toBe('default');
    expect(playlistManager.getPlaylistsNumber()).toBe(1);
    playlistManager.createPlaylist('new');
    expect(playlistManager.getPlaylistsNumber()).toBe(2);
    playlistManager.usePlaylist('new');
    expect(playlistManager.getCurrentPlaylist().getName()).toBe('new');
    expect(playlistManager.hasPlaylist('new')).toBe(true);
    expect(playlistManager.getPlaylist('new')).not.toBeNull();
    playlistManager.removePlaylist('new');
    expect(playlistManager.getPlaylistsNumber()).toBe(1);
    expect(playlistManager.getCurrentPlaylist().getName()).toBe('default');
    expect(playlistManager.hasPlaylist('new')).toBe(false);
    expect(playlistManager.getPlaylist('new')).toBeNull();
  });

  it('should add track', () => {
    beforeEach();
    playlistManager.addTrack(new Track({
      streamUrlList: []
    }));
    expect(playlistManager.getCurrentPlaylist().getTracksNumber()).toBe(1);
    playlistManager.addTrack(new Track({
      streamUrlList: []
    }));
    expect(playlistManager.getCurrentPlaylist().getTracksNumber()).toBe(2);
  });

  it('should go to the next/prev track', () => {
    beforeEach();
    const number = 4;
    for (let i = 0; i < number; i++) {
      playlistManager.addTrack(new Track({
        title: i.toString(),
        streamUrlList: []
      }));
    }

    // not circular
    expect(playlistManager.getCurrentTrack().getTitle()).toBe('0');
    for (let i = 0; i < number + 1; i++) {
      playlistManager.nextTrack(false);
    }
    expect(playlistManager.getCurrentTrack().getTitle()).toBe('3');
    for (let i = 0; i < number + 1; i++) {
      playlistManager.prevTrack(false);
    }
    expect(playlistManager.getCurrentTrack().getTitle()).toBe('0');

    // circular
    playlistManager.prevTrack(true);
    expect(playlistManager.getCurrentTrack().getTitle()).toBe('3');
    playlistManager.nextTrack(true);
    expect(playlistManager.getCurrentTrack().getTitle()).toBe('0');
  });
});
