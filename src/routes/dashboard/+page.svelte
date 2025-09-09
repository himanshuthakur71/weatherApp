<script lang="ts">
	import SmallWeatherCard from '$lib/components/SmallWeatherCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { user, weathers } = $derived(data);

	// console.log(weathers)
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
				<p class=" mt-2 text-lg">Track, download and email your weather history below.</p>
			</div>

			<div class="w-full">
				<ul class=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each weathers as weather}
						<li class=" shrink-0">
							<SmallWeatherCard {weather} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
