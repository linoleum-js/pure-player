
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

let isArray = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Array]';
};

let isObject = (value: any) => {
  return value !== null && !isArray(value) && typeof value === 'object';
};

export function deepExtend (...args: Array<any>) {
  let target: any = args[0];
  let sources: Array<any> = args.slice(1);

  sources.forEach((source: any) => {
    for (let key in source) {
      let sourceValue = source[key];
      let targetValue = target[key];

      if (isObject(sourceValue)) {
        target[key] = deepExtend({}, targetValue, sourceValue);
      } else {
        target[key] = source[key];
      }
    }
  });

  return target;
}

let proto: any = Element.prototype;
let nativeMatches = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

export function matchesSelector (element: HTMLElement|EventTarget,
                                 selector: string): boolean {

  return nativeMatches.call(element, selector);
}

export function on (eventName: string, selector: string, callback: Function)  {
  document.addEventListener(eventName, (event: Event) => {
    if (matchesSelector(event.target, selector)) {
      callback(event);
    }
  }, false);
}

export function $ (selector: string): NodeList {
  return document.querySelectorAll(selector);
}