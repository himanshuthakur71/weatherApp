<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

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

	let userTime = $state(new Date());

	// Update user time every second
	let interval: any;
	onMount(() => {
		interval = setInterval(() => {
			userTime = new Date();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="card mx-auto my-6 max-w-md bg-base-200 p-6 shadow-xl">
	<div class="mb-4 flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
			<p class="text-sm text-gray-500">Lat: {weather.coord.lat} | Lon: {weather.coord.lon}</p>
			<p class="text-sm text-gray-500">Local Time: {userTime.toLocaleTimeString()}</p>
		</div>
		<div class="text-5xl">{getWeatherIcon(weather.weather[0].main, weather.sys.sunset)}</div>
	</div>

	<div class="mb-4">
		<p class="text-xl font-semibold">{weather.main.temp}°C</p>
		<p class="text-gray-500">Feels like: {weather.main.feels_like}°C</p>
		<p class="capitalize">{weather.weather[0].description}</p>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div class="rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Sunrise</p>
			<p>{formatTime(weather.sys.sunrise)}</p>
		</div>
		<div class="rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Sunset</p>
			<p>{formatTime(weather.sys.sunset)}</p>
		</div>
		<div class="rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Wind</p>
			<p>{weather.wind.speed} m/s, {weather.wind.deg}°</p>
		</div>
		<div class="rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Humidity</p>
			<p>{weather.main.humidity}%</p>
		</div>
		<div class="rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Pressure</p>
			<p>{weather.main.pressure} hPa</p>
		</div>
		<div class="rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Visibility</p>
			<p>{weather.visibility / 1000} km</p>
		</div>
		<div class="rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Clouds</p>
			<p>{weather.clouds.all}%</p>
		</div>
		<div class="rounded-lg bg-base-100 p-2 shadow-sm">
			<p class="font-semibold">Temperature Range</p>
			<p>{weather.main.temp_min}°C - {weather.main.temp_max}°C</p>
		</div>
	</div>
</div>

<style>
	.card p {
		line-height: 1.2;
	}
</style>
