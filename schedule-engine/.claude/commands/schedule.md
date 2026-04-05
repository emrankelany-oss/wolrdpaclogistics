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
  "articleRoots": []
}
```

Save the file and confirm it was created.

## Step 3: Run article discovery

Run the sync script to discover articles and build/update the registry:

```bash
node schedule-engine/sync.js
```

If this is the first run and the registry was just created, report:
- How many article sections were found
- How many articles were detected
- The assigned schedule for each article

If this is a subsequent run, report:
- How many new articles were found
- How many were auto-scheduled (if enabled)
- Current registry summary

## Step 4: Verify GitHub Actions workflow

Check if `.github/workflows/schedule-publish.yml` exists. If it does, confirm it is in place. If not, inform the user they should copy it from the schedule-engine template.

## Step 5: Integration guidance

After sync completes, provide a brief summary:

1. **Files created/updated** — List all files that were created or modified.
2. **Access control** — Remind the user to add access control to their article pages. Show this example:

```js
// At the top of each article page.js:
import { notFound } from 'next/navigation';
import { isPublished } from '@/schedule-engine/access-control';

export default function ArticlePage() {
  if (!isPublished('/blog/my-article')) notFound();
  // ... rest of the page
}
```

3. **Article list filtering** — If the project has an article listing page, remind them to filter:

```js
import { getPublishedArticles } from '@/schedule-engine/access-control';

// Use getPublishedArticles() to get only visible articles
const published = getPublishedArticles();
```

## Step 6: Git commit (optional)

Ask the user: **Would you like to create a local git commit with these changes?**

If yes, stage and commit all schedule-engine files, the config, registry, and workflow:
- `schedule-engine/**`
- `schedule.config.json`
- `schedule.registry.json`
- `.github/workflows/schedule-publish.yml`
- `.claude/commands/schedule.md`

Use commit message: `feat: add schedule-engine for automated article publishing`

## Step 7: Push (optional, explicit only)

Ask the user: **Would you like to push to the remote?**

NEVER push without explicit confirmation. If the user says yes, push. If they say no or don't respond, do not push.

## Re-run behavior

When /schedule is run again after initial setup:
- Skip the setup wizard (config already exists)
- Run sync to detect new articles
- Run publish to check for due articles
- Report the current state
- Offer to commit if there are changes

## Important rules

- Never hardcode repo names, branch names, article counts, or folder names
- Never push without explicit confirmation
- Always run sync before publish
- Report clearly what changed
