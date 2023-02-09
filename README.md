# @kloktunov/react-telegram-webapp

The `@kloktunov/react-telegram-webapp` library provides a set of tools and components for building Telegram Web Apps using React.

## Installation

To install, simply run:
```bash
npm install --save @kloktunov/react-telegram-webapp
```

or

```bash
yarn add @kloktunov/react-telegram-webapp
```

## Usage
To use the library, simply wrap your root component with the `TelegramWebApp` component:

```tsx
import React from "react";
import { TelegramWebApp } from "@kloktunov/react-telegram-webapp";

const App = () => {
  return (
    <TelegramWebApp>
      Hello Telegram WebApps!
    </TelegramWebApp>
  );
};

export default App;
```
## Components

### `TelegramWebApp`
This is the main component of the library. It should be used as a top-level component in your web app. He is provides the context for other components and hooks to work properly.


#### Example
```tsx
import React from "react";
import { TelegramWebApp } from "@kloktunov/react-telegram-webapp";

const App = () => {
  return (
    <TelegramWebApp>
      Hello Telegram WebApps!
    </TelegramWebApp>
  );
};

export default App;
```
---
### `WebAppBackButton`
The component allows you to show/hide `BackButton` and configure the click handler.


#### Example
```tsx
import { useState } from "react";
import { TelegramWebApp, WebAppBackButton } from "@kloktunov/react-telegram-webapp";

const App = () => {

  const [show, setShow] = useState(false);
  const toggleBackButton = () => setShow(!show);

  const onClick = () => {
    console.log("Back button was clicked!");
  }

  return (
    <TelegramWebApp>

      <button onClick={toggleBackButton}>Show/hide Back Button</button>

      { show && <WebAppBackButton onClick={onClick} /> }

    </TelegramWebApp>
  );
};

export default App;
```

#### Props
| Property      | Type          | Default | Description |
| ------------- | ------------- | ------- | ----------- |
| onClick       | () => void    |         | Callback function to be called when the button is clicked |
---
### `WebAppMainButton`
The component allows you to show/hide `MainButton`, set the text, set the color and color of the text, show/hide the progress and configure the click handler.


#### Example
```tsx
import { useState } from "react";
import { TelegramWebApp, WebAppMainButton } from "@kloktunov/react-telegram-webapp";

const App = () => {

  const [show, setShow] = useState(false);
  const toggleMainButton = () => setShow(!show);

  const onClick = () => {
    console.log("Main button was clicked!");
  }

  return (
    <TelegramWebApp>

      <button onClick={toggleMainButton}>Show/hide Main Button</button>

      { show && <WebAppMainButton text={"Main button"} onClick={onClick} /> }

    </TelegramWebApp>
  );
};

export default App;
```

#### Props
| Property      | Type          | Default | Description |
| ------------- | ------------- | ------- | ----------- |
| text          | string        | 'CONTINUE' | Text displayed on the main button |
| progress      | boolean       | false   | Show or hide the loading spinner |
| disable       | boolean       | false   | Enable or disable the button |
| onClick       | () => void    |         | Callback function to be called when the button is clicked |
| color         | string        |         | Background color of the button |
| textColor     | string        |         | Text color of the button |


## Hooks
### `useTelegramWebApp`
This hook provides access to the Telegram WebApps context. It returns the instance of the Telegram WebApp.


#### Example
```tsx
import { useTelegramWebApp } from '@kloktunov/react-telegram-webapp';

const Component = () => {
  const webApp = useTelegramWebApp();

  return <div>{webApp?.version}</div>;
};

export default Component;
```
---
### `useIsWebAppReady`
This hook returns a boolean indicating whether the Telegram WebApp is ready.

#### Example
```tsx
import { useIsWebAppReady } from '@kloktunov/react-telegram-webapp';

const Component = () => {
  const isReady = useIsWebAppReady();

  return <div>{isReady ? "App is ready" : "Loading..."}</div>;
};

export default Component;
```
---
### `useWebAppInitDataUnsafe`
This hook returns Telegram WebApp initialization data

