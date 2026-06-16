// Scoring Engine V3 — Source: docs/SCORING-ENGINE.md

import type { CategoryScores } from './registry';

export const WEIGHTS = {
  competition: 0.10,
  startupDifficulty: 0.05,
  fulfillmentDifficulty: 0.15,
  timeToRevenue: 0.05,
  economicPotential: 0.40,
  distributionDifficulty: 0.15,
  testability: 0.10,
} as const;

export function calculateOpportunityScore(scores: CategoryScores): number {
  const weighted =
    scores.competition * WEIGHTS.competition +
    scores.startupDifficulty * WEIGHTS.startupDifficulty +
    scores.fulfillmentDifficulty * WEIGHTS.fulfillmentDifficulty +
    scores.timeToRevenue * WEIGHTS.timeToRevenue +
    scores.economicPotential * WEIGHTS.economicPotential +
    scores.distributionDifficulty * WEIGHTS.distributionDifficulty +
    scores.testability * WEIGHTS.testability;
  return Math.round(weighted * 10);
}

export function getVerdict(score: number): string {
  if (score >= 90) return 'Exceptional Opportunity';
  if (score >= 75) return 'Strong Opportunity';
  if (score >= 60) return 'Viable Opportunity';
  if (score >= 40) return 'Weak Opportunity';
  return 'Poor Opportunity';
}
