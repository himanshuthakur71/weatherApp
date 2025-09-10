<script lang="ts">
	import { goto } from '$app/navigation';

	// Sync current filter from the server (load returns `range`)
	let { range }: { range: string } = $props();

	const options = [
		{ value: 'all', label: 'All' },
		{ value: 'today', label: 'Today' },
		{ value: 'yesterday', label: 'Yesterday' },
		{ value: 'this_week', label: 'This Week' },
		{ value: 'last_week', label: 'Last Week' },
		{ value: 'this_month', label: 'This Month' },
		{ value: 'last_month', label: 'Last Month' }
	];

	function handleChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		// Update URL with ?range=value (triggers SSR reload)
		goto(`?range=${value}`, { replaceState: true });
	}
</script>




	<label for="range" class="select w-full max-w-[280px]">
		<span class="label">Filter by Date</span>
		<select id="range" onchange={handleChange} bind:value={range}>
			{#each options as opt}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
	</label>

