<script lang="ts">
	import { page } from '$app/state';

	const { status } = $derived(page);

	let pageTitle = $state('');

	$effect(() => {
		if (status === 404) {
			pageTitle = '404 — Not Found';
		} else if (status === 422) {
			pageTitle = '422 — Access Denied';
		} else if (status === 500) {
			pageTitle = '500 — Internal Server Error';
		} else {
			pageTitle = `${status} — Error`;
		}
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{#if status == 500}
	<main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
		<div class="text-center">
			<p class=" text-8xl font-semibold text-primary">500</p>
			<h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
				Internal Server Error
			</h1>
			<p class="mt-6 max-w-4xl text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
				Something is broken. Please let us know what you were doing when this error occurred. We
				will fix it as soon as possible. Sorry for any inconvenience caused.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a href="/" class=" btn btn-primary lg:btn-lg">Go back home</a>
				<a href="/" class="btn btn-soft btn-primary lg:btn-lg"
					>Contact support <span aria-hidden="true">&rarr;</span></a
				>
			</div>
		</div>
	</main>
{:else if status == 404}
	<main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
		<div class="text-center">
			<p class=" text-8xl font-semibold text-primary">404</p>
			<h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
				Page not found
			</h1>
			<p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
				Sorry, we couldn’t find the page you’re looking for.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a href="/" class=" btn btn-primary lg:btn-lg">Go back home</a>
				<a href="/" class="btn btn-soft btn-primary lg:btn-lg"
					>Contact support <span aria-hidden="true">&rarr;</span></a
				>
			</div>
		</div>
	</main>
{:else if status == 422}
	<main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
		<div class="text-center">
			<p class=" text-8xl font-semibold text-primary">422</p>
			<h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
				Access Denied
			</h1>
			<p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
				You don’t have permission to access this page or resource.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a href="/" class=" btn btn-primary lg:btn-lg">Go back home</a>
				<a href="/" class="btn btn-soft btn-primary lg:btn-lg"
					>Contact support <span aria-hidden="true">&rarr;</span></a
				>
			</div>
		</div>
	</main>
{/if}
