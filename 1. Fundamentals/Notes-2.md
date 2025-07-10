# 4. Managing Component State

## Understand the State Hook

- React Updates the state Asynchrnously
- State is stored outside of components
- Use Hooks at the top level of the component

### i) Explanation - React Updates the state Asynchrnously

React updates the state asynchronously (not immediately) in the future. This is done for performance reasons.

```javascript
function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
    setIsApproved(true);
    console.log(isVisible); // This will still log "false"
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

In the above code, the result of `console.log` will be the old state (`false`). So the update is not applied immediately. It updates asynchronously.

The reason is that, as we are handling an event, we could set multiple state values at once (`setIsVisible`, `setIsApproved`). If every time we call a `set` function, React re-renders our component, we will end up with too many re-renders. This is unnecessary.

So for performance reasons, React takes all these updates (`set` functions), batches them during the **`event handler execution`**, and applies them later—after the `handleClick` function executes. So at that point, React applies all the updates at once and then re-renders our component with the updated state. (So, even though there are one or multiple updates available, React applies them in the next cycle after the function executes.)

---

If the state update functions (`setState`) are **directly inside the** `onClick` **handler**, the behavior is **exactly the same** — React will **still update the state asynchronously** and batch **updates**.

```javascript
function App() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
        console.log(count); // still logs old value
      }}
    >
      Click Me
    </button>
  );
}
```

What happens here?

- `setCount(count + 1)` is called when the button is clicked.

- But `console.log(count)` still prints the old value (e.g., 0 the first time you click).

- That’s because even though the setCount is inside the onClick, it’s still treated as part of an **event handler**.

- React batches the updates and applies them after the **event handler finishes**.

---

#### ✅ So, the important note is:

React batches all the updates inside the **event handler function** (whether the function is written inline or as a separate function) and applies them after the function finishes executing.

An **event handler** is a function that responds to user actions like clicks, key presses, form submissions, mouse movements, etc

In React, you typically write event handlers to handle events like:

- onClick (button click)

- onChange (input field change)

- onSubmit (form submission)

---

State updates can happen outside event handlers, such as:

- Inside useEffect

- In async code (like setTimeout, Promise)

- External libraries

But only in **event handlers** is **batching always guaranteed** — unless you're using React 18+, where automatic batching has been extended to more places. ( In React 18+, React does batch updates even in: `setTimeout` , `fetch().then()` , `async/await` , `Promise callbacks` )

### ii) Explanation - State is stored outside of components

```javascript
function App() {
  const [isVisible, setIsVisible] = useState(false);
  let count = 0;

  const handleClick = () => {
    setIsVisible(true);
    count++;
    console.log(isVisible);
  };

  return (
    <div>
      <button>....</button>
    </div>
  );
}
```

In JavaScript, when we declare a variable inside a function, it is scoped to that function. So, when this component finishes execution, our local variable is removed from memory. That means the next time React re-renders this component, it is going to call the `App` function again, and our `count` variable is going to be initialized to zero again.

So, the update applied in `handleClick` will be lost. That’s why we use **state hooks** to store values **outside the component function’s execution scope**. state Hooks persist across renders and keep their values until the component unmounts

React stores the state variables for **each component instance**, and it automatically cleans up those variables when the component is unmounted (i.e., removed from the UI( navigated away, or conditional rendering stopped showing that component)).

---

- Local variables inside the component function are reset every time the component re-renders.

- State variables managed by React hooks (useState) keep their values across re-renders, but they are lost when the component unmounts (i.e., removed from the UI).

**Extra** - Refresh the web page means also an unmount. (full page reload (Refresh = everything unmounts and reloads))

---

Note - Variables declared outside of the Component function are global, so they don’t reinitialize — they persist across re-renders.

```javascript
let count = 0;

