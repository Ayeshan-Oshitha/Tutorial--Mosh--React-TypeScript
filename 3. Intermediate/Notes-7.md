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

## Styling the Active Link

If we want to **highlight the currently selected link**, we can replace the `Link` component with `NavLink`.

`NavLink` works exactly the same as `Link`, but with one key difference: it allows us to** apply styling or classes when the link is active**.

## Handling Errors

To handle errors, we can use an **error page**. To catch the error, we can use a hook called `useRouteError`.

In real-world applications, we should **log the error** using some service like **Sentry**. In development, we can simply **log it in the console**.

We can **differentiate the errors** between **invalid routes** and **errors thrown inside the application**.

## Private Routes

When implementing private routes, we can use the `navigate` hook. However, it has a **side effect** — meaning **we can't call it during the render phase**. We can only call it inside an **event handler** or **inside a** `useEffect`.

So instead, we should use the `<Navigate />` component.

```javascript
const UsersPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="row">
      <div className="col">
        <UserList />
      </div>
      <div className="col">
        <Outlet />
      </div>
    </div>
  );
};
```

But the above approach is **not scalable**, especially when we have many protected pages.

To solve this, we can use **layout routes** to handle authentication in a centralized and reusable way.

## Layout Routes

To protect routes, we can use two ways:

**1. Mosh’s way (Outlet way):**

- This uses a layout component with `<Outlet />` to protect many routes at once.
- It’s good for protecting groups of routes, but sometimes the routes file can feel confusing.

**2. My way (Children way):**

- This wraps each protected component individually with `<PrivateRoute>{children}</PrivateRoute>`.
- It’s good for protecting each component separately and gives more fine-grained control.
