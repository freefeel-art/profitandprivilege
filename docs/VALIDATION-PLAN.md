# Validation Plan — Opportunity Validator v0.2

Version: 1.0
Status: Active
Date: 2026-06-16

---

## Validation Goals

Determine whether the Opportunity Validator produces evaluations that real users find credible, useful, and actionable.

This is not a usability test. This is a framework test.

Specific questions this validation must answer:

1. Do users trust the Opportunity Score?
2. Does the report produce insight they could not quickly derive themselves?
3. Are the Recommended Actions specific enough to be useful?
4. Do the Category Scores feel accurately calibrated to the opportunity?
5. Would users return to the tool when evaluating a real decision?

---

## Success Criteria

Validation succeeds if:

- At least 70% of testers describe the Opportunity Score as credible or trustworthy.
- At least 70% of testers describe at least one Recommended Action as immediately applicable.
- At least 60% of testers say the evaluation changed or sharpened their thinking about the opportunity.
- Zero testers describe the output as generic or interchangeable across opportunities.
- At least one tester uses the tool to evaluate an opportunity they are actively considering.

---

## Failure Criteria

Validation fails if any of the following occur:

- Majority of testers question the accuracy of the scores without being able to articulate why.
- Recommended Actions are described as obvious or unhelpful by more than one tester.
- Testers cannot identify the most important finding from the report within 60 seconds.
- The Opportunity Score is described as arbitrary or unexplained.
- A tester rates two clearly different opportunities as producing indistinguishable output.

A single failure condition is sufficient to trigger a framework review before proceeding.

---

## User Testing Process

### Tester Profile

- 3 to 5 testers minimum.
- Must have evaluated or seriously considered a business opportunity in the past 12 months.
- Mix of backgrounds preferred: operator, builder, investor, side-income seeker.
- No testers who have seen the scoring framework or contributed to the project.

### Session Format

Each session is unmoderated or lightly moderated. Tester completes the following:

1. Open the Opportunity Validator.
2. Select an opportunity they have personal familiarity with.
3. Read the full report without guidance.
4. Answer the debrief questions below.

Estimated session time: 10 to 15 minutes.

### Debrief Questions

Ask after the session, in writing or verbally:

1. Does the Opportunity Score feel accurate for this opportunity? Why or why not?
2. Which category score surprised you most? Was the surprise positive or negative?
3. Were the Critical Risks ones you would have identified yourself?
4. Which Recommended Action would you act on first?
5. Did the report change how you think about this opportunity?
6. Would you use this tool before committing to a new opportunity?
7. What is the single most important thing missing from this evaluation?

---

## Metrics To Track

### Credibility

- % of testers who describe the Opportunity Score as accurate or trustworthy.
- % of testers who question a specific category score and whether their objection is valid.

### Usefulness

- % of testers who identify at least one Recommended Action they would take.
- % of testers who say the report surfaced something they had not considered.

### Differentiation

- Whether testers who evaluate multiple opportunities report meaningfully different outputs.
- Whether the interpretation paragraph reads as specific to the opportunity or generic.

### Engagement Signal

- Did the tester evaluate more than one opportunity without being prompted?
- Did the tester ask how they could use the tool for an opportunity not in the registry?

### Qualitative

- Collect verbatim responses to debrief question 7 (what is missing).
- Note any category scores that multiple testers independently dispute.

---

## Decision Framework

After collecting results, apply the following decision logic.

### If validation succeeds

- Mark the framework as validated at current scope.
- Proceed to registry expansion (add more opportunities).
- Begin planning v0.3 based on qualitative feedback from question 7.

### If a single failure condition is triggered

- Identify whether the failure is a framework problem or a presentation problem.
  - Framework problem: scoring weights, category definitions, or thresholds are wrong. Review SCORING-ENGINE.md and EVALUATION-REGISTRY-V1.md before changing anything.
  - Presentation problem: the UI does not communicate the evaluation clearly. Scope a targeted UI fix.
- Do not expand the registry until the failure is resolved.

### If multiple failure conditions are triggered

- Pause all feature development.
- Conduct a full framework review with at least two testers in a structured session.
- Do not ship v0.3 until a second validation round passes.

### If testers consistently request a missing opportunity type

- Add it to the registry backlog.
- Evaluate against the scoring framework before adding.
- Do not modify the framework to accommodate a single opportunity.

---

## What This Validation Does Not Cover

- Technical correctness of the scoring engine (covered by QA-AUDIT.md).
- UI accessibility or device compatibility.
- Performance or load behavior.
- Monetization or pricing validation.

These are separate concerns addressed in other phases.
