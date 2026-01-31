<script lang="ts">
  import type { StarLevel } from '$lib/stores/squadStore';

  interface Props {
    stars: StarLevel;
    onchange: (stars: StarLevel) => void;
  }

  let { stars, onchange }: Props = $props();

  function setStars(value: StarLevel) {
    onchange(value);
  }
</script>

<div class="star-selector">
  <button
    class="star-btn"
    class:active={stars === 1}
    onclick={() => setStars(1)}
    type="button"
  >
    <span class="star-icon">★</span>
  </button>
  <button
    class="star-btn"
    class:active={stars === 2}
    onclick={() => setStars(2)}
    type="button"
  >
    <span class="star-icon">★★</span>
  </button>
  <button
    class="star-btn"
    class:active={stars === 3}
    onclick={() => setStars(3)}
    type="button"
  >
    <span class="star-icon">★★★</span>
  </button>
</div>

<style>
  .star-selector {
    display: flex;
    gap: 0.25rem;
  }

  .star-btn {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .star-btn:hover {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(59, 130, 246, 0.4);
  }

  .star-btn.active {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.6);
  }

  .star-icon {
    font-size: 0.625rem;
    color: #fbbf24;
  }
</style>
