<script lang="ts">
  import { onMount } from 'svelte';
  import { getHeroes } from '$lib/api/client';
  import { squadStore } from '$lib/stores/squadStore';
  import SquadGrid from '$lib/components/squad-builder/SquadGrid.svelte';
  import HeroPalette from '$lib/components/squad-builder/HeroPalette.svelte';
  import SynergyPanel from '$lib/components/squad-builder/SynergyPanel.svelte';
  import StatsPanel from '$lib/components/squad-builder/StatsPanel.svelte';
  import type { Hero } from '$lib/types/encyclopedia';

  let loading = $state(true);
  let heroes = $state<Hero[]>([]);
  let selectedSlotIndex = $state<number | null>(null);

  onMount(async () => {
    try {
      heroes = await getHeroes();
      squadStore.setHeroes(heroes);
    } catch (e) {
      console.error('Failed to load heroes', e);
    } finally {
      loading = false;
    }
  });

  function handleSlotClick(index: number) {
    selectedSlotIndex = index;
  }

  function handleHeroSelect(heroId: string) {
    if (selectedSlotIndex !== null) {
      squadStore.setSlot(selectedSlotIndex, heroId, 1);
      squadStore.calculateStats();
      selectedSlotIndex = null;
    }
  }

  function handleCalculate() {
    squadStore.calculateStats();
  }
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
          <a href="/races" class="text-slate-300 hover:text-white">Races</a>
          <a href="/classes" class="text-slate-300 hover:text-white">Classes</a>
          <a href="/squad" class="text-white">Squad Builder</a>
        </div>
      </div>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto px-4">
    <h2 class="font-display text-3xl font-bold text-slate-100 mb-6">Squad Builder</h2>

    {#if loading}
      <p class="text-slate-400">Loading heroes...</p>
    {:else}
      <div class="squad-builder-layout">
        <div class="left-panel">
          <SquadGrid
            selectedSlotIndex={selectedSlotIndex}
            onslotclick={handleSlotClick}
          />
          <div class="actions">
            <button class="calc-btn" onclick={handleCalculate} type="button">
              Calculate Stats
            </button>
          </div>
          <StatsPanel stats={squadStore.stats ?? null} />
        </div>

        <div class="right-panel">
          <HeroPalette
            heroes={heroes}
            selectedSlotIndex={selectedSlotIndex}
            onheroselect={handleHeroSelect}
          />
          <SynergyPanel
            raceSynergies={squadStore.stats?.raceSynergies || []}
            classSynergies={squadStore.stats?.classSynergies || []}
          />
        </div>
      </div>
    {/if}
  </main>
</div>

<style>
  .squad-builder-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 1024px) {
    .squad-builder-layout {
      grid-template-columns: 1fr;
    }
  }

  .left-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .right-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .actions {
    display: flex;
    justify-content: center;
  }

  .calc-btn {
    padding: 0.75rem 2rem;
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: 0.5rem;
    color: #60a5fa;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .calc-btn:hover {
    background: rgba(59, 130, 246, 0.3);
    border-color: rgba(59, 130, 246, 0.6);
    transform: translateY(-1px);
  }
</style>
