<script lang="ts">
	let { weather } = $props();

	// Convert UNIX timestamp to local time string
	const formatTime = (ts: number) =>
		new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	// Determine icon for day/night
	const getWeatherIcon = (main: string, sunset: number) => {
		const now = Date.now() / 1000;
		if (main === 'Clear' && now >= sunset) return '🌙';
		if (main === 'Clear') return '☀️';
		if (main.includes('Cloud')) return '☁️';
		if (main.includes('Rain')) return '🌧️';
		if (main.includes('Storm')) return '⛈️';
		return '🌤️';
	};
</script>

<div class="my-6 mt-16 w-full bg-base-200 p-6 shadow-xl">
	<div class="mb-4 flex items-center justify-between relative">
		<div>
			<h2 class="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
			<p class="text-sm text-gray-500">Lat: {weather.coord.lat} | Lon: {weather.coord.lon}</p>
		</div>
		<div class="text-[160px] absolute right-[-100px]  top-[-140px]">{getWeatherIcon(weather.weather[0].main, weather.sys.sunset)}</div>
	</div>

	<div class="mb-4">
		<p class="text-xl font-semibold">{weather.main.temp}°C</p>
		<p class="text-gray-500">Feels like: {weather.main.feels_like}°C</p>
		<p class="capitalize">{weather.weather[0].description}</p>
	</div>

	<div class=" flex flex-wrap gap-4">
		<div class="w-full max-w-[180px] rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Sunrise</p>
			<p>{formatTime(weather.sys.sunrise)}</p>
		</div>
		<div class="w-full max-w-[180px] rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Sunset</p>
			<p>{formatTime(weather.sys.sunset)}</p>
		</div>
		<div class="w-full max-w-[180px] rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Wind</p>
			<p>{weather.wind.speed} m/s, {weather.wind.deg}°</p>
		</div>
		<div class="w-full max-w-[180px] rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Humidity</p>
			<p>{weather.main.humidity}%</p>
		</div>
		<div class="w-full max-w-[180px] rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Pressure</p>
			<p>{weather.main.pressure} hPa</p>
		</div>
		<div class="w-full max-w-[180px] rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Visibility</p>
			<p>{weather.visibility / 1000} km</p>
		</div>
		<div class="w-full max-w-[180px] rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Clouds</p>
			<p>{weather.clouds.all}%</p>
		</div>
		<div class="w-full max-w-[180px] rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Temperature Range</p>
			<p>{weather.main.temp_min}°C - {weather.main.temp_max}°C</p>
		</div>
	</div>
</div>


