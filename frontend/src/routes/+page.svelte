<script lang="ts">
	import { importData } from '$lib/api/client';
	import { onMount } from 'svelte';

	let loaded = $state(false);
	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			await importData();
			loaded = true;
		} catch (e) {
			error = 'Failed to load game data. Make sure the backend is running.';
		}
	});
</script>

<div class="min-h-screen grid-bg p-8">
	<nav class="glass border-b border-slate-700/50 mb-8">
		<div class="max-w-7xl mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<h1 class="font-display text-2xl font-bold text-primary-400">
					Auto Chess Encyclopedia
				</h1>
				<div class="flex gap-4">
					<a href="/" class="text-white">Home</a>
					<a href="/heroes" class="text-slate-300 hover:text-white">Heroes</a>
					<a href="/races" class="text-slate-300 hover:text-white">Races</a>
					<a href="/classes" class="text-slate-300 hover:text-white">Classes</a>
					<a href="/squad" class="text-slate-300 hover:text-white">Squad Builder</a>
				</div>
			</div>
		</div>
	</nav>

	<div class="max-w-7xl mx-auto px-4">
		{#if error}
			<div class="text-red-400">{error}</div>
		{:else if loaded}
			<div class="glass rounded-lg p-8">
				<h2 class="font-display text-2xl text-slate-100 mb-4">Welcome to Auto Chess Encyclopedia</h2>
				<p class="text-slate-400 mb-4">Build your squad and explore heroes, races, and classes.</p>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<a href="/heroes" class="card block">
						<h3 class="text-lg font-semibold text-blue-400">Heroes</h3>
						<p class="text-slate-400">View all heroes</p>
					</a>
					<a href="/races" class="card block">
						<h3 class="text-lg font-semibold text-blue-400">Races</h3>
						<p class="text-slate-400">View all races</p>
					</a>
					<a href="/classes" class="card block">
						<h3 class="text-lg font-semibold text-blue-400">Classes</h3>
						<p class="text-slate-400">View all classes</p>
					</a>
				</div>
			</div>
		{:else}
			<div class="text-slate-400">Loading...</div>
		{/if}
	</div>
</div>

<style>
	.card {
		background: rgba(30, 41, 59, 0.6);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 0.5rem;
		padding: 1rem;
		transition: all 0.2s ease;
	}

	.card:hover {
		border-color: rgba(59, 130, 246, 0.4);
		transform: translateY(-1px);
	}
</style>
