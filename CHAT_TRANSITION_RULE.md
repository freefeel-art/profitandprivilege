# CHAT TRANSITION RULE

When switching to a new chat, always complete the following procedure first.

## Chat Closing Procedure

1. Update PROJECT_STATUS.md

   - Current State
   - Completed Work
   - Next Task
   - Last Decision

2. Create Session Summary

   Include:
   - What was completed
   - What decisions were made
   - Current blockers
   - Important discoveries
   - Next task

3. Commit and Push

   Example:

   git add . && \
   git commit -m "Session update" && \
   git push

4. Verify Next Task

   There must always be exactly one clearly defined next task.

## Chat Opening Procedure

1. Read PROJECT_STATUS.md
2. Read latest Session Summary
3. Continue from Next Task
4. Do not re-analyze completed decisions

## Rule

Never switch chats before the Chat Closing Procedure is complete.

The goal is to eliminate repeated context recovery and wasted startup time.
