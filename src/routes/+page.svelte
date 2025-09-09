<script lang="ts">
	import weatherApp from '$lib/assets/weather-app.svg';
</script>

<section class="w-full py-16 lg:py-20">
	<div class="hms-container">
		<div class="flex w-full items-center justify-between">
			<div class="w-full max-w-[670px]">
				<h1 class=" text-5xl font-bold">Your Weather, Anytime. Anywhere.</h1>

				<p class=" mt-2 mb-6 text-lg">
					Stay updated with real-time weather conditions and track your daily weather history.
					Simple, secure, and personalized just for you.
				</p>

				<a href="/auth/login" class=" btn btn-primary md:btn-lg md:btn-wide">Get Started</a>
			</div>

			<figure class=" flex w-full max-w-[470px] items-center justify-center">
				<img
					src={weatherApp}
					alt="AI Resume builder"
					width="470"
					height="345"
					class="floating-animation h-full w-full"
				/>
			</figure>
		</div>
	</div>
</section>

<style>
	/* Floating animation for image */
	.floating-animation {
		animation: float 4s ease-in-out infinite;
	}
	@keyframes float {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
		100% {
			transform: translateY(0px);
		}
	}
</style>
