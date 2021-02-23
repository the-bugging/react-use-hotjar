import * as React from 'react';

type TUseHotjar = {
  initHotjar: (
    hotjarId: string,
    hotjarVersion: string,
    logCallback?: () => void
  ) => boolean;
  identifyHotjar: (
    userId: string,
    userInfo: string | unknown,
    logCallback?: () => void
  ) => boolean;
};

type TUseAppendHeadScript = {
  appendHeadScript: (scriptText: string, scriptId: string) => boolean;
};

function useAppendHeadScript(): TUseAppendHeadScript {
  const appendHeadScript = React.useCallback(
    (scriptText: string, scriptId: string): boolean => {
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
    },
    []
  );

  return React.useMemo(() => ({ appendHeadScript }), [appendHeadScript]);
}

export function useHotjar(): TUseHotjar {
  const { appendHeadScript } = useAppendHeadScript();

  const initHotjar = React.useCallback(
    (hotjarId: string, hotjarVersion: string, loggerFunction): boolean => {
      const hotjarScript = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hotjarId},hjsv:${hotjarVersion}};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
      const isHotjarAppended = appendHeadScript(
        hotjarScript,
        'hotjar-init-script'
      );

      if (loggerFunction && typeof loggerFunction === 'function')
        loggerFunction(`Hotjar ready: ${isHotjarAppended}`);

      return isHotjarAppended;
    },
    [appendHeadScript]
  );

  const identifyHotjar = React.useCallback(
    (userId: string, userInfo: string | unknown, loggerFunction): boolean => {
      try {
        const formattedUserInfo =
          typeof userInfo !== 'string' ? JSON.stringify(userInfo) : userInfo;
        const hotjarIdentifyScript = `var userId="${userId}" || null;window.hj("identify",userId,${formattedUserInfo});`;
        const isIdentified = appendHeadScript(
          hotjarIdentifyScript,
          'hotjar-identify-script'
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

  return React.useMemo(() => ({ initHotjar, identifyHotjar }), [
    initHotjar,
    identifyHotjar,
  ]);
}

export default useHotjar;
