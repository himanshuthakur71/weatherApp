<script lang="ts">
	import { onMount } from 'svelte';

	let loading = $state(true);
	let error: string | null = $state(null);

	const getCurrentWeather = async () => {
		loading = true;
		try {
			// Get geolocation
			const position = await new Promise<GeolocationPosition>((resolve, reject) =>
				navigator.geolocation.getCurrentPosition(resolve, reject)
			);
			const { latitude, longitude } = position.coords;

			// Fetch weather from server route
			const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
			const weatherData = await res.json();

			// console.log(resweatherDatadata)

			if (weatherData?.name) {
				// Fire background-like tasks (non-blocking)
				queueMicrotask(async () => {});
			}
		} catch (err: any) {
			console.error(err);
			error = err.message || 'Failed to fetch weather.';
		} finally {
			loading = false;
		}
	};

	onMount(async () => {
		getCurrentWeather();
	});
</script>

<section>
	<div class="hms-container">
		<div class="w-full">
			{#if loading}
				<div class="mt-10 text-center">Loading current weather...</div>
			{:else if error}
				<div class="mt-10 text-center text-red-500">{error}</div>
			{:else}
				<div class="w-full">
					<!-- {#await weather}
						<p>Loading...</p>
					{:then w}
						<h2 class="text-2xl font-bold">{w.city}, {w.country}</h2>
						<div class="text-6xl">{getWeatherIcon(w.condition, w.icon, w.sunset)}</div>
						<p class="text-xl">{w.description}</p>
						<p class="text-lg">Temperature: {w.temp}°C (Feels like: {w.feels_like}°C)</p>
						<p>🌅 Sunrise: {formatTime(w.sunrise)} | 🌇 Sunset: {formatTime(w.sunset)}</p>
					{/await} -->
				</div>
			{/if}
		</div>
	</div>
</section>
