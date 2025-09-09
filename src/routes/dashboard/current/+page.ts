import { browser } from "$app/environment";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch}) => {
    let weatherData = null;
    if (browser) {
        try {
            // ✅ Get geolocation only on client
            const position = await new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            const { latitude, longitude } = position.coords;

            // Fetch weather from server route
            const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
            weatherData = await res.json();
        } catch (err) {
            console.error("Failed to get location or weather:", err);
        }
    } else {
        // Server-side fallback
        weatherData = null; // or provide default lat/lon if you want
    }

    return{
        weatherData
    }
};
