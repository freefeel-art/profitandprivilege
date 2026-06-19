# PROFITANDPRIVILEGE WORKFLOW

## Core Rule

Always work from the local Linux repository.

Repository is the source of truth.

Avoid editing files in GitHub web UI unless absolutely necessary.

---

## Development Environment

Primary:
- Linux terminal
- Gemini CLI

Secondary:
- ChatGPT (planning, review, architecture)

Analysis only:
- Google AI Studio

Do not use AI Studio for repository modifications.

---

## Terminal First

Prefer terminal commands over:

- GitHub web editing
- Manual copy/paste
- Browser workflows

If a task can be completed in terminal, use terminal.

---

## Command Style

Prefer chained Linux commands:

Example:

cd ~/profitandprivilege/apps/opportunity-validator && \
npm run build

instead of multiple separate commands.

---

## Project Status

Current project status is maintained in:

PROJECT_STATUS.md

When starting a new session:

1. Read PROJECT_STATUS.md
2. Identify Next Task
3. Continue work

---

## End Of Day Procedure

Before ending a work session:

1. Verify project state
2. Update PROJECT_STATUS.md
3. Commit changes
4. Push to GitHub

Example:

git add . && \
git commit -m "Describe work completed" && \
git push

---

## Decision Rule

Do not start new systems while current priority is unfinished.

Current order:

Opportunity Validator
↓
Validation
↓
Deployment
↓
Feedback
↓
Next product

---

## AI Usage

Gemini:
- Implementation
- Coding
- Refactoring

ChatGPT:
- Planning
- Review
- Architecture
- Prioritization

AI Studio:
- Brainstorming
- Research
- Data generation

---

## Golden Question

Before doing any work ask:

"Does this move the current priority forward?"

If not, do not do it.
