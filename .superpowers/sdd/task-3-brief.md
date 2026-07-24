### Task 3: Update .env with VITE_ prefix

**File:** Modify `web/.env`

- [ ] **Step 1: Rename all env vars**

```env
PORT=8090
VITE_SERVLET_CONTEXT=/example
# SERVER_PORT=8080

# ============================================
# Theme customization (optional)
# Uncomment to customize system theme colors.
# Setting VITE_THEME_PRIMARY_COLOR will auto-derive hover/click variants.
# ============================================
# VITE_THEME_PRIMARY_COLOR=#1961AC
# VITE_THEME_SUCCESS_COLOR=#52c41a
# VITE_THEME_WARNING_COLOR=#faad14
# VITE_THEME_ERROR_COLOR=#ff4d4f
# VITE_THEME_BACKGROUND_COLOR=#f5f5f5

# ============================================
# Public pages (optional)
# Comma-separated paths that don't require login/layout.
# Use /** suffix for prefix matching (e.g., /test/** matches /test/foo).
# Default: /login,/test
# ============================================
# VITE_PUBLIC_PAGES=/login,/test/**
```