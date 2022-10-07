import { Howl } from "howler";

const volumeSize = 0.3;

export const contactNormalGlass = new Howl({
  src: ["assets/sounds/normal.mp3"],
  volume: volumeSize,
});
export const contactStrongGlass = new Howl({
  src: ["assets/sounds/strong.mp3"],
  volume: volumeSize,
});
