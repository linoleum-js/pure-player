
interface ICallbacks {
  [key: string]: Array<Function>
}

export class EventEmitter {
  private callbacks: ICallbacks;

  constructor() {
    this.callbacks = {};
  }

  public on(eventName: string, callback: Function) {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = [];
    }
    this.callbacks[eventName].push(callback);
  }

  public emit(eventName: string, data: any) {
    if (!this.callbacks[eventName]) { return; }
    this.callbacks[eventName].forEach((callback: Function) => {
      callback(data);
    });
  }
}
