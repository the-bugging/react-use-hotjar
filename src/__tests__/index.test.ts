import { renderHook } from '@testing-library/react-hooks';
import useHotjar from '..';

interface IWindowHotjarEmbedded extends Window {
  hj?: (method: string, ...data: unknown[]) => void;
}

declare const window: IWindowHotjarEmbedded;

const fakeHotjarFunction = jest.fn((method: string, ...data: unknown[]) => {
  return null;
});

describe('Tests useHotjar', () => {
  beforeAll(() => {
    window.hj = fakeHotjarFunction;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return both methods', () => {
    const { result } = renderHook(() => useHotjar());

    expect(result.current).toBeTruthy();
    expect(result.current.initHotjar).toBeTruthy();
    expect(result.current.identifyHotjar).toBeTruthy();
  });

  it('should initHotjar', () => {
    const { result } = renderHook(() => useHotjar());
    const initHotjarSpy = jest.spyOn(result.current, 'initHotjar');
    const { initHotjar } = result.current;

    initHotjar(123, 6);

    expect(initHotjarSpy).toHaveBeenCalledWith(123, 6);
  });

  it('should initHotjar with logCallback', () => {
    const { result } = renderHook(() => useHotjar());
    const initHotjarSpy = jest.spyOn(result.current, 'initHotjar');
    const consoleInfoSpy = jest.spyOn(console, 'info');
    const { initHotjar } = result.current;

    const logCallback = console.info;

    initHotjar(123, 6, false, logCallback);

    expect(initHotjarSpy).toHaveBeenCalledWith(123, 6, false, logCallback);
    expect(consoleInfoSpy).toHaveBeenCalledWith('Hotjar ready: true');
  });

  it('should identifyHotjar with pure object', () => {
    const { result } = renderHook(() => useHotjar());
    const identifyHotjarSpy = jest.spyOn(result.current, 'identifyHotjar');
    const { identifyHotjar } = result.current;

    identifyHotjar('123-123-abc', {
      name: 'olli',
      surname: 'parno',
      address: 'streets of tomorrow',
    });

    expect(identifyHotjarSpy).toHaveBeenCalledWith('123-123-abc', {
      name: 'olli',
      surname: 'parno',
      address: 'streets of tomorrow',
    });
  });

  it('should stateChange with new relative path', () => {
    const { result } = renderHook(() => useHotjar());
    const stateChangeSpy = jest.spyOn(result.current, 'stateChange');
    const { stateChange } = result.current;

    stateChange('new/relative/path');

    expect(stateChangeSpy).toHaveBeenCalledWith('new/relative/path');
  });

  it('should stateChange with new relative path with logCallback', () => {
    const { result } = renderHook(() => useHotjar());
    const stateChangeSpy = jest.spyOn(result.current, 'stateChange');
    const consoleInfoSpy = jest.spyOn(console, 'info');
    const { stateChange } = result.current;

    const logCallback = console.info;

    stateChange('new/relative/path', logCallback);

    expect(stateChangeSpy).toHaveBeenCalledWith(
      'new/relative/path',
      logCallback
    );
    expect(consoleInfoSpy).toHaveBeenCalledWith('Hotjar stateChanged');
  });

  it('should identifyHotjar with broken logCallback', () => {
    console.error = jest.fn();
    const { result } = renderHook(() => useHotjar());
    const identifyHotjarSpy = jest.spyOn(result.current, 'identifyHotjar');
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const { identifyHotjar } = result.current;

    const brokenLogCallback = () => {
      throw Error('test');
    };

    identifyHotjar(
      '123-123-abc',
      { name: 'olli', surname: 'parno', address: 'streets of tomorrow' },
      brokenLogCallback as (...data: unknown[]) => void
    );

    expect(identifyHotjarSpy).toHaveBeenCalledWith(
      '123-123-abc',
      { name: 'olli', surname: 'parno', address: 'streets of tomorrow' },
      brokenLogCallback
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Hotjar error:',
      Error('test')
    );
  });

  it('should identifyHotjar withCallback', () => {
    const { result } = renderHook(() => useHotjar());
    const identifyHotjarSpy = jest.spyOn(result.current, 'identifyHotjar');
    const consoleInfoSpy = jest.spyOn(console, 'info');
    const { identifyHotjar } = result.current;

    const logCallback = console.info;

    identifyHotjar(
      '123-123-abc',
      { name: 'olli', surname: 'parno', address: 'streets of tomorrow' },
      logCallback
    );

    expect(identifyHotjarSpy).toHaveBeenCalledWith(
      '123-123-abc',
      { name: 'olli', surname: 'parno', address: 'streets of tomorrow' },
      logCallback
    );
    expect(consoleInfoSpy).toHaveBeenCalledWith('Hotjar identified');
  });
});

describe('Tests Hotjar without being loaded into window', () => {
  beforeAll(() => {
    window.hj = undefined;
    console.error = jest.fn();
  });

  it('should not init hotjar and throw errors', () => {
    const { result } = renderHook(() => useHotjar());
    const { initHotjar } = result.current;
    const consoleErrorSpy = jest.spyOn(console, 'error');

    initHotjar(123, 6);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Hotjar error:',
      Error('Hotjar initialization failed!')
    );
  });

  it('should identifyHotjar with pure object and throw errors', () => {
    const { result } = renderHook(() => useHotjar());
    const { identifyHotjar } = result.current;
    const consoleErrorSpy = jest.spyOn(console, 'error');

    identifyHotjar('123-123-abc', {
      name: 'olli',
      surname: 'parno',
      address: 'streets of tomorrow',
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Hotjar error:',
      Error('Hotjar is not available! Is Hotjar initialized?')
    );
  });

  it('should stateChange with new relative path and throw errros', () => {
    const { result } = renderHook(() => useHotjar());
    const { stateChange } = result.current;
    const consoleErrorSpy = jest.spyOn(console, 'error');

    stateChange('new/relative/path');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Hotjar error:',
      Error('Hotjar is not available! Is Hotjar initialized?')
    );
  });
});
