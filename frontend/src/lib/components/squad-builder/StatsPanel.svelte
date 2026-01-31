<script lang="ts">
  import type { SquadStats } from '$lib/types/encyclopedia';

  interface Props {
    stats: SquadStats | null;
  }

  let { stats }: Props = $props();

  function formatNumber(n: number): string {
    if (n >= 1000) {
      return (n / 1000).toFixed(1) + 'k';
    }
    return n.toString();
  }

  const displayStats = $derived(
    stats || {
      health: 0,
      attackDamage: 0,
      attackSpeed: 0,
      armor: 0,
      magicResist: 0,
      raceSynergies: [],
      classSynergies: []
    }
  );
</script>

<div class="stats-panel">
  <h3 class="panel-title">Squad Stats</h3>

  <div class="stats-grid">
    <div class="stat-item hp">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value">{formatNumber(displayStats.health)}</span>
        <span class="stat-label">Health</span>
      </div>
    </div>

    <div class="stat-item ad">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm0 6h4v4H7v-4zm6-6h4v4h-4V7zm0 6h4v4h-4v-4z" />
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value">{formatNumber(displayStats.attackDamage)}</span>
        <span class="stat-label">Attack</span>
      </div>
    </div>

    <div class="stat-item as">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value">{displayStats.attackSpeed.toFixed(2)}</span>
        <span class="stat-label">Atk Spd</span>
      </div>
    </div>

    <div class="stat-item armor">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value">{displayStats.armor}</span>
        <span class="stat-label">Armor</span>
      </div>
    </div>

    <div class="stat-item mr">
      <div class="stat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>
      <div class="stat-content">
        <span class="stat-value">{displayStats.magicResist}</span>
        <span class="stat-label">Magic Res</span>
      </div>
    </div>
  </div>
</div>

<style>
  .stats-panel {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 0.75rem;
    padding: 1.25rem;
  }

  .panel-title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(148, 163, 184, 0.8);
    margin-bottom: 1rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.75rem;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(15, 23, 42, 0.5);
    border-radius: 0.5rem;
    border: 1px solid rgba(59, 130, 246, 0.1);
  }

  .stat-icon {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
  }

  .stat-icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .stat-item.hp .stat-icon {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
  }

  .stat-item.ad .stat-icon {
    background: rgba(251, 191, 36, 0.15);
    color: #fbbf24;
  }

  .stat-item.as .stat-icon {
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
  }

  .stat-item.armor .stat-icon {
    background: rgba(168, 85, 247, 0.15);
    color: #a78bfa;
  }

  .stat-item.mr .stat-icon {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
  }

  .stat-content {
    display: flex;
    flex-direction: column;
  }

  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.125rem;
    font-weight: 700;
    color: #e2e8f0;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(148, 163, 184, 0.6);
  }
</style>
