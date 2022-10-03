import { Vector3 } from "@react-three/fiber/dist/declarations/src";
import { atom } from "recoil";
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
