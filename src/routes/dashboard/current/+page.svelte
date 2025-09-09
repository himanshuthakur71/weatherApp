<!-- <script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // State
  let loading = true;
  let error: string | null = null;

  const weather = writable({
    city: "",
    country: "",
    temp: 0,
    feels_like: 0,
    condition: "",
    description: "",
    icon: "",
    sunrise: 0,
    sunset: 0
  });

  // Format UNIX timestamp to local time
  function formatTime(ts: number) {
    const date = new Date(ts * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Choose icon based on condition and time
  function getWeatherIcon(condition: string, icon: string, sunset: number) {
    const now = Date.now() / 1000;
    if (condition === "Clear" && now >= sunset) return "🌙";
    if (condition === "Clear") return "☀️";
    if (condition.includes("Cloud")) return "☁️";
    if (condition.includes("Rain")) return "🌧️";
    return "🌤️";
  }

  onMount(async () => {
    try {
      // Get geolocation
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = position.coords;

      // Fetch weather from server route
      const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
      const data = await res.json();

      weather.set({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      });
    } catch (err: any) {
      console.error(err);
      error = err.message || "Failed to fetch weather.";
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="text-center mt-10">Loading current weather...</div>
{:else if error}
  <div class="text-center mt-10 text-red-500">{error}</div>
{:else}
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center space-y-4">
    {#await weather}
      <p>Loading...</p>
    {:then w}
      <h2 class="text-2xl font-bold">{w.city}, {w.country}</h2>
      <div class="text-6xl">{getWeatherIcon(w.condition, w.icon, w.sunset)}</div>
      <p class="text-xl">{w.description}</p>
      <p class="text-lg">Temperature: {w.temp}°C (Feels like: {w.feels_like}°C)</p>
      <p>🌅 Sunrise: {formatTime(w.sunrise)} | 🌇 Sunset: {formatTime(w.sunset)}</p>
    {/await}
  </div>
{/if}

<style>
  body { background: #e0f7fa; }
</style> -->
