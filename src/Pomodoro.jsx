import { useState, useEffect, useRef } from 'react';

function Pomodoro() {
  // TODO 1
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins en seg
  const [isRunning, setIsRunning] = useState(false);

  // TODO 2
  const intervalRef = useRef(null);

  // TODO 3
  useEffect(() => {
    // si isRunning es true y timeLeft > 0, crea un setInterval
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // si timeLeft llega a 0, cambia isRunning a false
      setIsRunning(false);
    }

    // en el return del efecto, llama clearInterval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  // TODO 4
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // TODO 5
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
  };

  return (
    <div>
      {/* TODO 6: Muestra tiempo y botones */}
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>
      <div className="controls">
        <button className="btn-toggle" onClick={toggleTimer}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button className="btn-reset" onClick={resetTimer}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;
