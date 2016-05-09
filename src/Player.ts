
import Track from "./Track";
import ITrackData from "./ITrackData";
import PlaylistManager from "./PlaylistManager";

interface IPlayerConfig {
  audioAttributes?: Object;
}

/**
 *
 */
export default class PurePlayer {
  private isPlaying: boolean;
  private currentTrack: Track;
  private audioElement: HTMLAudioElement;
  private playlist: PlaylistManager;
  private config: IPlayerConfig;

  constructor (customConfig?: IPlayerConfig) {
    this.playlist = new PlaylistManager();
  }

  /**
   *
   */
  public play(trackData: ITrackData): PurePlayer {
    this.playTrack(new Track(trackData));
    return this;
  }

  public stop(): PurePlayer {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    return this;
  }

  public getCurrentTime(): number {
    return this.audioElement.currentTime;
  }

  public setCurrentTime(time: number): PurePlayer {
    this.audioElement.currentTime = time;
    return this;
  }

  public getCurrentTrack(): Track {
    return this.currentTrack;
  }

  private playTrack(track: Track): PurePlayer {
    if (!this.audioElement) {
      this.audioElement = new Audio();
    }
    return this;
  }
}
