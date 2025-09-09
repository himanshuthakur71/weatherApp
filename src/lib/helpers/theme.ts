import { browser } from "$app/environment";

export function initTheme() {
  if (!browser) return; // Only run in browser

  const setTheme = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 18) {
      document.documentElement.setAttribute("data-theme", "bumblebee");
    } else {
      document.documentElement.setAttribute("data-theme", "halloween");
    }
  };

  setTheme(); // Initial theme

  // Optional: update every minute to handle transitions automatically
  const interval = setInterval(setTheme, 60 * 1000);

  return () => clearInterval(interval); // Return cleanup function
}
