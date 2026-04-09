import { scenarios } from '../data/scenarios';

export function useScenario(slug) {
  return scenarios.find((s) => s.slug === slug) || null;
}

export function useScenariosForTradition(traditionId) {
  return scenarios.filter((s) => s.traditions.includes(traditionId));
}
