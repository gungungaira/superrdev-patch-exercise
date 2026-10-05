# NOTES

## Summary of changes
- Fixed SQL operator precedence in TaskRepository (missing brackets let the status filter and archived check be bypassed).
- Added priority to search (high/medium/low).
- Changed sort to oldest first with id as tie-breaker, so paging is stable.
- Removed an artificial Thread.sleep in TaskController.
- Return 400 for an invalid status, and sanitized page/pageSize values.
- Frontend: reset page to 1 when search/status changes; fixed stuck "Loading..." on errors; ignored stale responses in useTasks.
Detailed explanations are in the handwritten/ folder.

## What I chose not to change
- Paging is done in memory in the controller; moving it to the database (Pageable) is a bigger change than this patch.
- Did not change the entity's status/priority from String to enum.
- Did not touch db/oracle/ (could not run it locally).

## Biggest remaining risk
All matching rows are loaded and sliced in memory, which will get slow as the table grows. Also, % and _ in the search box act as LIKE wildcards.

## Tools and AI used
I used Claude to help me understand the Spring Boot code (I mostly know Node/JavaScript) and to suggest the fixes. I tested each change in the browser and by calling /api/tasks directly, then wrote the handwritten notes myself.

## Assumptions
- Oldest-first ordering is preferred over newest-first.
