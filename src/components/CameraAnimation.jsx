import { useScroll } from '@react-three/drei';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';


export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

export function CameraAnimation({trailRef}) {
  const tl = useRef();
  const { xy } = useScroll();

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(
      trailRef.current.position,
      {
        duration: 2,
        y: 100,
        scrollTrigger: {
          trigger: window,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      },
      0
    );

    //   tl.current.to(
    //     camera.position,
    //     {
    //       duration: 1,
    //       x: -1,
    //       z: 2,
    //     },
    //     0
    //   );
    //   tl.current.to(
    //     camera.position,
    //     {
    //       duration: 1,
    //       x: 1,
    //       z: 2,
    //     },
    //     1
    //   );

    //   tl.current.to(
    //     camera.rotation,
    //     {
    //       duration: 1,
    //       x: 0,
    //       y: Math.PI / 6, z: 0
    //     },
    //     0
    //   );
    //   tl.current.to(
    //     camera.rotation,
    //     {
    //       duration: 1,
    //       x: 0,
    //       y: -Math.PI / 6, z: 0
    //     },
    //     1
    //   );


}, []);

  return null
}

export default CameraAnimation



