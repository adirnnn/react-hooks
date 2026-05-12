import { useState, useEffect, useRef } from 'react';

// constantes fuera del componente
const WORK_TIME = 1500; // 25 minutes
const BREAK_TIME = 300;  // 5 minutes

function Level2() {
  // estados iniciales
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work');
  const [sessions, setSessions] = useState([]);
  
  const intervalRef = useRef(null);

  // segundo useEffect separado para cambio de modo
  useEffect(() => {
    if (timeLeft === 0) {
      if (mode === 'work') {
        const newSession = {
          id: Date.now(),
          type: "work",
          duration: WORK_TIME,
          completedAt: new Date()
        };
        setSessions(prev => [...prev, newSession]);
        setMode('break');
        setTimeLeft(BREAK_TIME);
      } else {
        setMode('work');
        setTimeLeft(WORK_TIME);
      }
      setIsRunning(true);
    }
  }, [timeLeft, mode]);

  // de level 1
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
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

  // reset
  const resetTimer = () => {
    setIsRunning(false);
    setMode('work');
    setTimeLeft(WORK_TIME);
    setSessions([]);
  };

  return (
    <div className="card">
      <div className="header-label">POMODORO — NIVEL 2</div>
      
      {/* modo Trabajo / Descanso encima del timer */}
      <div className={`mode-indicator ${mode}`}>
        {mode === 'work' ? 'TRABAJO' : 'DESCANSO'}
      </div>

      <div className={`timer-circle ${isRunning ? 'active' : ''} ${mode}`}>
        <div className="timer-text">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="subtitle">
        {mode === 'work' 
          ? 'Modo trabajo: Concentración Máxima.' 
          : 'Modo descanso: Relajate y recarga.'}
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

      {/* lista de sesiones con número, duración y hora */}
      {sessions.length > 0 && (
        <div className="sessions-list">
          <h3>Sesiones Completadas</h3>
          <ul>
            {sessions.map((session, index) => (
              <li key={session.id}>
                <span className="session-number">Sesión #{index + 1}</span>
                <span className="session-duration">{formatTime(session.duration)}</span>
                <span className="session-time">
                  {session.completedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Level2;