#### Example
```tsx
import { useWebAppInitDataUnsafe } from '@kloktunov/react-telegram-webapp';

const Component = () => {
  const initDataUnsafe = useWebAppInitDataUnsafe();

  return <div>{JSON.stringify(initDataUnsafe)}</div>;
};

export default Component;
```
---
### `useWebAppUser`
This hook provides access to the current user in the Telegram WebApp. The returned user object contains information about the user

#### Example
```tsx
import { useWebAppUser } from '@kloktunov/react-telegram-webapp';

const Component = () => {
  const user = useWebAppUser();

  return (
    <div>Your user ID is: {user?.id}</div>
  );
};

export default Component;
```
---
### `useWebAppChat`
This hook provides access to the current chat in the Telegram WebApp. An object containing data about the chat where the bot was launched via the attachment menu. Returned for supergroups, channels and group chats – only for Web Apps launched via the attachment menu.

#### Example
```tsx
import { useWebAppChat } from '@kloktunov/react-telegram-webapp';

const Component = () => {
  const chat = useWebAppChat();

  return (
    <div>Your chat ID is: {chat?.id}</div>
  );
};

export default Component;
```
---
### `useWebAppTheme`
The hook provides access to the Telegram WebApp theme, which includes the current color scheme and theme parameters.

#### Example
```tsx
import { useWebAppTheme } from '@kloktunov/react-telegram-webapp';

const Component = () => {
  const { colorScheme, themeParams } = useWebAppTheme();

  return (
    <div>
        Color Scheme: {colorScheme}
        <br />
        Theme Params: {JSON.stringify(themeParams)}
    </div>
  );
};

export default Component;
```

#### `themeParams` params
| Property | Type | Description | CSS Variable |
|----------|------|-------------|-------------|
| bg_color | string | Background color in the #RRGGBB format. | `var(--tg-theme-bg-color)` |
| text_color | string | Main text color in the #RRGGBB format. | `var(--tg-theme-text-color)` |
| hint_color | string | Hint text color in the #RRGGBB format. | `var(--tg-theme-hint-color)` |
| link_color | string | Link color in the #RRGGBB format. | `var(--tg-theme-link-color)` |
| button_color | string | Button color in the #RRGGBB format. | `var(--tg-theme-button-color)` |
| button_text_color | string | Button text color in the #RRGGBB format. | `var(--tg-theme-button-text-color)` |
| secondary_bg_color | string | Secondary background color in the #RRGGBB format. | `var(--tg-theme-secondary-bg-color)` |
---
### `useWebAppViewport`
This hook provides access to viewport height properties and viewport height state stability in the Telegram WebApp context.

#### Example
```tsx
import { useWebAppViewport } from '@kloktunov/react-telegram-webapp';

const Component = () => {
  const { viewportHeight, isStateStable } = useWebAppViewport();

  return (
    <div>
        height: {viewportHeight}
        <br />
        isStateStable: {isStateStable ? "stable" : "changing"}
    </div>
  );
};

export default Component;
```
---
### `useWebAppShowPopup`
The hook allows for showing a popup within the Telegram WebApp.

#### Example
```tsx
import { useWebAppShowPopup } from '@kloktunov/react-telegram-webapp';

const Component = () => {

    const showPopup = useWebAppShowPopup();

    const handleShowPopup = async () => {

        const result = await showPopup({
            title: 'Popup Title',
            message: 'Poup Message',
            buttons: [
                {
                    id: 'button_1',
                    type: "ok",
                    text: 'Button 1',
                },
                {
                    id: 'button_2',
                    type: "close",
                    text: 'Button 2',
                },
                {
                    id: 'button_3',
                    type: "destructive",
                    text: 'Button 3',
                },
            ]
        });

        console.log("Clicked button id:", result);
   
    }

    return (
        <div>
            <button onClick={handleShowPopup}>Show Popup</button>
        </div>
    );

};

export default Component;
```
---
### `useWebAppShowConfirm`
The hook provides a way to show a confirmation dialog with a message in a Telegram WebApp

