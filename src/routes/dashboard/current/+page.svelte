<script lang="ts">
	import { weatherStore } from '$lib/stores/weather.svelte';
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
				// Clear existing attributes
				weatherStore.attributes = [];

				// Add current weather attributes
				weatherStore.add({ key: 'city', value: weatherData.name });
				weatherStore.add({ key: 'country', value: weatherData.sys.country });
				weatherStore.add({ key: 'temp', value: weatherData.main.temp });
				weatherStore.add({ key: 'feels_like', value: weatherData.main.feels_like });
				weatherStore.add({ key: 'condition', value: weatherData.weather[0].main });
				weatherStore.add({ key: 'description', value: weatherData.weather[0].description });
				weatherStore.add({ key: 'icon', value: weatherData.weather[0].icon });
				weatherStore.add({ key: 'sunrise', value: weatherData.sys.sunrise });
				weatherStore.add({ key: 'sunset', value: weatherData.sys.sunset });

				weatherStore.touch(); // refresh reactive store
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
					<h2>{weatherStore.get('city')}, {weatherStore.get('country')}</h2>
					<p>Temp: {weatherStore.get('temp')}°C</p>
					<p>Feels Like: {weatherStore.get('feels_like')}°C</p>
					<p>Condition: {weatherStore.get('description')}</p>
				</div>
			{/if}
		</div>
	</div>
</section>
