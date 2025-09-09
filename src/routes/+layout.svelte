<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { initTheme } from '$lib/helpers/theme';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	let cleanup: (() => void) | undefined | null = null;

	onMount(() => {
		cleanup = initTheme();

		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});

	onDestroy(() => {
		cleanup?.();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Weather App</title>
	<meta name="description" content="Track, and email your weather anytime, anywhere.">
</svelte:head>

<div class="grid h-full min-h-[105vh] w-full grid-rows-[auto_1fr_auto]">
	<Navbar />
	<main>
		{@render children?.()}
	</main>

	<Footer />
</div>
