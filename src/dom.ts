
import {matchesSelector} from "./util";

interface IDomUtil {
  (): NodeList;
  addClass: Function;
  hasClass: Function;
  removeClass: Function;
  toggleClass: Function;
  on: Function;
};

type Queryable = Element|Document;

let $ = function $(selector: string,
                   startNode:Queryable = document): NodeList {
  return startNode.querySelectorAll(selector);
} as IDomUtil;

$.removeClass = (element: HTMLElement, className: string) => {
  let classList: Array<string> = element.className.split(' ');
  element.className = classList.filter((item) => {
    return item.trim() !== className.trim();
  }).join(' ');
};

$.hasClass = (element: HTMLElement, className: string): boolean => {
  let classList: Array<string> = element.className.split(' ');
  return classList.some((item) => {
    return item.trim() === className.trim();
  });
};

$.addClass = (element: HTMLElement, className: string) => {
  if ($.hasClass(element, className)) {
    return;
  }
  let classList: Array<string> = element.className.split(' ');
  classList.push(className);
  element.className = classList.join(' ');
};

$.toggleClass = (element: HTMLElement, className: string) => {
  if ($.hasClass(element, className)) {
    $.removeClass(element, className);
  } else {
    $.addClass(element, className);
  }
};

$.on = (eventName: string, selector: string, callback: Function) => {
  document.addEventListener(eventName, (event: Event) => {
    if (matchesSelector(event.target, selector)) {
      callback(event);
    }
  }, false);
};

export default $;
