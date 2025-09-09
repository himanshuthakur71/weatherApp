import { browser } from "$app/environment";

export function initTheme() {
	if (!browser) return;

	const setTheme = () => {
		let theme = localStorage.getItem("theme");

		// Auto-select if no saved theme
		if (!theme) {
			const hour = new Date().getHours();
			theme = hour >= 6 && hour < 18 ? "bumblebee" : "halloween";
		}

		document.documentElement.setAttribute("data-theme", theme);
		sessionStorage.setItem("theme", theme); // for faster refresh
	};

	setTheme();

	const interval = setInterval(setTheme, 60 * 1000);
	return () => clearInterval(interval);
}
