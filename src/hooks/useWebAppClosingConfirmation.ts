import { useEffect, useState } from "react"
import { useTelegramWebApp } from "../context/TelegramWebAppContext"

export const useWebAppClosingConfirmation = () => {

    const webApp = useTelegramWebApp();
    const [isClosingConfirmationEnabled, setIsClosingConfirmationEnabled] = useState(webApp?.isClosingConfirmationEnabled ?? false)

    const setIsClosingConfirmation = (status: boolean) => {

        setIsClosingConfirmationEnabled(status);

        if(status){
            webApp?.enableClosingConfirmation();
        } else {
            webApp?.disableClosingConfirmation();
        }

    }

    useEffect(() => {

        setIsClosingConfirmationEnabled(webApp?.isClosingConfirmationEnabled ?? false);

    }, [webApp]);

    return { isClosingConfirmationEnabled, setIsClosingConfirmationEnabled: setIsClosingConfirmation };

}