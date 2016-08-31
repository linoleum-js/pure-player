
import IStreamUrl from "./IStreamUrl";

interface ITrackData {
  streamUrlList: Array<IStreamUrl>;
  title?: string;
  author?: string;
  album?: string;
}

export default ITrackData;
