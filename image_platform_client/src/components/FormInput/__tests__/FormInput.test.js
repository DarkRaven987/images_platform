import { render, screen, cleanup } from '@testing-library/react';
import user from '@testing-library/user-event';
import FormInput from '../FormInput';

const testingText = 'test text';

describe('FormInput component:', () => {
  beforeEach(() => cleanup());

  it('* renders properly', () => {
    render(<FormInput value={testingText} />);
    const InputContainer = screen.queryByTestId('form-input-container');
    const InputLabel = screen.queryByTestId('form-input-label');
    const Input = screen.queryByTestId('form-input');
    const InputErrors = screen.queryByTestId('form-input-error');

    expect(InputContainer).toBeTruthy();
    expect(InputLabel).toBeTruthy();
    expect(Input).toBeTruthy();
    expect(InputErrors).not.toBeTruthy();

    expect(Input.value).toBe(testingText);
  });

  it('* accepts and applies attributes', () => {
    render(
      <FormInput
        className="custom-class-name"
        id="test-1"
        label="Test Input"
        type="password"
        value=""
      />,
    );
    const InputContainer = screen.queryByTestId('form-input-container');
    const InputLabel = screen.queryByTestId('form-input-label');
    const Input = screen.queryByTestId('form-input');
    const InputErrors = screen.queryByTestId('form-input-error');

    expect(InputContainer.classList).toContain('form-input');
    expect(InputContainer.classList).toContain('custom-class-name');

    expect(InputLabel.textContent).toBe('Test Input');

    expect(Input.type).toBe('password');

    expect(InputErrors).not.toBeTruthy();
  });

  it('* changes the value', async () => {
    user.setup();

    let test = '';

    render(
      <FormInput
        className="custom-class-name"
        id="test-1"
        label="Test Input"
        type="password"
        onChange={(val) => (test = val)}
        value={test}
      />,
    );

    const Input = screen.queryByTestId('form-input');

    await user.type(Input, 'User typed here');

    expect(Input.value).toBe(test);
  });

  it('* displays error if provided', () => {
    render(
      <FormInput
        className="custom-class-name"
        id="test-1"
        label="Test Input"
        type="password"
        error={{
          message: 'Field is required',
        }}
      />,
    );

    const InputErrors = screen.queryByTestId('form-input-error');

    expect(InputErrors).toBeTruthy();

    expect(InputErrors.textContent).toBe('Field is required');
  });

  it('* matches the snapshot', async () => {
    user.setup();

    let test = '';

    render(
      <FormInput
        className="custom-class-name"
        id="test-1"
        label="Test Input"
        onChange={(val) => (test = val)}
        value={test}
      />,
    );
    const InputContainer = screen.queryByTestId('form-input-container');
    const Input = screen.queryByTestId('form-input');

    expect(InputContainer).toMatchSnapshot('Input-before-edit');

    await user.type(Input, 'User typed here');

    expect(InputContainer).toMatchSnapshot('Input-after-edit');
  });
});
