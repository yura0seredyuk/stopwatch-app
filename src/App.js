import React, {useState, useEffect} from 'react';
import './App.css';
import { Box, Button, Paper } from '@material-ui/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import image from './images/istockphoto-978715528-612x612.jpg';

function App() {
  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);

  useEffect(() => {
    const unsubscribe = new Subject();

    interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (watchOn) {
          setTime(value => value + 1);
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
    setWatchOn(prevState => !prevState);
    setTime(0);
  }

  const pauseTimer = () => {
    setWatchOn(false);
  }

  const resetTimer = () => {
    if (!watchOn && time !== 0) {
      setWatchOn(true);
    }

    setTime(0);
  }

  return (
    <Paper style={styles.paperContainer}>
      <Box style={styles.boxContainer}>
        <Box>
          <Box style={styles.contentContainer} m={2}>
            <Box style={styles.timerFont}>
              {('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}&nbsp;:&nbsp;
            </Box>
            <Box style={styles.timerFont}>
              {('0' + Math.floor(time / 6000)).slice(-2)}&nbsp;:&nbsp;
            </Box>
            <Box style={styles.timerFont}>
              {('0' + Math.floor((time / 100) % 60)).slice(-2)}
            </Box>
          </Box>

          <Box style={styles.contentContainer}>
            <Box m={2}>
              {watchOn ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={stopTimer}
                >
                  Stop
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startTimer}
                >
                  Start
                </Button>
              )}
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
    backgroundSize: "cover",
  },
  boxContainer: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
  },
  timerFont: {
    fontSize: "2.4rem",
  },
};

export default App;