#### Example
```tsx
import { useWebAppShowConfirm } from '@kloktunov/react-telegram-webapp';

const Component = () => {

    const showConfirm = useWebAppShowConfirm();

    const handleShowConfirm = async () => {

        const result = await showConfirm("Do you sure?");

        console.log(result); // true or false
   
    }

    return (
        <div>
            <button onClick={handleShowConfirm}>Show confirm</button>
        </div>
    );

};

export default Component;
```
---
### `useWebAppScanQrPopup`
This hook provides an interface to show and close the scan QR popup in a Telegram WebApp.

#### Example
```tsx
import { useWebAppScanQrPopup } from '@kloktunov/react-telegram-webapp';

const Component = () => {

    const { showScanQrPopup, closeScanQrPopup } = useWebAppScanQrPopup();

    const handleShowScanQrPopup = async () => {

        // Close scanner after 3 sec
        setTimeout(() => {
            closeScanQrPopup();
        }, 3000);

        const result = await showScanQrPopup({
            text: "Scan our QR code"
        });

        console.log(result); // result of scan
   
    }

    return (
        <div>
            <button onClick={handleShowScanQrPopup}>Show QR scanner</button>
        </div>
    );

};

export default Component;
```
---
### `useWebAppClosingConfirmation`
This hook is used to manage the closing confirmation for a Telegram WebApp. The closing confirmation is a dialog box that appears when a user tries to close the Telegram WebApp.

#### Example
```tsx
import { useWebAppClosingConfirmation } from '@kloktunov/react-telegram-webapp';

const Component = () => {

    const { isClosingConfirmationEnabled, setIsClosingConfirmationEnabled } = useWebAppClosingConfirmation();

    const toggleClosingConfirmation = async () => {
        setIsClosingConfirmationEnabled(!isClosingConfirmationEnabled);   
    }

    return (
        <div>
            Confirmation { isClosingConfirmationEnabled ? "enabled" : "disabled" }
            <br />
            <button onClick={toggleClosingConfirmation}>Toggle closing confirmation</button>
        </div>
    );

};

export default Component;
```
---
### `useWebAppIsExpanded`
This hook provides information and methods to interact with the state of the Telegram WebApp expanded view.

#### Example
```tsx
import { useWebAppIsExpanded } from '@kloktunov/react-telegram-webapp';

const Component = () => {

    const { isExpanded, expand } = useWebAppIsExpanded();

    return (
        <div>
            { isExpanded ? "Expanded" : "Collapsed" }
            <br />
            <button onClick={expand}>Expand</button>
        </div>
    );

};

export default Component;
```
---
### `useWebAppHapticFeedback`
This hook provides access to haptic feedback methods

#### Example
```tsx
import { useWebAppHapticFeedback } from '@kloktunov/react-telegram-webapp';

const Component = () => {

    const { impactOccurred, notificationOccurred, selectionChanged } = useWebAppHapticFeedback();

    return (
        <div>

            <button onClick={ () => selectionChanged() }>selectionChanged</button>

            <button onClick={ () => notificationOccurred("success") }>notificationOccurred - success</button>
            <button onClick={ () => notificationOccurred("warning") }>notificationOccurred - warning</button>
            <button onClick={ () => notificationOccurred("error") }  >notificationOccurred - error</button>

            <button onClick={ () => impactOccurred("soft") }  >impactOccurred - soft</button>
            <button onClick={ () => impactOccurred("light") } >impactOccurred - light</button>
            <button onClick={ () => impactOccurred("medium") }>impactOccurred - medium</button>
            <button onClick={ () => impactOccurred("rigid") } >impactOccurred - rigid</button>
            <button onClick={ () => impactOccurred("heavy") } >impactOccurred - heavy</button>

        </div>
    );

};

export default Component;
```
---
### `useWebAppStartParam`
This hook provides access to the `start_param` parameter, which is passed in the `tgWebAppStartParam` GET parameter in the Telegram WebApp.

#### Example
```tsx
import { useWebAppStartParam } from '@kloktunov/react-telegram-webapp';

const Component = () => {

    const startParam = useWebAppStartParam();

    return (
        <div>
            { startParam }
        </div>
    );

};

export default Component;
```