## Discussion- Building Reusable Components

When a component depends directly on a state management library like Zustand, Redux, or MobX, it becomes less reusable because it's tightly coupled to a specific global state.

On the other hand, components that receive data through props are more reusable and easier to test, since they rely only on the data passed to them, not on external state.
