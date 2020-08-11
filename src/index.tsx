import * as React from 'react';
import { useAppendHeadScript } from './useAppendHeadScript';

type TUseHotjar = {
  initHotjar: (
    hotjarId: string,
    hotjarVersion: string,
    shouldLog?: boolean
  ) => Promise<boolean>;
  identityHotjar: (
    userId: string,
    userInfo: string,
    shouldLog?: boolean
  ) => Promise<boolean>;
};

export function useHotjar(): TUseHotjar {
  const { appendHeadScript } = useAppendHeadScript();

  const initHotjar = React.useCallback(
    async (
      hotjarId: string,
      hotjarVersion: string,
      shouldLog = true
    ): Promise<boolean> => {
      const hotjarScript = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${hotjarId},hjsv:${hotjarVersion}};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
      const isHotjarAppended = await appendHeadScript({
        scriptText: hotjarScript,
        scriptId: 'hotjar-script',
      });

      if (shouldLog) console.info(`Hotjar ready: ${isHotjarAppended}`);

      return isHotjarAppended;
    },
    [appendHeadScript]
  );

  const identityHotjar = React.useCallback(
    async (
      userId: string,
      userInfo: string,
      shouldLog = true
    ): Promise<boolean> => {
      try {
        const hotjarIdentityScript = `var userId="${userId}" || null;window.hj("identify",userId,{${userInfo}}});`;
        const isIdentified = await appendHeadScript({
          scriptText: hotjarIdentityScript,
          scriptId: 'identity-script',
        });

        if (shouldLog) console.info(`Hotjar identified: ${isIdentified}`);

        return isIdentified;
      } catch (error) {
        console.error('Hotjar error:', error);

        return false;
      }
    },
    [appendHeadScript]
  );

  return React.useMemo(() => ({ initHotjar, identityHotjar }), [
    identityHotjar,
    initHotjar,
  ]);
}
