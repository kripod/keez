import { __APPLE_OS__ } from "./env";

type ModifierKey = "CmdOrCtrl" | "Ctrl" | "Meta" | "Alt" | "Shift";

// Support synthetic event systems by requiring only a subset of the properties
type KeyboardEventBase = Pick<
	KeyboardEvent,
	| "key"
	| "keyCode"
	| "ctrlKey"
	| "metaKey"
	| "altKey"
	| "shiftKey"
	| "preventDefault"
>;

export function captureKeys(
	...keys: [
		modifierKey: ModifierKey,
		...restKeys: Array<string & (ModifierKey | {})>
	]
): (event: KeyboardEventBase) => boolean {
	const setOfKeys = new Set(keys);
	const expectsCtrlKey =
		setOfKeys.delete("Ctrl") ||
		(!__APPLE_OS__ && setOfKeys.delete("CmdOrCtrl"));
	const expectsMetaKey =
		setOfKeys.delete("Meta") || (__APPLE_OS__ && setOfKeys.delete("CmdOrCtrl"));
	const expectsShiftKey = setOfKeys.delete("Shift");
	const expectsAltKey = setOfKeys.delete("Alt");
	const expectedKey =
		setOfKeys.size === 1 ? setOfKeys.values().next().value.toUpperCase() : null;

	return (event) => {
		if (
			event.ctrlKey !== expectsCtrlKey ||
			event.metaKey !== expectsMetaKey ||
			event.shiftKey !== expectsShiftKey ||
			event.altKey !== expectsAltKey ||
			(event.key.length > 1 // Prevent modifier key effects on characters
				? event.key // Use named key attribute value of non-alphanumeric keys
				: String.fromCharCode(event.keyCode).toUpperCase()) !== expectedKey
		) {
			return false;
		}

		event.preventDefault();
		return true;
	};
}
