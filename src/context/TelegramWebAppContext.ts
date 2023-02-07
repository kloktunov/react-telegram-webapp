import { createContext, useContext } from "react";
import { TelegramWebApps } from "../telegram-webapps";

export type TelegramWebAppModel = {
  app?: TelegramWebApps.WebApp;
  isReady: boolean;
};

export const TelegramWebAppContext = createContext<TelegramWebAppModel>({} as any);

export function useTelegramWebApp() {
  const { app } = useContext(TelegramWebAppContext);
  return app;
}