import { useState } from 'react';
import { REGISTRY } from '../lib/registry';
import type { CategoryScores } from '../lib/registry';
import { calculateOpportunityScore, getVerdict } from '../lib/scoring';
import { generateReport } from '../lib/report';
import type { Report } from '../lib/report';

interface EvaluationResult {
  name: string;
  score: number;
  verdict: string;
  date: string;
  scores: CategoryScores;
  report: Report;
}

const CATEGORY_LABELS: Record<keyof CategoryScores, string> = {
  competition: 'Competition Score',
  startupDifficulty: 'Startup Difficulty',
  fulfillmentDifficulty: 'Fulfillment Difficulty',
  timeToRevenue: 'Time To Revenue',
  economicPotential: 'Economic Potential',
  distributionDifficulty: 'Distribution Difficulty',
  testability: 'Testability',
};

const CATEGORY_ORDER: (keyof CategoryScores)[] = [
  'competition',
  'startupDifficulty',
  'fulfillmentDifficulty',
  'timeToRevenue',
  'economicPotential',
  'distributionDifficulty',
  'testability',
];

function verdictStyle(verdict: string): string {
  if (verdict === 'Exceptional Opportunity') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (verdict === 'Strong Opportunity') return 'bg-green-50 text-green-700 border-green-200';
  if (verdict === 'Viable Opportunity') return 'bg-blue-50 text-blue-700 border-blue-200';
  if (verdict === 'Weak Opportunity') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

export default function Validator() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<EvaluationResult | null>(null);

  function evaluate() {
    const entry = REGISTRY.find((e) => e.name === selected);
    if (!entry) return;
    const score = calculateOpportunityScore(entry.scores);
    const verdict = getVerdict(score);
    const report = generateReport(entry.name, entry.scores);
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setResult({ name: entry.name, score, verdict, date, scores: entry.scores, report });
  }

  function reset() {
    setSelected('');
    setResult(null);
  }

  if (result) {
    return (
      <div className="space-y-8">

        {/* 1. Opportunity Summary */}
        <section className="rounded-lg border border-gray-200 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Opportunity</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">{result.name}</h2>
              <p className="mt-1 text-sm text-gray-400">{result.date}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Opportunity Score</p>
              <p className="mt-1">
                <span className="text-5xl font-bold text-gray-900">{result.score}</span>
                <span className="text-lg font-normal text-gray-400"> / 100</span>
              </p>
            </div>
          </div>
        </section>

        {/* 2. Category Scores */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Category Scores</h3>
          <div className="overflow-hidden rounded-lg border border-gray-100">
            {CATEGORY_ORDER.map((key, i) => (
              <div
                key={key}
                className={`flex items-center justify-between px-4 py-3 ${i < CATEGORY_ORDER.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <span className="text-sm text-gray-700">{CATEGORY_LABELS[key]}</span>
                <span className="font-mono text-sm font-semibold text-gray-900">
                  {result.scores[key]} / 10
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Strengths */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Strengths</h3>
          {result.report.strengths.length > 0 ? (
            <ul className="space-y-2">
              {result.report.strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0 font-bold text-green-500">+</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No significant strengths identified.</p>
          )}
        </section>

        {/* 4. Risks */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Risks</h3>
          {result.report.risks.length > 0 ? (
            <ul className="space-y-2">
              {result.report.risks.map((r, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0 font-bold text-red-400">−</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No significant risks identified.</p>
          )}
        </section>

        {/* 5. Interpretation */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Interpretation</h3>
          <p className="text-sm leading-relaxed text-gray-700">{result.report.interpretation}</p>
        </section>

        {/* 6. Recommended Actions */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Recommended Actions</h3>
          <ol className="space-y-2">
            {result.report.actions.map((action, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="w-4 flex-shrink-0 font-mono font-semibold text-gray-400">{i + 1}.</span>
                <span>{action}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 7. Verdict */}
        <section className="border-t border-gray-100 pt-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Verdict</h3>
          <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-bold ${verdictStyle(result.verdict)}`}>
            {result.verdict}
          </span>
          <p className="mt-6 text-xs text-gray-400">
            The score is guidance. The score is never the decision.
          </p>
        </section>

        <button
          onClick={reset}
          className="text-sm text-gray-400 underline hover:text-gray-700 transition-colors"
        >
          Evaluate another opportunity
        </button>

      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-gray-600">
        Select a business opportunity to receive a structured evaluation using the
        ProfitAndPrivilege Scoring Framework. The evaluation covers seven categories
        and produces an Opportunity Score from 1 to 100.
      </p>
      <div className="space-y-3">
        <label htmlFor="opportunity" className="block text-sm font-medium text-gray-700">
          Opportunity
        </label>
        <select
          id="opportunity"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        >
          <option value="">Select an opportunity...</option>
          {REGISTRY.map((entry) => (
            <option key={entry.name} value={entry.name}>
              {entry.name}
            </option>
          ))}
        </select>
        <button
          onClick={evaluate}
          disabled={!selected}
          className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Evaluate
        </button>
      </div>
    </div>
  );
}
