import * as React from 'react';

type TAppendHeadScript = {
  scriptText: string;
  scriptId: string;
};

type TUseAppendHeadScript = {
  appendHeadScript: ({
    scriptText,
    scriptId,
  }: TAppendHeadScript) => Promise<boolean>;
};

export function useAppendHeadScript(): TUseAppendHeadScript {
  const appendHeadScript = ({
    scriptText,
    scriptId,
  }: TAppendHeadScript): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        const existentScript = document.getElementById(
          scriptId
        ) as HTMLScriptElement;
        const script = existentScript || document.createElement('script');
        script.id = scriptId;
        script.innerText = scriptText;
        script.crossOrigin = 'anonymous';

        document.head.appendChild(script);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return React.useMemo(() => ({ appendHeadScript }), []);
}
