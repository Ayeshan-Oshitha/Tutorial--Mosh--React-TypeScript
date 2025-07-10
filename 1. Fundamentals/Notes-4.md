# 6. Connecting to Backend

## Understanding the Effect Hooks

React components should be **pure functions**. That means:

- They should always return the **same output** (JSX) for the **same input (props/state)**.

- They should **not produce side effects** — _no code that changes anything outside the component_ or _affects the app outside of returning JSX_.

#### Why Avoid Side Effects in Rendering?

During rendering, React expects components to be pure so it can efficiently manage updates. Side effects—like changing the DOM directly, fetching data, setting timers, or updating global variables—should **not** happen inside the main body of the component function because it breaks purity.

But there are places where we need some side effects.

<img src="./images/image-5.png" width="500">

None of the above situations are about rendering a component. They have nothing to do with returning the JSX. These actions don’t affect the returned JSX, so they are considered side effects.

React provides the `useEffect` hook to run side effects after the component has rendered. This allows you to keep your component function pure while still performing necessary side effects.

Here’s an example of what not to do:

```javascript
function App() {
  const inputRef = useRef < HTMLInputElement > null;

  // Side Effect
  if (inputRef.current) {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} type="text" className="form-control" />
    </div>
  );
}
```

This code runs during rendering and directly changes the DOM, which breaks the purity of the component.

Use `useEffect` to run the focus logic after the component renders:

```javascript
import { useEffect, useRef } from "react";

function App() {
  const inputRef = useRef < HTMLInputElement > null;

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
```

- The code inside useEffect runs after the render phase.
- This keeps the component pure because the rendering function only returns JSX.
- The side effect (focusing the input) happens safely afterward.

Note - You **cannot call** `useEffect` conditionally or inside loops — it must be called **at the top level** of your component.
