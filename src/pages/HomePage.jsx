import { useFrame } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import { OrbitControls, PerspectiveCamera, ScrollControls, useScroll } from '@react-three/drei';
import Office from '../components/Office';
import { gsap } from 'gsap';


export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

const HomePage = () => {

  const cameraRef = useRef(null);
  const trailRef = useRef(null);
  
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
          y: 100,
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
              <OrbitControls enableZoom={false} />
          </group>

        </ScrollControls>

      </>
  )
}

export default HomePage
