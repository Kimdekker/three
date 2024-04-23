import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { PerspectiveCamera, PointerLockControls, ScrollControls, useScroll } from '@react-three/drei';
import Office from '../components/Office';
import { gsap } from 'gsap';

export const FLOOR_HEIGHT = 1.1;
export const NB_FLOORS = 3;

const HomePage = () => {

  const cameraRef = useRef();
  const trailRef = useRef();
  
  const tl = gsap.timeline();

  const FrameUpdate = ({ tl }) => {
    const scroll = useScroll();

    useFrame(() => {
        tl.seek(scroll.offset * tl.duration());
    });

  };
  
  useLayoutEffect(() => {
      // // VERTICAL ANIMATION
      tl.to(
        trailRef.current.position,
        {
          duration: 2,
          y: 5,
        },
        0
      );
  }, []);


  return (
      <>
        <ambientLight intensity={0.3} />
        <directionalLight position={[1, 2, 3]} intensity={1} />


        <ScrollControls damping={0.25} pages={3}>
          <FrameUpdate tl={tl} />

          <Office />

          <group dispose={null} ref={trailRef} position={[1, 1, 1]}>
              <PerspectiveCamera ref={cameraRef} makeDefault position={[2.3, 1.5, 2.3]}/>
              <PointerLockControls />
          </group>

        </ScrollControls>

      </>
  )
}

export default HomePage
