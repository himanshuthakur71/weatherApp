<script lang="ts">
	import { formatDateTime } from '$lib/helpers/formatDate';
	import { countries } from '$lib/json/countries.json';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let { weather } = $props();

	// Convert UNIX timestamp to local time string
	const formatTime = (ts: number) =>
		new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	const getCountryName = (code: string): string => {
		return countries.find((country) => country.code === code)?.name ?? code;
	};

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

	let showWeatherIcon = $state(false);

	onMount(() => {
		setTimeout(() => (showWeatherIcon = true), 700);
	});
</script>

<div class="w-full bg-base-200 p-6 shadow-xl">
	{#if weather?.created_at}
		<p class=" mb-1 badge !bg-white badge-sm">{formatDateTime(weather.created_at)}</p>
	{/if}
	<div class="relative mb-4 flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold">{weather.name}, {getCountryName(weather.sys.country)}</h2>
			<p class="text-sm text-gray-500">Lat: {weather.coord.lat} | Lon: {weather.coord.lon}</p>
		</div>

		{#if showWeatherIcon}
			<div
				class="absolute top-[-40px] right-[-30px] text-[60px] md:text-[160px] lg:top-[-140px] lg:right-[-100px]"
				in:fly={{ y: -300, duration: 500 }}
			>
				{getWeatherIcon(weather.weather[0].main, weather.sys.sunset)}
			</div>
		{/if}
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
