import React, {useState, useEffect} from 'react';
import './App.css';
import { Box, Button, Paper } from '@material-ui/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import image from './images/istockphoto-978715528-612x612.jpg';

function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);

  const numbers = interval(10);

  useEffect(() => {
    const unsubscribe = new Subject();

    numbers
      .pipe(takeUntil(unsubscribe))
      .subscribe((value) => {
        if (watchOn) {
          setTime(value);
        }
      });
    return () => {
      unsubscribe.next();
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
    <Paper style={styles.paperContainer}>
      <Box
        display="flex"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Box display="flex" justifyContent="center" m={2}>
            <Box fontSize="2.4rem">
              {('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}&nbsp;:&nbsp;
            </Box>
            <Box fontSize="2.4rem">
              {('0' + Math.floor(time / 6000)).slice(-2)}&nbsp;:&nbsp;
            </Box>
            <Box fontSize="2.4rem">
              {('0' + Math.floor((time / 100) % 60)).slice(-2)}&nbsp;:&nbsp;
            </Box>
            <Box fontSize="2.4rem">
              {('0' + Math.floor(time % 100)).slice(-2)}
            </Box>
          </Box>

          <Box display="flex" justifyContent="center">
            <Box m={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={startTimer}
              >
                Start
              </Button>
            </Box>
            <Box m={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={stopTimer}
              >
                Stop
              </Button>
            </Box>
            <Box m={2}>
              <Button
                variant="contained"
                onDoubleClick={pauseTimer}
              >
                Wait
              </Button>
            </Box>
            <Box m={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetTimer}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

const styles = {
  paperContainer: {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
  }
};

export default App;
