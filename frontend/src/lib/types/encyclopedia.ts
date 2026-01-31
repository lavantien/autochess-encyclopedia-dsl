export type QualityTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface SynergyLevelDto {
	requiredCount: number;
	description: string;
}

export interface Race {
	id: string;
	name: string;
	description: string;
	icon: string;
	synergyLevels: SynergyLevelDto[];
}

export interface GameClass {
	id: string;
	name: string;
	description: string;
	icon: string;
	synergyLevels: SynergyLevelDto[];
}

export interface HeroStats {
	health: number;
	attackDamage: number;
	attackSpeed: number;
	armor: number;
	magicResist: number;
}

export interface Hero {
	id: string;
	name: string;
	description: string;
	icon: string;
	quality: QualityTier;
	cost: number;
	baseStats: HeroStats;
	abilityName: string;
	abilityDescription: string;
}

export interface Item {
	id: string;
	name: string;
	description: string;
	icon: string;
	cost: number;
}

export interface Relic {
	id: string;
	name: string;
	description: string;
	icon: string;
	tier: number;
}

export interface ActiveSynergy {
	name: string;
	description: string;
	currentCount: number;
	requiredCount: number;
}

export interface SquadStats {
	health: number;
	attackDamage: number;
	attackSpeed: number;
	armor: number;
	magicResist: number;
	raceSynergies: ActiveSynergy[];
	classSynergies: ActiveSynergy[];
}

export interface SquadSlot {
	index: number;
	heroId: string | null;
	stars: 1 | 2 | 3;
}

export interface SquadRequest {
	name?: string;
	slots: SquadSlotRequest[];
}

export interface SquadSlotRequest {
	index: number;
	heroId?: string;
	stars: number;
}
