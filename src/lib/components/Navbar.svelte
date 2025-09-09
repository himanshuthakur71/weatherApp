<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import CurrentTime from './CurrentTime.svelte';
	import moon from '$lib/assets/moon-bg.png';

	const { user, supabase } = $derived(page.data);

	// console.log(user)

	const logout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error(error);
		} else {
			goto('/');
		}
	};
</script>

<header class="relative w-full">
	<div class="hms-container">
		<div class="navbar">
			<div class="navbar-start">
				<a href="/" class="btn text-lg btn-ghost">WeatherApp</a>
			</div>

			<div class="navbar-end gap-4">
				<div class=" relative">
					<figure
						class=" absolute top-[-50px] right-[0px] z-[-1] flex h-[112px] w-[168px] rotate-[342deg] items-center justify-center"
					>
						<img
							src={moon}
							alt="moon"
							width="168"
							height="112"
							class="floating-animation h-full w-full"
						/>
					</figure>
				</div>
				<p class="w-[76px] text-sm font-semibold"><CurrentTime /></p>
				{#if user?.id}
					<div class="dropdown dropdown-end">
						<div tabindex="0" role="button" class="btn avatar btn-circle btn-ghost">
							<div class="w-10 rounded-full">
								<img
									alt="user"
									src={user?.user_metadata?.avatar_url ||
										`https://ui-avatars.com/api/?name=${user?.user_metadata?.first_name}+${user?.user_metadata?.last_name}&background=random`}
								/>
							</div>
						</div>
						<ul
							tabindex="-1"
							class="dropdown-content menu z-1 mt-3 w-52 menu-lg rounded-box bg-base-100 p-2 shadow"
						>
							<li>
								<a href="/dashboard/profile" class="justify-between"> Profile </a>
							</li>

							<li>
								<button type="button" onclick={logout} class=" bg-error text-error-content"
									>Logout</button
								>
							</li>
						</ul>
					</div>
				{:else}
					<a href="/auth/login" class="btn btn-primary">Login</a>
				{/if}
			</div>
		</div>
	</div>
</header>
