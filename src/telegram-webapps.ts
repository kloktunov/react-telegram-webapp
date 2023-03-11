export namespace TelegramWebApps {   
		
	export interface WebApp {
		/**
		* A string with raw data transferred to the Web App, convenient for validating data.
		* WARNING: Validate data from this field before using it on the bot's server.
		*/
		initData: string;
		/**
		* An object with input data transferred to the Web App.
		* WARNING: Data from this field should not be trusted.
		* You should only use data from initData on the bot's server and only after it has been validated.
		*/
		initDataUnsafe: WebAppInitData;
		/**
		* The color scheme currently used in the Telegram app. Either “light” or “dark”.
		* Also available as the CSS variable var(--tg-color-scheme).
		*/
		colorScheme: ColorScheme;
		/**
		* An object containing the current theme settings used in the Telegram app.
		*/
		themeParams: ThemeParams;
		/**
		* True if the Web App is expanded to the maximum available height.
		* False, if the Web App occupies part of the screen and can be expanded to the full height using the expand() method.
		*/
		isExpanded: boolean;
		/**
		* The current height of the visible area of the Web App. Also available in CSS as the variable var(--tg-viewport-height).
		*/
		viewportHeight: number;
		/**
		* The height of the visible area of the Web App in its last stable state. Also available in CSS as a variable var(--tg-viewport-stable-height).
		*/
		viewportStableHeight: number;
		/**
		* An object for controlling the main button, which is displayed at the bottom of the Web App in the Telegram interface.
		*/
		MainButton: MainButton;

		BackButton: BackButton;

		HapticFeedback: HapticFeedback;

		isClosingConfirmationEnabled: boolean;

		/**
		 * The version of the Bot API available in the user's Telegram app.
		 */
		version: string;

		showPopup(params: PopupParams, cb?: Function): void;
		
		showConfirm(message: string, cb?: (result: boolean) => void): void;

		showScanQrPopup(params: ScanQrPopupParams, callback?: ScanQrPopupCallback): void;
		closeScanQrPopup(): void;

		enableClosingConfirmation(): void;
		disableClosingConfirmation(): void;

		openLink(url: string): void;
		openInvoice(url: string, cb?: Function): void;

			
		onEvent(eventType: "themeChanged" | "mainButtonClicked" | "backButtonClicked" | "settingsButtonClicked", eventHandler: () => void): void;
		onEvent(eventType: "viewportChanged", eventHandler: (params: { isStateStable: boolean; viewportHeight: number; }) => void): void;
		onEvent(eventType: "invoiceClosed", eventHandler: (params: { url: string; status: "paid" | "cancelled" | "failed" | "pending"; }) => void): void;
		onEvent(eventType: "popupClosed", eventHandler: (params: { button_id?: string | null; }) => void): void;
		onEvent(eventType: "qrTextReceived" , eventHandler: (params: { data: string; }) => void): void;
		onEvent(eventType: "clipboardTextReceived", eventHandler: (params: { data: string | null; }) => void): void;

		/**
		* 	A method that deletes a previously set event handler.
		*/
		offEvent(eventType: "themeChanged" | "mainButtonClicked" | "backButtonClicked" | "settingsButtonClicked", eventHandler: () => void): void;
		offEvent(eventType: "viewportChanged", eventHandler: (params: { isStateStable: boolean; viewportHeight: number; }) => void): void;
		offEvent(eventType: "invoiceClosed", eventHandler: (params: { url: string; status: "paid" | "cancelled" | "failed" | "pending"; }) => void): void;
		offEvent(eventType: "popupClosed", eventHandler: (params: { button_id?: string | null; }) => void): void;
		offEvent(eventType: "qrTextReceived" , eventHandler: (params: { data: string; }) => void): void;
		offEvent(eventType: "clipboardTextReceived", eventHandler: (params: { data: string | null; }) => void): void;

		/**
		* A method used to send data to the bot.
		*/
		sendData(data: any): void;
		
		/**
		* A method that informs the Telegram app that the Web App is ready to be displayed.
		*/
		ready(): void;
		/**
		* A method that expands the Web App to the maximum available height.
		*/
		expand(): void;
		/**
		* A method that closes the Web App.
		*/
		close(): void;

		enableClosingConfirmation(): void;

		disableClosingConfirmation(): void;
		
	}

	export interface PopupParams {
		title?: string;
		message: string;
		buttons?: PopupButton[]
	}

	export interface PopupButton {
		id?: string;
		type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
		text?: string;
	}

	export interface ScanQrPopupParams {
		text: string;
	}

	export type ScanQrPopupCallback = (text: string) => true | void;

	export type ShowScanQrPopupFunction = (
		params: ScanQrPopupParams,
		callback?: ScanQrPopupCallback,
	) => void;
	
	export type CloseScanQrPopupFunction = () => void;

	export type ColorScheme = "light" | "dark" | undefined;

	export interface ThemeParams {
		/**
		* Background color in the #RRGGBB format.
		* Also available as the CSS variable var(--tg-theme-bg-color).
		*/
		bg_color?: string;
		/**
		* Main text color in the #RRGGBB format.
		* Also available as the CSS variable var(--tg-theme-text-color).
		*/
		text_color?: string;
		/**
		* Hint text color in the #RRGGBB format.
		* Also available as the CSS variable var(--tg-theme-hint-color).
		*/
		hint_color?: string;
		/**
		* Link color in the #RRGGBB format.
		* Also available as the CSS variable var(--tg-theme-link-color).
		*/
		link_color?: string;
		/**
		* Button color in the #RRGGBB format.
		* Also available as the CSS variable var(--tg-theme-button-color).
		*/
		button_color?: string;
		/**
		* Button text color in the #RRGGBB format.
		* Also available as the CSS variable var(--tg-theme-button-text-color).
		*/
		button_text_color?: string;

		/**
		* Secondary background color in the #RRGGBB format.
		* Also available as the CSS variable var(--tg-theme-secondary-bg-color).
		*/
		secondary_bg_color?: string;
	}
	
	export interface WebAppInitData {
		/**
		* A unique identifier for the Web App session, required for sending messages via the answerWebAppQuery method.
		*/
		query_id?: string;

		/**
		* An object containing data about the current user.
		*/
		user?: WebAppUser;

		/**
		* An object containing data about the chat partner of the current user in the chat where the bot was launched via the attachment menu. Returned only for Web Apps launched via the attachment menu.
		*/
		receiver?: WebAppUser;

		/**
		* The value of the startattach parameter, passed via link. Only returned for Web Apps when launched from the attachment menu via link.
		*/
		start_param?: string;

		/**
		* Unix time when the form was opened.
		*/
		auth_date?: number;
		/**
		* A hash of all passed parameters, which the bot server can use to check their validity.
		*/
		hash?: string;

		chat?: WebAppChat;

		can_send_after?: number;

	}
	
	export interface WebAppUser {
		/**
		* A unique identifier for the user or bot.
		*/
		id?: number;
		/**
		* True, if this user is a bot. Returns in the receiver field only.
		*/
		is_bot: boolean;
		/**
		* First name of the user or bot.
		*/
		first_name: string;
		/**
		* Last name of the user or bot.
		*/
		last_name?: string;
		/**
		* Username of the user or bot.
		*/
		username?: string;

		/** [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the user's language. Returns in {@link WebAppInitData.user user} field only */
		language_code?: 'af' | 'af-NA' | 'af-ZA' | 'agq' | 'agq-CM' | 'ak' | 'ak-GH' | 'am' | 'am-ET' | 'ar' | 'ar-001' | 'ar-AE' | 'ar-BH' | 'ar-DJ' | 'ar-DZ' | 'ar-EG' | 'ar-EH' | 'ar-ER' | 'ar-IL' | 'ar-IQ' | 'ar-JO' | 'ar-KM' | 'ar-KW' | 'ar-LB' | 'ar-LY' | 'ar-MA' | 'ar-MR' | 'ar-OM' | 'ar-PS' | 'ar-QA' | 'ar-SA' | 'ar-SD' | 'ar-SO' | 'ar-SS' | 'ar-SY' | 'ar-TD' | 'ar-TN' | 'ar-YE' | 'as' | 'as-IN' | 'asa' | 'asa-TZ' | 'ast' | 'ast-ES' | 'az' | 'az-Cyrl' | 'az-Cyrl-AZ' | 'az-Latn' | 'az-Latn-AZ' | 'bas' | 'bas-CM' | 'be' | 'be-BY' | 'bem' | 'bem-ZM' | 'bez' | 'bez-TZ' | 'bg' | 'bg-BG' | 'bm' | 'bm-ML' | 'bn' | 'bn-BD' | 'bn-IN' | 'bo' | 'bo-CN' | 'bo-IN' | 'br' | 'br-FR' | 'brx' | 'brx-IN' | 'bs' | 'bs-Cyrl' | 'bs-Cyrl-BA' | 'bs-Latn' | 'bs-Latn-BA' | 'ca' | 'ca-AD' | 'ca-ES' | 'ca-ES-VALENCIA' | 'ca-FR' | 'ca-IT' | 'ccp' | 'ccp-BD' | 'ccp-IN' | 'ce' | 'ce-RU' | 'ceb' | 'ceb-PH' | 'cgg' | 'cgg-UG' | 'chr' | 'chr-US' | 'ckb' | 'ckb-IQ' | 'ckb-IR' | 'cs' | 'cs-CZ' | 'cu' | 'cu-RU' | 'cy' | 'cy-GB' | 'da' | 'da-DK' | 'da-GL' | 'dav' | 'dav-KE' | 'de' | 'de-AT' | 'de-BE' | 'de-CH' | 'de-DE' | 'de-IT' | 'de-LI' | 'de-LU' | 'dje' | 'dje-NE' | 'dsb' | 'dsb-DE' | 'dua' | 'dua-CM' | 'dyo' | 'dyo-SN' | 'dz' | 'dz-BT' | 'ebu' | 'ebu-KE' | 'ee' | 'ee-GH' | 'ee-TG' | 'el' | 'el-CY' | 'el-GR' | 'en' | 'en-001' | 'en-150' | 'en-AE' | 'en-AG' | 'en-AI' | 'en-AS' | 'en-AT' | 'en-AU' | 'en-BB' | 'en-BE' | 'en-BI' | 'en-BM' | 'en-BS' | 'en-BW' | 'en-BZ' | 'en-CA' | 'en-CC' | 'en-CH' | 'en-CK' | 'en-CM' | 'en-CX' | 'en-CY' | 'en-DE' | 'en-DG' | 'en-DK' | 'en-DM' | 'en-ER' | 'en-FI' | 'en-FJ' | 'en-FK' | 'en-FM' | 'en-GB' | 'en-GD' | 'en-GG' | 'en-GH' | 'en-GI' | 'en-GM' | 'en-GU' | 'en-GY' | 'en-HK' | 'en-IE' | 'en-IL' | 'en-IM' | 'en-IN' | 'en-IO' | 'en-JE' | 'en-JM' | 'en-KE' | 'en-KI' | 'en-KN' | 'en-KY' | 'en-LC' | 'en-LR' | 'en-LS' | 'en-MG' | 'en-MH' | 'en-MO' | 'en-MP' | 'en-MS' | 'en-MT' | 'en-MU' | 'en-MW' | 'en-MY' | 'en-NA' | 'en-NF' | 'en-NG' | 'en-NL' | 'en-NR' | 'en-NU' | 'en-NZ' | 'en-PG' | 'en-PH' | 'en-PK' | 'en-PN' | 'en-PR' | 'en-PW' | 'en-RW' | 'en-SB' | 'en-SC' | 'en-SD' | 'en-SE' | 'en-SG' | 'en-SH' | 'en-SI' | 'en-SL' | 'en-SS' | 'en-SX' | 'en-SZ' | 'en-TC' | 'en-TK' | 'en-TO' | 'en-TT' | 'en-TV' | 'en-TZ' | 'en-UG' | 'en-UM' | 'en-US' | 'en-US-POSIX' | 'en-VC' | 'en-VG' | 'en-VI' | 'en-VU' | 'en-WS' | 'en-ZA' | 'en-ZM' | 'en-ZW' | 'eo' | 'eo-001' | 'es' | 'es-419' | 'es-AR' | 'es-BO' | 'es-BR' | 'es-BZ' | 'es-CL' | 'es-CO' | 'es-CR' | 'es-CU' | 'es-DO' | 'es-EA' | 'es-EC' | 'es-ES' | 'es-GQ' | 'es-GT' | 'es-HN' | 'es-IC' | 'es-MX' | 'es-NI' | 'es-PA' | 'es-PE' | 'es-PH' | 'es-PR' | 'es-PY' | 'es-SV' | 'es-US' | 'es-UY' | 'es-VE' | 'et' | 'et-EE' | 'eu' | 'eu-ES' | 'ewo' | 'ewo-CM' | 'fa' | 'fa-AF' | 'fa-IR' | 'ff' | 'ff-Adlm' | 'ff-Adlm-BF' | 'ff-Adlm-CM' | 'ff-Adlm-GH' | 'ff-Adlm-GM' | 'ff-Adlm-GN' | 'ff-Adlm-GW' | 'ff-Adlm-LR' | 'ff-Adlm-MR' | 'ff-Adlm-NE' | 'ff-Adlm-NG' | 'ff-Adlm-SL' | 'ff-Adlm-SN' | 'ff-Latn' | 'ff-Latn-BF' | 'ff-Latn-CM' | 'ff-Latn-GH' | 'ff-Latn-GM' | 'ff-Latn-GN' | 'ff-Latn-GW' | 'ff-Latn-LR' | 'ff-Latn-MR' | 'ff-Latn-NE' | 'ff-Latn-NG' | 'ff-Latn-SL' | 'ff-Latn-SN' | 'fi' | 'fi-FI' | 'fil' | 'fil-PH' | 'fo' | 'fo-DK' | 'fo-FO' | 'fr' | 'fr-BE' | 'fr-BF' | 'fr-BI' | 'fr-BJ' | 'fr-BL' | 'fr-CA' | 'fr-CD' | 'fr-CF' | 'fr-CG' | 'fr-CH' | 'fr-CI' | 'fr-CM' | 'fr-DJ' | 'fr-DZ' | 'fr-FR' | 'fr-GA' | 'fr-GF' | 'fr-GN' | 'fr-GP' | 'fr-GQ' | 'fr-HT' | 'fr-KM' | 'fr-LU' | 'fr-MA' | 'fr-MC' | 'fr-MF' | 'fr-MG' | 'fr-ML' | 'fr-MQ' | 'fr-MR' | 'fr-MU' | 'fr-NC' | 'fr-NE' | 'fr-PF' | 'fr-PM' | 'fr-RE' | 'fr-RW' | 'fr-SC' | 'fr-SN' | 'fr-SY' | 'fr-TD' | 'fr-TG' | 'fr-TN' | 'fr-VU' | 'fr-WF' | 'fr-YT' | 'fur' | 'fur-IT' | 'fy' | 'fy-NL' | 'ga' | 'ga-GB' | 'ga-IE' | 'gd' | 'gd-GB' | 'gl' | 'gl-ES' | 'gsw' | 'gsw-CH' | 'gsw-FR' | 'gsw-LI' | 'gu' | 'gu-IN' | 'guz' | 'guz-KE' | 'gv' | 'gv-IM' | 'ha' | 'ha-GH' | 'ha-NE' | 'ha-NG' | 'haw' | 'haw-US' | 'he' | 'he-IL' | 'hi' | 'hi-IN' | 'hr' | 'hr-BA' | 'hr-HR' | 'hsb' | 'hsb-DE' | 'hu' | 'hu-HU' | 'hy' | 'hy-AM' | 'ia' | 'ia-001' | 'id' | 'id-ID' | 'ig' | 'ig-NG' | 'ii' | 'ii-CN' | 'is' | 'is-IS' | 'it' | 'it-CH' | 'it-IT' | 'it-SM' | 'it-VA' | 'ja' | 'ja-JP' | 'jgo' | 'jgo-CM' | 'jmc' | 'jmc-TZ' | 'jv' | 'jv-ID' | 'ka' | 'ka-GE' | 'kab' | 'kab-DZ' | 'kam' | 'kam-KE' | 'kde' | 'kde-TZ' | 'kea' | 'kea-CV' | 'khq' | 'khq-ML' | 'ki' | 'ki-KE' | 'kk' | 'kk-KZ' | 'kkj' | 'kkj-CM' | 'kl' | 'kl-GL' | 'kln' | 'kln-KE' | 'km' | 'km-KH' | 'kn' | 'kn-IN' | 'ko' | 'ko-KP' | 'ko-KR' | 'kok' | 'kok-IN' | 'ks' | 'ks-Arab' | 'ks-Arab-IN' | 'ksb' | 'ksb-TZ' | 'ksf' | 'ksf-CM' | 'ksh' | 'ksh-DE' | 'ku' | 'ku-TR' | 'kw' | 'kw-GB' | 'ky' | 'ky-KG' | 'lag' | 'lag-TZ' | 'lb' | 'lb-LU' | 'lg' | 'lg-UG' | 'lkt' | 'lkt-US' | 'ln' | 'ln-AO' | 'ln-CD' | 'ln-CF' | 'ln-CG' | 'lo' | 'lo-LA' | 'lrc' | 'lrc-IQ' | 'lrc-IR' | 'lt' | 'lt-LT' | 'lu' | 'lu-CD' | 'luo' | 'luo-KE' | 'luy' | 'luy-KE' | 'lv' | 'lv-LV' | 'mai' | 'mai-IN' | 'mas' | 'mas-KE' | 'mas-TZ' | 'mer' | 'mer-KE' | 'mfe' | 'mfe-MU' | 'mg' | 'mg-MG' | 'mgh' | 'mgh-MZ' | 'mgo' | 'mgo-CM' | 'mi' | 'mi-NZ' | 'mk' | 'mk-MK' | 'ml' | 'ml-IN' | 'mn' | 'mn-MN' | 'mni' | 'mni-Beng' | 'mni-Beng-IN' | 'mr' | 'mr-IN' | 'ms' | 'ms-BN' | 'ms-ID' | 'ms-MY' | 'ms-SG' | 'mt' | 'mt-MT' | 'mua' | 'mua-CM' | 'my' | 'my-MM' | 'mzn' | 'mzn-IR' | 'naq' | 'naq-NA' | 'nb' | 'nb-NO' | 'nb-SJ' | 'nd' | 'nd-ZW' | 'nds' | 'nds-DE' | 'nds-NL' | 'ne' | 'ne-IN' | 'ne-NP' | 'nl' | 'nl-AW' | 'nl-BE' | 'nl-BQ' | 'nl-CW' | 'nl-NL' | 'nl-SR' | 'nl-SX' | 'nmg' | 'nmg-CM' | 'nn' | 'nn-NO' | 'nnh' | 'nnh-CM' | 'nus' | 'nus-SS' | 'nyn' | 'nyn-UG' | 'om' | 'om-ET' | 'om-KE' | 'or' | 'or-IN' | 'os' | 'os-GE' | 'os-RU' | 'pa' | 'pa-Arab' | 'pa-Arab-PK' | 'pa-Guru' | 'pa-Guru-IN' | 'pcm' | 'pcm-NG' | 'pl' | 'pl-PL' | 'prg' | 'prg-001' | 'ps' | 'ps-AF' | 'ps-PK' | 'pt' | 'pt-AO' | 'pt-BR' | 'pt-CH' | 'pt-CV' | 'pt-GQ' | 'pt-GW' | 'pt-LU' | 'pt-MO' | 'pt-MZ' | 'pt-PT' | 'pt-ST' | 'pt-TL' | 'qu' | 'qu-BO' | 'qu-EC' | 'qu-PE' | 'rm' | 'rm-CH' | 'rn' | 'rn-BI' | 'ro' | 'ro-MD' | 'ro-RO' | 'rof' | 'rof-TZ' | 'root' | 'ru' | 'ru-BY' | 'ru-KG' | 'ru-KZ' | 'ru-MD' | 'ru-RU' | 'ru-UA' | 'rw' | 'rw-RW' | 'rwk' | 'rwk-TZ' | 'sah' | 'sah-RU' | 'saq' | 'saq-KE' | 'sat' | 'sat-Olck' | 'sat-Olck-IN' | 'sbp' | 'sbp-TZ' | 'sd' | 'sd-Arab' | 'sd-Arab-PK' | 'sd-Deva' | 'sd-Deva-IN' | 'se' | 'se-FI' | 'se-NO' | 'se-SE' | 'seh' | 'seh-MZ' | 'ses' | 'ses-ML' | 'sg' | 'sg-CF' | 'shi' | 'shi-Latn' | 'shi-Latn-MA' | 'shi-Tfng' | 'shi-Tfng-MA' | 'si' | 'si-LK' | 'sk' | 'sk-SK' | 'sl' | 'sl-SI' | 'smn' | 'smn-FI' | 'sn' | 'sn-ZW' | 'so' | 'so-DJ' | 'so-ET' | 'so-KE' | 'so-SO' | 'sq' | 'sq-AL' | 'sq-MK' | 'sq-XK' | 'sr' | 'sr-Cyrl' | 'sr-Cyrl-BA' | 'sr-Cyrl-ME' | 'sr-Cyrl-RS' | 'sr-Cyrl-XK' | 'sr-Latn' | 'sr-Latn-BA' | 'sr-Latn-ME' | 'sr-Latn-RS' | 'sr-Latn-XK' | 'su' | 'su-Latn' | 'su-Latn-ID' | 'sv' | 'sv-AX' | 'sv-FI' | 'sv-SE' | 'sw' | 'sw-CD' | 'sw-KE' | 'sw-TZ' | 'sw-UG' | 'ta' | 'ta-IN' | 'ta-LK' | 'ta-MY' | 'ta-SG' | 'te' | 'te-IN' | 'teo' | 'teo-KE' | 'teo-UG' | 'tg' | 'tg-TJ' | 'th' | 'th-TH' | 'ti' | 'ti-ER' | 'ti-ET' | 'tk' | 'tk-TM' | 'to' | 'to-TO' | 'tr' | 'tr-CY' | 'tr-TR' | 'tt' | 'tt-RU' | 'twq' | 'twq-NE' | 'tzm' | 'tzm-MA' | 'ug' | 'ug-CN' | 'uk' | 'uk-UA' | 'ur' | 'ur-IN' | 'ur-PK' | 'uz' | 'uz-Arab' | 'uz-Arab-AF' | 'uz-Cyrl' | 'uz-Cyrl-UZ' | 'uz-Latn' | 'uz-Latn-UZ' | 'vai' | 'vai-Latn' | 'vai-Latn-LR' | 'vai-Vaii' | 'vai-Vaii-LR' | 'vi' | 'vi-VN' | 'vo' | 'vo-001' | 'vun' | 'vun-TZ' | 'wae' | 'wae-CH' | 'wo' | 'wo-SN' | 'xh' | 'xh-ZA' | 'xog' | 'xog-UG' | 'yav' | 'yav-CM' | 'yi' | 'yi-001' | 'yo' | 'yo-BJ' | 'yo-NG' | 'yue' | 'yue-Hans' | 'yue-Hans-CN' | 'yue-Hant' | 'yue-Hant-HK' | 'zgh' | 'zgh-MA' | 'zh' | 'zh-Hans' | 'zh-Hans-CN' | 'zh-Hans-HK' | 'zh-Hans-MO' | 'zh-Hans-SG' | 'zh-Hant' | 'zh-Hant-HK' | 'zh-Hant-MO' | 'zh-Hant-TW' | 'zu' | string;

		/**
		* URL of the user’s profile photo. The photo can be in .jpeg or .svg formats. Only returned for Web Apps launched from the attachment menu.
		*/
		photo_url?: string;
	}

	export interface WebAppChat {
		id: number;
		type: 'group' | 'supergroup' | 'channel';
		title: string;
		username?: string;
		photo_url?: string;      
	}
	
	export interface MainButton {
		text: string;
		color: string;
		textColor: string;
		isVisible: boolean;
		isActive: boolean;
		isProgressVisible: boolean;
		setText: (text: string) => MainButton;
		onClick: (callback: () => void) => MainButton;
		offClick: (callback: () => void) => MainButton;
		show: () => MainButton;
		hide: () => MainButton;
		enable: () => MainButton;
		disable: () => MainButton;
		showProgress: (leaveActive?: boolean) => MainButton;
		hideProgress: () => MainButton;
		setParams: (params: MainButtonParams) => MainButton;
	
	}

	export interface MainButtonParams {
		text?: string;
		color?: string;
		text_color?: string;
		is_active?: boolean;
		is_visible?: boolean;
	}

	export interface BackButton {
		/**
		 * Shows whether the button is visible. Set to false by default.
		 */
		isVisible: boolean;

		/**
		 * A method that sets the button press event handler. An alias for Telegram.WebApp.onEvent('mainButtonClicked', callback)
		 */
		onClick(callback: Function): BackButton;

		offClick(callback: Function): BackButton;

		/**
		 * A method to make the button visible.
		 */
		show(): BackButton;

		/**
		 * A method to hide the button.
		 */
		hide(): BackButton;

	}

	export interface HapticFeedback {

		impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
		notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
		selectionChanged: () => void;

	}


}