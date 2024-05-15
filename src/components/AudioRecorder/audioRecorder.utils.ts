/* eslint-disable @typescript-eslint/restrict-template-expressions */
// the canvas size
export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 400;

interface Options {
  smoothing: number;
  fft: number;
  minDecibels: number;
  scale: number;
  glow: number;
  color1: [number, number, number];
  color2: [number, number, number];
  color3: [number, number, number];
  fillOpacity: number;
  lineWidth: number;
  blend: string;
  shift: number;
  width: number;
  amp: number;
}

const opts: Options = {
  smoothing: 0.8,
  fft: 8,
  minDecibels: -60,
  scale: 0.2,
  glow: 15,
  color1: [243, 240, 219],
  color2: [255, 254, 243],
  color3: [220, 220, 220],
  fillOpacity: 0.4,
  lineWidth: 3,
  blend: "screen",
  shift: 50,
  width: 60,
  amp: 1,
};

/**
 * Pick a frequency for the given channel and value index.
 *
 * The channel goes from 0 to 2 (R/G/B)
 * The index goes from 0 to 4 (five peaks in the curve)
 *
 * We have 2^opts.fft frequencies to choose from and
 * we want to visualize most of the spectrum. This function
 * returns the bands from 0 to 28 in a nice distribution.
 */

const shuffle = [1, 3, 0, 4, 2];

function freq(channel: number, i: number, audioData: Uint8Array) {
  const band = 2 * channel + shuffle[i] * 6;
  return audioData[band];
}

/**
 * Returns the scale factor fot the given value index.
 * The index goes from 0 to 4 (curve with 5 peaks)
 */
function scale(i: number) {
  const x = Math.abs(2 - i); // 2,1,0,1,2
  const s = 3 - x; // 1,2,3,2,1
  return (s / 3) * opts.amp;
}

/**
 * Utility function to create a number range
 */
function range(i: number) {
  return Array.from(Array(i).keys());
}
export function path(
  channel: number,
  ctx: CanvasRenderingContext2D,
  audioData: Uint8Array
) {
  // Read color1, color2, color2 from the opts
  const color = (
    opts[`color${channel + 1}` as keyof Options] as Options["color1"]
  ).map(Math.floor);

  // turn the [r,g,b] array into a rgba() css color
  ctx.fillStyle = `rgba(${color}, ${opts.fillOpacity})`;

  // set stroke and shadow the same solid rgb() color
  ctx.strokeStyle = ctx.shadowColor = `rgb(${color})`;

  ctx.lineWidth = opts.lineWidth;
  ctx.shadowBlur = opts.glow;
  ctx.globalCompositeOperation = opts.blend as GlobalCompositeOperation;

  const m = CANVAS_HEIGHT / 2; // the vertical middle of the canvas

  // for the curve with 5 peaks we need 15 control points

  // calculate how much space is left around it
  const offset = (CANVAS_WIDTH - 15 * opts.width) / 2;

  // calculate the 15 x-offsets
  const x = range(15).map(
    (i) => offset + channel * opts.shift + i * opts.width
  );

  // pick some frequencies to calculate the y values
  // scale based on position so that the center is always bigger
  const y = range(5).map((i) =>
    Math.max(0, m - scale(i) * freq(channel, i, audioData))
  );

  const h = 2 * m;

  ctx.beginPath();
  ctx.moveTo(0, m); // start in the middle of the left side
  ctx.lineTo(x[0], m + 1); // straight line to the start of the first peak

  ctx.bezierCurveTo(x[1], m + 1, x[2], y[0], x[3], y[0]); // curve to 1st value
  ctx.bezierCurveTo(x[4], y[0], x[4], y[1], x[5], y[1]); // 2nd value
  ctx.bezierCurveTo(x[6], y[1], x[6], y[2], x[7], y[2]); // 3rd value
  ctx.bezierCurveTo(x[8], y[2], x[8], y[3], x[9], y[3]); // 4th value
  ctx.bezierCurveTo(x[10], y[3], x[10], y[4], x[11], y[4]); // 5th value

  ctx.bezierCurveTo(x[12], y[4], x[12], m, x[13], m); // curve back down to the middle

  ctx.lineTo(1000, m + 1); // straight line to the right edge
  ctx.lineTo(x[13], m - 1); // and back to the end of the last peak

  // now the same in reverse for the lower half of out shape

  ctx.bezierCurveTo(x[12], m, x[12], h - y[4], x[11], h - y[4]);
  ctx.bezierCurveTo(x[10], h - y[4], x[10], h - y[3], x[9], h - y[3]);
  ctx.bezierCurveTo(x[8], h - y[3], x[8], h - y[2], x[7], h - y[2]);
  ctx.bezierCurveTo(x[6], h - y[2], x[6], h - y[1], x[5], h - y[1]);
  ctx.bezierCurveTo(x[4], h - y[1], x[4], h - y[0], x[3], h - y[0]);
  ctx.bezierCurveTo(x[2], h - y[0], x[1], m, x[0], m);

  ctx.lineTo(0, m); // close the path by going back to the start

  ctx.fill();
  ctx.stroke();
}
