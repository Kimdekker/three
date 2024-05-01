import Space from '../components/Space'
import Button from '../components/Button'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { ScrollControls } from '@react-three/drei'

const HomePage = () => {

  const [view, setView] = useState('');

    const handleButtonClick = (view) => {
      setView(view);
    }

  return (
      <>
      <Canvas>
        <ScrollControls damping={0.25} pages={3}>
          <Space view={view} />
        </ScrollControls>
      </Canvas>

      <div className='pointer'>
        <span />
        <span />
      </div>

      <div className='btns'>
        <Button onClick={() => handleButtonClick('office')} text={'The Office'} />
        <Button onClick={() => handleButtonClick('library')} text={'The Library'} />
        <Button onClick={() => handleButtonClick('attic')} text={'The Attic'} />
      </div>

      </>
  )
}

export default HomePage