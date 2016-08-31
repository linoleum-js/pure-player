

import PurePlayer from './Player';
import {matchesSelector, on, $} from './utils/util';


export default class PlayerController {
  private player: PurePlayer;

  constructor(player: PurePlayer) {
    this.player = player;
  }

  private setTimeBounds(media: any) {
    const timeInput: any = $(this.getClass('inputTime'));
    if (!timeInput) { return; }

    timeInput.setAttribute('min', 0);
    timeInput.setAttribute('max', media.duration);
    timeInput.setAttribute('step', 1);
    timeInput.setAttribute('value', media.currentTime);
  }

  private getClass (ctrlName: string): string {
    const player = this.player;
    const config: any = player.config;
    const className: string = config.nodes[ctrlName];
    return '.' + className;
  };

  public registerEvents() {
    const player = this.player;
    const config: any = player.config;
    const addEvent = (eventName: string, ctrlName: string,
                      callback: Function) => {
      on(eventName, this.getClass(ctrlName), (event: Event) => {
        if (!config.preventEvents) {
          callback(event);
        }
      });
    };

    addEvent('click', 'btnPlay', () => {
      player.playTrack(player.getCurrentTrack());
    });

    addEvent('click', 'btnPause', () => {
      player.pause();
    });

    addEvent('click', 'btnStop', () => {
      player.stop();
    });

    addEvent('click', 'btnNext', () => {
      const nextButton: any = $(this.getClass('btnNext'))[0];
      if (player.playlist.isLastTrack()) {
        if (nextButton) {
          nextButton.classList.add(this.getClass('btnDisabled'));
        }
        if (!config.circular) {
          return;
        }
      } else {
        if (nextButton) {
          nextButton.classList.remove(this.getClass('btnDisabled'));
        }
      }
      player.stop();
      player.playlist.nextTrack(config.circular);
      player.setCurrentTrack(player.playlist.getCurrentTrack());
      player.playTrack(player.getCurrentTrack());
    });

    addEvent('click', 'btnPrev', () => {
      const prevButton: any = $(this.getClass('btnPrev'))[0];
      if (player.playlist.isFirstTrack()) {
        if (prevButton) {
          prevButton.classList.add(this.getClass('btnDisabled'));
        }
        if (!config.circular) {
          return;
        }
      } else {
        if (prevButton) {
          prevButton.classList.remove(this.getClass('btnDisabled'));
        }
      }
      player.stop();
      player.playlist.prevTrack(config.circular);
      player.setCurrentTrack(player.playlist.getCurrentTrack());
      player.playTrack(player.getCurrentTrack());
    });

    addEvent('change', 'inputTime', (event: any) => {
      const value = event.target.value;
      const finalValue = config.volumeFunction(value);
      player.audioElement.volume = finalValue;
    });

    setInterval(() => {
      const output: any = document.querySelector(
        this.getClass('outputTime')
      );
      if (output) {
        output.innerHTML = config.timeFormat(player.audioElement.currentTime);
      }
    }, 1000);
  }
}