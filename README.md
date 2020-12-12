# keez

Frictionless hotkey handling for browsers.

## Usage

```js
import { captureKeys } from "keez";

const saveCommand = captureKeys("CmdOrCtrl", "S");
const italicCommand = captureKeys("CmdOrCtrl", "I");

document.addEventListener("keydown", (event) => {
  if (saveCommand(event)) {
    /* Do something, e.g. call `fetch` */
  } else if (italicCommand(event)) {
    /* Do something else, e.g. format selected text */
  }
});
```

## Features

- `CmdOrCtrl` modifier for interoperability between operating systems
- Supports synthetic events (e.g. for [React](https://reactjs.org/) elements)
- Calls `event.preventDefault()` when a match is found, suppressing handlers of the underlying browser (or even the system)
- TypeScript-based code completion for common modifier keys
- Low overhead, compared to similar libraries

## Browser support

[Every browser with the `Set` built-in](https://caniuse.com/mdn-javascript_builtins_set) is supported out of the box.

## Implementation details

There are quite a few attributes to handle keystrokes with:

|                                          | Layout-aware | Modifier-independent | Supports all events | Named non-printables |
| ---------------------------------------- | :----------: | :------------------: | :-----------------: | :------------------: |
| `key`                                    |      ✓       |          ✗           |          ✓          |        **✓**         |
| `code`                                   |      ✗       |          ✓           |          ✓          |          ✓           |
| `keyCode`&nbsp;/&nbsp;`which` _(legacy)_ |    **✓**     |        **✓**         |        **✓**        |          ✗           |
| `charCode` _(legacy)_                    |      ✓       |          ✓           |          ✗          |          ✗           |

Despite being a legacy attribute, `keyCode` is used in comparisons by default. It’s independent from modifiers, unlike the modern `key` alternative.

However, when it comes to [named key attribute values](https://www.w3.org/TR/uievents-key/#named-key-attribute-values) (e.g. `Escape` or `Backspace`), the `key` property is used under the hood.
