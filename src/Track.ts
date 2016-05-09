import ITrackData from "./ITrackData";
import IStreamUrl from "./IStreamUrl";

export default class Track {
  private data: ITrackData;
  private isUrlsOrdered: boolean = false;

  constructor (data: ITrackData) {
    this.data = data;
  }

  public getStreamUrlList(): Array<IStreamUrl> {
    return this.data.streamUrlList;
  }

  public getUrlsNumber(): number {
    return this.data.streamUrlList.length;
  }

  public getStreamUrl(number: number): IStreamUrl {
    return this.data.streamUrlList[number];
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

  public orderStreamUrls(audio: HTMLAudioElement) {
    if (this.isUrlsOrdered) { return; }

    let list: Array<IStreamUrl> = this.getStreamUrlList();
    let result: Array<IStreamUrl> = [];
    let verdicts: Array<string> = ['probably', 'maybe', ''];

    verdicts.forEach((verdict: string) => {
      let sublist: Array<IStreamUrl> = list.filter((item: IStreamUrl) => {
        return audio.canPlayType(item.type) === verdict;
      });
      result = result.concat(sublist);
    });

    this.data.streamUrlList = result;
    this.isUrlsOrdered = true;
  }
}
