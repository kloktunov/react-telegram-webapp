import { useCallback } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";

export const useWebAppScanQrPopup = () => {

	const webApp = useTelegramWebApp();

	const showScanQrPopup = useCallback((params: TelegramWebApps.ScanQrPopupParams) => {

        return new Promise<string>((resolve, reject) => {

            try {

                webApp?.showScanQrPopup(params, (result) => {
					resolve(result);
					return true;
				});

            } catch (e) {

                reject(e);

            }

        });
            
    }, [webApp]);

	const closeScanQrPopup = useCallback(() => {
		
		webApp?.closeScanQrPopup();

	}, [webApp]);

	return {
		showScanQrPopup,
		closeScanQrPopup
	}

};
