
import PurePlayer from "./Player";
import PlaylistManager from "./PlaylistManager";
import PlayerController from "./PlayerController";

export default function createPlayer (config: any) {
  const player = new PurePlayer(config || {}, new PlaylistManager());
  const controller = new PlayerController(player);
  controller.registerEvents();
  return player;
};

