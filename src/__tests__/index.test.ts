import { renderHook } from '@testing-library/react-hooks';
import useHotjar, { useAppendHeadScript } from '..';

describe('Tests useHotjar', () => {
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

    initHotjar(123, 6, logCallback);

    expect(initHotjarSpy).toHaveBeenCalledWith(123, 6, logCallback);
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

  it('should identifyHotjar with pure object stringified', () => {
    const { result } = renderHook(() => useHotjar());
    const identifyHotjarSpy = jest.spyOn(result.current, 'identifyHotjar');
    const { identifyHotjar } = result.current;

    identifyHotjar(
      '123-123-abc',
      JSON.stringify({
        name: 'olli',
        surname: 'parno',
        address: 'streets of tomorrow',
      })
    );

    expect(identifyHotjarSpy).toHaveBeenCalledWith(
      '123-123-abc',
      JSON.stringify({
        name: 'olli',
        surname: 'parno',
        address: 'streets of tomorrow',
      })
    );
  });

  it('should identifyHotjar with broken logCallback', () => {
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
    expect(consoleInfoSpy).toHaveBeenCalledWith('Hotjar identified: true');
  });

  it('should useAppendHeadScript with wrong script', () => {
    const { result } = renderHook(() => useAppendHeadScript());
    const appendHeadScriptSpy = jest.spyOn(result.current, 'appendHeadScript');

    const { appendHeadScript } = result.current;

    const hasItBeenAppended = appendHeadScript('my-script', '123');

    expect(appendHeadScriptSpy).toHaveBeenCalledWith('my-script', '123');
    expect(hasItBeenAppended).toBeFalsy();
  });
});
