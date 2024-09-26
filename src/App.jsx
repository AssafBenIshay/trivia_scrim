import { useState } from 'react'
import './App.css'
import bottomLeft from '../assets/bottom-left.png'
import topRight from '../assets/top-right.png'
import WelcomeScreen from './components/WelcomeScreen'
import TriviaScreen from './components/TriviaScreen'

function App() {
  const [isRunning, setIsRunning] = useState(false)

  return (
    <div className='App'>
      <div className='background-shapes'>
        <img src={topRight} className='topRight' />
        <img src={bottomLeft} className='bottomLeft' />
      </div>
      {!isRunning && <WelcomeScreen setIsRunning={setIsRunning} />}
      {isRunning && <TriviaScreen setIsRunning={setIsRunning} />}


    </div>
  )
}

export default App
