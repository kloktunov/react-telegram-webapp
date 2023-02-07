import React from "react";
import { ComponentType, useEffect, useState } from "react";
import { TelegramWebAppContext, TelegramWebAppModel } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";


type TelegramWebAppProps = {
  children: JSX.Element;
};

export function TelegramWebApp({ children }: TelegramWebAppProps) {

  const [isReady, setIsReady] = useState(false);

  const model: TelegramWebAppModel = {
    
    get app() {

      if(typeof window == 'undefined'){
        return undefined;
      }

      return (window as any)?.Telegram?.WebApp as TelegramWebApps.WebApp;

    },

    isReady,
  };

  const onReady = () => {
    setIsReady(true);
  };

  return (
    <TelegramWebAppScript onLoad={onReady}>
      <TelegramWebAppContext.Provider value={model}>{children}</TelegramWebAppContext.Provider>
    </TelegramWebAppScript>
  );
}

export function withTelegramWebApp(Component: ComponentType<any>, contextProps: Omit<TelegramWebAppProps, "children">) {
  return function WithTelegramWebApp(props: any) {
    return (
      <TelegramWebApp {...contextProps}>
        <Component {...props} />
      </TelegramWebApp>
    );
  };
}

function TelegramWebAppScript({ children, onLoad }: { children: JSX.Element; onLoad: () => void }) {

  // inject on load, remove on unload (using effect), but only once per page
  useEffect(() => {

    const tgWebAppScript = document.createElement("script");
    tgWebAppScript.src = "https://telegram.org/js/telegram-web-app.js";
    tgWebAppScript.onload = onLoad;

    document.head.appendChild(tgWebAppScript);

    return () => {
      document.head.removeChild(tgWebAppScript);
    };
    
  }, []);

  return children;
}