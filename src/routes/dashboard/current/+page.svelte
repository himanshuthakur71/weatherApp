<script lang="ts">
	import WeatherCard from '$lib/components/WeatherCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { weatherData } = $derived(data);
</script>

<section>
	<div class="hms-container">
		<div class="w-full">
			{#if weatherData}
				<WeatherCard weather={weatherData} />
			{:else}
				<div class="flex items-center justify-center pt-16">
					<span class="loading size-60 loading-ring"></span>
				</div>
			{/if}
		</div>
	</div>
</section>
