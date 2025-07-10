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
  }, []);

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

## Effect Dependencies

```javascript
useEffect(() => {
  console.log("Fetching Products");
  setProducts(["Clothing", "HouseHold"]);
});
```

In the above code, this **runs infinitely** because when we don’t have a dependency array, the **effect runs after every render**. So it runs after the initial render, then `setProducts` updates the state, which causes the component to render again, and then the effect runs again. This cycle repeats indefinitely, causing the effect to run infinitely.

```javascript
useEffect(() => {
  console.log("Fetching Products");
  setProducts(["Clothing", "HouseHold"]);
}, []);
```

In the above code, the `useEffect` will only run on the **initial render** because the dependency array is empty. That means the effect runs only once when the component mounts and **does not run again** on re-renders.

```javascript
// App Component
function App() {
  const [category, setCategory] = useState("");

  return (
    <div>
      <select
        className="form-select"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="HouseHold">HouseHold</option>
      </select>
      <ProductList category={category} />
    </div>
  );
}

// ProductList
const ProductList = ({ category }: { category: string }) => {
  useEffect(() => {
    console.log("Fetching Products", category);
  }, [category]);
  return <div>{category}</div>;
};
```

In the above code, when the value of the dependency (`category`) changes, the `useEffect` runs again.

This is because we passed `[category]` as the dependency array to the `useEffect`, so every time the category value updates (for example, when the user selects a different option), the effect gets triggered again.

## Effect Clean Up

Sometimes, the code we pass to the `useEffect` hook needs to be **cleaned up**. To provide cleanup code, we **return a function** from the effect. This function is used to **disconnect or unsubscribe** from whatever the effect was doing.

Generally, our **cleanup function** should **stop or undo** whatever the effect was doing. For example:

- If we are **connecting** to something or _subscribing_, the cleanup function should unsubscribe or call `disconnect()`.
- If we are showing a **modal**, the cleanup function should **hide the modal**.
- If our effect is **fetching data**, the cleanup function should **abort the fetch** or **ignore the result** if it's no longer needed.

The **cleanup function** will execute when:

- The component is **unmounted** (when the component remove from teh screen), or
- Before the effect runs again (if dependencies have changed)
