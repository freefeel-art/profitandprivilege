// Evaluation Registry V1 — Approved and Frozen
// Source: docs/EVALUATION-REGISTRY-V1.md

export interface CategoryScores {
  competition: number;
  startupDifficulty: number;
  fulfillmentDifficulty: number;
  timeToRevenue: number;
  economicPotential: number;
  distributionDifficulty: number;
  testability: number;
}

export interface RegistryEntry {
  name: string;
  scores: CategoryScores;
}

export const REGISTRY: RegistryEntry[] = [
  {
    name: 'Micro SaaS',
    scores: {
      competition: 4,
      startupDifficulty: 3,
      fulfillmentDifficulty: 8,
      timeToRevenue: 4,
      economicPotential: 10,
      distributionDifficulty: 4,
      testability: 5,
    },
  },
  {
    name: 'AI Agency',
    scores: {
      competition: 3,
      startupDifficulty: 7,
      fulfillmentDifficulty: 4,
      timeToRevenue: 8,
      economicPotential: 5,
      distributionDifficulty: 5,
      testability: 8,
    },
  },
  {
    name: 'Affiliate Marketing',
    scores: {
      competition: 3,
      startupDifficulty: 8,
      fulfillmentDifficulty: 9,
      timeToRevenue: 4,
      economicPotential: 7,
      distributionDifficulty: 3,
      testability: 5,
    },
  },
  {
    name: 'Consulting',
    scores: {
      competition: 5,
      startupDifficulty: 9,
      fulfillmentDifficulty: 3,
      timeToRevenue: 8,
      economicPotential: 5,
      distributionDifficulty: 6,
      testability: 9,
    },
  },
  {
    name: 'E-commerce',
    scores: {
      competition: 2,
      startupDifficulty: 5,
      fulfillmentDifficulty: 3,
      timeToRevenue: 6,
      economicPotential: 6,
      distributionDifficulty: 3,
      testability: 6,
    },
  },
  {
    name: 'Local Business',
    scores: {
      competition: 5,
      startupDifficulty: 5,
      fulfillmentDifficulty: 4,
      timeToRevenue: 8,
      economicPotential: 6,
      distributionDifficulty: 7,
      testability: 8,
    },
  },
  {
    name: 'Network Marketing',
    scores: {
      competition: 3,
      startupDifficulty: 8,
      fulfillmentDifficulty: 7,
      timeToRevenue: 6,
      economicPotential: 3,
      distributionDifficulty: 4,
      testability: 7,
    },
  },
  {
    name: 'YouTube Channel',
    scores: {
      competition: 3,
      startupDifficulty: 7,
      fulfillmentDifficulty: 8,
      timeToRevenue: 2,
      economicPotential: 7,
      distributionDifficulty: 4,
      testability: 5,
    },
  },
];
