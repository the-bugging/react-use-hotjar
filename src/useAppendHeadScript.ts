import * as React from 'react';

type TUseAppendHeadScript = {
  appendHeadScript: (scriptText: string, scriptId: string) => boolean;
};

export default function useAppendHeadScript(): TUseAppendHeadScript {
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
