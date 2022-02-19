# react-container

One of the best practices in React is to separate logic and views. Otherwise, it would be painful to test components with complex logic.  
This library helps you to separate components into Hooks and views.


## Installation

```sh
npm install @foo-x/react-container
```


## Example

```tsx
import { Container, UseHooks, View } from '@foo-x/react-container';
import { useCallback, useState } from 'react';

type Props = {
  defaultValue: number;
  label: string;
};

type HooksResult = {
  value: number;
  increment: () => void;
  decrement: () => void;
};

export const useHooks: UseHooks<Props, HooksResult> = ({
  props: { defaultValue },
}) => {
  const [value, setValue] = useState(defaultValue);
  return {
    value,
    increment: useCallback(() => {
      setValue((prev) => prev + 1);
    }, []),
    decrement: useCallback(() => {
      setValue((prev) => prev - 1);
    }, []),
  };
};

export const view: View<Props, HooksResult> = ({
  props: { label },
  hooksResult: { value, increment, decrement },
}) => {
  return (
    <div>
      <h2>{label}</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type='button' onClick={decrement}>
          -
        </button>
        {value}
        <button type='button' onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

const Counter = Container({ useHooks, view });

export default Counter
```

As shown above, the logic and the view are separated, so each can be tested easily.


## Advance

If you have very complex logic, consider using [react-tea](https://github.com/Foo-x/react-tea), which applies The Elm Architecture for React.


## License

MIT
