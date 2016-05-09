
import IPlayerConfig from "./IPlayerConfig";

export default {
  audioAttributes: {
    preload: 'auto',
    autoplay: 'false'
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
    inputVolume: 'js-player-input-volume',
    inputTime: 'js-player-input-time',
    playlistItem: 'js-player-playlist-item'
  }
} as IPlayerConfig;
