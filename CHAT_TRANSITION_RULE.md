# CHAT TRANSITION RULE

When switching to a new chat, always complete the following procedure first.

## Chat Closing Procedure

1. Review PROJECT_STATUS.md

   Determine whether project status has changed during the session.

2. Update PROJECT_STATUS.md if needed

   Update:
   - Current State
   - Completed Work
   - Next Task
   - Last Decision

3. Create Session Summary

   Include:
   - What was completed
   - What decisions were made
   - Current blockers
   - Important discoveries
   - Next task

4. Commit and Push

   Example:

   git add . && \
   git commit -m "Session update" && \
   git push

5. Verify Next Task

   There must always be exactly one clearly defined next task.

6. Switch Chat

## Chat Opening Procedure

1. Read PROJECT_STATUS.md
2. Read latest Session Summary
3. Continue from Next Task
4. Do not re-analyze completed decisions

## Rule

Never switch chats before the Chat Closing Procedure is complete.

The goal is to eliminate repeated context recovery and wasted startup time.
