import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ComponentType } from "react";
import { TelegramWebAppContext, TelegramWebAppModel } from "../context/TelegramWebAppContext";
import { TelegramWebApps } from "../telegram-webapps";
import { getWebApp, isVersionAtLeast, loadTelegramWebAppScript } from "../utils/webapp";
import { MainButtonProps } from "./WebAppMainButton";
import { SecondaryMainButtonProps } from "./WebAppSecondaryMainButton";

// Define the properties for the component TelegramWebApp
type TelegramWebAppProps = {
	children: React.ReactNode;
	// Call Telegram.WebApp.ready() as soon as the script is loaded
	autoReady?: boolean;
	// Delay (ms) before hiding Back / Main / Secondary / Settings buttons when the last one unmounts.
	// Keeps buttons from blinking while one screen replaces another.
	buttonsHideDelay?: number;
};

const DEFAULT_BUTTONS_HIDE_DELAY = 150;

type ButtonEntry<T> = { id: number; props: T };

// Define the component TelegramWebApp
export function TelegramWebApp({ children, autoReady = false, buttonsHideDelay = DEFAULT_BUTTONS_HIDE_DELAY }: TelegramWebAppProps) {
	// State hook to track if the Telegram web app is ready
	const [isReady, setIsReady] = useState(false);

	// Newest registration goes first and wins
	const [backButtonListeners, setBackButtonListeners] = useState<(() => void)[]>([]);
	const [settingsButtonListeners, setSettingsButtonListeners] = useState<(() => void)[]>([]);
	const [mainButtons, setMainButtons] = useState<ButtonEntry<MainButtonProps>[]>([]);
	const [secondaryMainButtons, setSecondaryMainButtons] = useState<ButtonEntry<SecondaryMainButtonProps>[]>([]);

	const nextButtonId = useRef(0);
	const legacyButtonIds = useRef(new WeakMap<object, number>());

	// Script loading: reuses the script if it is already on the page, retries on network errors
	useEffect(() => {
		let cancelled = false;

		loadTelegramWebAppScript()
			.then(() => {
				if (cancelled) return;

				if (autoReady) {
					getWebApp()?.ready();
				}

				setIsReady(true);
			})
			.catch((e) => {
				console.error("[react-telegram-webapp] Failed to load telegram-web-app.js", e);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	const backButtonTop = backButtonListeners[0];
	const settingsButtonTop = settingsButtonListeners[0];
	const mainButtonTop = mainButtons[0]?.props;
	const secondaryMainButtonTop = secondaryMainButtons[0]?.props;

	// Click handlers are registered in Telegram once and call the current top button
	const backButtonTopRef = useRef(backButtonTop);
	const settingsButtonTopRef = useRef(settingsButtonTop);
	const mainButtonTopRef = useRef(mainButtonTop);
	const secondaryMainButtonTopRef = useRef(secondaryMainButtonTop);

	backButtonTopRef.current = backButtonTop;
	settingsButtonTopRef.current = settingsButtonTop;
	mainButtonTopRef.current = mainButtonTop;
	secondaryMainButtonTopRef.current = secondaryMainButtonTop;

	useEffect(() => {
		if (!isReady) return;

		const webApp = getWebApp();

		if (!webApp) return;

		const onBack = () => backButtonTopRef.current?.();
		const onSettings = () => settingsButtonTopRef.current?.();
		const onMain = () => mainButtonTopRef.current?.onClick?.();
		const onSecondary = () => secondaryMainButtonTopRef.current?.onClick?.();

		webApp.BackButton.onClick(onBack);
		webApp.SettingsButton?.onClick(onSettings);
		webApp.MainButton.onClick(onMain);
		webApp.SecondaryButton?.onClick(onSecondary);

		return () => {
			webApp.BackButton.offClick(onBack);
			webApp.SettingsButton?.offClick(onSettings);
			webApp.MainButton.offClick(onMain);
			webApp.SecondaryButton?.offClick(onSecondary);
		};
	}, [isReady]);

	// Back button
	const hasBackButton = !!backButtonTop;

	useEffect(() => {
		if (!isReady) return;

		const backButton = getWebApp()?.BackButton;

		if (!backButton) return;

		if (hasBackButton) {
			if (!backButton.isVisible) {
				backButton.show();
			}
			return;
		}

		return deferHide(buttonsHideDelay, () => {
			if (backButton.isVisible) {
				backButton.hide();
			}
		});
	}, [isReady, hasBackButton, buttonsHideDelay]);

	// Settings button
	const hasSettingsButton = !!settingsButtonTop;

	useEffect(() => {
		if (!isReady) return;

		const settingsButton = getWebApp()?.SettingsButton;

		if (!settingsButton) return;

		if (hasSettingsButton) {
			if (!settingsButton.isVisible) {
				settingsButton.show();
			}
			return;
		}

		return deferHide(buttonsHideDelay, () => {
			if (settingsButton.isVisible) {
				settingsButton.hide();
			}
		});
	}, [isReady, hasSettingsButton, buttonsHideDelay]);

	// Main button
	useEffect(() => {
		if (!isReady) return;

		const webApp = getWebApp();

		if (!webApp) return;

		const button = webApp.MainButton;

		if (mainButtonTop) {
			applyBottomButton(webApp, button, mainButtonTop, {
				text_color: mainButtonTop.textColor || webApp.themeParams.button_text_color,
				color: mainButtonTop.color || webApp.themeParams.button_color,
			});
			return;
		}

		return deferHide(buttonsHideDelay, () => {
			if (button.isVisible) {
				button.hide();
			}
		});
	}, [isReady, mainButtonTop, buttonsHideDelay]);

	// Secondary button
	useEffect(() => {
		if (!isReady) return;

		const webApp = getWebApp();
		const button = webApp?.SecondaryButton;

		if (!webApp || !button) return;

		if (secondaryMainButtonTop) {
			applyBottomButton(webApp, button, secondaryMainButtonTop, {
				text_color: secondaryMainButtonTop.textColor || webApp.themeParams.button_color,
				color: secondaryMainButtonTop.color || webApp.themeParams.bottom_bar_bg_color,
				position: secondaryMainButtonTop.position || "left",
			});
			return;
		}

		return deferHide(buttonsHideDelay, () => {
			if (button.isVisible) {
				button.hide();
			}
		});
	}, [isReady, secondaryMainButtonTop, buttonsHideDelay]);

	// Registration
	const addBackButtonListener = useCallback((listener: () => void) => {
		setBackButtonListeners((prev) => [listener, ...prev]);
	}, []);

	const removeBackButtonListener = useCallback((listener: () => void) => {
		setBackButtonListeners((prev) => removeFirst(prev, listener));
	}, []);

	const addSettingsButtonListener = useCallback((listener: () => void) => {
		setSettingsButtonListeners((prev) => [listener, ...prev]);
	}, []);

	const removeSettingsButtonListener = useCallback((listener: () => void) => {
		setSettingsButtonListeners((prev) => removeFirst(prev, listener));
	}, []);

	const registerMainButton = useCallback((props: MainButtonProps) => {
		const id = ++nextButtonId.current;
		setMainButtons((prev) => [{ id, props }, ...prev]);
		return id;
	}, []);

	const updateMainButton = useCallback((id: number, props: MainButtonProps) => {
		setMainButtons((prev) => prev.map((entry) => (entry.id === id ? { id, props } : entry)));
	}, []);

	const unregisterMainButton = useCallback((id: number) => {
		setMainButtons((prev) => prev.filter((entry) => entry.id !== id));
	}, []);

	const registerSecondaryMainButton = useCallback((props: SecondaryMainButtonProps) => {
		const id = ++nextButtonId.current;
		setSecondaryMainButtons((prev) => [{ id, props }, ...prev]);
		return id;
	}, []);

	const updateSecondaryMainButton = useCallback((id: number, props: SecondaryMainButtonProps) => {
		setSecondaryMainButtons((prev) => prev.map((entry) => (entry.id === id ? { id, props } : entry)));
	}, []);

	const unregisterSecondaryMainButton = useCallback((id: number) => {
		setSecondaryMainButtons((prev) => prev.filter((entry) => entry.id !== id));
	}, []);

	// Pre-1.3 API: register by props object
	const addMainButton = useCallback((props: MainButtonProps) => {
		legacyButtonIds.current.set(props, registerMainButton(props));
	}, []);

	const removeMainButton = useCallback((props: MainButtonProps) => {
		const id = legacyButtonIds.current.get(props);
		if (id !== undefined) unregisterMainButton(id);
	}, []);

	const addSecondaryMainButton = useCallback((props: SecondaryMainButtonProps) => {
		legacyButtonIds.current.set(props, registerSecondaryMainButton(props));
	}, []);

	const removeSecondaryMainButton = useCallback((props: SecondaryMainButtonProps) => {
		const id = legacyButtonIds.current.get(props);
		if (id !== undefined) unregisterSecondaryMainButton(id);
	}, []);

	// The model that contains the Telegram web app and its ready state
	const model: TelegramWebAppModel = useMemo(
		() => ({
			// A getter function to retrieve the Telegram web app
			get app() {
				return getWebApp();
			},
			// The ready state of the Telegram web app
			isReady,
			addBackButtonListener,
			removeBackButtonListener,
			addSettingsButtonListener,
			removeSettingsButtonListener,
			addMainButton,
			removeMainButton,
			registerMainButton,
			updateMainButton,
			unregisterMainButton,
			addSecondaryMainButton,
			removeSecondaryMainButton,
			registerSecondaryMainButton,
			updateSecondaryMainButton,
			unregisterSecondaryMainButton,
		}),
		[isReady]
	);

	return <TelegramWebAppContext.Provider value={model}>{children}</TelegramWebAppContext.Provider>;
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

function removeFirst<T>(list: T[], item: T): T[] {
	const index = list.indexOf(item);

	if (index === -1) return list;

	return list.filter((_, i) => i !== index);
}

// Hides after a delay; the returned cleanup cancels hiding if a button appears again
function deferHide(delay: number, hide: () => void) {
	if (delay <= 0) {
		hide();
		return;
	}

	const timeout = setTimeout(hide, delay);

	return () => clearTimeout(timeout);
}

function applyBottomButton(
	webApp: TelegramWebApps.WebApp,
	button: TelegramWebApps.BottomButton,
	props: MainButtonProps,
	params: Parameters<TelegramWebApps.SecondaryButton["setParams"]>[0]
) {
	button.setText(props.text || "CONTINUE");

	if (button.isActive && props.disable) {
		button.disable();
	} else if (!button.isActive && !props.disable) {
		button.enable();
	}

	if (!button.isProgressVisible && props.progress) {
		button.showProgress(false);
	} else if (button.isProgressVisible && !props.progress) {
		button.hideProgress();
	}

	button.setParams({
		...params,
		has_shine_effect: props.hasShineEffect ?? false,
		...(isVersionAtLeast(webApp, "9.5") ? { icon_custom_emoji_id: props.iconCustomEmojiId ?? "" } : {}),
	});

	if (!button.isVisible) {
		button.show();
	}
}
