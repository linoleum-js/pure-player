import ITrackData from "./ITrackData";
import IStreamUrl from "./IStreamUrl";

export default class Track {
  private data: ITrackData;

  constructor (data: ITrackData) {
    this.data = data;
  }

  public getStreamUrlList(): Array<IStreamUrl> {
    return this.data.streamUrlList;
  }

  public getTitle(): string {
    return this.data.title;
  }

  public getAuthor(): string {
    return this.data.author;
  }

  public getAlbum(): string {
    return this.data.album;
  }

  public getFullData(): ITrackData {
    return this.data;
  }
}
