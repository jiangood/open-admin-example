# Task 3 Report: Update .env with VITE_ prefix

**Status:** DONE

## Changes Made

Modified `web/.env` to prefix Vite-exposed environment variables with `VITE_`:

| Before | After |
|--------|-------|
| `SERVLET_CONTEXT=/example` | `VITE_SERVLET_CONTEXT=/example` |
| `# THEME_PRIMARY_COLOR=...` | `# VITE_THEME_PRIMARY_COLOR=...` |
| `# THEME_SUCCESS_COLOR=...` | `# VITE_THEME_SUCCESS_COLOR=...` |
| `# THEME_WARNING_COLOR=...` | `# VITE_THEME_WARNING_COLOR=...` |
| `# THEME_ERROR_COLOR=...` | `# VITE_THEME_ERROR_COLOR=...` |
| `# THEME_BACKGROUND_COLOR=...` | `# VITE_THEME_BACKGROUND_COLOR=...` |
| `# PUBLIC_PAGES=/login,/test/**` | `# VITE_PUBLIC_PAGES=/login,/test/**` |

Also updated the comment: `THEME_PRIMARY_COLOR` → `VITE_THEME_PRIMARY_COLOR`

`PORT=8090` and `# SERVER_PORT=8080` were kept unchanged (PORT is a Vite dev server config, SERVER_PORT is not client-exposed).

## Verification

File content matches the task brief exactly (22 lines).

## Commit

```
3b15b84 chore: prefix env vars with VITE_ for Vite compatibility
```
