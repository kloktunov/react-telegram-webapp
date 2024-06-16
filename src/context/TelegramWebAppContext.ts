import { createContext, useContext } from "react";
import { TelegramWebApps } from "../telegram-webapps";

export type TelegramWebAppModel = {
  app?: TelegramWebApps.WebApp;
  isReady: boolean;
  addBackButtonListener: (listener: () => void) => void;
  removeBackButtonListener: (listener: () => void) => void;
};



export const TelegramWebAppContext = createContext<TelegramWebAppModel>({} as any);

export function useAddBackButtonListener() {

  const { addBackButtonListener } = useContext(TelegramWebAppContext);

  return addBackButtonListener;

}

export function useRemoveBackButtonListener() {

  const { removeBackButtonListener } = useContext(TelegramWebAppContext);

  return removeBackButtonListener;

}

export function useTelegramWebApp() {
  const { app } = useContext(TelegramWebAppContext);
  return app;
}