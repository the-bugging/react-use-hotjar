import * as React from 'react';
import {
  checkReadyState,
  hotjarIdentifyScript,
  hotjarInitScript,
  hotjarStateChangeScript,
  hotjarTagRecordingScript,
} from './dependencies';
import { IUseHotjar, TUserInfo } from './types';

export default function useHotjar(): IUseHotjar {
  const isReadyState = checkReadyState();
  const [readyState, setReadyState] = React.useState(
    React.useMemo(() => isReadyState, [isReadyState])
  );

  const initHotjar = React.useCallback(
    (
      hotjarId: number,
      hotjarVersion: number,
      hotjarDebug?: boolean,
      logCallback?: (...data: unknown[]) => void
    ): boolean => {
      try {
        hotjarInitScript(hotjarId, hotjarVersion, !!hotjarDebug);

        setReadyState(true);

        if (logCallback && typeof logCallback === 'function')
          logCallback(`Hotjar ready: true`);

        return true;
      } catch (error) {
        console.error(`Hotjar error: ${(error as Error).message}`);

        return false;
      }
    },
    []
  );

  const identifyHotjar = React.useCallback(
    (
      userId: string | null,
      userInfo: TUserInfo,
      logCallback?: (...data: unknown[]) => void
    ): boolean => {
      try {
        hotjarIdentifyScript(userId, userInfo);

        if (logCallback && typeof logCallback === 'function')
          logCallback(`Hotjar identified`);

        return true;
      } catch (error) {
        console.error(`Hotjar error: ${(error as Error).message}`);

        return false;
      }
    },
    []
  );

  const stateChange = React.useCallback(
    (relativePath: string, logCallback?: (...data: unknown[]) => void) => {
      try {
        hotjarStateChangeScript(relativePath);

        if (logCallback && typeof logCallback === 'function')
          logCallback(`Hotjar stateChanged`);

        return true;
      } catch (error) {
        console.error(`Hotjar error: ${(error as Error).message}`);

        return false;
      }
    },
    []
  );

  const tagRecording = React.useCallback(
    (tags: string[], logCallback?: (...data: unknown[]) => void) => {
      try {
        hotjarTagRecordingScript(tags);

        if (logCallback && typeof logCallback === 'function')
          logCallback(`Hotjar tagRecording`);

        return true;
      } catch (error) {
        console.error(`Hotjar error: ${(error as Error).message}`);

        return false;
      }
    },
    []
  );

  return React.useMemo(
    () => ({
      readyState,
      stateChange,
      tagRecording,
      initHotjar,
      identifyHotjar,
    }),
    [readyState, stateChange, tagRecording, initHotjar, identifyHotjar]
  );
}
