# 7. React Query

## What is React Query ?

So far, we use the `useEffect` hook for data fetching. But this has a few problems:

- No request cancellation – We have to use `AbortController` to manually do that.
- No separation of concerns – We have to use a custom hook to achieve that.
- No retries
- No automatic refresh
- No caching

We can do all of the above using `useEffect`, but we have to write more and more code. So as a solution, we can use **React Query**, which provides all of these features out of the box.

**React Query** is a powerful library for managing data fetching and caching in React applications.

Some people use **Redux** for caching. Redux is a popular state management library for JavaScript applications. It allows us to store the state/data of an application in a single global store. So, a lot of people use it as a cache—when they fetch data, they store it in Redux so they can use it in the future.

But the problem with Redux is that it is difficult to learn, has a lot of boilerplate code, and makes our application harder to debug and maintain. But with **React Query**, it's a lot simpler and more lightweight.

So Redux is no longer needed for caching.

## Setting up the React Query

queryClient is teh core object we used for managing and caching remote data in React Query.
