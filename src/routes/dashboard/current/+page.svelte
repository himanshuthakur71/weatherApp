<script lang="ts">
	import WeatherCard from '$lib/components/WeatherCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { weatherData } = $derived(data);
</script>

<section>
	<div class="hms-container">
		<div class="w-full">
			<!-- <pre
				class="h-full max-h-[512px] w-full overflow-auto bg-black p-4 text-[12px] text-white">{JSON.stringify(
					weatherData,
					null,
					2
				)}</pre> -->

			{#if weatherData}
				<WeatherCard weather={weatherData} />
			{/if}
		</div>
	</div>
</section>