function MyComponent() {
  count++;
  return <div>{count}</div>;
}
```

If this component re-renders 3 times, count becomes:

```bash
1 → 2 → 3
```

Even though the component re-renders, count is not reset because it’s outside the component — it only gets incremented.

But why do we use `useState` instead of this global variable?

1. All component instances share the same variable

   So, if you use the same component multiple times, they’ll all use the same count, which is not safe or isolated.

2. It doesn't trigger a re-render when the variable changes

   Updating a normal variable like count++ won’t re-render the component — React won’t know something changed.

### iii) Explanation - Use Hooks at the top level of the component

```javascript
function App() {
  // [ false, false]

  const [isVisible, setIsVisible] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
}
```

The names (`isVisible`, `setIsVisible`) are just local identifiers for the `useState` hooks. React itself doesn’t know these names.

React internally stores the state values in an array-like structure. When the component re-renders, React looks at this array and assigns the first element to the first `useState` call, the second element to the second useState call, and so on.

Because React relies on the **order** of hook calls, we **must call hooks in the same order every time**. If hooks are called inside loops, conditionals, or nested functions, the order could change between renders, which will cause React to assign state values incorrectly.

**Therefore, hooks should always be called at the top level of the component to keep their order consistent.** ( Always write `useState()`, `useEffect()`, etc. directly in the component body, not inside if, loops, or nested functions. - This is known as calling a hook. But we can use setter function of useState at any level.)

## Choosing the state structure

Best Practices

- Avoid redundant state variables

  Don’t use separate state variables for `firstName`, `lastName`, and `fullName`. Instead, use state only for `firstName` and `lastName`, and compute `fullName` as a derived value using those two.

```javascript
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
let fullname = firstName + " " + lastName;
```

- Group related variables inside an object

  Don’t create separate state variables for `firstName` and `lastName`. Use a single person state and store both names as properties inside an object — for example:

```javascript
const [person, setPerson] = useState({ firstName: "", lastName: "" });
```

## Keeping Components Pure

Pure Function - Given the same inputm always return the same result

In React, every component should be a **pure component**. In React terms, when we give the same **inputs (props and state)**, the component should return the **same JSX output**.

So, **if the inputs haven’t changed**, React can skip re-rendering that component during the next render cycle (this is called _memoization_ in some cases).

To keep a component pure, we should keep changes out of the render phase. (Don't change or mutate any external values during the execution of your component)

#### Example 1

```javascript
// Message Component
let count = 0;
function Message() {
  return (
    <>
      <div>Message : {count}</div>
    </>
  );
}

export default Message;

// App Component
function App() {
  return (
    <div>
      <Message />
      <Message />
      <Message />
    </div>
  );
}
```

```bash
Message : 0
Message : 0
Message : 0
```

✅ Pure component

#### Example 2

```javascript
// Message Component
let count = 0;
function Message() {
  count++;
  return (
    <>
      <div>Message : {count}</div>
    </>
  );
}

export default Message;

// App Component
function App() {
  return (
    <div>
      <Message />
      <Message />
      <Message />
    </div>
  );
}
```

```bash
Message : 2
Message : 4
Message : 6
```

❌ Not a pure component — impure component.

To keep our component pure, we should keep changes **out of the render phase**.

We **should not change any object that existed before rendering** (like the _count_ variable above).

#### Example 3

```javascript
// Message Component
function Message() {
  let count = 0;
  count++;
  return (
    <>
      <div>Message : {count}</div>
    </>
  );
}

export default Message;

// App Component
function App() {
  return (
    <div>
      <Message />
      <Message />
      <Message />
    </div>
  );
}
```

```bash
Message : 1
Message : 1
Message : 1
```

✅ Pure component — it is totally okay to update an object that we **create as part of rendering**.

Now the `count` variable is **part of the render phase(Inside the App Component)**, so it’s okay to update it.

## Understanding the Strict Mode

In the above section (in Example 2), in the impure component example, we should get the output as:

```bash
Message : 1
Message : 2
Message : 3
```

But we got:

```bash
Message : 2
Message : 4
Message : 6
```

The reason for this is **Strict Mode**. Strict Mode is a **built-in component** in React that doesn't have a visual representation. It is only there to **catch potential problems**. One of the problems is impure components.

So, when Strict Mode is enabled, in development, React renders each component twice (React renders the component twice and uses the result of the second render).

- The **first render** is used primarily for detecting and reporting potential issues in our code.

- The **second render** is used to actually update the user interface.

From React 18, Strict Mode is enabled by default. Strict Mode behaves this way only in development mode, so when we build our application for production,
the Strict Mode checks are not included and components are rendered only once.

## Updating Objects

When dealing with objects and arraysm wuth shoudl trat them as aikmutablke or raqd only ( so we don't want to modfi teh propoetto o current obejct, Insaed we shoudl gove it a brand new obejct)

```javascript
import { useState } from "react";

