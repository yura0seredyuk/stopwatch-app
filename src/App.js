import React, {useState, useEffect} from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);

  useEffect(() => {
    const unsubscribe = new Subject();

    interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe((value) => {
        if (watchOn) {
          setTime(value);
        }
      });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [watchOn]);

  const startTimer = () => {
    setWatchOn(true);
  }

  const stopTimer = () => {
    setTime(0);
    setWatchOn(false);
  }

  const pauseTimer = () => {
    setWatchOn(false);
  }

  const resetTimer = () => {
    setTime(0);
    setWatchOn(false);
  }

  return (
    <>
      <div>
        <span>{('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}</span>&nbsp;:&nbsp;
        <span>{('0' + Math.floor(time / 6000)).slice(-2)}</span>&nbsp;:&nbsp;
        <span>{('0' + Math.floor((time / 100) % 60)).slice(-2)}</span>&nbsp;:&nbsp;
        <span>{('0' + Math.floor(time % 100)).slice(-2)}</span>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={startTimer}
      >
        Start
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={stopTimer}
      >
        Stop
      </Button>
      <Button
        variant="contained"
        onClick={pauseTimer}
      >
        Wait
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={resetTimer}
      >
        Reset
      </Button>
    </>
  );
}

export default App;
