import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  const handleClick = () => {
    setAlertVisibility(true);
  };

  const handleClose = () => {
    setAlertVisibility(false);
  };

  return (
    <div>
      {alertVisible && <Alert onClose={handleClose}>My alert</Alert>}
      <Button onClick={handleClick} color="secondary">
        My Button
      </Button>
    </div>
  );
}

export default App;
