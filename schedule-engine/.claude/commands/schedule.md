You are running the /schedule command for the Schedule Engine — a reusable article scheduling system for Next.js App Router projects.

## Step 1: Check for existing config

Read the file `schedule.config.json` at the project root. If it exists and has valid settings, skip to Step 3 (sync mode). If it does not exist, proceed to Step 2 (setup wizard).

## Step 2: Setup wizard (first run only)

This project needs initial scheduling configuration. Ask the user the following questions one at a time, showing the default value in parentheses. Wait for answers before proceeding.

1. **First publish date** — The date the first article should go live. Format: YYYY-MM-DD. (default: tomorrow's date)
2. **Publish interval** — How many days between each article publish. (default: 7)
3. **Publish hour** — What hour of the day (0-23) articles should go live. (default: 9)
4. **Timezone** — The timezone for scheduling. Examples: UTC, America/New_York, Europe/London. (default: UTC)
5. **Initial ordering** — How to order articles for scheduling. Options: alphabetical (by slug), detection (discovery order). (default: alphabetical)
6. **Auto-schedule new articles** — Should newly detected articles be automatically scheduled? yes/no. (default: yes)
7. **Listing pages** — Do you have pages that list/display links to your articles (e.g., /articles, /blog)? If yes, ask the user to provide the file paths of those listing pages (relative to the project root, e.g. `src/app/blog/page.tsx`). If no, leave as an empty array. (default: [])

After collecting answers, create `schedule.config.json` at the project root with this structure:

```json
{
  "enabled": true,
  "startDate": "<answer>",
  "intervalDays": <answer>,
  "publishHour": <answer>,
  "timezone": "<answer>",
  "ordering": "<answer>",
  "autoScheduleNewArticles": <true|false>,
  "articleRoots": [],
  "listingPages": ["<path1>", "<path2>"]
}
```

Save the file and confirm it was created.

## Step 3: Run sync

Run the sync script to discover articles, auto-install the GitHub Actions workflow, and build/update the registry:

```bash
node schedule-engine/sync.js
```

The sync script will automatically:
- Install `.github/workflows/schedule-publish.yml` if it does not exist
- Discover all article pages in the Next.js app directory
- Add new articles to the registry and auto-schedule them
- Check each article page for `isPublished` guards and print warnings with copy-paste snippets for any that are missing
- Check listing pages (from `listingPages` config) for `getPublishedArticles` usage and inject the import or print a warning with a copy-paste snippet

If this is the first run and the registry was just created, report:
- How many article sections were found
- How many articles were detected
- The assigned schedule for each article

If this is a subsequent run, report:
- How many new articles were found
- How many were auto-scheduled (if enabled)
- Current registry summary

## Step 4: Review sync output

Review the sync script output. If there are access control warnings, present them clearly to the user and recommend they apply the suggested code snippets.

## Step 5: Integration guidance

After sync completes, provide a brief summary:

1. **Files created/updated** — List all files that were created or modified.
2. **Access control** — If the sync script reported warnings, reiterate the specific files and snippets. Otherwise confirm access control is wired up.
3. **Workflow** — Confirm the GitHub Actions workflow is in place at `.github/workflows/schedule-publish.yml`.

## Step 6: Git commit (optional)

Ask the user: **Would you like to create a local git commit with these changes?**

If yes, stage and commit all schedule-engine files, the config, registry, and workflow:
- `schedule-engine/**`
- `schedule.config.json`
- `schedule.registry.json`
- `.github/workflows/schedule-publish.yml`

Use commit message: `feat: add schedule-engine for automated article publishing`

## Step 7: Push (optional, explicit only)

Ask the user: **Would you like to push to the remote?**

NEVER push without explicit confirmation. If the user says yes, push. If they say no or don't respond, do not push.

## Re-run behavior

When /schedule is run again after initial setup:
- Skip the setup wizard (config already exists)
- Run sync to detect new articles, install workflow if missing, and check access control
- Run publish to check for due articles
- Report the current state
- Offer to commit if there are changes

## Important rules

- Never hardcode repo names, branch names, article counts, or folder names
- Never push without explicit confirmation
- Always run sync before publish
- Report clearly what changed
