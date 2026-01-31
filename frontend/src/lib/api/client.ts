import type { GameClass, Hero, Item, Race, Relic, SquadRequest, SquadStats } from '$lib/types/encyclopedia';

const API_BASE = 'http://localhost:5000/api';

export async function getRaces(): Promise<Race[]> {
	const res = await fetch(`${API_BASE}/races`);
	if (!res.ok) throw new Error('Failed to fetch races');
	return res.json();
}

export async function getClasses(): Promise<GameClass[]> {
	const res = await fetch(`${API_BASE}/classes`);
	if (!res.ok) throw new Error('Failed to fetch classes');
	return res.json();
}

export async function getHeroes(): Promise<Hero[]> {
	const res = await fetch(`${API_BASE}/heroes`);
	if (!res.ok) throw new Error('Failed to fetch heroes');
	return res.json();
}

export async function getHero(id: string): Promise<Hero> {
	const res = await fetch(`${API_BASE}/heroes/${id}`);
	if (!res.ok) throw new Error('Failed to fetch hero');
	return res.json();
}

export async function getItems(): Promise<Item[]> {
	const res = await fetch(`${API_BASE}/items`);
	if (!res.ok) throw new Error('Failed to fetch items');
	return res.json();
}

export async function getRelics(): Promise<Relic[]> {
	const res = await fetch(`${API_BASE}/relics`);
	if (!res.ok) throw new Error('Failed to fetch relics');
	return res.json();
}

export async function calculateSquad(request: SquadRequest): Promise<SquadStats> {
	const res = await fetch(`${API_BASE}/squad/calculate`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(request)
	});
	if (!res.ok) throw new Error('Failed to calculate squad');
	return res.json();
}

export async function importData(dataDirectory?: string): Promise<void> {
	const params = dataDirectory ? `?dataDirectory=${encodeURIComponent(dataDirectory)}` : '';
	const res = await fetch(`${API_BASE}/import${params}`, { method: 'POST' });
	if (!res.ok) throw new Error('Failed to import data');
}
