# APK Signing & Release Setup

Complete instructions for generating a keystore, setting up GitHub secrets, and triggering your first signed APK build.

## What You Have

✅ **Keystore Generated**: `android/app/release.keystore`
- Type: PKCS12
- Key Alias: `mamifesting-key`
- Validity: 27 years (until Oct 17, 2053)
- Algorithm: RSA 2048-bit
- Owner: Anatomy of Manifesting

✅ **Credentials Created**:
- Keystore Password: `ManifestingRelease2024!`
- Key Password: `ManifestingRelease2024!`
- Key Alias: `mamifesting-key`

✅ **Base64 Encoded**: Ready to paste into GitHub

---

## Step-by-Step Setup

### STEP 1: Add GitHub Secrets (5 minutes)

**Location**: GitHub Repository Settings

1. Go to: **https://github.com/YOUR_USERNAME/MAMIFESTING-GAIC/settings/secrets/actions**

2. Click **"New repository secret"** and add 4 secrets:

#### Secret #1: KEYSTORE_BASE64
- **Name**: `KEYSTORE_BASE64`
- **Value**: (copy the entire string below - it's very long)

```
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
```

#### Secret #2: KEYSTORE_PASSWORD
- **Name**: `KEYSTORE_PASSWORD`
- **Value**: `ManifestingRelease2024!`

#### Secret #3: KEY_ALIAS
- **Name**: `KEY_ALIAS`
- **Value**: `mamifesting-key`

#### Secret #4: KEY_PASSWORD
- **Name**: `KEY_PASSWORD`
- **Value**: `ManifestingRelease2024!`

**Verification**:
- After adding each secret, click "Add secret"
- Go back to Settings > Secrets and variables > Actions
- You should see all 4 secrets listed (values hidden)

---

### STEP 2: Trigger Test Workflow (2 commands)

After adding secrets, push a git tag to trigger the workflow:

```bash
cd /workspaces/MAMIFESTING-GAIC
git tag v1.0.0
git push origin v1.0.0
```

**Monitor Progress**:
- Go to: **https://github.com/YOUR_USERNAME/MAMIFESTING-GAIC/actions**
- Click: **"Android Release Build"** workflow
- Watch the build progress (should take 3-5 minutes)

**Expected Steps**:
1. ✅ Checkout code
2. ✅ Setup Node.js 22
3. ✅ Setup Java 21
4. ✅ Setup Android SDK
5. ✅ Decode keystore from GitHub secret
6. ✅ Install npm dependencies
7. ✅ Build web assets
8. ✅ Sync to Capacitor Android
9. ✅ Build signed release APK
10. ✅ Rename APK
11. ✅ Create GitHub Release

---

### STEP 3: Download Your First APK

When the workflow completes:

1. Go to: **https://github.com/YOUR_USERNAME/MAMIFESTING-GAIC/releases**
2. Click: **v1.0.0** release
3. Download: **app-mamifesting-gaic-v1.0.0.apk**
4. This is your signed, production-ready APK! 🎉

---

## What Just Happened

✅ Your keystore was decoded from the GitHub secret  
✅ Your app was built with Vite + Tailwind v3  
✅ The APK was signed with your private key  
✅ A GitHub Release was created automatically  
✅ The signed APK is ready for distribution  

---

## Next Releases

For future releases, the process is the same:

```bash
git tag v1.1.0
git push origin v1.1.0
```

The workflow runs automatically. No additional setup needed.

---

## Troubleshooting

### "Decode Keystore" step fails
- Check that KEYSTORE_BASE64 is pasted completely (no spaces/newlines)
- Verify all 4 secrets are added
- Secrets are case-sensitive

### "Build signed release APK" fails
- Check Gradle build logs
- Verify KEY_ALIAS matches your keystore (`mamifesting-key`)
- Ensure KEYSTORE_PASSWORD is correct

### APK not found after build
- Check the full build log
- Look for "assembleRelease" command output
- Expected path: `android/app/build/outputs/apk/release/`

### Release creation fails
- Verify workflow has `permissions: contents: write`
- Check GITHUB_TOKEN is available (automatic in GitHub Actions)
- Ensure git tag format is correct (v1.0.0, not v1.0)

---

## Security Notes

✅ **Keystore File**: Not committed to git (in .gitignore)  
✅ **Passwords**: Stored as GitHub secrets (encrypted)  
✅ **Secrets**: Never logged or exposed in build output  
✅ **APK**: Signed with your private key only  

⚠️ Save keystore passwords in a secure password manager  
⚠️ Keep `android/app/release.keystore` as a backup  
⚠️ Never share keystore or secrets  

---

## Performance Expectations

- Total build time: 3-5 minutes
- APK size: 50-80 MB (typical for Capacitor apps)
- Certificate validity: 27 years (no renewal needed)

