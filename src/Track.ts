import ITrackData from "./ITrackData";

export default class Track {
  private data: ITrackData;

  constructor (data: ITrackData) {
    this.data = data;
  }

  public getStreamUrl(): string {
    return this.data.streamUrl;
  }

  public getStreamUrlList(): Array<string> {
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
}
