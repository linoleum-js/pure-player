
import Track from "./Track";
import ITrackData from "./ITrackData";
import PlaylistManager from "./PlaylistManager";
import IStreamUrl from "./IStreamUrl";
import IPlayerConfig from "./IPlayerConfig";
import {EventEmitter, deepExtend} from "./util";
import defaultConfig from "./default-config";
import $ from "./dom";


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
    this.config = deepExtend({}, defaultConfig, customConfig);
    this.playlist = new PlaylistManager();
    this.registerEvents();
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

  public setVolume(volume: number) {
    this.audioElement.volume = volume;
  }

  public getVolume(): number {
    return this.audioElement.volume;
  }

  private playTrack(track: Track) {
    if (!this.audioElement) {
      this.createAudioNode();
    }
    if (this.currentUrlIndex >= track.getUrlsNumber()) {
      this.emit('error', track);
      this.stop();
      return;
    }
    const audio: HTMLAudioElement = this.audioElement;
    const onerrorCallback = (event: any) => {
      if (!event.currentTarget.error) { return; }
      this.currentUrlIndex++;
      this.playTrack(track);
    };

    audio.removeEventListener('error', onerrorCallback);
    audio.addEventListener('error', onerrorCallback, false);
    track.orderStreamUrls(audio);
    audio.src = track.getStreamUrl(this.currentUrlIndex).url;
    audio.play();
  }

  private createAudioNode() {
    const audio: any = new Audio();
    for (let attrName in this.config.audioAttributes) {
      audio[attrName] = this.config.audioAttributes[attrName];
    }
    this.audioElement = audio as HTMLAudioElement;
  }

  private registerEvents() {
    const config: any = this.config;
    const getClass = (ctrlName: string): string => {
      const className: string = config.nodes[ctrlName];
      return '.' + className;
    };
    const addEvent = (eventName: string, ctrlName: string,
                      callback: Function) => {
      $.on(eventName, getClass(ctrlName), (event: Event) => {
        if (!config.preventEvents) {
          callback(event);
        }
      });
    };

    addEvent('click', 'btnPlay', () => {
      this.playTrack(this.getCurrentTrack());
    });
    addEvent('click', 'btnPause', () => {
      this.pause();
    });
    addEvent('click', 'btnStop', () => {
      this.stop();
    });
  }
}
