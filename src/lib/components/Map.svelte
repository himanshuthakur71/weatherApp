<script lang="ts">
	import { onMount } from 'svelte';

	let { lat, lng }: { lat: number; lng: number } = $props();
	let mapDiv: HTMLDivElement;

	onMount(async () => {
		// Import leaflet only on client
		const L = await import('leaflet');

		const customIcon = L.icon({
			iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
			iconSize: [32, 32],
			iconAnchor: [16, 32],
			popupAnchor: [0, -32],
		});

		// Create map
		const map = L.map(mapDiv).setView([lat, lng], 18);

		L.marker([lat, lng], { icon: customIcon }).addTo(map);

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

<div bind:this={mapDiv} id="map" class="h-[220px] w-full"></div>
