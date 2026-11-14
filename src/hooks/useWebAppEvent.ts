import { useEffect, useRef } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";

// Subscribes to a Telegram.WebApp event while the component is mounted; always calls the latest handler
export const useWebAppEvent = <T extends TelegramWebApps.EventNames>(
    eventName: T,
    handler: (params: TelegramWebApps.EventParams[T]) => unknown
) => {

    const webApp = useTelegramWebApp();

    const handlerRef = useRef(handler);
    handlerRef.current = handler;

    useEffect(() => {

        if (!webApp) return;

        const listener = (params: TelegramWebApps.EventParams[T]) => handlerRef.current(params);

        webApp.onEvent(eventName, listener);

        return () => webApp.offEvent(eventName, listener);

    }, [webApp, eventName]);

};
