import * as React from 'react';
import useAppendHeadScript from './useAppendHeadScript';

type TUseHotjar = {
  initHotjar: (
    hotjarId: string,
    hotjarVersion: string,
    logCallback?: () => void
  ) => boolean;
  identityHotjar: (
    userId: string,
    userInfo: string,
    logCallback?: () => void
  ) => boolean;
};

export function useHotjar(): TUseHotjar {
  const { appendHeadScript } = useAppendHeadScript();

  const initHotjar = React.useCallback(
    (hotjarId: string, hotjarVersion: string, loggerFunction): boolean => {
      const hotjarScript = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hotjarId},hjsv:${hotjarVersion}};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
      const isHotjarAppended = appendHeadScript(hotjarScript, 'hotjar-script');

      if (loggerFunction && typeof loggerFunction === 'function')
        loggerFunction(`Hotjar ready: ${isHotjarAppended}`);

      return isHotjarAppended;
    },
    [appendHeadScript]
  );

  const identityHotjar = React.useCallback(
    (userId: string, userInfo: string, loggerFunction): boolean => {
      try {
        const hotjarIdentityScript = `var userId="${userId}" || null;window.hj("identify",userId,${userInfo});`;
        const isIdentified = appendHeadScript(
          hotjarIdentityScript,
          'identity-script'
        );

        if (loggerFunction && typeof loggerFunction === 'function')
          loggerFunction(`Hotjar identified: ${isIdentified}`);

        return isIdentified;
      } catch (error) {
        console.error('Hotjar error:', error);

        return false;
      }
    },
    [appendHeadScript]
  );

  return React.useMemo(() => ({ initHotjar, identityHotjar }), [
    initHotjar,
    identityHotjar,
  ]);
}
