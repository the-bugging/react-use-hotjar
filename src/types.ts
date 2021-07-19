export type TUserInfo = Record<
  string | number,
  string | number | Date | boolean
>;

export interface IUseHotjar {
  readyState: boolean;
  initHotjar: (
    hotjarId: number,
    hotjarVersion: number,
    hotjarDebug?: boolean,
    logCallback?: (...data: unknown[]) => void
  ) => boolean;
  identifyHotjar: (
    userId: string,
    userInfo: TUserInfo,
    logCallback?: (...data: unknown[]) => void
  ) => boolean;
  stateChange: (
    relativePath: string,
    logCallback?: ((...data: unknown[]) => void) | undefined
  ) => boolean;
  tagRecording: (
    tags: string[],
    logCallback?: (...data: unknown[]) => void
  ) => boolean;
}

export interface IWindowHotjarEmbedded extends Window {
  hj: (method: string, ...data: unknown[]) => void;
}
