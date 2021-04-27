interface IWindowHotjarEmbedded extends Window {
  hj?: (method: string, ...data: unknown[]) => void;
}

declare const window: IWindowHotjarEmbedded;

export type TUserInfo = Record<
  string | number,
  string | number | Date | boolean
>;

export interface IUseHotjar {
  readyState: boolean;
  initHotjar: (
    hotjarId: number,
    hotjarVersion: number,
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
}

export const appendHeadScript = (
  scriptText: string,
  scriptId: string
): boolean => {
  try {
    const existentScript = document.getElementById(
      scriptId
    ) as HTMLScriptElement;
    const script = existentScript || document.createElement('script');
    script.id = scriptId;
    script.innerText = scriptText;
    script.crossOrigin = 'anonymous';

    document.head.appendChild(script);

    return true;
  } catch {
    return false;
  }
};

export function hotjarInitScript(
  hotjarId: number,
  hotjarVersion: number
): boolean {
  const hasWindow = typeof window !== 'undefined';

  if (!hasWindow) return false;

  const hotjarScriptCode = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hotjarId},hjsv:${hotjarVersion}};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
  const isAppended = appendHeadScript(hotjarScriptCode, 'hotjar-init-script');

  if (isAppended && hasWindow && window.hj) {
    return true;
  }

  throw Error('Hotjar initialization failed!');
}

export function hotjarStateChangeScript(relativePath: string): void {
  const hasWindow = typeof window !== 'undefined';
  if (hasWindow && window.hj) {
    return window.hj('stateChange', relativePath);
  }

  throw Error('Hotjar is not available! Is Hotjar initialized?');
}

export function hotjarIdentifyScript(
  userId: string | null,
  userInfo: TUserInfo
): void {
  const hasWindow = typeof window !== 'undefined';
  if (hasWindow && window.hj) {
    return window.hj('identify', userId, userInfo);
  }

  throw Error('Hotjar is not available! Is Hotjar initialized?');
}

export function checkReadyState(): boolean {
  const hasWindow = typeof window !== 'undefined';
  if (hasWindow && window.hj) {
    return true;
  }

  return false;
}
