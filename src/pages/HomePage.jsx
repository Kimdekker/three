import { Canvas } from '@react-three/fiber';
import CameraAnimation from '../components/CameraAnimation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { OrbitControls, PerspectiveCamera, useScroll } from '@react-three/drei';
import Office from '../components/Office';

const HomePage = () => {

  const cameraRef = useRef();
  const trailRef = useRef();

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(2.3, 1.5, 2.3);
    }
  }, []);


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


  return (
      <Canvas camera={{fov: 64, position: [2.3, 1.5, 2.3], }}>


      <group ref={trailRef}>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[2.3, 1.5, 2.3]}/>
      <OrbitControls camera={cameraRef.current} enableZoom={false}/>
      </group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[1, 2, 3]} intensity={1} />


      <Office />

      <CameraAnimation trailRef={trailRef}/>


      </Canvas>


  )
}

export default HomePage
