<script lang="ts">
	import { onMount } from 'svelte';

	let { lat, lng }: { lat: number; lng: number } = $props();
	let mapDiv: HTMLDivElement;

	onMount(async () => {
		// Import leaflet only on client
		const L = await import('leaflet');

		// Create map
		const map = L.map(mapDiv).setView([lat, lng], 18);

		// Add free satellite tiles (ESRI World Imagery)
		L.tileLayer(
			'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			{
				attribution: 'Weather App'
			}
		).addTo(map);

		// Add marker
		L.marker([lat, lng]).addTo(map);
	});
</script>

<div bind:this={mapDiv} id="map"  class="w-full h-[220px]"></div>


