# 9. Routing with React Router

There are two main ways to create a router in React Router:

1. Using `<BrowserRouter></BrowserRouter>`

2. Using `createBrowserRouter()`

While both are valid, the **better approach** is to use `createBrowserRouter()`. This method supports all the **new features** introduced in React Router v6.4 and above, such as `data loaders`, `actions`, `error boundaries`, and `nested routing with layouts`.

On the other hand, `<BrowserRouter>` is still supported but considered more basic and older. It doesn't provide built-in support for those newer data APIs unless you manually implement them.

In summary, if you're starting a new project or want full access to modern routing features, it's best to use createBrowserRouter().
