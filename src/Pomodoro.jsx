import { useState, useEffect, useRef } from 'react';

function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
  };

  return (
    <div className="card">
      <div className="header-label">POMODORO — NIVEL 1</div>
      
      <div className={`timer-circle ${isRunning ? 'active' : ''}`}>
        <div className="timer-text">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="subtitle">
        demo de react hooks
      </div>

      <div className="button-row">
        <button className="button button-primary" onClick={toggleTimer}>
          <span className="icon">{isRunning ? '⏸' : '▶'}</span>
          {isRunning ? 'Pausa' : 'Inicio'}
        </button>
        <button className="button button-secondary" onClick={resetTimer}>
          <span className="icon">↺</span>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;
