
interface IPlayerConfig {
  audioAttributes?: {
    [key: string]: string;
  };
  circular?: boolean;
  preventEvents?: boolean;
  nodes?: {
    root?: string;
    btnPlay?: string;
    btnStop?: string;
    btnPause?: string;
    btnPlayToggle?: string;
    btnNext?: string;
    btnPrev?: string;
    inputVolume?: string;
    inputTime?: string;
    playlistItem?: string;
  }
}

export default IPlayerConfig;
