import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";

export const useWebAppScanQrPopup = () => {

	const webApp = useTelegramWebApp();

	const showScanQrPopup = (params: TelegramWebApps.ScanQrPopupParams, callback: TelegramWebApps.ScanQrPopupCallback) => {
		webApp?.showScanQrPopup(params, callback);
	};

	const closeScanQrPopup = () => {
		webApp?.closeScanQrPopup();
	};

	return {
		showScanQrPopup,
		closeScanQrPopup
	}

};
