
import Track from "./Track";
import ITrackData from "./interfaces/ITrackData";
import IStreamUrl from "./interfaces/IStreamUrl";
import IPlayerConfig from "./interfaces/IPlayerConfig";
import IPlaylist from "./interfaces/IPlaylist";
import {EventEmitter, deepExtend} from "./utils/util";
import defaultConfig from "./utils/default-config";


/**
 *
 */
export default class PurePlayer extends EventEmitter {
  public isPlaying: boolean;
  public currentTrack: Track;
  public audioElement: HTMLAudioElement;
  public playlist: IPlaylist;
  public config: IPlayerConfig;

  constructor (customConfig: IPlayerConfig, playlist: IPlaylist) {
    super();
    this.config = deepExtend({}, defaultConfig, customConfig);
    this.playlist = playlist;
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
    this.isPlaying = false;
  }

  public pause() {
    this.isPlaying = false;
    this.audioElement.pause();
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

  public setCurrentTrack(track: Track) {
    this.currentTrack = track;
  }

  public setVolume(volume: number) {
    this.audioElement.volume = volume;
  }

  public getVolume(): number {
    return this.audioElement.volume;
  }

  public playTrack(track: Track) {
    if (!this.audioElement) {
      this.createAudioElement();
    }
    if (!track.hasMoreUrls()) {
      this.emit('error', track);
      this.stop();
      return;
    }
    const audio: HTMLAudioElement = this.audioElement;
    const onerrorCallback = (event: any) => {
      if (!event.currentTarget.error) { return; }
      track.nextUrl();
      this.playTrack(track);
    };

    audio.removeEventListener('error', onerrorCallback);
    audio.addEventListener('error', onerrorCallback, false);
    track.orderStreamUrls(audio);
    audio.src = track.getStreamUrl();
    audio.play();
  }

  public createAudioElement() {
    const audio: any = new Audio();
    for (let attrName in this.config.audioAttributes) {
      audio[attrName] = this.config.audioAttributes[attrName];
    }
    this.audioElement = audio as HTMLAudioElement;
  }
}
