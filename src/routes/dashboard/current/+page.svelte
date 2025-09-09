<script lang="ts">
	import WeatherCard from '$lib/components/WeatherCard.svelte';
	import WeatherCardSkeleton from '$lib/components/WeatherCardSkeleton.svelte';
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
				<WeatherCardSkeleton />
			{/if}
		</div>
	</div>
</section>
