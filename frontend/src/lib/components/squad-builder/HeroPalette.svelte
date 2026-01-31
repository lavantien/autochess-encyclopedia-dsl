<script lang="ts">
  import type { Hero, QualityTier } from '$lib/types/encyclopedia';

  interface Props {
    heroes: Hero[];
    selectedSlotIndex: number | null;
    onheroselect: (heroId: string) => void;
  }

  let { heroes, selectedSlotIndex, onheroselect }: Props = $props();

  let searchQuery = $state('');
  let selectedQuality = $state<string>('all');

  const qualityColors: Record<QualityTier, string> = {
    common: 'border-slate-400',
    uncommon: 'border-emerald-400',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-amber-400'
  };

  const filteredHeroes = $derived(
    heroes.filter((hero) => {
      const matchesSearch = hero.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesQuality = selectedQuality === 'all' || hero.quality === selectedQuality;
      return matchesSearch && matchesQuality;
    })
  );

  function handleHeroClick(heroId: string) {
    if (selectedSlotIndex !== null) {
      onheroselect(heroId);
    }
  }
</script>

<div class="hero-palette">
  <div class="filters">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search heroes..."
      class="search-input"
    />

    <select bind:value={selectedQuality} class="filter-select">
      <option value="all">All Tiers</option>
      <option value="common">Common</option>
      <option value="uncommon">Uncommon</option>
      <option value="rare">Rare</option>
      <option value="epic">Epic</option>
      <option value="legendary">Legendary</option>
    </select>
  </div>

  <div class="selected-slot-info">
    {#if selectedSlotIndex !== null}
      <span class="slot-indicator">Selecting for Slot {selectedSlotIndex + 1}</span>
    {:else}
      <span class="slot-indicator dim">Click a slot to select</span>
    {/if}
  </div>

  <div class="hero-list">
    {#each filteredHeroes as hero (hero.id)}
      <div
        class="hero-card {qualityColors[hero.quality]}"
        onclick={() => handleHeroClick(hero.id)}
        class:disabled={selectedSlotIndex === null}
        role="button"
        tabindex="0"
      >
        <div class="hero-main">
          <span class="hero-name">{hero.name}</span>
          <span class="hero-cost">{hero.cost}g</span>
        </div>
        <span class="hero-ability">{hero.abilityName}</span>
      </div>
    {/each}

    {#if filteredHeroes.length === 0}
      <div class="no-results">No heroes match your filters</div>
    {/if}
  </div>
</div>

<style>
  .hero-palette {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }

  .filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .search-input {
    flex: 1;
    min-width: 200px;
    padding: 0.625rem 1rem;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 0.5rem;
    color: #e2e8f0;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .filter-select {
    padding: 0.625rem 2rem 0.625rem 1rem;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 0.5rem;
    color: #e2e8f0;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.25rem;
  }

  .selected-slot-info {
    text-align: center;
  }

  .slot-indicator {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #4ade80;
  }

  .slot-indicator.dim {
    color: rgba(148, 163, 184, 0.5);
  }

  .hero-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.5rem;
    overflow-y: auto;
    padding-right: 0.5rem;
    max-height: 500px;
  }

  .hero-list::-webkit-scrollbar {
    width: 0.375rem;
  }

  .hero-list::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.5);
    border-radius: 0.25rem;
  }

  .hero-list::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.3);
    border-radius: 0.25rem;
  }

  .hero-card {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 0.75rem;
    background: rgba(30, 41, 59, 0.6);
    border-left-width: 3px;
    border-left-style: solid;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .hero-card:hover:not(.disabled) {
    background: rgba(30, 41, 59, 0.9);
    transform: translateY(-1px);
  }

  .hero-card.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .border-slate-400 {
    border-left-color: #94a3b8;
  }

  .border-emerald-400 {
    border-left-color: #34d399;
  }

  .border-blue-400 {
    border-left-color: #60a5fa;
  }

  .border-purple-400 {
    border-left-color: #a78bfa;
  }

  .border-amber-400 {
    border-left-color: #fbbf24;
  }

  .hero-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hero-name {
    font-weight: 600;
    font-size: 0.875rem;
    color: #e2e8f0;
  }

  .hero-cost {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: #fbbf24;
  }

  .hero-ability {
    font-size: 0.625rem;
    color: rgba(148, 163, 184, 0.8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem;
    color: rgba(148, 163, 184, 0.6);
    font-size: 0.875rem;
  }
</style>
