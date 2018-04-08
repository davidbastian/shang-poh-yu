export function toSlug(str) {
  let tags = /(&nbsp;|<([^>]+)>)/ig;
  let s = str.replace(tags, "");
  return s.replace(/\s+/g, "-").toLowerCase();
}

export function constrain(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function toHTML(string){
  let d = new DOMParser().parseFromString(string, "text/html");
  return d.body.firstChild;

}