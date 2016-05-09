
import Track from "./Track";
import ITrackData from "./ITrackData";
import PlaylistManager from "./PlaylistManager";
import IStreamUrl from "./IStreamUrl";
import {EventEmitter} from "./util";

interface IPlayerConfig {
  audioAttributes?: Object;
}

/**
 *
 */
export default class PurePlayer extends EventEmitter {
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
  public play(trackData: ITrackData) {
    this.playTrack(new Track(trackData));
  }

  public stop() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  public getCurrentTime(): number {
    return this.audioElement.currentTime;
  }

  public setCurrentTime(time: number) {
    this.audioElement.currentTime = time;
  }

  public getCurrentTrack(): Track {
    return this.currentTrack;
  }

  private playTrack(track: Track) {
    if (!this.audioElement) {
      this.audioElement = new Audio();
    }

    let list = track.getStreamUrlList();
    let supportedTypes = list.filter((item: IStreamUrl) => {
      return this.audioElement.canPlayType(item.type);
    });

    if (!supportedTypes.length) {
      this.emit('play:failed', track.getFullData());
    } else {

    }
  }
}
