# Creating a Custom Hook for Fetching data

Currently, our `GameGrid` is engaging with making HTTP requests — it knows the type of data, the endpoint, and in the future it might even handle request cancellation using an `AbortController`.

But this is **not what we want**. Our component should primarily focus on returning markup, not managing data fetching.

Here we have two options:

1. **Move the logic to a service** – Move the HTTP request to a separate service file.

2. **Move the entire logic** (including state variables and useEffect) **into a custom hook** – Hooks are not only meant for sharing functionality across different components. We can also use them to separate concerns and make our code more modular and reusable.

#### Extra - How react render GameGrid again when the useState in useUser Hook changes ?

React calls setGames(in useGames.ts), which updates state.

When state is updated in a component (or hook used by it), React triggers a re-render of that component (GameGrid) ( To see when react update states, see the react note in excalidraw )

# Improving User Experience with Loading Skeltions

To ensure there are no issues—especially in React Strict Mode—always set setLoading(false) in the correct places `inside the try and catch blocks` OR `then and catch block`, instead of relying on the `finally block`. This ensures that the loading state and skeletons behave correctly.
