<script lang="ts">
	let { children } = $props();
</script>

<section class="w-full h-full">
	<div class="hms-container h-full">
		<div class="w-full h-full flex justify-center items-center py-8">
            {@render children?.()}
		</div>
	</div>
</section>
