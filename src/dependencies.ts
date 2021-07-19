import { IWindowHotjarEmbedded, TUserInfo } from './types';

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
  hotjarVersion: number,
  hotjardebug: boolean
): boolean {
  const hasWindow = typeof window !== 'undefined';

  if (!hasWindow) throw Error('Hotjar depends on window. Window is undefined.');

  const hotjarScriptCode = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hotjarId},hjsv:${hotjarVersion},hjdebug:${hotjardebug}};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
  const isAppended = appendHeadScript(hotjarScriptCode, 'hotjar-init-script');

  if (
    isAppended &&
    hasWindow &&
    (window as unknown as IWindowHotjarEmbedded).hj
  ) {
    return true;
  }

  throw Error('Hotjar initialization failed!');
}

export function hotjarStateChangeScript(relativePath: string): void {
  const hasWindow = typeof window !== 'undefined';
  if (hasWindow && (window as unknown as IWindowHotjarEmbedded).hj) {
    return (window as unknown as IWindowHotjarEmbedded).hj(
      'stateChange',
      relativePath
    );
  }

  throw Error('Hotjar is not available! Is Hotjar initialized?');
}

export function hotjarIdentifyScript(
  userId: string | null,
  userInfo: TUserInfo
): void {
  const hasWindow = typeof window !== 'undefined';
  if (hasWindow && (window as unknown as IWindowHotjarEmbedded).hj) {
    return (window as unknown as IWindowHotjarEmbedded).hj(
      'identify',
      userId,
      userInfo
    );
  }

  throw Error('Hotjar is not available! Is Hotjar initialized?');
}

export function hotjarTagRecordingScript(tags: string[]): void {
  const hasWindow = typeof window !== 'undefined';
  if (hasWindow && (window as unknown as IWindowHotjarEmbedded).hj) {
    return (window as unknown as IWindowHotjarEmbedded).hj(
      'tagRecording',
      tags
    );
  }

  throw Error('Hotjar is not available! Is Hotjar initialized?');
}

export function checkReadyState(): boolean {
  const hasWindow = typeof window !== 'undefined';
  if (hasWindow && (window as unknown as IWindowHotjarEmbedded).hj) {
    return true;
  }

  return false;
}
