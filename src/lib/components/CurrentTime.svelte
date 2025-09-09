<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let userTime = $state(new Date());

	// Update user time every second
	let interval: any;
	onMount(() => {
		interval = setInterval(() => {
			userTime = new Date();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<span>{userTime.toLocaleTimeString()}</span>
