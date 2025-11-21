/**
 * Type definitions for the ARC Raiders game database
 * Generated from data/dataset.json
 */

/**
 * Localized string object with translations for multiple languages
 */
export interface LocalizedString {
  en: string;
  de?: string;
  fr?: string;
  es?: string;
  pt?: string;
  pl?: string;
  no?: string;
  da?: string;
  it?: string;
  ru?: string;
  ja?: string;
  "zh-TW"?: string;
  uk?: string;
  "zh-CN"?: string;
  kr?: string;
  tr?: string;
  hr?: string;
  sr?: string;
}

/**
 * Bot threat level
 */
export type BotThreat = "Low" | "Moderate" | "High" | "Critical" | "Extreme";

/**
 * Bot/enemy unit in the game
 */
export interface Bot {
  id: string;
  name: string;
  image: string;
  type: string;
  threat: BotThreat;
  description: string;
  weakness: string;
  maps: string[];
  destroyXp: number;
  lootXp: number;
  drops: string[];
}

/**
 * Item rarity level
 */
export type ItemRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

/**
 * Item effect with localized name and value
 */
export interface ItemEffect {
  [key: string]: LocalizedString & {
    value: string;
  };
}

/**
 * Recipe ingredients (maps item IDs to quantities)
 */
export interface Recipe {
  [itemId: string]: number;
}

/**
 * Recycle output (maps resource types to quantities)
 */
export interface RecycleOutput {
  [resourceType: string]: number;
}

/**
 * Game item (weapons, consumables, resources, etc.)
 */
export interface Item {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  type: string;
  value: number;
  rarity: ItemRarity;
  recyclesInto: RecycleOutput;
  weightKg: number;
  stackSize: number;
  effects?: ItemEffect;
  updatedAt: string;
  recipe?: Recipe;
  craftBench?: string | string[];
  image: string;
}

/**
 * Quest reward item with quantity
 */
export interface QuestRewardItem {
  itemId: string;
  quantity: number;
}

/**
 * Game quest/mission
 */
export interface Quest {
  id: string;
  updatedAt: string;
  name: LocalizedString;
  trader: string;
  objectives: LocalizedString[];
  rewardItemIds: QuestRewardItem[];
  requiredItemIds?: QuestRewardItem[];
  xp: number;
  previousQuestIds: string[];
  nextQuestIds: string[];
}

/**
 * Workstation upgrade level requirement
 */
export interface WorkstationLevelRequirement {
  itemId: string;
  quantity: number;
}

/**
 * Workstation upgrade level
 */
export interface WorkstationLevel {
  level: number;
  requirementItemIds: WorkstationLevelRequirement[];
}

/**
 * Crafting workstation/bench
 */
export interface Workstation {
  id: string;
  name: LocalizedString;
  maxLevel: number;
  levels: WorkstationLevel[];
}

/**
 * Game map/location
 */
export interface Map {
  id: string;
  name: LocalizedString;
  image: string;
}

/**
 * Complete game dataset structure
 */
export interface GameDataset {
  bots: Bot[];
  items: Item[];
  quests: Quest[];
  workstations: Workstation[];
  maps: Map[];
}
