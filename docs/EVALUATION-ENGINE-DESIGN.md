# Evaluation Engine Design

## Purpose

Define the minimum viable approach for generating category scores
from an opportunity input without AI, a database, or user scoring.

---

## The Problem

The Opportunity Validator must evaluate an opportunity and return
scores for seven categories:

1. Competition Score
2. Startup Difficulty
3. Fulfillment Difficulty
4. Time To Revenue
5. Economic Potential
6. Distribution Difficulty
7. Testability

The user provides only an opportunity name or type.

The system must produce the scores.

---

## Constraints

- No AI
- No database
- No user scoring

---

## Available Approaches

### Option A: Hardcoded Evaluation Registry

Define scores for a fixed set of known opportunity types
directly in the application as a static data structure.

The system receives the opportunity name, looks it up in the
registry, and returns the pre-assigned scores.

Characteristics:

- Deterministic. Same input always produces the same output.
- Transparent. Scores are visible and auditable in the source.
- Requires no external systems.
- Covers only opportunity types explicitly defined in the registry.
- New opportunity types require a code change.

---

### Option B: Keyword Rule Engine

Parse the opportunity name for keywords and apply scoring rules.

Example:

Input contains "SaaS" → apply recurring revenue rules → raise
Economic Potential. Input contains "YouTube" → apply content
distribution rules → raise Distribution Difficulty.

Characteristics:

- More flexible than a registry. Handles variations in naming.
- Rules are still static and auditable.
- Requires defining and maintaining a keyword-to-rule mapping.
- Risk of partial matches producing misleading scores.
- Significantly more complex to build correctly for MVP.

---

### Option C: Opportunity Category Selection

The user does not type a name. The user selects from a predefined
list of opportunity types.

The system maps each selection to its evaluation scores.

Characteristics:

- Eliminates unmatched input entirely.
- Scores are still hardcoded per type.
- Requires designing a selection UI instead of a text input.
- Functionally identical to Option A with a different input method.

---

## Recommendation for MVP

**Option A: Hardcoded Evaluation Registry**

Implemented as Option C for the user interface.

Reasoning:

The documentation lists a defined set of opportunity examples.
These are the opportunities the MVP is designed to evaluate.
A static registry covering those types is sufficient to validate
the concept.

User selects an opportunity type from a list.
System returns the pre-defined evaluation.
Report is generated from those scores.

This is the minimum system that satisfies the specification
without AI, a database, or user scoring.

---

## Scope of the Registry

The MVP registry covers the opportunity types named across
the documentation:

- AI Agency
- Affiliate Marketing
- Consulting
- E-commerce
- Local Business / Local Directory
- Micro SaaS / SaaS Business
- Network Marketing
- YouTube Channel

Scores for each type must be defined before implementation begins.

---

## Open Question

The category scores in the registry must be authored by someone.

The documentation provides one complete example:

Micro SaaS from OPPORTUNITY-REPORT-SPEC.md:

- Competition Score: 4
- Startup Difficulty: 3
- Fulfillment Difficulty: 8
- Time To Revenue: 4
- Economic Potential: 10
- Distribution Difficulty: 4
- Testability: 5

The remaining seven opportunity types have no defined scores.

Before implementation can proceed, scores must be defined
for each remaining type.

This is a human decision, not a system decision.

---

## What This Design Does Not Include

- Dynamic scoring of arbitrary opportunity types
- Market data or trend signals
- Any scoring variation based on context, market conditions,
  or founder characteristics

Those capabilities belong to future phases.

---

## Status

Version: 1.0
Status: Draft — pending score definitions for remaining opportunity types
