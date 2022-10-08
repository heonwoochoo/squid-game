import { Howl } from "howler";

const commonVolumeSize = 0.3;
const backgroundVolumeSize = 0.1;

export const contactNormalGlass = new Howl({
  src: ["assets/sounds/normal.mp3"],
  volume: commonVolumeSize,
});
export const contactStrongGlass = new Howl({
  src: ["assets/sounds/strong.mp3"],
  volume: commonVolumeSize,
});

export const deathScream = new Howl({
  src: ["assets/sounds/deathScream.mp3"],
  volume: commonVolumeSize,
});

export const backgroungMusic = new Howl({
  src: ["assets/sounds/backgroundMusic.mp3"],
  volume: backgroundVolumeSize,
});

export const finishClap = new Howl({
  src: ["assets/sounds/finishClapping.mp3"],
  volume: commonVolumeSize,
  onend: () => {
    finishClap.volume(0);
  },
});

export const jumpSound = new Howl({
  src: ["assets/sounds/jump.wav"],
  volume: backgroundVolumeSize,
});
