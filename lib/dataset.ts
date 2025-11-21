/**
 * Utility functions for loading and working with the game dataset
 */

import type { GameDataset, Bot, Item, Quest, Workstation, Map } from "@/types/dataset";
import datasetJson from "@/data/dataset.json";

/**
 * The complete game dataset with proper typing
 */
export const dataset: GameDataset = datasetJson as GameDataset;

/**
 * Get all bots
 */
export function getBots(): Bot[] {
  return dataset.bots;
}

/**
 * Get a bot by ID
 */
export function getBotById(id: string): Bot | undefined {
  return dataset.bots.find((bot) => bot.id === id);
}

/**
 * Get all items
 */
export function getItems(): Item[] {
  if (process.env.NEXT_PUBLIC_HIDE_COSMETICS === "true") {
    return dataset.items.filter((item) => item.type !== "Cosmetic");
  }
  return dataset.items;
}

/**
 * Get an item by ID
 */
export function getItemById(id: string): Item | undefined {
  return dataset.items.find((item) => item.id === id);
}

/**
 * Get items by rarity
 */
export function getItemsByRarity(rarity: Item["rarity"]): Item[] {
  return dataset.items.filter((item) => item.rarity === rarity);
}

/**
 * Get items that have a recipe (craftable items)
 */
export function getCraftableItems(): Item[] {
  return dataset.items.filter((item) => item.recipe !== undefined);
}

/**
 * Get all quests
 */
export function getQuests(): Quest[] {
  return dataset.quests;
}

/**
 * Get a quest by ID
 */
export function getQuestById(id: string): Quest | undefined {
  return dataset.quests.find((quest) => quest.id === id);
}

/**
 * Get quests by trader
 */
export function getQuestsByTrader(trader: string): Quest[] {
  return dataset.quests.filter((quest) => quest.trader === trader);
}

/**
 * Get all workstations
 */
export function getWorkstations(): Workstation[] {
  return dataset.workstations;
}

/**
 * Get a workstation by ID
 */
export function getWorkstationById(id: string): Workstation | undefined {
  return dataset.workstations.find((station) => station.id === id);
}

export function getWorkstationsUpgradedByItemId(itemId: string): string[] {
  const results: string[] = [];
  for (const station of dataset.workstations) {
    const upgradeItemIds = station.levels.flatMap((l) => l.requirementItemIds.map((r) => r.itemId));
    if (upgradeItemIds.includes(itemId)) results.push(station.id);
  }
  return results;
}

export function getQuestsThatRequireItemId(itemId: string): string[] {
  const results: string[] = [];
  for (const quest of dataset.quests) {
    const requiredItemIds = quest?.requiredItemIds?.flatMap((r) => r.itemId);
    if (requiredItemIds?.includes(itemId)) results.push(quest.id);
  }
  return results;
}

/**
 * Get all maps
 */
export function getMaps(): Map[] {
  return dataset.maps;
}

/**
 * Get a map by ID
 */
export function getMapById(id: string): Map | undefined {
  return dataset.maps.find((map) => map.id === id);
}

export function getArcsThatDropItem(itemId: string): string[] {
  const results: string[] = [];
  for (const arc of dataset.bots) {
    if (arc.drops.includes(itemId)) results.push(arc.id);
  }
  return results;
}

export function getItemsCraftedWithItem(itemId: string): string[] {
  const results: string[] = [];
  for (const item of dataset.items) {
    const recipeItems = Object.keys(item.recipe ?? {});
    if (recipeItems.includes(itemId)) results.push(item.id);
  }
  return results;
}
