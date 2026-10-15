# Testing

| Rubric point | How it was tested |
| --- | --- |
| Project is written in JavaScript | Application logic is implemented in `js/*.mjs` and `js/*.js`. |
| Project is in its own repository | The repository contains this music data project only. |
| Supplied scaffolding has been adapted | `js/script.mjs` contains the application entry point and no placeholder scaffolding comments. |
| At least one non-trivial unit test | Unit tests in `tests/processing.test.mjs` verify sorting, filtering, listening-time totals, consecutive streaks, and every-day songs. |
| Tests run with `npm test` | `npm test` runs both Jest test suites; all 13 tests pass. |
| Four users are available | `getUserIDs()` supplies users 1–4, including the empty user. |
| Questions are calculated from the data | Unit tests in `tests/processing.test.mjs` verify the processing functions used by the frontend. |
| Empty users are handled | User 4 displays an explicit no-listening-data message. |
| Inapplicable questions are hidden | The frontend hides sections when their result has no applicable data. |
| Top genres handle fewer than three genres | Unit tests in `tests/processing.test.mjs` verify user 2 returns only `Pop`. |
| Code is correctly indented and used | `git diff --check` passes; application functions are imported or called by the frontend or tests. |
| Accessibility | To be checked with Lighthouse before submission. |
| Deployment | To be configured and checked by the project owner before submission. |
