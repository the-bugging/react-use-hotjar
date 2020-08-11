import * as React from 'react';

type TAppendHeadScript = {
  scriptText: string;
  scriptId: string;
};

type TUseAppendHeadScript = {
  appendHeadScript: ({ scriptText, scriptId }: TAppendHeadScript) => boolean;
};

export function useAppendHeadScript(): TUseAppendHeadScript {
  const appendHeadScript = ({
    scriptText,
    scriptId,
  }: TAppendHeadScript): boolean => {
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
    } catch (error) {
      return error;
    }
  };

  return React.useMemo(() => ({ appendHeadScript }), []);
}
