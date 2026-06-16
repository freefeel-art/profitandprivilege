import type { CategoryScores } from './registry';

export interface Report {
  strengths: string[];
  risks: string[];
  interpretation: string;
  actions: string[];
}

export function generateStrengths(scores: CategoryScores): string[] {
  const strengths: string[] = [];

  if (scores.competition >= 7) {
    strengths.push('Limited competitive pressure in this market');
  }

  if (scores.startupDifficulty >= 7) {
    strengths.push('Low barrier to entry with minimal capital requirements');
  }

  if (scores.fulfillmentDifficulty >= 8) {
    strengths.push('Highly scalable delivery — revenue grows without proportional labor');
  } else if (scores.fulfillmentDifficulty === 7) {
    strengths.push('Manageable fulfillment with reasonable operational requirements');
  }

  if (scores.timeToRevenue >= 7) {
    strengths.push('Fast path to first revenue');
  } else if (scores.timeToRevenue === 6) {
    strengths.push('Reasonable path to initial revenue relative to other models');
  }

  if (scores.economicPotential === 10) {
    strengths.push('Exceptional economic ceiling — recurring revenue, high scalability, and strong exit potential');
  } else if (scores.economicPotential >= 8) {
    strengths.push('Strong long-term economic potential with meaningful recurring revenue and asset value');
  } else if (scores.economicPotential === 7) {
    strengths.push('Solid long-term economic potential with real scalability and asset value');
  } else if (scores.economicPotential === 6) {
    strengths.push('Viable long-term economic potential with brand-building and exit opportunity');
  }

  if (scores.distributionDifficulty >= 7) {
    strengths.push('Accessible customer acquisition channels with low cost to reach buyers');
  } else if (scores.distributionDifficulty === 6) {
    strengths.push('Established channels exist to reach early customers without heavy marketing spend');
  }

  if (scores.testability >= 7) {
    strengths.push('Fast and inexpensive to validate with quick market feedback');
  } else if (scores.testability === 6) {
    strengths.push('Testable with a small initial investment before full commitment');
  }

  return strengths;
}

export function generateRisks(scores: CategoryScores): string[] {
  const risks: string[] = [];

  if (scores.competition <= 3) {
    risks.push('Highly saturated market — standing out requires significant differentiation');
  } else if (scores.competition === 4) {
    risks.push('Competitive market — a clear differentiation strategy is essential');
  }

  if (scores.startupDifficulty <= 4) {
    risks.push('High startup complexity — significant technical skill or capital required to launch');
  }

  if (scores.fulfillmentDifficulty <= 4) {
    risks.push('Operationally demanding — delivery requires significant ongoing effort and limits scale');
  }

  if (scores.timeToRevenue <= 3) {
    risks.push('Very slow path to first revenue — extended period before meaningful cash flow');
  } else if (scores.timeToRevenue === 4) {
    risks.push('Slow path to first revenue — patience required before meaningful cash flow');
  }

  if (scores.economicPotential <= 4) {
    risks.push('Limited long-term economic ceiling — revenue is structurally constrained');
  } else if (scores.economicPotential === 5) {
    risks.push('Economic ceiling is constrained — limited scalability and exit potential');
  }

  if (scores.distributionDifficulty <= 3) {
    risks.push('Customer acquisition is difficult and expensive — distribution requires serious investment');
  } else if (scores.distributionDifficulty === 4) {
    risks.push('Customer acquisition requires consistent investment and effort');
  }

  if (scores.testability <= 4) {
    risks.push('Validation is slow or expensive — testing the model requires significant time or capital');
  }

  return risks;
}

