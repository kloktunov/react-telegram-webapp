import { useContext } from "react";
import { TelegramWebAppContext } from "../context/TelegramWebAppContext";

export function useIsWebAppReady() {
    const { isReady } = useContext(TelegramWebAppContext);
    return isReady;
}