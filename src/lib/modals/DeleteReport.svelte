<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	let { id, onClose }: { id: string , onClose: any } = $props();

	const { supabase } = $derived(page.data);

	const deleteReport = async () => {
		const { error: err } = await supabase.from('weathers').delete().eq('id', id);

		if (!err) await invalidate('dashboard:now').then(() => onClose());
	};
</script>

<dialog class="modal-open modal">
	<div class="modal-box p-0" transition:fade>
		<div class=" flex justify-between bg-error px-4 py-2 text-error-content">
			<h3 class="text-lg font-bold">Delete Weather Report</h3>

			<button onclick={onClose} aria-label="close" type="button" class="btn btn-circle btn-sm">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="currentColor"
					><path
						d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
					/></svg
				>
			</button>
		</div>
		<div class="bg-white p-4 pb-[30px] text-[#333]">
			<figure
				class="mx-auto my-4 flex size-[90px] items-center justify-center rounded-full bg-error/5 p-2"
			>
				<svg
					class=" size-16 fill-error"
					fill="currenColor"
					viewBox="0 0 1024 1024"
					xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier"
						><path
							d="M520.741 163.801a10.234 10.234 0 00-3.406-3.406c-4.827-2.946-11.129-1.421-14.075 3.406L80.258 856.874a10.236 10.236 0 00-1.499 5.335c0 5.655 4.585 10.24 10.24 10.24h846.004c1.882 0 3.728-.519 5.335-1.499 4.827-2.946 6.352-9.248 3.406-14.075L520.742 163.802zm43.703-26.674L987.446 830.2c17.678 28.964 8.528 66.774-20.436 84.452a61.445 61.445 0 01-32.008 8.996H88.998c-33.932 0-61.44-27.508-61.44-61.44a61.445 61.445 0 018.996-32.008l423.002-693.073c17.678-28.964 55.488-38.113 84.452-20.436a61.438 61.438 0 0120.436 20.436zM512 778.24c22.622 0 40.96-18.338 40.96-40.96s-18.338-40.96-40.96-40.96-40.96 18.338-40.96 40.96 18.338 40.96 40.96 40.96zm0-440.32c-22.622 0-40.96 18.338-40.96 40.96v225.28c0 22.622 18.338 40.96 40.96 40.96s40.96-18.338 40.96-40.96V378.88c0-22.622-18.338-40.96-40.96-40.96z"
						></path></g
					></svg
				>
			</figure>
			<h3 class=" mb-1 text-center text-2xl font-bold">Delete Report</h3>
			<p class=" text-center text-lg">You're going to delete your weather report. Are you sure?</p>
			<div class="mt-4 flex w-full justify-center gap-4">
				<button
					onclick={onClose}
					type="button"
					class=" btn rounded-full btn-soft btn-primary lg:btn-lg">No, Keep it.</button
				>
				<button type="button" class="btn rounded-full btn-error lg:btn-lg">Yes, Delete It!</button>
			</div>
		</div>
	</div>
</dialog>
