import Space from '../components/Space'
import Button from '../components/Button'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'


const HomePage = () => {

  const [view, setView] = useState('office');

  const viewToTime = {
    'office': 0,
    'library': 3,
    'attic': 5,
  }

  const handleButtonClick = (newView) => {
    const time = viewToTime[newView];
    setView(time);
  }

  return (
      <>
      <Canvas>
        <Space view={view} />
      </Canvas>

      <div className='btns'>
        <Button onClick={() => handleButtonClick('office')} href='#office' text={'The Office'} />
        <Button onClick={() => handleButtonClick('library')} href='#library' text={'The Library'} />
        <Button onClick={() => handleButtonClick('attic')} href='#attic' text={'The Attic'} />
      </div>

      </>
  )
}

export default HomePage