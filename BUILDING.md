# Build Configuration Guide

This project uses React, Vite, Tailwind CSS v3, and Capacitor for building a cross-platform mobile app.

## Overview

This guide documents the build configuration and explains the critical design decisions that make GitHub Actions builds reliable.

## Key Decisions

### 1. Tailwind CSS v3 (Not v4)

**Why**: Tailwind v4 requires native modules (@tailwindcss/oxide) that cannot be reliably built in GitHub Actions runners. We use v3 with PostCSS instead.

**Benefits**:
- No native module compilation in CI/CD
- Portable across all platforms and CI systems
- Industry-standard PostCSS pipeline
- Full feature parity with v4 for typical projects

### 2. PostCSS Pipeline

**Files**:
- `postcss.config.js` - Enables Tailwind and Autoprefixer
- `tailwind.config.js` - Configures Tailwind CSS with content paths
- `src/index.css` - Uses v3 syntax: `@tailwind base; components; utilities;`

### 3. Node.js 22

**Requirement**: Capacitor CLI requires Node 22+. Enforced via:
- `.nvmrc` - Local development (use nvm)
- `.github/workflows/android-release.yml` - GitHub Actions CI/CD

### 4. npm install (not npm ci) in CI/CD

**Why**: 
- `npm install` handles peer dependencies properly
- Rebuilds native modules if needed
- Works with `--legacy-peer-deps` flag

**Process**:
1. Clear cache: `npm cache clean --force`
2. Remove lock file: `rm -f package-lock.json`
3. Install: `npm install --legacy-peer-deps`

### 5. GitHub Actions Cache: Disabled

**Why**: npm cache can become corrupted in GitHub Actions, causing mysterious build failures.

**Configuration**:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: null  # ← CRITICAL
```

### 6. Explicit Permissions

**Why**: GitHub Actions requires explicit permissions to create releases.

**Configuration**:
```yaml
jobs:
  build:
    permissions:
      contents: write  # ← Required for releases
```

## Development Workflow

### Local Setup
```bash
# Use nvm to switch to Node 22
nvm use

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### CSS Customization

Edit `tailwind.config.js` to extend Tailwind:
```js
theme: {
  extend: {
    colors: { /* ... */ },
    fontFamily: { /* ... */ },
    animation: { /* ... */ },
  },
}
```

Add custom CSS in `src/index.css` using `@layer`:
```css
@layer components {
  .btn-custom { /* ... */ }
}

@layer utilities {
  .my-custom-util { /* ... */ }
}
```

## GitHub Actions: Creating Releases

Tag a version to trigger the Android Release workflow:
```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow will:
1. ✅ Install dependencies with Node 22
2. ✅ Build web assets (Vite + Tailwind)
3. ✅ Sync to Capacitor Android
4. ✅ Build APK with Gradle
5. ✅ Create GitHub Release with APK attached

## Troubleshooting

### "Cannot find native binding for @tailwindcss/oxide"
**Cause**: Tailwind v4 installed  
**Fix**: Use v3 instead: `npm install tailwindcss@3.4.1`

### CSS not loading in dev/production
**Cause**: Missing PostCSS config or wrong CSS syntax  
**Fix**: 
- Verify `postcss.config.js` exists
- Check `src/index.css` has `@tailwind` directives (v3 syntax)
- Restart dev server after config changes

### "npm ERR! code ERESOLVE"
**Cause**: Peer dependency conflicts  
**Fix**: Use `--legacy-peer-deps` flag: `npm install --legacy-peer-deps`

### GitHub Actions build fails
**Cause**: Often npm cache corruption  
**Fix**: The workflow already handles this:
- `cache: null` disables GitHub Actions cache
- `npm cache clean --force` before install
- Lock file removed before install

### Capacitor sync fails
**Cause**: Wrong Node version (need 22+)  
**Fix**: 
- Locally: `nvm use` to load `.nvmrc`
- CI/CD: Already set to 22 in workflow

## Dependencies Overview

### Key Versions
- **Node**: 22.x (via .nvmrc)
- **tailwindcss**: ^3.4.1 (not v4)
- **vite**: ^6.2.3
- **react**: ^19.0.1
- **@capacitor/core**: ^8.3.4
- **postcss**: auto-installed by Tailwind v3
- **autoprefixer**: ^10.4.21

### Why autoprefixer?
Adds vendor prefixes (-webkit-, -moz-, etc.) for better browser compatibility. Works automatically via PostCSS pipeline.

## Performance Notes

- **Tailwind v3 vs v4**: v3 is ~5-10ms slower in dev, but builds are 100% reliable in CI/CD
- **PostCSS pipeline**: Industry standard, widely tested
- **Build time**: Typically 5-10 seconds with Vite
- **APK build time**: ~2-3 minutes depending on Gradle cache

## File Structure

```
.
├── .github/workflows/android-release.yml  # GitHub Actions workflow
├── .nvmrc                                  # Node version (22)
├── postcss.config.js                       # PostCSS configuration
├── tailwind.config.js                      # Tailwind CSS configuration
├── vite.config.ts                          # Vite configuration (no Tailwind plugin)
├── src/
│   └── index.css                           # v3 CSS syntax (@tailwind directives)
├── android/                                # Capacitor Android project
└── package.json                            # Dependencies (Tailwind v3, not v4)
```

## References

- [Tailwind CSS v3 Docs](https://v3.tailwindcss.com/)
- [PostCSS Docs](https://postcss.org/)
- [Vite Docs](https://vitejs.dev/)
- [Capacitor Docs](https://capacitorjs.com/)
- [GitHub Actions best practices](https://docs.github.com/en/actions)

---

**Last Updated**: June 2024  
**Configuration Version**: 1.0
