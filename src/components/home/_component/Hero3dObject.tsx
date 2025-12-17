"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import CameraRig from "./CameraRig";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero3dObject() {
  const [camPos] = useState<[number, number, number]>([40, 0, 0]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /**
   * = Configuration (tweak these values to change behaviour) =
   *
   * - SCROLL_SPACER_VH: height (in vh) of the invisible scroll spacer that drives
   *   the model's scroll-based animation. Increasing this makes the scroll range
   *   longer.
   *
   * - MODEL_COMPLETE_PROGRESS: the scroll progress (0..1) at which the model
   *   should be considered fully animated / completed. If you want the model to
   *   finish earlier than the full scroll, set this < 1 (e.g. 0.9).
   *
   * - OVERLAY_HEIGHT_VH: height of the fade overlay (in vh). Default 100vh
   *   covers the full viewport. Reduce to limit the overlay to a smaller band.
   *
   * - FADE_START_PROGRESS: normalized scroll progress (0..1) where the overlay
   *   fade should start. For example, 0.8 means the overlay begins fading when
   *   scrollProgress reaches 80%.
   *
   * - FADE_LENGTH_PROGRESS: how much normalized progress (0..1) the fade uses
   *   from start->end. For example, 0.2 with FADE_START_PROGRESS 0.8 will fade
   *   from 0.8 -> 1.0.
   *
   * - FADE_EASING_EXP: power for easing the opacity curve (use >1 for ease-in,
   *   <1 for ease-out). Try 1 (linear), 1.5, 2, 3 for different feels.
   */
  const SCROLL_SPACER_VH = 300; // default was 300vh
  const MODEL_COMPLETE_PROGRESS = 1; // when model should reach full completion (0..1)
  const OVERLAY_HEIGHT_VH = 100; // overlay height in vh (100 = full viewport)

  // Fade control: tweak these to change when/duration of fade
  const FADE_START_PROGRESS = 0.8; // start fade at 80% scrollProgress
  const FADE_LENGTH_PROGRESS = 0.2; // fade spans 20% of progress (0.8 -> 1.0)
  const FADE_EASING_EXP = 1.8; // exponent for easing the opacity (higher = more ease-in)

  useEffect(() => {
    // GSAP ScrollTrigger to track scroll progress
    const scrollTrigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  // Compute overlay opacity (clamped). You can tweak easing here.
  // Map the global scrollProgress (0..1) into a 0..1 value for the overlay,
  // starting at FADE_START_PROGRESS and lasting FADE_LENGTH_PROGRESS.
  const rawOverlayT =
    (scrollProgress - FADE_START_PROGRESS) / FADE_LENGTH_PROGRESS;
  const clampedT = Math.max(0, Math.min(1, rawOverlayT));
  // Apply easing using a simple power curve. Increase FADE_EASING_EXP for
  // stronger ease-in (slower at the start, faster at the end).
  const overlayOpacity = Math.pow(clampedT, FADE_EASING_EXP);

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full"
      style={{ height: `${SCROLL_SPACER_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Canvas className="w-full h-full bg-background">
            <CameraRig position={camPos} target={[0, 0, 0]} fov={65} />

            <ambientLight intensity={2.5} />
            <directionalLight position={[15, 5, 0]} intensity={0.5} />

            <Model3D
              scrollProgress={scrollProgress}
              modelCompleteProgress={MODEL_COMPLETE_PROGRESS}
            />

            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={false}
            />
          </Canvas>
        </div>
        {/* Fade overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-20 bg-background"
          style={{
            height: `${OVERLAY_HEIGHT_VH}vh`,
            opacity: overlayOpacity,
          }}
        />
      </div>
    </div>
  );
}

export default Hero3dObject;

// Updated Model3D Component
const Model3D = ({
  scrollProgress,
  modelCompleteProgress = 1,
}: {
  scrollProgress: number;
  modelCompleteProgress?: number;
}) => {
  const { scene } = useGLTF("/models/AVI.glb");
  const modelRef = useRef<THREE.Object3D>(null);

  // CONFIG for initial animation
  const finalRotationY = 0.8;
  const initialRotationY = Math.PI / 2; // 90deg
  const duration = 2; // seconds
  const delay = 1.5; // seconds

  const startTime = useRef<number | null>(null);
  const initialAnimComplete = useRef(false);
  const restRotationY = useRef(finalRotationY);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = initialRotationY;
      modelRef.current.position.set(0, -33, -2); // Set initial position
    }
  }, []);

  useFrame(({ clock }) => {
    if (!modelRef.current) return;

    const t = clock.getElapsedTime();

    // Initial coming animation
    if (!initialAnimComplete.current) {
      if (t < delay) return;

      if (startTime.current === null) {
        startTime.current = t;
      }

      const progress = Math.min((t - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      modelRef.current.rotation.y =
        initialRotationY + (finalRotationY - initialRotationY) * eased;

      if (progress >= 1) {
        initialAnimComplete.current = true;
        restRotationY.current = modelRef.current.rotation.y;
      }
      return;
    }

    // Scroll-triggered animation (after initial animation completes)
    // Allow the model to complete earlier than full scroll by dividing the
    // incoming scrollProgress by `modelCompleteProgress`. Example: if
    // modelCompleteProgress = 0.9, the model reaches its final pose when
    // scrollProgress == 0.9.
    
    const denom = modelCompleteProgress > 0 ? modelCompleteProgress : 1;
    const modelT = Math.max(0, Math.min(1, scrollProgress / denom));

    // Rotation: from restRotationY (0.8) to 0
    const targetRotationY = THREE.MathUtils.lerp(
      restRotationY.current,
      0,
      modelT
    );
    modelRef.current.rotation.y = targetRotationY;

    // Position: from [0, -33, -2] to [0, 32, 0]
    const targetPositionY = THREE.MathUtils.lerp(-33, 32, modelT);
    const targetPositionZ = THREE.MathUtils.lerp(-2, 0, modelT);

    modelRef.current.position.y = targetPositionY;
    modelRef.current.position.z = targetPositionZ;
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[2, 4, 2]}
      position={[0, -33, -5]}
    />
  );
};
