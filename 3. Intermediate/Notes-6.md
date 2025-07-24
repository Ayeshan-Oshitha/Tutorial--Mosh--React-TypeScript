# 8. Global State Management

## Consolidating State Logic with a Reducer

Reducer is a function that allow us to centralize state updates in a component. ( Using a reducer we can take all the state management logic outside of the component and centralize it inside a single function )

Reducer function has two parameters: **first parameter** is **current state** and **second parameter** is an **action**. An action is an object that describes what the user is trying to do. And then **reducer returns the new state**.

```javascript
const [value, dispatch] = useReducer(counterReducer, 0);
```

useReducer hook takes two arguments.

- First argument is the reducer function
- Second argument is the initial state

Similar to state hook, reducer also returns an array with two elements:

- First element is the current state
- Second element is the function for triggering changes (In english, Dispatch means sent)

In the example code, when the user clicks the _increment_ button, React will call our reducer and pass the current value as well as the action we just dispatched.

## Sharing state using React Context

**Prop Drilling** means passing data through many components. This is okay for one level, but if we have to pass data through 3 to 4 levels, that is a bit smelly.

As a solution, we can use **React Context**. Context allows us to share data without passing it down through many components in the middle. So our code will be cleaner and more maintainable.

<img src="./images/image-4.png" width="500">

In the above example, the state of tasks is currently stored in the `useReducer` hook inside `TaskList`. Now we need to share it using a React Context.

To share context using React Context, **there are 3 things we need to do**:

1. **First**, we should **lift the state up** to the closest parent (lift the state to the `App` component).

2. **Second**, we should **create a context**. A context is like a truck for transporting data. As part of this, we should specify the type of data we want to transport (in this example, an object with two properties).

3. Once we have the context, we **wrap our component tree using the Provider component** and provide the data we want to share.

Extra – In the Provider, we set the value property. This value overrides the default value provided in createContext(Value inside brackets).
