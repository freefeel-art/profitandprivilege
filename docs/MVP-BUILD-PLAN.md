# Opportunity Validator MVP Build Plan

## Purpose

Define the exact implementation order for the first working MVP.

The goal is not technical perfection.

The goal is validation.

---

# Success Definition

A user can:

1. Enter an opportunity.
2. Receive an evaluation.
3. Receive an Opportunity Score.
4. Receive strengths.
5. Receive risks.
6. Receive recommended actions.

The MVP is complete when this workflow functions end-to-end.

---

# Build Order

## Step 1

Opportunity Input

Purpose:

Collect the opportunity to evaluate.

Example:

- Micro SaaS
- Network Marketing
- Consulting
- YouTube Channel

Output:

Opportunity Name

Status:

Required

---

## Step 2

Scoring Engine

Purpose:

Process evaluation categories.

Categories:

- Competition Score
- Startup Difficulty
- Fulfillment Difficulty
- Time To Revenue
- Economic Potential
- Distribution Difficulty
- Testability

Output:

Category Scores

Status:

Required

---

## Step 3

Opportunity Score Generator

Purpose:

Apply framework weighting.

Output:

Opportunity Score

Range:

1 - 100

Status:

Required

---

## Step 4

Report Generator

Purpose:

Generate structured report.

Sections:

- Summary
- Scores
- Strengths
- Risks
- Interpretation
- Recommended Actions
- Verdict

Status:

Required

---

## Step 5

Basic User Interface

Purpose:

Present results clearly.

Requirements:

- Simple
- Fast
- Mobile friendly

No dashboards.

No analytics.

No accounts.

Status:

Required

---

## Step 6

Deployment

Platform:

Netlify

Repository:

GitHub

Objective:

Public MVP availability.

Status:

Required

---

# Explicitly Excluded

Not part of MVP:

- Authentication
- User accounts
- Databases
- Payments
- Memberships
- AI agents
- Dashboards
- Historical tracking
- API integrations

These are future phases.

---

# MVP Completion Criteria

The MVP is complete when:

Input
↓
Evaluation
↓
Scoring
↓
Report
↓
Recommendation

works for real opportunities.

---

# Post-MVP Validation

Collect feedback.

Review scoring accuracy.

Improve framework.

Only after validation may additional features be considered.

---

## Status

Version: 1.0

Status:

Approved
