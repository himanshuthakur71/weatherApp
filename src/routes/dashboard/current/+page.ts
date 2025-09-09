import { browser } from "$app/environment";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, parent }) => {

    // call parent() to get subabase client
    const { supabase, user } = await parent()


    let weatherData = null;
    if (browser) {
        try {
            // Get geolocation only on client
            const position = await new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );
            const { latitude, longitude } = position.coords;

            // Fetch weather from server route
            const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
            weatherData = await res.json();

            if (weatherData) {

                const payload = {
                    user_id: user?.id || '',
                    name: weatherData?.name || '',
                    sys: weatherData?.sys || null,
                    coord: weatherData?.coord || null,
                    weather: weatherData?.weather || null,
                    main: weatherData?.main || null,
                    wind: weatherData?.wind || null,
                    visibility: weatherData?.visibility || null,
                    clouds: weatherData?.clouds || null,
                    auth_user_id: user?.id || '',
                }

                // save data tp supabase
                const { data: w_data, error: w_err } = await supabase
                    .from('weathers')
                    .insert([
                        payload,
                    ])
            }

        } catch (err) {
            console.error("Failed to get location or weather:", err);
        }
    } else {
        // Server-side fallback
        weatherData = null; // or provide default lat/lon if you want
    }

    return {
        weatherData
    }
};
