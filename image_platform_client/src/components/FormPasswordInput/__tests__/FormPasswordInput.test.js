import { render, screen, cleanup } from '@testing-library/react';
import user from '@testing-library/user-event';
import FormPasswordInput from '../FormPasswordInput';

const testingText = 'test password';

describe('FormPasswordInput component:', () => {
  beforeEach(() => cleanup());

  it('* renders properly', () => {
    render(<FormPasswordInput value={testingText} />);
    const InputContainer = screen.queryByTestId('password-input-container');
    const InputLabel = screen.queryByTestId('password-input-label');
    const Input = screen.queryByTestId('password-input');
    const InputIconContainer = screen.queryByTestId(
      'password-input-icon-container',
    );
    const InputIconNonVisible = screen.queryByTestId(
      'password-input-icon-non-visible',
    );
    const InputIconVisible = screen.queryByTestId(
      'password-input-icon-visible',
    );
    const InputErrors = screen.queryByTestId('password-input-error');

    expect(InputContainer).toBeTruthy();
    expect(InputLabel).toBeTruthy();
    expect(Input).toBeTruthy();
    expect(InputIconContainer).toBeTruthy();
    expect(InputIconNonVisible).not.toBeTruthy();
    expect(InputIconVisible).toBeTruthy();
    expect(InputErrors).not.toBeTruthy();

    expect(Input.type).toBe('password');

    expect(Input.value).toBe(testingText);
  });

  it('* accepts and applies attributes', () => {
    render(
      <FormPasswordInput
        className="custom-password-class-name"
        id="test-p1"
        label="Test Password"
        value="test_password"
        style={{ color: 'red' }}
        error={{ message: 'Password error test label' }}
      />,
    );
    const InputContainer = screen.queryByTestId('password-input-container');
    const InputLabel = screen.queryByTestId('password-input-label');
    const Input = screen.queryByTestId('password-input');
    const InputErrors = screen.queryByTestId('password-input-error');

    expect(InputContainer.classList).toContain('form-password-input');
    expect(InputContainer.classList).toContain('custom-password-class-name');

    expect(InputLabel.textContent).toBe('Test Password');

    expect(InputErrors).toBeTruthy();

    expect(Input.value).toBe('test_password');
  });

  it('* changes the value', async () => {
    user.setup();

    let test = '';

    render(
      <FormPasswordInput
        className="custom-class-name"
        id="test-1"
        label="Test Input"
        onChange={(val) => (test = val)}
        value={test}
      />,
    );

    const Input = screen.queryByTestId('password-input');

    await user.type(Input, 'User typed here');

    expect(Input.value).toBe(test);
  });

  it('* displays error if provided', () => {
    render(
      <FormPasswordInput
        className="custom-class-name"
        id="test-1"
        label="Test Input"
        type="password"
        error={{
          message: 'Field is required',
        }}
      />,
    );

    const InputErrors = screen.queryByTestId('password-input-error');

    expect(InputErrors).toBeTruthy();

    expect(InputErrors.textContent).toBe('Field is required');
  });

  it('* changes type of field on icon click', async () => {
    user.setup();

    render(<FormPasswordInput value="password" />);

    const Input = screen.queryByTestId('password-input');
    const InputIconContainer = screen.queryByTestId(
      'password-input-icon-container',
    );

    expect(Input.type).toBe('password');

    expect(InputIconContainer).toBeTruthy();
    expect(InputIconContainer).toMatchSnapshot('Icon before icon click');

    await user.click(InputIconContainer);

    expect(Input.type).toBe('text');

    expect(InputIconContainer).toBeTruthy();
    expect(InputIconContainer).toMatchSnapshot('Icon after icon click');

    await user.click(InputIconContainer);

    expect(Input.type).toBe('password');

    expect(InputIconContainer).toBeTruthy();
    expect(InputIconContainer).toMatchSnapshot('Icon before icon click');
  });

  it('* matches the snapshot', async () => {
    user.setup();

    let test = '';

    render(
      <FormPasswordInput
        className="custom-class-name"
        id="test-1"
        label="Test Input"
        onChange={(val) => (test = val)}
        value={test}
      />,
    );
    const InputContainer = screen.queryByTestId('password-input-container');
    const Input = screen.queryByTestId('password-input');

    expect(InputContainer).toMatchSnapshot('Password input before edit');

    await user.type(Input, 'User typed here');

    expect(InputContainer).toMatchSnapshot('Password after before edit');
  });
});
