import { Container, UseHooks, View } from '@/Container';
import { render, screen } from '@testing-library/react';

describe('Container', () => {
  type Props = {
    value: number;
  };

  type HooksResult = {
    value: number;
  };

  const useHooks: UseHooks<Props, HooksResult> = ({ props }) => {
    return {
      value: props.value * 2,
    };
  };

  const view: View<Props, HooksResult> = ({ props, hooksResult }) => {
    return (
      <div>
        <div data-testid='props-value'>{props.value}</div>
        <div data-testid='hooks-result-value'>{hooksResult.value}</div>
      </div>
    );
  };

  const Sut = Container({ useHooks, view });

  test('value', () => {
    render(<Sut value={10} />);

    expect(screen.getByTestId('props-value')).toHaveTextContent(/^10$/);
    expect(screen.getByTestId('hooks-result-value')).toHaveTextContent(/^20$/);
  });
});
