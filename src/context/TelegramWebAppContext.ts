import { createContext, useContext } from "react";
import { TelegramWebApps } from "../telegram-webapps";
import { MainButtonProps } from "../components/WebAppMainButton";
import { SecondaryMainButtonProps } from "../components/WebAppSecondaryMainButton";

export type TelegramWebAppModel = {
  app?: TelegramWebApps.WebApp;
  isReady: boolean;
  addBackButtonListener: (listener: () => void) => void;
  removeBackButtonListener: (listener: () => void) => void;
  addSettingsButtonListener: (listener: () => void) => void;
  removeSettingsButtonListener: (listener: () => void) => void;
  // Pre-1.3 API, kept for compatibility
  addMainButton: (props: MainButtonProps) => void;
  removeMainButton: (props: MainButtonProps) => void;
  addSecondaryMainButton: (props: SecondaryMainButtonProps) => void;
  removeSecondaryMainButton: (props: SecondaryMainButtonProps) => void;
  // A registered button keeps its place in the stack when its props change
  registerMainButton: (props: MainButtonProps) => number;
  updateMainButton: (id: number, props: MainButtonProps) => void;
  unregisterMainButton: (id: number) => void;
  registerSecondaryMainButton: (props: SecondaryMainButtonProps) => number;
  updateSecondaryMainButton: (id: number, props: SecondaryMainButtonProps) => void;
  unregisterSecondaryMainButton: (id: number) => void;
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


export function useAddSecondaryMainButton() {

  const { addSecondaryMainButton } = useContext(TelegramWebAppContext);

  return addSecondaryMainButton;

}

export function useRemoveSecondaryMainButton() {

  const { removeSecondaryMainButton } = useContext(TelegramWebAppContext);

  return removeSecondaryMainButton;

}


export function useTelegramWebApp() {
  const { app } = useContext(TelegramWebAppContext);
  return app;
}
