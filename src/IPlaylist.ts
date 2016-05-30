
import Track from "./Track";

interface IPlaylist {
  nextTrack: (circular: boolean) => void;
  prevTrack: (circular: boolean) => void;
  getCurrentTrack: () => Track;
}

export default IPlaylist;