
import Track from "./Track";
import ITrackData from "./ITrackData";
import PlaylistManager from "./PlaylistManager";
import IStreamUrl from "./IStreamUrl";
import IPlayerConfig from "./IPlayerConfig";
import IPlaylist from "./IPlaylist";
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
  private playlist: IPlaylist;
  private config: IPlayerConfig;

  constructor (customConfig: IPlayerConfig, playlist: IPlaylist) {
    super();
    this.config = deepExtend({}, defaultConfig, customConfig);
    this.playlist = playlist;
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

  private setCurrentTrack(track: Track) {
    this.currentTrack = track;
  }

  public setVolume(volume: number) {
    this.audioElement.volume = volume;
  }

  public getVolume(): number {
    return this.audioElement.volume;
  }

  private playTrack(track: Track) {
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

  private createAudioElement() {
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
    addEvent('click', 'btnNext', () => {
      this.stop();
      this.playlist.nextTrack(config.circular);
      this.setCurrentTrack(this.playlist.getCurrentTrack());
      this.playTrack(this.getCurrentTrack());
    });
    addEvent('click', 'btnPrev', () => {
      this.stop();
      this.playlist.prevTrack(config.circular);
      this.setCurrentTrack(this.playlist.getCurrentTrack());
      this.playTrack(this.getCurrentTrack());
    });
    addEvent('change', 'inputTime', () => {

    });
  }
}
