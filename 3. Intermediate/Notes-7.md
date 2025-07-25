# 9. Routing with React Router

## Setting up Routing

There are two main ways to create a router in React Router:

1. Using `<BrowserRouter></BrowserRouter>`

2. Using `createBrowserRouter()`

While both are valid, the **better approach** is to use `createBrowserRouter()`. This method supports all the **new features** introduced in React Router v6.4 and above, such as `data loaders`, `actions`, `error boundaries`, and `nested routing with layouts`.

On the other hand, `<BrowserRouter>` is still supported but considered more basic and older. It doesn't provide built-in support for those newer data APIs unless you manually implement them.

In summary, if you're starting a new project or want full access to modern routing features, it's best to use createBrowserRouter().

## Navigation

- When navigating, if we use the `<a>` tag, the **full page will reload** on navigation.

- Instead, in react-router-dom, we can use the `<Link>` component, which only replaces the content **without a full page reload**.

- Also, if we need to navigate **programmatically**, we can use the `useNavigate` hook.

## Getting Data about the current Route

When we need to access data related to the current route, we can use the following three hooks from `react-router-dom`:

**1. `useParams()`**

- This hook allows you to extract route parameters.
- It returns an object containing key-value pairs based on the dynamic segments in your route.

```javascript
const params = useParams();
console.log(params.id); // if the route is /users/:id
```

**2. `useSearchParams()`**

- This hook allows you to read and update query parameters from the URL.

```javascript
// Example (for route /users/1?name=alice&age=25):

const [searchParams, setSearchParams] = useSearchParams();
console.log(searchParams.get("name")); // Outputs: "alice"
```

You can also use `setSearchParams()` to update the query parameters. However, like setState in React, it has **side effects** — so it should **only be used inside event handlers or useEffect, not during rendering**.

**3. `useLocation()`**

- This hook allows you to access the full location object of the current route.

- It includes information like:

  - pathname
  - search (query string)
  - hash
  - state
  - and more

```javascript
const location = useLocation();
console.log(location.pathname); // e.g., "/users/1"
```

## Nested Routes

`<Outlet>` is a **placeholder** for rendering child route components.

At runtime, depending on the user's current URL (location), the matching child component will be rendered inside the `<Outlet>`.
