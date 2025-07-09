# Handling a Form Submission

By default, when we submit a form, the form is posted to the server, which causes a full page reload. To solve this, we should **stop this default behavior** by using `preventDefault()`. With this, we can prevent the form from being posted to the server.

There are two types of ways to submit a form:

#### 1. We add an onClick function to a button

(So that function handles the submission logic manually)

```javascript
const handleClick = (event: React.FormEvent) => {
  event?.preventDefault();
  console.log("form clicked");
};

<button className="btn btn-primary" onClick={handleClick}>
  Submit
</button>;
```

#### 2. We have a button with `type="submit"` and the form has the `onSubmit` handler

Then, when clicking the button, the button will automatically trigger the form's `onSubmit` handler.

**Note**: Inside a Form, if we don't specifically set the button `type`, the browser will treat it as `type="submit"`.

```javascript
const handleSubmit = (event: React.FormEvent) => {
  event?.preventDefault();
  console.log("Form Submitted");
};

return (
  <form onSubmit={handleSubmit}>
    <button className="btn btn-primary" type="submit">
      Submit
    </button>
  </form>
);
```

---

**Note**

If the form has both:

- a **button with an** `onClick` **handler**, and

- the **form has an** `onSubmit` **handler**,

then the following will happen when the button is clicked:

1. First, the button’s `onClick` handler is called.

2. Then, if the onClick handler does not have event.preventDefault() or event.stopPropagation(), the form's onSubmit handler will also be triggered.

3. But, if event.preventDefault() is called inside the onClick handler, it will stop calling the onSubmit handler.

# Accessing Input Fields

The `useRef` hook in React is used to reference DOM elements directly. You can assign it to elements like buttons, headings, lists, or input fields.

After the component mounts(renders), `ref.current` will point to the actual DOM element. By using console.log(ref.current), we can directly see and interact with the real DOM element.

For input elements, since they have a `value` property, we can use `ref.current.value` to read the current value entered by the user.

### Why do we initialize `useRef` with `null`?

- The `current` property of a ref is meant to reference a DOM node. When we create a ref using `useRef(null)`, the initial value we pass (`null`) is used to set the `current` property.

- At the time of ref creation, we don’t yet have access to the actual DOM node — because the DOM is only created **after React renders** the component. So, we really have no meaningful initial value to provide.

- Once React finishes rendering and attaches the ref to the DOM element, it automatically sets `ref.current` to point to that DOM node. Later, if the DOM element is removed from the screen (i.e., unmounted), React sets `ref.current` back to `null`.

- That’s why we initialize the ref with `null`: because initially there's no DOM element to reference.

**Important** - In React, updating the `.current` property of a `useRef` does **not cause the component to re-render**, unlike `useState`, which does.

# Controlled Components

Instead of using `useRef` to get form values, we can use `useState`. With useState, the input updates state on every `onChange`, causing the component to re-render. This usually doesn’t cause performance issues.

All HTML inputs have a built-in `value` property to manage their own state. But when we also use React state, the input’s internal value and React state can get out of sync. To fix this, we make React the single source of truth by setting the input’s `value` to the React state. This keeps the input value always in sync with React Because React controls the input value through state, this is called a **controlled component**. The input’s value is managed by React, not the DOM.
