<script lang="ts">
	let { data, children } = $props();

	const { user } = $derived(data);
</script>

<svelte:head>
	<title>
		{user?.user_metadata?.first_name} - WeatherApp
	</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{@render children?.()}
