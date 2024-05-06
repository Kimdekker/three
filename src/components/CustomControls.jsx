import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const CustomControls = () => {
  const { camera } = useThree();
  const velocity = useRef({ x: 0, y: 0 });


  // FIRST CODE --------------------------------------------------------------------------------------------------------------------------------------------

  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     const dx = (window.innerWidth / 2 - event.clientX) / window.innerWidth;
  //     const dy = (window.innerHeight / 2 - event.clientY) / window.innerHeight;

  //     velocity.current.x = dx;
  //     velocity.current.y = dy;
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  // useFrame(() => {
  //   camera.position.x += velocity.current.x;
  //   camera.position.y += velocity.current.y;
  //   camera.lookAt(0, 0, 0);
  // });

// ONE ---------------------------------------------------------------------------------------------------------------------------------------------------

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const dx = (window.innerWidth / 2 - event.clientX) / window.innerWidth;
//       const dy = (window.innerHeight / 2 - event.clientY) / window.innerHeight;

//       velocity.current.x = dx;
//       velocity.current.y = dy;
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useFrame(() => {
//     camera.position.x += velocity.current.x;
//     camera.rotation.y += velocity.current.y;
//     camera.lookAt(0, 0, 0);
//   });


// TWO -----------------------------------------------------------------------------------------------------------------------------------------------------


//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const dx = (window.innerWidth / 2 - event.clientX) / window.innerWidth;

//       velocity.current.x = dx;
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useFrame(() => {
//     camera.rotation.y += velocity.current.x;
//     camera.lookAt(0, 0, 0);
//   });



// THREE -----------------------------------------------------------------------------------------------------------------------------------------------------


// useEffect(() => {
//     const handleMouseMove = (event) => {
//       const dx = (window.innerWidth / 2 - event.clientX) / window.innerWidth;
//       const dy = (window.innerHeight / 2 - event.clientY) / window.innerHeight;

//       velocity.current.x = dx;
//       velocity.current.y = dy;
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   useFrame(() => {
//     camera.rotation.y += velocity.current.x;
//     camera.rotation.x += velocity.current.y;
//     camera.lookAt(0, 0, 0);
//   });



// FOUR -----------------------------------------------------------------------------------------------------------------------------------------------------

useEffect(() => {
  const handleMouseMove = (event) => {
    const dx = (window.innerWidth / 2 - event.clientX) / window.innerWidth;
    const dy = (window.innerHeight / 2 - event.clientY) / window.innerHeight;

    velocity.current.x = dx;
    velocity.current.y = dy;
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

useFrame(() => {
  const rotationSpeed = 0.015;
  camera.rotation.y += velocity.current.x * rotationSpeed;
  camera.rotation.x += velocity.current.y * rotationSpeed;
});


  return null;
};

export default CustomControls;
