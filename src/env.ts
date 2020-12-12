export const __BROWSER__ = typeof document !== "undefined";
export const __APPLE_OS__ =
	__BROWSER__ && /^(Mac|iPhone|iPad|iPod)/.test(navigator.platform);
