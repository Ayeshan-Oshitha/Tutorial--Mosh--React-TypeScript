import Button from "./components/Button";
function App() {
  return (
    <div>
      <Button onClick={() => console.log("Clicked")} color="secondary">
        Button
      </Button>
    </div>
  );
}

export default App;
