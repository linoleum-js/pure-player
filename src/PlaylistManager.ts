
import Playlist from "./Playlist";
import Track from "./Track";
import ITrackData from "./ITrackData";

export default class PlaylistManager {
  private playlists: Array<Playlist>;
  private currentPlaylist: Playlist;

  constructor() {
    this.playlists = [];
    this.createPlaylist('default');
  }

  public getCurrentTrack() {
    return this.currentPlaylist.getCurrentTrack();
  }

  public add(trackData: ITrackData) {
    this.addTrack(new Track(trackData));
  }

  private addTrack(track: Track) {
    this.currentPlaylist.addTrack(track);
  }

  public createPlaylist(name: string) {
    this.playlists.push(new Playlist(name));
  }

  public getPlaylist(name: string): Playlist {
    return this.playlists.filter((item: Playlist) => {
      return item.getName() === name;
    })[0] || null;
  }

  public usePlaylist(name: string) {
    this.currentPlaylist = this.getPlaylist(name);
  }

  public hasPlaylist(name: string): boolean {
    return this.getPlaylist(name) !== null;
  }

  public nextTrack(circular: boolean) {
    this.currentPlaylist.nextTrack(circular);
  }

  public prevTrack(circular: boolean) {
    this.currentPlaylist.prevTrack(circular);
  }
}
