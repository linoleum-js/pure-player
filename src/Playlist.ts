
import Track from "./Track";
import {EventEmitter} from "./utils/util";

export default class Playlist extends EventEmitter {
  private name: string;
  private tracks: Array<Track> = [];
  private currentTrack: number = 0;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public addTrack(track: Track) {
    this.tracks.push(track);
  }

  public hasTracks(): boolean {
    return this.tracks.length !== 0;
  }

  public getTracksNumber(): number {
    return this.tracks.length;
  }

  public removeTrack(track: Track) {
    this.tracks = this.tracks.filter((item: Track) => {
      return item !== track;
    });
  }

  public contains(track: Track): boolean {
    return this.tracks.indexOf(track) !== -1;
  }

  public getName(): string {
    return this.name;
  }

  public getCurrentTrack(): Track {
    return this.tracks[this.currentTrack];
  }

  public nextTrack(circular: boolean) {
    if (this.currentTrack < this.tracks.length - 1) {
      this.currentTrack++;
    } else if (circular) {
      this.currentTrack = 0;
    }
  }

  public prevTrack(circular: boolean) {
    if (this.currentTrack > 0) {
      this.currentTrack--;
    } else if (circular) {
      this.currentTrack = this.tracks.length - 1;
    }
  }

  public isLastTrack() {
    return this.currentTrack === this.tracks.length - 1;
  }

  public isFirstTrack() {
    return this.currentTrack === 0;
  }
}
