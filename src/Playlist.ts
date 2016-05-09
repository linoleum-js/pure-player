
import Track from "./Track";
import {EventEmitter} from "./util";

export default class Playlist extends EventEmitter {
  private name: string;
  private tracks: Array<Track>;
  private currentTrack: number;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public addTrack(track: Track) {
    this.tracks.push(track);
  }

  public removeTrack(track: Track) {
    this.tracks = this.tracks.filter((item) => {
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
}
