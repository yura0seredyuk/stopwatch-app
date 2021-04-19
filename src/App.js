import './App.css';
import { Button } from '@material-ui/core';

function App() {
  return (
    <>
      <Button variant="contained" color="primary">
        Start
      </Button>
      <Button variant="contained" color="secondary">
        Stop
      </Button>
      <Button variant="contained">
        Wait
      </Button>
      <Button variant="outlined" color="secondary">
        Reset
      </Button>
    </>
  );
}

export default App;
