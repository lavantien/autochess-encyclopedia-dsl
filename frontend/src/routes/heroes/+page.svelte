<script lang="ts">
	import { getHeroes } from '$lib/api/client';
	import type { Hero } from '$lib/types/encyclopedia';
	import { onMount } from 'svelte';

	let heroes = $state<Hero[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			heroes = await getHeroes();
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
					<a href="/heroes" class="text-white">Heroes</a>
					<a href="/races" class="text-slate-300 hover:text-white">Races</a>
					<a href="/classes" class="text-slate-300 hover:text-white">Classes</a>
					<a href="/squad" class="text-slate-300 hover:text-white">Squad Builder</a>
				</div>
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto px-4">
		<h2 class="font-display text-3xl font-bold text-slate-100 mb-6">Heroes</h2>

		{#if loading}
			<p class="text-slate-400">Loading...</p>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{#each heroes as hero (hero.id)}
					<div class="hero-card glass rounded-lg p-4">
						<h3 class="hero-name">{hero.name}</h3>
						<p class="hero-quality">Quality: {hero.quality}</p>
						<p class="hero-cost">Cost: {hero.cost}g</p>
						<div class="hero-ability mt-3">
							<span class="ability-name">{hero.abilityName}</span>
							<p class="ability-desc">{hero.abilityDescription}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>
</div>

<style>
	.hero-name {
		font-family: var(--font-display);
		font-size: 1.125rem;
		font-weight: 600;
		color: #e2e8f0;
	}

	.hero-quality {
		font-size: 0.75rem;
		color: #94a3b8;
	}

	.hero-cost {
		font-family: var(--font-mono);
		color: #fbbf24;
	}

	.hero-ability {
		background: rgba(15, 23, 42, 0.5);
		padding: 0.5rem;
		border-radius: 0.375rem;
		margin-top: 0.75rem;
	}

	.ability-name {
		display: block;
		font-size: 0.75rem;
		font-weight: 600;
		color: #60a5fa;
		margin-bottom: 0.25rem;
	}

	.ability-desc {
		font-size: 0.75rem;
		color: rgba(148, 163, 184, 0.8);
		margin: 0;
		line-height: 1.4;
	}
</style>
