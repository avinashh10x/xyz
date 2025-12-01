import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

type CameraRigProps = {
  position?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
};

function CameraRig({
  position = [10, 5, 10],
  target = [0, 0, 0],
  fov = 100,          // NEW
}: CameraRigProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const { set } = useThree((state) => ({ set: state.set }));

  const targetRef = useRef(new THREE.Vector3(...target));
  const positionRef = useRef(new THREE.Vector3(...position));
  const fovRef = useRef(fov); // NEW

  // Update camera position when prop changes
  useEffect(() => {
    positionRef.current = new THREE.Vector3(...position);
  }, [position]);

  // Update camera target when prop changes
  useEffect(() => {
    targetRef.current = new THREE.Vector3(...target);
  }, [target]);

  // Update fov target when prop changes
  useEffect(() => {
    fovRef.current = fov;
  }, [fov]);

  useEffect(() => {
    if (cameraRef.current) {
      set({ camera: cameraRef.current });
    }
  }, [set]);

  useFrame(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    // Smooth position movement
    camera.position.lerp(positionRef.current, 0.05);

    // Smooth lookAt
    camera.lookAt(targetRef.current);

    // Smooth FOV change
    camera.fov = THREE.MathUtils.lerp(camera.fov, fovRef.current, 0.05);

    // Required when FOV changes
    camera.updateProjectionMatrix();
  });

  return (
    <perspectiveCamera
      ref={cameraRef}
      position={position}
      fov={fov}
      near={0.1}
      far={1000}
    />
  );
}

export default CameraRig;
