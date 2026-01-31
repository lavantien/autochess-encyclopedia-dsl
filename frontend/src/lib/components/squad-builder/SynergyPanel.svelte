<script lang="ts">
  import type { ActiveSynergy } from '$lib/types/encyclopedia';

  interface Props {
    raceSynergies: ActiveSynergy[];
    classSynergies: ActiveSynergy[];
  }

  let { raceSynergies = [], classSynergies = [] }: Props = $props();
</script>

<div class="synergy-panel">
  <div class="synergy-section">
    <h3 class="section-title">Race Synergies</h3>
    <div class="synergy-list">
      {#each raceSynergies as synergy (synergy.name)}
        <div class="synergy-item active">
          <div class="synergy-header">
            <span class="synergy-name">{synergy.name}</span>
            <span class="synergy-count">{synergy.currentCount}/{synergy.requiredCount}</span>
          </div>
          <span class="synergy-bonus">{synergy.description}</span>
        </div>
      {:else}
        <div class="empty-state">No active race synergies</div>
      {/each}
    </div>
  </div>

  <div class="synergy-section">
    <h3 class="section-title">Class Synergies</h3>
    <div class="synergy-list">
      {#each classSynergies as synergy (synergy.name)}
        <div class="synergy-item active">
          <div class="synergy-header">
            <span class="synergy-name">{synergy.name}</span>
            <span class="synergy-count">{synergy.currentCount}/{synergy.requiredCount}</span>
          </div>
          <span class="synergy-bonus">{synergy.description}</span>
        </div>
      {:else}
        <div class="empty-state">No active class synergies</div>
      {/each}
    </div>
  </div>
</div>

<style>
  .synergy-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(148, 163, 184, 0.8);
    margin-bottom: 0.5rem;
  }

  .synergy-list {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .synergy-item {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(59, 130, 246, 0.15);
    border-radius: 0.375rem;
    transition: all 0.2s ease;
  }

  .synergy-item.active {
    background: linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%);
    border-color: rgba(34, 197, 94, 0.3);
  }

  .synergy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .synergy-name {
    font-weight: 600;
    font-size: 0.875rem;
    color: #e2e8f0;
  }

  .synergy-count {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    color: #4ade80;
  }

  .synergy-bonus {
    font-size: 0.75rem;
    color: #4ade80;
  }

  .empty-state {
    padding: 1.5rem;
    text-align: center;
    color: rgba(148, 163, 184, 0.4);
    font-size: 0.75rem;
    font-style: italic;
  }
</style>
