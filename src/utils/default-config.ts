
import IPlayerConfig from "./../interfaces/IPlayerConfig";

export default {
  audioAttributes: {
    preload: 'auto',
    autoplay: 'false'
  },
  volumeFunction: function (value: number) {
    return value;
  },
  timeFormat: function (value: number) {
    const hours = Math.floor(value / 3600);
    value %= 3600;
    const minutes = Math.floor(value / 60);
    value %= 60;
    const seconds = value;
    let result = '';

    if (hours) {
      result = hours + ':';
    }
    result += minutes + ':';
    if (seconds < 10) {
      result += '0';
    }
    result += seconds;
    return result;
  },
  circular: false,
  preventEvents: false,
  nodes: {
    root: 'js-player',
    btnPlay: 'js-player-play',
    btnStop: 'js-player-stop',
    btnPause: 'js-player-pause',
    btnPlayToggle: 'js-player-play-toggle',
    btnNext: 'js-player-next',
    btnPrev: 'js-player-prev',
    btnDisabled: 'js-player-btn-disabled',
    inputVolume: 'js-player-input-volume',
    inputTime: 'js-player-input-time',
    outputTime: 'js-player-output-time',
    playlistItem: 'js-player-playlist-item'
  }
} as IPlayerConfig;
