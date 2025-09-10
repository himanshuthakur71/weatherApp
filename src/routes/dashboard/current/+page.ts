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
            let resWeather = await res.json();

            if (resWeather) {

                const payload = {
                    user_id: user?.id || '',
                    name: resWeather?.name || '',
                    sys: resWeather?.sys || null,
                    coord: resWeather?.coord || null,
                    weather: resWeather?.weather || null,
                    main: resWeather?.main || null,
                    wind: resWeather?.wind || null,
                    visibility: resWeather?.visibility || null,
                    clouds: resWeather?.clouds || null,
                    auth_user_id: user?.id || '',
                }

                // save data tp supabase
                const { data: w_data, error: w_err } = await supabase
                    .from('weathers')
                    .insert([
                        payload,
                    ]).select().single();


                weatherData = w_data
            }



        } catch (err) {
            console.error("Failed to get location or weather:", err);
        }
    }

    return {
        weatherData
    }
};
