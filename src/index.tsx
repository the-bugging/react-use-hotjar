import * as React from 'react';
import { useAppendHeadScript } from './useAppendHeadScript';

type TInitHotjar = {
  hotjarId: string;
  hotjarVersion: string;
  shouldLog?: boolean;
};

type TUserInfo = {
  userInfo: {
    id: string;
  };
  shouldLog?: boolean;
};

type TUseHotjar = {
  initHotjar: ({
    hotjarId,
    hotjarVersion,
    shouldLog,
  }: TInitHotjar) => Promise<boolean>;
  identityHotjar: ({ userInfo }: TUserInfo) => Promise<boolean>;
};

export function useHotjar(): TUseHotjar {
  const { appendHeadScript } = useAppendHeadScript();

  const initHotjar = React.useCallback(
    async ({
      hotjarId,
      hotjarVersion,
      shouldLog = true,
    }: TInitHotjar): Promise<boolean> => {
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
    async ({ userInfo, shouldLog = true }: TUserInfo): Promise<boolean> => {
      try {
        const { id, ...restUserInfo } = userInfo;
        const hotjarIdentityScript = `var userId="${id}" || null;window.hj("identify",userId,{${JSON.stringify(
          restUserInfo
        )}});`;
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
