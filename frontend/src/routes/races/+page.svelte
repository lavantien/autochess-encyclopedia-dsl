<script lang="ts">
	import { getRaces } from '$lib/api/client';
	import type { Race } from '$lib/types/encyclopedia';
	import { onMount } from 'svelte';

	let races = $state<Race[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			races = await getRaces();
		} finally {
			loading = false;
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
					<a href="/" class="text-slate-300 hover:text-white">Home</a>
					<a href="/heroes" class="text-slate-300 hover:text-white">Heroes</a>
					<a href="/races" class="text-white">Races</a>
					<a href="/classes" class="text-slate-300 hover:text-white">Classes</a>
					<a href="/squad" class="text-slate-300 hover:text-white">Squad Builder</a>
				</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4">
		<h2 class="font-display text-3xl font-bold text-slate-100 mb-6">Races</h2>

		{#if loading}
			<p class="text-slate-400">Loading...</p>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each races as race (race.id)}
					<div class="race-card glass rounded-lg p-4">
						<h3 class="race-name">{race.name}</h3>
						<p class="race-description">{race.description}</p>
						<div class="synergies mt-4">
							{#each race.synergyLevels as level}
								<div class="synergy-level">
									<span class="synergy-count">{level.requiredCount}</span>
									<span class="synergy-bonus">{level.description}</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>
</div>

<style>
	.race-name {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
		color: #60a5fa;
		margin: 0 0 0.5rem 0;
	}

	.race-description {
		font-size: 0.875rem;
		color: rgba(148, 163, 184, 0.8);
		margin: 0 0 1rem 0;
	}

	.synergies {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.synergy-level {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem;
		background: rgba(15, 23, 42, 0.5);
		border-radius: 0.375rem;
	}

	.synergy-count {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 700;
		color: #4ade80;
		min-width: 1.5rem;
		text-align: center;
	}

	.synergy-bonus {
		font-size: 0.75rem;
		color: #e2e8f0;
	}
</style>
