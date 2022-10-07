import { Triplet, useBox } from "@react-three/cannon";
import { useRef } from "react";
import * as THREE from "three";
import useMakeWalls from "../hooks/useMakeWalls";
function Wall() {
  useMakeWalls();
  return null;
}
export default Wall;
