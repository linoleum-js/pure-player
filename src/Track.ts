import ITrackData from "./ITrackData";
import IStreamUrl from "./IStreamUrl";

export default class Track {
  private data: ITrackData;
  private isUrlsOrdered: boolean = false;
  private currentUrlIndex: number = 0;

  constructor (data: ITrackData) {
    this.data = data;
  }

  public getStreamUrlList(): Array<IStreamUrl> {
    return this.data.streamUrlList;
  }

  public getUrlsNumber(): number {
    return this.data.streamUrlList.length;
  }

  public getStreamUrl(): string {
    return this.data.streamUrlList[this.currentUrlIndex].url;
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

  public hasMoreUrls(): boolean {
    return this.currentUrlIndex < this.getStreamUrlList().length;
  }

  public nextUrl() {
    this.currentUrlIndex++;
  }

  public orderStreamUrls(audio: HTMLAudioElement) {
    if (this.isUrlsOrdered) { return; }

    const list: Array<IStreamUrl> = this.getStreamUrlList();
    const verdicts: Array<string> = ['probably', 'maybe', ''];
    let result: Array<IStreamUrl> = [];

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
