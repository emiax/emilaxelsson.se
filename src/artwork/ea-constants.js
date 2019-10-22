const sin = Math.sin;
const cos = Math.cos;
const pi = Math.PI;

const d1 = sin(2*pi/5);
const d2 = sin(4*pi/5);
const d3 = cos(2*pi/5);
const d4 = (1 + 2*d3)/2;
const d5 = sin(pi/10) * (d1 + d2) / 2;

const width = 2 + d3 + d4;
const height = d1 + d2;

const tilingWidth = 4 + 2*d3 - 2*d4;

const a = [d3 + 1, d2 + d1];
const b = [d3, d2 + d1];
const c = [0, d2];
const d = [d4, 0];
const e = [2*d4, d2];
const f = [d4, d2 + d5];
const g = [d4 + 1, 0];
const h = [d3 + 2 - d4, d1];
const i = [d3 + 2, d2 + d1];
const j = [d3 + 2 + d4, d1];
const k = [d4 + 2, 0];
const l = [d3 + 2, d2 + d5];

const points = {
  a, b, c, d, e, f, g, h, i, j, k, l
};

const eLetter = [a, b, c, d, e];
const aLetter = [g, h, i, j, k];
const eLine = [c, f];
const pentagon0 = [a, b, c, d, e, a];
const pentagon1 = [g, h, i, j, k, g];

export { width, tilingWidth, height, points, d1, d2, d3, d4, d5, eLetter, aLetter, eLine, pentagon0, pentagon1 } 