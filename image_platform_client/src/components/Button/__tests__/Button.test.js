import { render, screen, cleanup } from '@testing-library/react';
import user from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Button from '../Button';

const innerLabel = 'Testing button';

describe('Button component:', () => {
  afterEach(() => {
    cleanup();
  });

  it('* renders successfully', () => {
    render(<Button>{innerLabel}</Button>);
    const ButtonElement = screen.getByTestId('button-test');
    expect(ButtonElement).toBeTruthy();
    expect(ButtonElement.textContent).toBe(innerLabel);
  });

  it('* accepts custom classes', () => {
    const customClassName = 'custom-button';
    render(<Button className={customClassName}>{innerLabel}</Button>);
    const ButtonElement = screen.getByTestId('button-test');
    expect(ButtonElement.classList).toContain(customClassName);
  });

  it('* accepts button type attribute', () => {
    render(<Button type="submit">{innerLabel}</Button>);
    const ButtonElement = screen.getByTestId('button-test');
    expect(ButtonElement.type).toBe('submit');
  });

  it('* accepts custom properties', () => {
    const test = renderer
      .create(
        <Button type="button" data-attr1="attr-1" data-attr2="attr-2">
          {innerLabel}
        </Button>,
      )
      .toJSON();
    expect(test.props['data-attr1']).toBe('attr-1');
    expect(test.props['data-attr2']).toBe('attr-2');
    expect(test.props.type).toBe('button');
  });

  it('* matches the snapshot', () => {
    render(
      <Button type="submit" className="snapshot-btn-class">
        {innerLabel}
      </Button>,
    );
    const ButtonElement = screen.getByTestId('button-test');
    expect(ButtonElement).toMatchSnapshot('test-button-snapshot');
  });

  it('* button is clickable', async () => {
    user.setup();

    let test = 0;

    render(
      <Button
        type="submit"
        className="snapshot-btn-class"
        onClick={() => (test += 1)}
      >
        {innerLabel}
      </Button>,
    );
    const ButtonElement = screen.getByTestId('button-test');

    expect(test).toBe(0);
    await user.click(ButtonElement);
    expect(test).toBe(1);
    await user.click(ButtonElement);
    await user.click(ButtonElement);
    expect(test).toBe(3);
  });

  it('* button is disabled and not clickable', async () => {
    user.setup();

    let test = 0;

    render(
      <Button
        type="submit"
        className="snapshot-btn-class"
        onClick={() => (test += 1)}
        disabled={true}
      >
        {innerLabel}
      </Button>,
    );
    const ButtonElement = screen.getByTestId('button-test');

    expect(ButtonElement.disabled).toBe(true);

    expect(test).toBe(0);
    await user.click(ButtonElement);
    expect(test).not.toBe(1);
    await user.click(ButtonElement);
    await user.click(ButtonElement);
    expect(test).not.toBe(3);
  });
});
