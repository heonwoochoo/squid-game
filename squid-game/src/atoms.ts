import { Vector3 } from "@react-three/fiber/dist/declarations/src";
import { atom } from "recoil";

interface IUnit {
  glassSize: number;
  glassNumber: number;
}

export const deadState = atom<boolean>({
  key: "dead",
  default: false,
});

export const deadPosState = atom<Vector3>({
  key: "deadPosition",
  default: [0, 0, 0],
});

export const stepState = atom<number>({
  key: "step",
  default: 0,
});

export const clearState = atom<boolean>({
  key: "clear",
  default: false,
});

export const unitState = atom<IUnit>({
  key: "unit",
  default: {
    glassSize: 3,
    glassNumber: 11,
  },
});

export const clearTimeState = atom<number>({
  key: "time",
  default: 0,
});

export const respawnCountState = atom<number>({
  key: "respawnCount",
  default: 0,
});
