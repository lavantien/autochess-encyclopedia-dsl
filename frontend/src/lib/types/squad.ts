import type { QualityTier } from './encyclopedia';

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

export const QUALITY_COLORS: Record<QualityTier, string> = {
	common: 'text-slate-300 border-slate-500 bg-slate-900/50',
	uncommon: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/50',
	rare: 'text-blue-400 border-blue-500/50 bg-blue-950/50',
	epic: 'text-purple-400 border-purple-500/50 bg-purple-950/50',
	legendary: 'text-amber-400 border-amber-500/50 bg-amber-950/50'
};

export const QUALITY_BORDER_COLORS: Record<QualityTier, string> = {
	common: '#e2e8f0',
	uncommon: '#4ade80',
	rare: '#60a5fa',
	epic: '#a78bfa',
	legendary: '#fbbf24'
};
