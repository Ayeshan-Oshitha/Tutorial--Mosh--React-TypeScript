# 1. Getting Started With React

## What is React ?

Reactr is a Javascript library for Building the interactive User Intefaces. It was created in Facebook at 2011.

### Why was React created?

When a webpage loads in the browser, the browser reads the HTML and creates a tree-like structure called the **DOM (Document Object Model)**. This structure allows JavaScript to interact with and update parts of the page in response to user actions.

However, as web applications grow larger and more complex, manually working with the DOM using methods like `getElementById` or `querySelector` becomes difficult to manage and error-prone.

This is where React comes in.

With React, you build your UI using **small, reusable components**. You simply describe how the UI should look, and React efficiently updates and manages the DOM for you. This makes your code cleaner, more organized, and easier to maintain as your application grows.

Essentialy, A React application is essentially a tree of components, where each component represents a part of the user interface. At the top of this tree is the root component((often called `<App />`) ), which brings everything together and renders the entire app.

## Creating a React Component

In React, whenever we create a function-based component, we need to follow Pascal Case (i.e., start the component name with a **capital letter**). This is what React expects.

In React, we use JSX or TSX. JSX stands for **JavaScript XML**. If we visit **babel.io/repl** and paste React code, it will show the equivalent plain JavaScript code.

The great thing about JSX and TSX is that they allow us to create dynamic content using curly braces ({}) inside the markup.
