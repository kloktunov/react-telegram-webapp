import { createContext, useContext } from "react";
import { TelegramWebApps } from "../telegram-webapps";
import { MainButtonProps } from "../components/WebAppMainButton";

export type TelegramWebAppModel = {
  app?: TelegramWebApps.WebApp;
  isReady: boolean;
  addBackButtonListener: (listener: () => void) => void;
  removeBackButtonListener: (listener: () => void) => void;
  addMainButton: (props: MainButtonProps) => void;
  removeMainButton: (props: MainButtonProps) => void;
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


export function useAddMainButton() {

  const { addMainButton } = useContext(TelegramWebAppContext);

  return addMainButton;

}

export function useRemoveMainButton() {

  const { removeMainButton } = useContext(TelegramWebAppContext);

  return removeMainButton;

}

export function useTelegramWebApp() {
  const { app } = useContext(TelegramWebAppContext);
  return app;
}