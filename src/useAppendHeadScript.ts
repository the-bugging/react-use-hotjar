import * as React from 'react';

type TAppendHeadScript = {
  scriptText: string;
  scriptId: string;
};

type TUseAppendHeadScript = {
  appendHeadScript: ({ scriptText, scriptId }: TAppendHeadScript) => boolean;
};

export function useAppendHeadScript(): TUseAppendHeadScript {
  const appendHeadScript = React.useCallback(
    ({ scriptText, scriptId }: TAppendHeadScript): boolean => {
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