export function generateInterpretation(name: string, scores: CategoryScores): string {
  let economicProfile: string;
  if (scores.economicPotential === 10) {
    economicProfile = `${name} offers an exceptional economic ceiling through recurring revenue, strong scalability, and high exit potential.`;
  } else if (scores.economicPotential >= 8) {
    economicProfile = `${name} offers strong long-term economic potential with meaningful recurring revenue and asset value.`;
  } else if (scores.economicPotential >= 6) {
    economicProfile = `${name} offers viable long-term economic potential with real scalability and asset value in well-executed cases.`;
  } else if (scores.economicPotential === 5) {
    economicProfile = `${name} offers solid income potential for active operators, though the model is constrained by time and limits scalability.`;
  } else {
    economicProfile = `${name} carries limited long-term economic potential, with revenue structurally constrained for most participants.`;
  }

  const challenges = [
    { score: scores.competition, label: 'competitive market pressure' },
    { score: scores.startupDifficulty, label: 'startup complexity' },
    { score: scores.fulfillmentDifficulty, label: 'operational delivery demands' },
    { score: scores.timeToRevenue, label: 'slow path to revenue' },
    { score: scores.distributionDifficulty, label: 'customer acquisition difficulty' },
  ]
    .filter((c) => c.score <= 5)
    .sort((a, b) => a.score - b.score);

  let challengeSentence: string;
  if (challenges.length >= 2) {
    challengeSentence = `The primary challenges are ${challenges[0].label} and ${challenges[1].label}.`;
  } else if (challenges.length === 1) {
    challengeSentence = `The primary challenge is ${challenges[0].label}.`;
  } else {
    challengeSentence = 'The opportunity profile is broadly favorable across all evaluated dimensions.';
  }

  const easyToStart = scores.startupDifficulty >= 7;
  const fastRevenue = scores.timeToRevenue >= 7;
  const highCeiling = scores.economicPotential >= 8;
  const mediumCeiling = scores.economicPotential >= 6;

  let suitability: string;
  if (fastRevenue && highCeiling) {
    suitability = 'This opportunity suits operators seeking both immediate income and strong long-term economic upside.';
  } else if (fastRevenue && !mediumCeiling) {
    suitability = 'This opportunity suits operators seeking fast income with clear expectations about long-term scalability limits.';
  } else if (fastRevenue) {
    suitability = 'This opportunity suits operators who want fast market entry and are comfortable working within a defined economic model.';
  } else if (easyToStart && highCeiling) {
    suitability = 'This opportunity suits patient builders — it is easy to begin but requires sustained effort before economic potential is realized.';
  } else if (easyToStart && mediumCeiling) {
    suitability = 'This opportunity suits patient operators who value low startup barriers and long-term asset building over fast income.';
  } else if (highCeiling) {
    suitability = 'This opportunity suits builders willing to invest significant time before seeing meaningful economic returns.';
  } else if (easyToStart) {
    suitability = 'This opportunity suits operators who want low-barrier entry and are focused on near-term income over long-term asset building.';
  } else {
    suitability = 'This opportunity is best pursued with clear differentiation, a defined niche, and a patient execution timeline.';
  }

  return `${economicProfile} ${challengeSentence} ${suitability}`;
}

export function generateActions(scores: CategoryScores): string[] {
  const actions: string[] = [];

  actions.push('Select a specific niche before committing resources or time.');

  if (scores.distributionDifficulty <= 4) {
    actions.push('Define your primary customer acquisition channel before launch.');
  }

  if (scores.timeToRevenue <= 4) {
    actions.push('Plan for an extended build phase — validate demand before investing heavily.');
  }

  if (scores.competition <= 4) {
    actions.push('Define your differentiation — identify why a customer would choose you over existing alternatives.');
  }

  if (scores.startupDifficulty <= 4) {
    actions.push('Map all startup requirements — skills, capital, and regulatory — before committing.');
  }

  if (scores.economicPotential <= 5) {
    actions.push('Assess your pricing model and realistic income ceiling before investing significant time.');
  }

  if (scores.fulfillmentDifficulty <= 4) {
    actions.push('Design your delivery and fulfillment model before acquiring your first customer.');
  }

  if (scores.distributionDifficulty >= 7) {
    actions.push('Set up your primary distribution channels immediately — your acquisition path is accessible.');
  }

  if (scores.timeToRevenue >= 8) {
    actions.push('Prioritize landing a first paying customer quickly — the revenue timeline is favorable.');
  }

  if (scores.startupDifficulty >= 8 && scores.economicPotential <= 5) {
    actions.push('Define your expertise positioning clearly — low barriers mean significant competition from other new entrants.');
  }

  if (scores.testability >= 7) {
    actions.push('Run a minimum viable test before building or investing further.');
  } else {
    actions.push('Define the smallest possible experiment that validates core demand.');
  }

  return actions.slice(0, 5);
}

export function generateReport(name: string, scores: CategoryScores): Report {
  return {
    strengths: generateStrengths(scores),
    risks: generateRisks(scores),
    interpretation: generateInterpretation(name, scores),
    actions: generateActions(scores),
  };
}
