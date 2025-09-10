<script lang="ts">
	import DashboardFilter from '$lib/components/DashboardFilter.svelte';
	import SmallWeatherCard from '$lib/components/SmallWeatherCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { user, weathers, range } = $derived(data);

	// console.log(weathers)

	function formatKey(key: string) {
		return key
			.split('_') // ["last", "month"]
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' '); // "Last Month"
	}
</script>

<section>
	<div class="hms-container">
		<div class="w-full">
			<div class="my-16 w-full">
				<h1 class=" text-3xl">
					Hello, <span class=" text-primary"
						>{user?.user_metadata?.first_name} {user?.user_metadata?.last_name}</span
					>
				</h1>
				<p class=" mt-2 text-lg">Track, and email your weather history below.</p>

				<a href="/dashboard/current" class="btn mt-4 btn-success">Check Current Weather</a>
			</div>

			<div class="w-full">
				<div class="mb-4 flex w-full justify-end">
					<DashboardFilter {range} />
				</div>
				<div class="w-full">
					{#if weathers?.length}
						<ul class=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{#each weathers as weather, index (weather.id)}
								<li class=" shrink-0">
									<SmallWeatherCard {weather} {index} />
								</li>
							{/each}
						</ul>
					{:else}
						<div class="w-full text-lg mt-4">
							<p>Looks like <b>{formatKey(range)}</b> kept quiet — no data available.</p>
							<p>Try adjusting the date filter.</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