function App() {
  const [drink, setDrink] = useState({
    title: "Americano",
    price: 5,
  });

  const handleClick = () => {
    // const newDrink = {
    //  ...drink - Spread Operator, Copy all other Properties
    //   price: 6,
    // };
    // setDrink(newDrink);

    setDrink({ ...drink, price: 6 });
  };

  return (
    <div>
      {drink.price}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

---

## Updating Nested Objects

When we are updating a nested object, we should **create a new copy of each level we want to update**,
**because otherwise all parts share the same instance of the original object** — and that can lead to unexpected behavior.

```javascript
import { useState } from "react";

function App() {
  const [customer, setCustomer] = useState({
    name: "John",
    address: {
      city: "San Francisco",
      zipcode: 94111,
    },
    age: 25,
  });

  const handleClick = () => {
    setCustomer({
      ...customer,
      address: { ...customer.address, zipcode: 94222 },
    });
  };

  return (
    <div>
      {customer.address.zipcode}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
```

In the example above:

- `customer` has a nested `address` object. So `...customer` creates a **shallow copy**(only the first level is copied) of the customer object.

- This means the **top-level properties** (`name`, `age`) are copied.

- BUT: the `address` object is still the same reference as before.

- When updating the `zipcode`, we must **also copy the** `address` **object** using `{ ...customer.address }`
  so that we don’t mutate the **original one**.

- This ensures **React detects the change correctly** and triggers a re-render.

## Updating the Arrays

In React, you should never change (mutate) the original array directly. Instead, always create a brand new array and update the state with that.

```javascript
function App() {
  const [tags, setTags] = useState(["happy", "cheerful"]);

  const handleClick = () => {
    // Add
    setTags([...tags, "exciting"]);

    // Remove
    setTags(tags.filter((tag) => tag !== "happy"));

    // Update
    setTags(tags.map((tag) => (tag === "happy" ? "happiness" : tag)));
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

#### Add, Update and Remove Operations for Objects

```javascript
const [person, setPerson] = useState({
  name: "John",
  age: 25,
});

const handleAdd = () => {
  setPerson({ ...person, city: "New York" }); // Adds 'city'
};

const handleRemove = () => {
  const { age, ...rest } = person;
  setPerson(rest); // Removes 'age'
};

const handleUpdate = () => {
  setPerson({ ...person, name: "Jane" }); // Updates 'name'
};
```

## Updating Array of Objects

When updating an object inside an array in React, you don’t need to copy every object—just create a new array and make a new copy of the object you’re updating, while keeping the other objects unchanged.

```javascript
unction App() {
  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  const handleClick = () => {
    setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

## Simplifying update Logic with Immer

Normally, when updating arrays or objects in React state, you **should never mutate the original data** directly. Instead, you create a new copy with the changes. This can get complicated and verbose.

With Immer, you can write code that looks like you are mutating the data, but Immer automatically produces an immutable updated copy behind the scenes

```javascript
function App() {
  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  const handleClick = () => {
    setBugs(
      produce((draft) => {
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) {
          bug.fixed = true;
        }
      })
    );
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

draft is a **temporary mutable copy** of the state created by Immer. ( In Here, draft is actually the temporary mutable copy of the whole `bugs array`, )

## Sharing State between Components

When we need to share state between components, we use a technique called **lifting state up**.

Imagine the **parent component** is `App`, and the child components are `Navbar` and `ShoppingCart`. The number of items in the shopping cart should be displayed in the `Navbar`.

Since the state (number of items) currently lives inside `ShoppingCart`, we **lift the state up** to the `App` component. This way, both `Navbar` and `ShoppingCart` can access the same state via props.

```javascript
// App Component
function App() {
  const [CartItems, setCartItems] = useState(["Product 1", "Product 2"]);

  return (
    <div>
      <NavBar cardItemsCount={CartItems.length} />
      <Cart cartItems={CartItems} onClear={() => setCartItems([])} />
    </div>
  );
}

// NavBar Component
const NavBar = ({ cardItemsCount }: Props) => {
  return (
    <>
      <div>NavBar</div>
      <p>{cardItemsCount}</p>
    </>
  );
};

// Cart Component
interface Props {
  cartItems: string[];
  onClear: () => void;
}
const Cart = ({ cartItems, onClear }: Props) => {
  return (
    <>
      <div>Cart</div>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={onClear}>Clear</button>
    </>
  );
};
```

#### `Important`:

The component that **owns the state** (here, `App`) should be responsible for **changing** the state. So only the `App` component should update the state, while `Navbar` and `ShoppingCart` just use the state passed down to them.

---

When updating arrays or objects in React state, it's best to use the previous state (using the functional update form). This ensures you're always working with the latest version of the state, especially when multiple updates happen quickly.

If you don’t use the previous state, you might accidentally overwrite recent changes with stale data.

```javascript
// Safe
setCount((prevCount) => prevCount + 1);

// Safe
setItems((prevItems) => [...prevItems, newItem]);
```

```javascript
// Unsafe if called multiple times quickly
setPerson({
  ...person,
  [name]: value,
});

// Safe — always uses latest value
setPerson((prev) => ({
  ...prev,
  [name]: value,
}));
```
