<script lang="ts">
  import { squadStore } from '$lib/stores/squadStore';
  import SquadSlot from './SquadSlot.svelte';

  interface Props {
    selectedSlotIndex: number | null;
    onslotclick: (index: number) => void;
  }

  let { selectedSlotIndex, onslotclick }: Props = $props();

  function handleClear(index: number) {
    squadStore.clearSlot(index);
  }

  function handleStarsChange(index: number, stars: 1 | 2 | 3) {
    squadStore.setStars(index, stars);
  }

  function handleSlotClick(index: number) {
    onslotclick(index);
  }
</script>

<div class="squad-grid">
  <h3 class="grid-title">Squad (9 slots)</h3>
  <div class="grid-container">
    {#each squadStore.slots as slot (slot.index)}
      <SquadSlot
        slot={slot}
        selected={selectedSlotIndex === slot.index}
        onclear={handleClear}
        onstarschange={handleStarsChange}
        onclick={handleSlotClick}
      />
    {/each}
  </div>
  <button class="clear-all-btn" onclick={() => squadStore.clearAll()} type="button">
    Clear All
  </button>
</div>

<style>
  .squad-grid {
    container-type: inline-size;
  }

  .grid-title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(148, 163, 184, 0.8);
    margin-bottom: 1rem;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(59, 130, 246, 0.2);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .grid-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    border-radius: 0.75rem;
    pointer-events: none;
  }

  .clear-all-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 0.375rem;
    color: #f87171;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .clear-all-btn:hover {
    background: rgba(239, 68, 68, 0.25);
    border-color: rgba(239, 68, 68, 0.5);
  }
</style>
