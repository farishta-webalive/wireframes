# Wireframes

Shared repository for hosting interactive HTML wireframes via GitHub Pages. Each project gets its own folder and a live preview link.

**Live base URL:** `https://farishta-webalive.github.io/wireframes/`

## Current Wireframes

| Project | Folder | Live Link |
|---------|--------|-----------|
| Genotype Health | `/gth` | [farishta-webalive.github.io/wireframes/gth/](https://farishta-webalive.github.io/wireframes/gth/) |
| CMW | `/cmw` | [farishta-webalive.github.io/wireframes/cmw/](https://farishta-webalive.github.io/wireframes/cmw/) |
| Melbourne Pest Control | `/mpc` | [farishta-webalive.github.io/wireframes/mpc/](https://farishta-webalive.github.io/wireframes/mpc/) |

---

## How to Add Your Wireframe

### Prerequisites

If you don't have a GitHub account yet:

1. Go to [github.com/signup](https://github.com/signup)
2. Create a free account using your work email
3. Share your GitHub username with the repo owner so they can add you as a collaborator
4. Accept the collaboration invite (arrives via email)

### Option A: Upload via GitHub Web UI (No tools required)

This is the simplest method. You only need a browser.

**Step 1** -- Go to the repository:
`https://github.com/farishta-webalive/wireframes`

**Step 2** -- Click **"Add file"** > **"Create new file"**

**Step 3** -- In the filename field at the top, type your project folder name followed by `/index.html`. For example:

```
my-project/index.html
```

Typing the `/` automatically creates the folder for you.

**Step 4** -- Paste your full HTML content into the editor area.

**Step 5** -- Scroll down to **"Commit changes"**. Add a short description like "Add my-project wireframe" and click **"Commit changes"**.

**Step 6** -- Wait 1-2 minutes for GitHub Pages to deploy. Your wireframe will be live at:

```
https://farishta-webalive.github.io/wireframes/my-project/
```

### Option B: Upload an existing HTML file via GitHub Web UI

**Step 1** -- Go to the repository:
`https://github.com/farishta-webalive/wireframes`

**Step 2** -- Click **"Add file"** > **"Upload files"**

**Step 3** -- Before uploading, **rename your HTML file to `index.html`** on your computer.

**Step 4** -- Drag and drop your `index.html` file into the upload area.

> **Important:** This uploads the file to the repo root. After uploading, you will need to move it into a project folder. It is easier to use Option A or Option C to avoid this extra step.

**Step 5** -- Commit the changes.

### Option C: Using Git from the command line

If you have Git installed locally:

```bash
# 1. Clone the repo (first time only)
git clone https://github.com/farishta-webalive/wireframes.git
cd wireframes

# 2. Create your project folder
mkdir my-project

# 3. Copy your wireframe HTML as index.html
cp /path/to/your/wireframe.html my-project/index.html

# 4. Stage, commit, and push
git add my-project/index.html
git commit -m "Add my-project wireframe"
git push origin main
```

Your wireframe will be live within 1-2 minutes at:
```
https://farishta-webalive.github.io/wireframes/my-project/
```

If the repo was already cloned previously, pull the latest changes first:
```bash
cd wireframes
git pull origin main
```

---

## How the Link is Generated

GitHub Pages automatically serves static files from this repository. The URL structure maps directly to the folder structure in the repo:

```
Repository structure                  Live URL
---------------------------------------------------------------------------------------------------------
wireframes/                           https://farishta-webalive.github.io/wireframes/
  gth/index.html                      https://farishta-webalive.github.io/wireframes/gth/
  cmw/index.html                      https://farishta-webalive.github.io/wireframes/cmw/
  mpc/index.html                      https://farishta-webalive.github.io/wireframes/mpc/
  your-project/index.html             https://farishta-webalive.github.io/wireframes/your-project/
```

The pattern is:
```
https://farishta-webalive.github.io/wireframes/<folder-name>/
```

When you visit a folder URL, GitHub Pages looks for an `index.html` file inside it and serves that automatically.

---

## Rules

1. **Always name your file `index.html`** -- This is required for the clean folder URL to work. If your file is named something else (e.g., `my-wireframe-v3.html`), the folder URL will return a 404. You would have to use the full filename in the URL instead.

2. **Use a short, lowercase folder name** -- This becomes part of the public URL. Use hyphens instead of spaces or underscores. Good: `my-project`. Bad: `My Project_v2 Final`.

3. **One folder per project** -- Keep each wireframe self-contained in its own folder.

4. **Commit directly to `main`** -- GitHub Pages deploys from the `main` branch. Changes pushed to `main` go live automatically within 1-2 minutes.

5. **External assets** -- If your HTML references external images, fonts, or CDN links, those will load as long as the URLs are valid. For self-contained wireframes, keep everything inline (CSS in `<style>`, JS in `<script>`).

---

## Troubleshooting

**My page shows a 404:**
- Check that your file is named exactly `index.html` (lowercase, no typos)
- Check that the file is inside a folder, not at the repo root
- Wait 1-2 minutes after pushing -- GitHub Pages needs time to build

**My page looks broken:**
- Check browser console for failed resource loads (images, fonts, CSS files)
- External URLs (images hosted on other sites) may be blocked by those sites
- Make sure your HTML is valid and self-contained

**I can't push to the repo:**
- Confirm you accepted the collaborator invite from email
- Make sure you're pushing to `main`, not a different branch

---

## Admin: Adding Collaborators

To give someone push access, the repo owner runs:

```bash
gh api repos/farishta-webalive/wireframes/collaborators/GITHUB-USERNAME -X PUT -f permission=push
```

Or via the GitHub web UI:
1. Go to repository **Settings** > **Collaborators**
2. Click **"Add people"**
3. Enter their GitHub username
4. Select **"Write"** permission
