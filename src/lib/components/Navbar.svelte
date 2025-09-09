<script lang="ts">
	import { page } from '$app/state';

	const { user } = $derived(page.data);

	// console.log(user)
</script>

<header class="w-full">
	<div class="hms-container">
		<div class="navbar">
			<div class="navbar-start">
				<a href="/" class="btn text-lg btn-ghost">WeatherApp</a>
			</div>

			<div class="navbar-end">
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

							<li><a href="/logout" class=" bg-error text-error-content">Logout</a></li>
						</ul>
					</div>
				{:else}
					<a href="/auth/login" class="btn btn-primary">Login</a>
				{/if}
			</div>
		</div>
	</div>
</header>
