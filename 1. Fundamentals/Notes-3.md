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

```
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
