import { useState } from 'react'
import Level1 from './Level1'
import Level2 from './Level2'
import './App.css'

function App() {
  const [currentLevel, setCurrentLevel] = useState(2);

  return (
    <div className="container">
      <div className="level-tabs">
        <button 
          className={currentLevel === 1 ? 'active' : ''} 
          onClick={() => setCurrentLevel(1)}
        >
          Level 1
        </button>
        <button 
          className={currentLevel === 2 ? 'active' : ''} 
          onClick={() => setCurrentLevel(2)}
        >
          Level 2
        </button>
      </div>

      <div className="view-port">
        {currentLevel === 1 && <Level1 />}
        {currentLevel === 2 && <Level2 />}
      </div>
    </div>
  )
}

export default App
