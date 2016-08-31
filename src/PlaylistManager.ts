
import Playlist from "./Playlist";
import Track from "./Track";
import ITrackData from "./interfaces/ITrackData";

export default class PlaylistManager {
  private playlists: Array<Playlist> = [];
  private currentPlaylist: Playlist;

  constructor() {
    this.playlists = [];
    this.createPlaylist('default');
    this.currentPlaylist = this.playlists[0];
  }

  public getCurrentTrack() {
    return this.currentPlaylist.getCurrentTrack();
  }

  public getCurrentPlaylist(): Playlist {
    return this.currentPlaylist;
  }

  public getPlaylistsNumber(): number {
    return this.playlists.length;
  }

  public add(trackData: ITrackData) {
    this.addTrack(new Track(trackData));
  }

  public addTrack(track: Track) {
    this.currentPlaylist.addTrack(track);
  }

  public createPlaylist(name: string) {
    this.playlists.push(new Playlist(name));
  }

  public removePlaylist(name: string) {
    this.playlists = this.playlists.filter((item) => {
      return item.getName() !== name;
    });

    if (this.currentPlaylist.getName() === name) {
      this.currentPlaylist = this.playlists[0];
    }
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

  public isLastTrack() {
    return this.currentPlaylist.isLastTrack();
  }

  public isFirstTrack() {
    return this.currentPlaylist.isFirstTrack();
  }
}
