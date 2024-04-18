import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Office } from "../components/Office";

export const Experience = () => {
  return (
    <>
    <ambientLight intensity={0.3} />
    <directionalLight position={[1, 2, 3]} intensity={1} />
    <OrbitControls enableZoom={false} />

    <ScrollControls damping={0.25} pages={3}>
        <Office />
    </ScrollControls>
    </>
  );
};