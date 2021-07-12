import { renderHook } from '@testing-library/react-hooks';
import useHotjar from '..';

describe.only('Tests useHotjar without window', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  it('should fail on initializing hotjar without window', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const oldWindow = globalThis.window;

    const { result } = renderHook(() => useHotjar());
    const { initHotjar } = result.current;

    delete globalThis.window;

    const failedInitResult = initHotjar(123, 6);

    globalThis.window = oldWindow;

    expect(failedInitResult).toBeFalsy();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Hotjar error: Hotjar depends on window. Window is undefined.'
    );
  });
});
