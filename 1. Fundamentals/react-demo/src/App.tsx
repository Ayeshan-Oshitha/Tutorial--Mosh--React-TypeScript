import { useEffect, useRef } from "react";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  // Side Effect
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <div>
      <input ref={inputRef} type="text" className="form-control" />
    </div>
  );
}

export default App;
