
import PurePlayer from "./Player";
import PlaylistPanager from "./PlaylistManager";

export default function createPlayer (config: any) {
  return new PurePlayer(config || {}, new PlaylistPanager());
};

