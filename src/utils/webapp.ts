import { TelegramWebApps } from "../telegram-webapps";

export const TELEGRAM_WEB_APP_SCRIPT_SRC = "https://telegram.org/js/telegram-web-app.js";

const SCRIPT_LOAD_ATTEMPTS = 3;
const SCRIPT_RETRY_DELAY = 1000;
// An existing tag may have already failed before we subscribed — do not wait for it forever
const SCRIPT_LOAD_TIMEOUT = 15000;

export function getWebApp(): TelegramWebApps.WebApp | undefined {
	if (typeof window === "undefined") {
		return undefined;
	}

	return (window as any)?.Telegram?.WebApp as TelegramWebApps.WebApp | undefined;
}

export function isVersionAtLeast(webApp: TelegramWebApps.WebApp | undefined, version: string): boolean {
	try {
		return webApp?.isVersionAtLeast?.(version) ?? false;
	} catch {
		return false;
	}
}

let scriptPromise: Promise<void> | null = null;

// Loads telegram-web-app.js once per page.
// If the script is already on the page (e.g. added to <head>), waits for it instead of adding a second copy.
export function loadTelegramWebAppScript(): Promise<void> {
	if (getWebApp()) {
		return Promise.resolve();
	}

	if (scriptPromise) {
		return scriptPromise;
	}

	scriptPromise = loadWithRetries(SCRIPT_LOAD_ATTEMPTS).catch((e) => {
		// Let the next mount try again
		scriptPromise = null;
		throw e;
	});

	return scriptPromise;
}

async function loadWithRetries(attempts: number): Promise<void> {
	let lastError: unknown;

	for (let attempt = 1; attempt <= attempts; attempt++) {
		try {
			await loadScriptOnce();
			return;
		} catch (e) {
			lastError = e;

			if (attempt < attempts) {
				await new Promise((resolve) => setTimeout(resolve, SCRIPT_RETRY_DELAY * attempt));
			}
		}
	}

	throw lastError;
}

function loadScriptOnce(): Promise<void> {
	return new Promise((resolve, reject) => {
		if (getWebApp()) {
			resolve();
			return;
		}

		let script = document.querySelector<HTMLScriptElement>(`script[src="${TELEGRAM_WEB_APP_SCRIPT_SRC}"]`);

		const onLoad = () => {
			cleanup();

			if (getWebApp()) {
				resolve();
			} else {
				reject(new Error("telegram-web-app.js loaded, but Telegram.WebApp is missing"));
			}
		};

		const onError = () => {
			cleanup();
			// Remove the failed tag so a retry creates a fresh one
			script?.remove();
			reject(new Error("Failed to load telegram-web-app.js"));
		};

		const timeout = setTimeout(onError, SCRIPT_LOAD_TIMEOUT);

		const cleanup = () => {
			clearTimeout(timeout);
			script?.removeEventListener("load", onLoad);
			script?.removeEventListener("error", onError);
		};

		if (!script) {
			script = document.createElement("script");
			script.src = TELEGRAM_WEB_APP_SCRIPT_SRC;
			script.async = true;
			script.addEventListener("load", onLoad);
			script.addEventListener("error", onError);
			document.head.appendChild(script);
			return;
		}

		// The tag already exists and is still loading
		script.addEventListener("load", onLoad);
		script.addEventListener("error", onError);
	});
}
