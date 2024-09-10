import React, { useCallback } from "react";
import { ComponentType, useEffect, useState } from "react";
import { TelegramWebAppContext, TelegramWebAppModel } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";
import { MainButtonProps } from "./WebAppMainButton";
import { SecondaryMainButtonProps } from "./WebAppSecondaryMainButton";


// Define the properties for the component TelegramWebApp
type TelegramWebAppProps = {
	children: React.ReactNode;
};

// Define the component TelegramWebApp
export function TelegramWebApp({ children }: TelegramWebAppProps) {
	// State hook to track if the Telegram web app is ready
	const [isReady, setIsReady] = useState(false);
	const [backButtonListeners, setBackButtonListeners] = useState<(() => void)[]>([]);
	const [mainButtons, setMainButtons] = useState<MainButtonProps[]>([]);
	const [secondaryMainButtons, setSecondaryMainButtons] = useState<SecondaryMainButtonProps[]>([]);

	useEffect(() => {

		if(!isReady) return;

		const webApp = (window as any)?.Telegram?.WebApp as TelegramWebApps.WebApp;

		if(!webApp) return;

		backButtonListeners.forEach((listener) => {
			webApp.BackButton.offClick(listener);
		});

		mainButtons.forEach((button) => {
			if(button.onClick){
				webApp.MainButton.offClick(button.onClick);
			}
		});

		if(backButtonListeners.length > 0) {
			webApp.BackButton.onClick(backButtonListeners[0]);

			if(!webApp.BackButton.isVisible){
				webApp.BackButton.show();
			}
		} else {
			webApp.BackButton.hide();
		}

		if(mainButtons.length > 0) {

			let first = mainButtons[0];
			let webAppMainButton = webApp.MainButton;

			if(first.onClick){
				webAppMainButton.onClick(first.onClick);
			}

			webApp.MainButton.setText(first.text || 'CONTINUE');
			
			if (webAppMainButton.isActive && first.disable) {
				webAppMainButton.disable();
			} else if (!webAppMainButton.isActive && !first.disable) {
				webAppMainButton.enable();
			}

			if (!webAppMainButton.isProgressVisible && first.progress) {
				webAppMainButton.showProgress(false);
			} else if (webAppMainButton.isProgressVisible && !first.progress) {
				webAppMainButton.hideProgress();
			}

			webAppMainButton.setParams({
				text_color: first.textColor || webApp.themeParams.button_text_color,
				color: first.color || webApp.themeParams.button_color,
				has_shine_effect: first.hasShineEffect ?? false,
			});
	

			if(!webAppMainButton.isVisible) {
				webAppMainButton.show();
			}

		} else {
			webApp.MainButton.hide();
		}

		if(secondaryMainButtons.length > 0) {

			let first = secondaryMainButtons[0];
			let webAppSecondaryButton = webApp.SecondaryButton;

			if(first.onClick){
				webAppSecondaryButton.onClick(first.onClick);
			}

			webAppSecondaryButton.setText(first.text || 'CONTINUE');

			if (webAppSecondaryButton.isActive && first.disable) {
				webAppSecondaryButton.disable();
			} else if (!webAppSecondaryButton.isActive && !first.disable) {
				webAppSecondaryButton.enable();
			}

			if (!webAppSecondaryButton.isProgressVisible && first.progress) {
				webAppSecondaryButton.showProgress(false);
			} else if (webAppSecondaryButton.isProgressVisible && !first.progress) {
				webAppSecondaryButton.hideProgress();
			}

			webAppSecondaryButton.setParams({
				text_color: first.textColor || webApp.themeParams.button_color,
				color: first.color || webApp.themeParams.bottom_bar_bg_color,
				position: first.position || "left",
				has_shine_effect: first.hasShineEffect ?? false,
			});

			if(!webAppSecondaryButton.isVisible) {
				webAppSecondaryButton.show();
			}
			
		} else {
			webApp.SecondaryButton.hide();
		}

		return () => {

			if(backButtonListeners.length == 0 && webApp?.BackButton.isVisible) {
				webApp?.BackButton.hide();
			}

			backButtonListeners.forEach(listener => {
				webApp.BackButton.offClick(listener);
			});

			if(mainButtons.length == 0 && webApp?.MainButton.isVisible) {
				webApp?.MainButton.hide();
			}

			mainButtons.forEach((button) => {
				if(button.onClick){
					webApp.MainButton.offClick(button.onClick);
				}
			});

			if(secondaryMainButtons.length == 0 && webApp?.SecondaryButton.isVisible) {
				webApp?.SecondaryButton.hide();
			}

			secondaryMainButtons.forEach((button) => {
				if(button.onClick){
					webApp.SecondaryButton.offClick(button.onClick);
				}
			});
		}
	}, [isReady, backButtonListeners, mainButtons, secondaryMainButtons]);

	const addBackButtonListener = (listener: () => void) => {

		setBackButtonListeners((prev) => {
			return [listener, ...prev];
		});

	}

	const removeBackButtonListener = (listener: () => void) => {
		setBackButtonListeners((prev) => {
			const index = prev.indexOf(listener);

			return prev.filter((_, i) => i !== index);
		});
	}

	const addMainButton = (props: MainButtonProps) => {

		setMainButtons((prev) => {
			return [props, ...prev];
		});

	}

	const removeMainButton = (props: MainButtonProps) => {
		setMainButtons((prev) => {
			const index = prev.indexOf(props);

			return prev.filter((_, i) => i !== index);
		});
	}

	const addSecondaryMainButton = (props: SecondaryMainButtonProps) => {

		setSecondaryMainButtons((prev) => {
			return [props, ...prev];
		});

	}

	const removeSecondaryMainButton = (props: SecondaryMainButtonProps) => {
		setSecondaryMainButtons((prev) => {
			const index = prev.indexOf(props);

			return prev.filter((_, i) => i !== index);
		});
	}
	

	// The model that contains the Telegram web app and its ready state
	const model: TelegramWebAppModel = {
		// A getter function to retrieve the Telegram web app
		get app() {
			// If the current environment doesn't have a window object, return undefined
			if (typeof window === 'undefined') {
				return undefined;
			}
			// Otherwise, try to retrieve the Telegram web app from the window object
			return (window as any)?.Telegram?.WebApp as TelegramWebApps.WebApp;
		},
		// The ready state of the Telegram web app
		isReady,
		addBackButtonListener,
		removeBackButtonListener,
		addMainButton,
		removeMainButton,
		addSecondaryMainButton,
		removeSecondaryMainButton,
	};

	

	// A function that sets the ready state to true
	const onReady = () => {
		setIsReady(true);
	};

	// Render the component with the model and its children
	return (
		<TelegramWebAppScript onLoad={onReady}>
			<TelegramWebAppContext.Provider value={model}>{children}</TelegramWebAppContext.Provider>
		</TelegramWebAppScript>
	);
}

// A higher-order component that passes the Telegram web app and its ready state to a given component
export function withTelegramWebApp(Component: ComponentType<any>, contextProps: Omit<TelegramWebAppProps, "children">) {
	return function WithTelegramWebApp(props: any) {
		return (
			<TelegramWebApp {...contextProps}>
				<Component {...props} />
			</TelegramWebApp>
		);
	};
}

// A functional component that injects the Telegram web app script into the document head
function TelegramWebAppScript({ children, onLoad }: { children: JSX.Element; onLoad: () => void }) {

	// Use an effect hook to inject the Telegram web app script into the document head once and remove it on unload
	useEffect(() => {
		// Create a new script element for the Telegram web app script
		const tgWebAppScript = document.createElement("script");
		// Set the source of the script to the Telegram web app script
		tgWebAppScript.src = "https://telegram.org/js/telegram-web-app.js";
		// Set the onload callback to the provided onLoad function
		tgWebAppScript.onload = onLoad;
		// Append the script to the document head
		document.head.appendChild(tgWebAppScript);
		// Return a cleanup function that removes the script from the document head
		return () => {
			document.head.removeChild(tgWebAppScript);
		};
	}, []);
 
	return children;
}