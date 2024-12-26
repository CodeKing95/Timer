import { useEffect, useRef, useState } from "react";
import "./App.css";

function useFormInput() {
  const [value, setValue] = useState<number>(0);

  function handleInputChangeEvent(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(event.target.value));
  }
  return { value, handleInputChangeEvent };
}

function App() {
  const { value, handleInputChangeEvent } = useFormInput();
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const [pause, setPause] = useState(false);
  const intervalId = useRef(-1);

  useEffect(() => {
    if ((now - startTime) / 1000 >= value) {
      clearInterval(intervalId.current);
      setPause(false);
      setNow(startTime + value * 1000);
    }
  }, [startTime, now, value]);

  function startInterval() {
    intervalId.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStart() {
    clearInterval(intervalId.current);
    if (!pause) {
      const dateNow = Date.now();
      setStartTime(dateNow);
      setNow(dateNow);

      startInterval();
    } else {
      const elapsedTime = now - startTime;
      const dateNow = Date.now();
      setNow(Date.now());
      setStartTime(dateNow - elapsedTime);
      setPause(false);
      startInterval();
    }
  }

  function handlePause() {
    clearInterval(intervalId.current);
    setPause(true);
  }

  function handleReset() {
    clearInterval(intervalId.current);
    setPause(false);
    setStartTime(0);
    setNow(0);
  }

  const secondsLeft = value - (now - startTime) / 1000;

  return (
    <div>
      <span className="t-4">Enter a Time</span>
      <br />
      <input type="number" value={value} onChange={handleInputChangeEvent} />
      <br />
      <span className="t-1 bold">Time Remaining:</span>
      <br />
      <span className="t-1 bold">{secondsLeft.toFixed(3)}</span>
      <div className="button-row">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
