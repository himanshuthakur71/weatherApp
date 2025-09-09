import { json } from '@sveltejs/kit';
import { PUBLIC_OPENWEATHER_KEY } from '$env/static/public'

export async function GET({ url, fetch }) {
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${PUBLIC_OPENWEATHER_KEY}&units=metric`
    );
    const data = await res.json();

    return json(data);
}