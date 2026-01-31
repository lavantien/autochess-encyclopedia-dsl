import type { Hero, SquadStats } from '$lib/types/encyclopedia';
import { calculateSquad } from '$lib/api/client';

export type StarLevel = 1 | 2 | 3;

export interface SquadSlot {
  index: number;
  heroId: string | null;
  stars: StarLevel;
  hero?: Hero;
}

interface SquadState {
  slots: SquadSlot[];
  name: string;
}

function createSquadStore() {
  let slots = $state<SquadSlot[]>(
    Array.from({ length: 9 }, (_, i) => ({
      index: i,
      heroId: null,
      stars: 1
    }))
  );

  let name = $state('New Squad');
  let availableHeroes = $state<Hero[]>([]);
  let stats = $state<SquadStats | null>(null);

  return {
    get slots() {
      return slots;
    },

    get name() {
      return name;
    },

    get availableHeroes() {
      return availableHeroes;
    },

    get stats() {
      return stats;
    },

    setHeroes(heroes: Hero[]) {
      availableHeroes = heroes;
    },

    setSlot(index: number, heroId: string | null, stars: StarLevel = 1) {
      slots[index] = {
        index,
        heroId,
        stars,
        hero: heroId ? availableHeroes.find((h) => h.id === heroId) : undefined
      };
    },

    setStars(index: number, stars: StarLevel) {
      slots[index].stars = stars;
    },

    clearSlot(index: number) {
      slots[index] = {
        index,
        heroId: null,
        stars: 1
      };
    },

    clearAll() {
      slots = Array.from({ length: 9 }, (_, i) => ({
        index: i,
        heroId: null,
        stars: 1
      }));
      stats = null;
    },

    setName(newName: string) {
      name = newName;
    },

    async calculateStats() {
      const filledSlots = slots.filter((s) => s.heroId);
      if (filledSlots.length === 0) {
        stats = null;
        return;
      }

      try {
        const request = {
          slots: filledSlots.map((s) => ({
            index: s.index,
            heroId: s.heroId!,
            stars: s.stars
          }))
        };
        stats = await calculateSquad(request);
      } catch (e) {
        console.error('Failed to calculate stats', e);
      }
    }
  };
}

export const squadStore = createSquadStore();
