<script lang="ts">
	import { formatDateTime } from '$lib/helpers/formatDate';
	import DeleteReport from '$lib/modals/DeleteReport.svelte';
	import SendEmail from '$lib/modals/SendEmail.svelte';
	import { countries } from '$lib/json/countries.json';
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';

	let { weather, index }: { weather: any; index: number } = $props();

	// console.log(weather)

	const getCountryName = (code: string): string => {
		return countries.find((country) => country.code === code)?.name ?? code;
	};

	const getWeatherIcon = (main: string, sunset: number) => {
		const now = Date.now() / 1000;
		if (main === 'Clear' && now >= sunset) return '🌙';
		if (main === 'Clear') return '☀️';
		if (main.includes('Cloud')) return '☁️';
		if (main.includes('Rain')) return '🌧️';
		if (main.includes('Storm')) return '⛈️';
		return '🌤️';
	};

	let deleteModal = $state(false);

	const closeDeleteModal = () => {
		deleteModal = false;
	};

	let emailModal = $state(false);

	const closeEmailModal = () => {
		emailModal = false;
	};

	let showCard = $state(false);

	onMount(() => {
		setTimeout(() => (showCard = true), (600 * index) / 2);
	});
</script>

{#if showCard}
<div class=" w-full bg-base-200 p-4 shadow" in:scale>
	<p class=" mb-1 badge !bg-white badge-sm">{formatDateTime(weather.created_at)}</p>
	<div class="relative mb-4 flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold">{weather.name}, {getCountryName(weather.sys.country)}</h2>
			<p class="text-sm text-gray-500">Lat: {weather.coord.lat} | Lon: {weather.coord.lon}</p>
		</div>

		<div class="absolute top-[-10px] right-[-10px] text-[40px]" in:fly={{ y: -300, duration: 500 }}>
			{getWeatherIcon(weather.weather[0].main, weather.sys.sunset)}
		</div>
	</div>

	<div class="mb-4">
		<p class="text-xl font-semibold">{weather.main.temp}°C</p>
		<p class="text-gray-500">Feels like: {weather.main.feels_like}°C</p>
		<p class="capitalize">{weather.weather[0].description}</p>
	</div>

	<div class=" flex w-full items-start justify-between">
		<div>
			<a href="/dashboard/{weather.id}" class="btn btn-sm btn-primary">View</a>
		</div>

		<div class="flex gap-2">
			<button
				aria-label="delete"
				type="button"
				class="btn btn-circle btn-sm btn-error"
				onclick={() => (deleteModal = true)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor"
					><path
						d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
					/></svg
				>
			</button>
			<button
				aria-label="email"
				type="button"
				class="btn btn-circle btn-sm btn-secondary"
				onclick={() => (emailModal = true)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor"
					><path
						d="M440-520 120-720v400h400v80H120q-33 0-56.5-23.5T40-320v-480q0-33 23.5-56.5T120-880h640q33 0 56.5 23.5T840-800v200h-80v-120L440-520Zm0-80 320-200H120l320 200ZM760-80q-66 0-113-47t-47-113v-180q0-42 29-71t71-29q42 0 71 29t29 71v180h-80v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33 23.5 56.5T760-160q33 0 56.5-23.5T840-240v-160h80v160q0 66-47 113T760-80ZM120-720v-80 480-400Z"
					/></svg
				>
			</button>
		</div>
	</div>
</div>
{/if}



{#if deleteModal}
	<DeleteReport id={weather.id} onClose={closeDeleteModal} />
{/if}

{#if emailModal}
	<SendEmail {weather} onClose={closeEmailModal} />
{/if}
