# Build Configuration Fix Plan

## Problem
Current project uses Tailwind v4 with @tailwindcss/vite plugin, which requires native modules. This causes GitHub Actions builds to fail with "Cannot find native binding" errors. Also missing proper PostCSS setup and no GitHub Actions workflow configured.

## Approach
1. **Downgrade to Tailwind v3** - Remove @tailwindcss/vite, use PostCSS instead
2. **Create PostCSS & Tailwind configs** - Set up standard configuration files
3. **Update CSS syntax** - Convert from Tailwind v4 to v3 syntax
4. **Update vite.config.ts** - Remove tailwindcss plugin
5. **Create GitHub Actions workflow** - Add CI/CD with proper Node version, caching strategy
6. **Document the configuration** - Create build guide for team

## Todos
- downgrade-tailwind: ✅ DONE - Downgrade tailwindcss v4 to v3, remove @tailwindcss/vite
- create-postcss-config: ✅ DONE - Create postcss.config.js with tailwindcss and autoprefixer
- create-tailwind-config: ✅ DONE - Create tailwind.config.js with content paths
- update-css-syntax: ✅ DONE - Update src/index.css from v4 to v3 syntax (@tailwind directives)
- update-vite-config: ✅ DONE - Remove tailwindcss plugin from vite.config.ts
- create-github-workflow: ✅ DONE - Create .github/workflows/android-release.yml for CI/CD
- add-nvmrc: ✅ DONE - Create .nvmrc with Node 22
- verify-build: ✅ DONE - Test npm install and npm run build locally
- create-docs: ✅ DONE - Document the build configuration in BUILDING.md
- fix-gradle-wrapper: ✅ DONE - Fix corrupt gradle-wrapper.jar and update .gitignore

## Notes
- Tailwind v3 → no native modules = GitHub Actions compatible
- PostCSS approach is battle-tested and reliable
- Node 22 requirement for Capacitor compatibility
- npm install (not npm ci) for proper peer dependency handling in CI
