
interface IPlayerConfig {
  audioAttributes?: {
    [key: string]: string;
  };
  volumeFunction? (value: number):number,
  timeFormat? (value: number): string,
  circular?: boolean;
  preventEvents?: boolean;
  nodes?: {
    root?: string;
    btnPlay?: string;
    btnStop?: string;
    btnPause?: string;
    btnDisabled?: string;
    btnPlayToggle?: string;
    btnNext?: string;
    btnPrev?: string;
    inputVolume?: string;
    inputTime?: string;
    playlistItem?: string;
    outputTime?: string;
  }
}

export default IPlayerConfig;
