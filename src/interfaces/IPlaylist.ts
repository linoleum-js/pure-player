
import Track from "./../Track";

interface IPlaylist {
  nextTrack: (circular: boolean) => void;
  prevTrack: (circular: boolean) => void;
  getCurrentTrack: () => Track;
  isLastTrack: () => boolean;
  isFirstTrack: () => boolean;
}

export default IPlaylist;