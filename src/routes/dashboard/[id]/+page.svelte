<script lang="ts">
	import { goto } from '$app/navigation';
	import WeatherCard from '$lib/components/WeatherCard.svelte';
	import DeleteReport from '$lib/modals/DeleteReport.svelte';
	import SendEmail from '$lib/modals/SendEmail.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { weather } = $derived(data);

	// console.log(weather)

	let deleteModal = $state(false);

	const closeDeleteModal = () => {
		deleteModal = false;
	};

	let emailModal = $state(false);

	const closeEmailModal = () => {
		emailModal = false;
	};
</script>

<section>
	<div class="hms-container">
		<div class="my-16 w-full">
			<div class=" mb-6 flex gap-2">
				<button
					aria-label="delete"
					type="button"
					class="btn btn-circle btn-sm btn-error"
					onclick={() => (deleteModal = true)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="currentColor"
						><path
							d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
						/></svg
					>
				</button>



				<button
					aria-label="email"
					type="button"
					class="btn btn-circle btn-sm btn-secondary"
					onclick={() => (emailModal = true)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="currentColor"
						><path
							d="M440-520 120-720v400h400v80H120q-33 0-56.5-23.5T40-320v-480q0-33 23.5-56.5T120-880h640q33 0 56.5 23.5T840-800v200h-80v-120L440-520Zm0-80 320-200H120l320 200ZM760-80q-66 0-113-47t-47-113v-180q0-42 29-71t71-29q42 0 71 29t29 71v180h-80v-180q0-8-6-14t-14-6q-8 0-14 6t-6 14v180q0 33 23.5 56.5T760-160q33 0 56.5-23.5T840-240v-160h80v160q0 66-47 113T760-80ZM120-720v-80 480-400Z"
						/></svg
					>
				</button>
			</div>

			<WeatherCard {weather} />
		</div>

		<div class="mt-16 w-full">
			<a href="/dashboard" class=" btn btn-block max-w-[120px] btn-primary lg:btn-lg">Back</a>
		</div>
	</div>
</section>

{#if deleteModal}
	<DeleteReport id={weather.id} onClose={closeDeleteModal} />
{/if}

{#if emailModal}
	<SendEmail {weather} onClose={closeEmailModal} />
{/if}
