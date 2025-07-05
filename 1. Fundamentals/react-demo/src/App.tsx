import Button from "./components/Button";

const handleClick = () => {
  console.log("Clicked");
};

function App() {
  return (
    <div>
      <Button onClick={handleClick} color="secondary">
        My Button
      </Button>
    </div>
  );
}

export default App;
