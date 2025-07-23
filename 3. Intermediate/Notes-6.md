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
