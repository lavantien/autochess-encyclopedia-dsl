<script lang="ts">
  import type { SquadSlot } from '$lib/stores/squadStore';
  import StarSelector from './StarSelector.svelte';

  interface Props {
    slot: SquadSlot;
    selected: boolean;
    onclear: (index: number) => void;
    onstarschange: (index: number, stars: 1 | 2 | 3) => void;
    onclick: (index: number) => void;
  }

  let { slot, selected, onclear, onstarschange, onclick }: Props = $props();

  function handleClear(e: Event) {
    e.stopPropagation();
    onclear(slot.index);
  }

  function handleStarsChange(stars: 1 | 2 | 3) {
    onstarschange(slot.index, stars);
  }

  function handleClick() {
    onclick(slot.index);
  }

  const qualityColors = {
    common: 'border-slate-400',
    uncommon: 'border-emerald-400',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-amber-400'
  };
</script>

<div
  class="slot"
  class:filled={slot.heroId !== null}
  class:selected={selected}
  onclick={handleClick}
>
  {#if slot.hero && slot.heroId}
    <div class="hero-content">
      <div class="hero-header">
        <span class="hero-name">{slot.hero.name}</span>
        <button class="clear-btn" onclick={handleClear} type="button">
          ×
        </button>
      </div>
      <span class="hero-cost">{slot.hero.cost}g</span>
      <span class="hero-quality {qualityColors[slot.hero.quality]}">
        {slot.hero.quality}
      </span>
      <div class="star-wrapper">
        <StarSelector stars={slot.stars} onchange={handleStarsChange} />
      </div>
    </div>
  {:else}
    <div class="empty-slot">
      <span class="slot-number">{slot.index + 1}</span>
    </div>
  {/if}
</div>

<style>
  .slot {
    aspect-ratio: 1;
    border-radius: 0.5rem;
    border: 2px dashed rgba(59, 130, 246, 0.3);
    background: rgba(15, 23, 42, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    padding: 0.5rem;
  }

  .slot:hover {
    border-color: rgba(59, 130, 246, 0.6);
    background: rgba(30, 41, 59, 0.6);
  }

  .slot.filled {
    border-style: solid;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
  }

  .slot.selected {
    border-color: rgba(59, 130, 246, 0.8);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }

  .empty-slot {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slot-number {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    color: rgba(148, 163, 184, 0.3);
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
    align-items: center;
  }

  .hero-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .hero-name {
    font-size: 0.75rem;
    font-weight: 600;
    color: #e2e8f0;
    text-align: center;
    flex: 1;
  }

  .clear-btn {
    background: rgba(239, 68, 68, 0.2);
    border: none;
    border-radius: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f87171;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
    transition: all 0.2s ease;
  }

  .clear-btn:hover {
    background: rgba(239, 68, 68, 0.4);
  }

  .hero-cost {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: #fbbf24;
  }

  .hero-quality {
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    border: 1px solid;
  }

  .border-slate-400 {
    border-color: #94a3b8;
    color: #94a3b8;
  }

  .border-emerald-400 {
    border-color: #34d399;
    color: #34d399;
  }

  .border-blue-400 {
    border-color: #60a5fa;
    color: #60a5fa;
  }

  .border-purple-400 {
    border-color: #a78bfa;
    color: #a78bfa;
  }

  .border-amber-400 {
    border-color: #fbbf24;
    color: #fbbf24;
  }

  .star-wrapper {
    margin-top: 0.25rem;
  }
</style>
