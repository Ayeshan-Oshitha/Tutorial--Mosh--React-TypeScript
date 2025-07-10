import { useEffect } from "react";

const connect = () => console.log("Connected");

const disConnect = () => console.log("DisConnect");

function App() {
  useEffect(() => {
    connect();

    return () => disConnect();
  });

  return <div>App</div>;
}

export default App;
