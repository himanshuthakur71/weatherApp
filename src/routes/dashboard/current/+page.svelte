<script lang="ts">
	import WeatherCard from '$lib/components/WeatherCard.svelte';
	import WeatherCardSkeleton from '$lib/components/WeatherCardSkeleton.svelte';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { createEmailHTML } from '$lib/helpers/createEmailHtml';

	let { data }: PageProps = $props();
	const { user, weatherData } = $derived(data);

	const sendReport = async () => {
		try {
			// Create email html
			const emailHtml = createEmailHTML(weatherData, user);

			if (emailHtml) {
				const emailRes = await fetch('/api/send-email', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						to: user?.email,
						subject: 'New Weather Report',
						text: emailHtml
					})
				});

				const emailResult = await emailRes.json();

				if ((emailResult.message = 'Email sent successfully!')) {
					// Toast or something if want
				} else {
					alert(`❌ Error: ${emailResult.error}`);
				}
			}
		} catch (err) {
			console.error(err);
		}
	};

	onMount(() => {
		// send email
		sendReport();
	});
</script>

<section>
	<div class="hms-container">
		<div class="my-16 w-full">
			<div class=" mb-6">
				<h1 class=" text-3xl">
					Hello, <span class=" text-primary"
						>{user?.user_metadata?.first_name} {user?.user_metadata?.last_name}</span
					>
				</h1>
				<p class=" mt-2 text-lg">Track your weather below.</p>
			</div>
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
