
import Track from "./Track";
import ITrackData from "./ITrackData";
import PlaylistManager from "./PlaylistManager";
import IStreamUrl from "./IStreamUrl";
import {EventEmitter} from "./util";

interface IPlayerConfig {
  audioAttributes?: Object;
  circular?: boolean;

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
  private currentUrlIndex: number = 0;

  constructor (customConfig?: IPlayerConfig) {
    super();
    this.playlist = new PlaylistManager();
    document.getElementById('stop').addEventListener('click', () => {
      this.stop();
    });
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

  public setVolume(volume: number) {
    this.audioElement.volume = volume;
  }

  public getVolume(): number {
    return this.audioElement.volume;
  }

  private playTrack(track: Track) {
    if (!this.audioElement) {
      this.audioElement = new Audio();
    }

    let audio: HTMLAudioElement = this.audioElement;
    let onerrorCallback = (event: any) => {
      if (!event.currentTarget.error) { return; }
      this.currentUrlIndex++;
      this.playTrack(track);
    };

    track.orderStreamUrls(audio);
    audio.removeEventListener('error', onerrorCallback);
    if (this.currentUrlIndex >= track.getUrlsNumber()) {
      this.emit('error', track);
      this.stop();
      return;
    }
    audio.addEventListener('error', onerrorCallback, false);
    audio.src = track.getStreamUrl(this.currentUrlIndex).url;
    audio.play();
  }
}
