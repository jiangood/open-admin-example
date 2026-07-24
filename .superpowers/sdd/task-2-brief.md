### Task 2: Update package.json

**File:** Modify `web/package.json`

- [ ] **Step 1: Update dependencies and scripts**

Replace scripts (`umi dev` → `vite`, `umi build` → `vite build`), remove `umi` and `@umijs/plugins`, add `vite`, `@vitejs/plugin-react`, `less`, `typescript`:

```json
{
  "name": "open-admin-example",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@jiangood/open-admin": "2.5.9",
    "@ant-design/icons": "^6.0.0",
    "antd": "^6.0.0",
    "axios": "^1.13.2",
    "dayjs": "^1.11.13",
    "lodash": "^4.17.23",
    "qs": "^6.14.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/lodash": "^4.17.23",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^6.0.0",
    "less": "^4.2.0",
    "typescript": "^7.0.0",
    "vite": "^8.0.0"
  }
}
```