import { useState, useEffect, useRef } from 'react';

function Level3() {
  // estados paso 1
  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work');
  const [sessions, setSessions] = useState([]);
  
  // progress bar paso 2
  const [totalTime, setTotalTime] = useState(25 * 60);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      const mins = mode === 'work' ? workMins : breakMins;
      setTimeLeft(mins * 60);
      setTotalTime(mins * 60);
    }
  }, [workMins, breakMins, mode, isRunning]);

  // logica del Timer (Nivel 1 & 2)
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

  // sonido y cambio de modo
  useEffect(() => {
    if (timeLeft === 0) {
      try {
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        audio.play();
      } catch (e) {
        console.error("Audio error", e);
      }

      // cambio de modo
      if (mode === 'work') {
        const newSession = {
          id: Date.now(),
          type: "work",
          duration: totalTime,
          completedAt: new Date()
        };
        setSessions(prev => [...prev, newSession]);
        setMode('break');
      } else {
        setMode('work');
      }
      setIsRunning(true);
    }
  }, [timeLeft]);

  // stats
  const workSessions = sessions.filter(s => s.type.includes("work"));
  const totalFocusSeconds = workSessions.reduce((acc, s) => acc + s.duration, 0);

  // calc de progreso
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;

  // sesion parcial
  const savePartial = () => {
    const elapsed = totalTime - timeLeft;
    if (elapsed <= 0) return;

    const partialSession = {
      id: Date.now(),
      type: `${mode} (parcial)`,
      duration: elapsed,
      completedAt: new Date()
    };
    setSessions(prev => [...prev, partialSession]);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const resetAll = () => {
    setIsRunning(false);
    setMode('work');
    setSessions([]);
    setWorkMins(25);
    setBreakMins(5);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="card level-3">
      <div className="header-label">POMODORO — NIVEL 3</div>

      {/* Estadísticas de Paso 4 */}
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{workSessions.length}</span>
          <span className="stat-label">SESIONES</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{Math.floor(totalFocusSeconds / 60)}m</span>
          <span className="stat-label">TIEMPO TOTAL</span>
        </div>
      </div>

      {/* Configuración de Paso 1 */}
      <div className="config-panel">
        <div className="config-group">
          <label>TRABAJO</label>
          <input 
            type="number" min="1" max="60" 
            value={workMins} 
            disabled={isRunning}
            onChange={(e) => setWorkMins(parseInt(e.target.value) || 1)}
          />
        </div>
        <div className="config-group">
          <label>DESCANSO</label>
          <input 
            type="number" min="1" max="60" 
            value={breakMins} 
            disabled={isRunning}
            onChange={(e) => setBreakMins(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      <div className={`mode-indicator ${mode}`}>
        {mode === 'work' ? 'TRABAJO' : 'DESCANSO'}
      </div>

      <div className={`timer-circle ${isRunning ? 'active' : ''} ${mode}`}>
        <div className="timer-text">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="button-row main-actions">
        <button className="button button-primary" onClick={() => setIsRunning(!isRunning)}>
          <span className="icon">{isRunning ? '⏸' : '▶'}</span>
          {isRunning ? 'Pausa' : 'Inicio'}
        </button>
        <button className="button button-secondary" onClick={resetAll}>
          <span className="icon">↺</span>
          Reset
        </button>
      </div>

      <div className="button-row secondary-actions">
        <button className="button button-save" onClick={savePartial}>
          <span className="icon">💾</span>
          Guardar Sesión Parcial
        </button>
      </div>

      {/* Barra de progreso Paso 2 */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      {/* Historial */}
      {sessions.length > 0 && (
        <div className="sessions-list">
          <h3>Historial</h3>
          <ul>
            {sessions.map(s => (
              <li key={s.id} className={s.type.includes('parcial') ? 'partial' : ''}>
                <span className="session-type">{s.type}</span>
                <span className="session-duration">{formatTime(s.duration)}</span>
                <span className="session-time">
                  {s.completedAt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Level3;
