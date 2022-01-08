export default function createAnimation(frames, frameLength) {
  return function resolveFrame(distance) {
    const frameIndex = Math.floor(distance / frameLength) % frames.length;
    const frame = frames[frameIndex];
    return frame;
  };
}
