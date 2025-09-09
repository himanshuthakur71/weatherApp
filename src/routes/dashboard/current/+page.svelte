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

		<div class="mt-16 w-full">
			<a href="/dashboard" class=" btn btn-block max-w-[120px] btn-primary lg:btn-lg">Back</a>
		</div>
	</div>
</section>
