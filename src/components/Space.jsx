import { useFrame } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PerspectiveCamera, PointerLockControls, useScroll } from '@react-three/drei';
import Office from './Office';
import { gsap } from 'gsap';

const Space = ({view}) => {

  const cameraRef = useRef();
  const trailRef = useRef();
  const tl = useRef(gsap.timeline({ paused: true }));
  const [isUpdating, setIsUpdating] = useState(true);
  const scroll = useScroll();


  const FrameUpdate = ({ tl }) => { // timing bug fixed, skipt de laatste frame alleen, maar ik hebhet laatste frame gewoon gecopy paste, dan werkt het wel :)
    const scroll = useScroll();
    useFrame(() => {
      if (isUpdating) {
        const position = scroll.el.scrollTop / scroll.el.scrollHeight;
        tl.current.seek(position * tl.current.duration());
      }
    });
  };


  const SeekSmooth = (label) => { // to seek a certain point inside the timeline, in a smooth way
    setIsUpdating(false);
    gsap.to(tl.current, {
      duration: 2.5,
      progress: tl.current.labels[label] / tl.current.duration(),
      ease: "power4.inOut",
      onComplete: () => {
        const position = tl.current.progress() * scroll.el.scrollHeight;
        scroll.el.scrollTo(0, position);
        
        setTimeout(() => {
          setIsUpdating(true)
        }, 1000);        
      }
    });
  };

  useEffect(() => {
    if (view) {
      SeekSmooth(view);
    }
  } , [view]);


  // EASEN OP DE CAMERA ?
  useLayoutEffect(() => { // timeline path
      // 0
      tl.current.to( // position
        trailRef.current.position,
        {
          y: 1.5,
          x: 0,
          z: 0,
          ease: "none",
        }
      )
      .addLabel('office')

      // 1
      .to( // position
        trailRef.current.position,
        {
          y: 2,
          x: -2,
          z: 0,
          ease: "none",
        }
      )
      .to( // rotation
        trailRef.current.rotation,
        {
          y: -Math.PI / 2,
          duration: 1,
          ease: "none",
        },
      )
      .addLabel('library')


      // 2
      .to( // position
        trailRef.current.position,
        {
          y: 4,
          x: -4,
          z: 0,
          ease: "none",
        }
      )



      // 3
      .to( // position
        trailRef.current.position,
        {
          y: 5,
          x: -6,
          z: -2,
          ease: "none",
        }
      )

      .to( // rotation
        trailRef.current.rotation,
        {
          y: -Math.PI / 1.5,
          duration: 1,
          ease: "none",
        }
      )
      .addLabel('attic')


      .to( // rotation
      trailRef.current.rotation,
      {
        y: -Math.PI / 1.5,
        duration: 1,
        ease: "none",
      }
    )


  }, []);


  return (
      <>
        <ambientLight position={[-2, -2, 2]} />
        <directionalLight position={[2, 2, 2]} intensity={0.7} />


        
          <FrameUpdate tl={tl} />

          <Office />

          <group dispose={null} ref={trailRef} position={[1, 1, 1]}>
              <PerspectiveCamera ref={cameraRef} makeDefault position={[2.3, 1.5, 2.3]}/>
              <PointerLockControls />
          </group>

      </>
  )
}

export default Space