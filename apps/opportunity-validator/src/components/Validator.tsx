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

function scoreIndicator(score: number): string {
  if (score >= 8) return 'bg-emerald-400';
  if (score >= 5) return 'bg-amber-400';
  return 'bg-red-400';
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
      <div className="space-y-6">

        {/* 1. Opportunity Score — dominant hero */}
        <section className="rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-sm text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{result.date}</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-800">{result.name}</h2>
          <div className="mt-8">
            <span className="text-8xl font-bold tracking-tight text-slate-900">{result.score}</span>
            <span className="text-2xl font-normal text-slate-400"> / 100</span>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Opportunity Score</p>
          <div className="mt-5">
            <span className={`inline-flex items-center rounded-full border px-5 py-1.5 text-sm font-semibold ${verdictStyle(result.verdict)}`}>
              {result.verdict}
            </span>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-slate-700 max-w-lg mx-auto">{result.report.interpretation}</p>
        </section>

        {/* 2. Category Scores */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Category Analysis</h3>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {CATEGORY_ORDER.map((key, i) => (
              <div
                key={key}
                className={`flex items-center justify-between px-5 py-4 ${i < CATEGORY_ORDER.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <span className="text-sm font-medium text-slate-700">{CATEGORY_LABELS[key]}</span>
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${scoreIndicator(result.scores[key])}`} />
                  <span className="font-mono text-sm font-semibold text-slate-900">
                    {result.scores[key]}<span className="font-normal text-slate-400"> / 10</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Critical Risks */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Critical Risks</h3>
          {result.report.risks.length > 0 ? (
            <ul className="space-y-2">
              {result.report.risks.map((r, i) => (
                <li key={i} className="flex gap-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                  <span className="flex-shrink-0 font-bold leading-5 text-red-400">−</span>
                  <span className="leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No significant risks identified.</p>
          )}
        </section>

        {/* 4. Recommended Actions */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Recommended Actions</h3>
          <ol className="space-y-2">
            {result.report.actions.map((action, i) => (
              <li key={i} className="flex gap-4 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <span className="flex-shrink-0 w-5 font-mono text-xs font-bold text-slate-300 mt-0.5">{i + 1}.</span>
                <span className="text-sm leading-relaxed text-slate-700">{action}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 5. Key Strengths */}
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Key Strengths</h3>
          {result.report.strengths.length > 0 ? (
            <ul className="space-y-2">
              {result.report.strengths.map((s, i) => (
                <li key={i} className="flex gap-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  <span className="flex-shrink-0 font-bold leading-5 text-emerald-500">+</span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No significant strengths identified.</p>
          )}
        </section>

        <div className="border-t border-slate-100 pt-6">
          <p className="mb-5 text-xs text-slate-500">The score is guidance. The score is never the decision.</p>
          <button
            onClick={reset}
            className="text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-800 transition-colors"
          >
            Evaluate another opportunity
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm leading-relaxed text-slate-700">
        Select a business opportunity to receive a structured evaluation using the
        ProfitAndPrivilege Scoring Framework. The evaluation covers seven categories
        and produces an Opportunity Score from 1 to 100.
      </p>
      <div className="mt-7 space-y-4">
        <div>
          <label htmlFor="opportunity" className="block mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Opportunity
          </label>
          <select
            id="opportunity"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-shadow"
          >
            <option value="">Select an opportunity...</option>
            {REGISTRY.map((entry) => (
              <option key={entry.name} value={entry.name}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={evaluate}
          disabled={!selected}
          className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-700 active:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Evaluate Opportunity
        </button>
      </div>
    </div>
  );
}
