import "./App.scss";
import { useEffect, useState, useRef } from "react";
function App() {
  const [count, setCount] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [state, setState] = useState(false);
  let id = useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };
  const Reset = (setCount, setMinutes, setHours) => {
    setCount(0);
    setMinutes(0);
    setHours(0);
    clear();
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setCount((c) => c + 1);
      if (count === 59) {
        setCount(0);
        setMinutes((minutes) => minutes + 1);
      }
      if (count === 59 && minutes) {
        setCount(0);
        setMinutes(0);
        setHours((hours) => hours + 1);
      }
    }, 1000);

    return clear;
  }, [count, state]);
  const timerHours = hours < 10 ? `0${hours}` : hours;
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerCount = count < 10 ? `0${count}` : count;
  return (
    <div className='Stopwatch'>
      <h1>
        {timerHours}:{timerMinutes}:{timerCount}
      </h1>
      <div className="buttons">
      <button onClick={clear}>Stop</button>
      <button
        onClick={() => {
          if (state) {
            setState(false);
          } else {
            setState(true);
          }
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          Reset(setCount, setMinutes, setHours);
        }}
      >
        Reset
      </button>
      </div>
    </div>
  );
}
export default App;
