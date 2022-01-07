export default function animateMarcoMovement(frames, frameLength) {
  return function resolveFrame(distance) {
    const frameIndex = Math.floor(distance / frameLength) % frames.length;
    const frame = frames[frameIndex];
    return frame;
  };
}
