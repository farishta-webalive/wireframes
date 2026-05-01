# Permission Audit — RenoLogic Platform

**Audit type:** Read-only. No code changes have been made.
**Source:** `Renologic Homeowner Platform.html`
**Reference:** Official Permission Matrix (provided by user)

Status legend:
- ✅ **Compliant** — UI matches matrix
- ❌ **Violation** — Action exposed to a role that should not see it, or missing for a role that should
- ⚠️ **Structural concern** — Compliant on the action level but UX is misleading or redundant

---

## Pass 1 — PROJECT MANAGER (PM)

### Sidebar / Top-level navigation
PM screens use a 5-item left sidebar (visible on every PM screen):

| Sidebar tab | Target screen | Verdict |
|---|---|---|
| My Projects | `pm01` | ✅ Compliant — list of jobs assigned to PM |
| Allocation  | `pm07` | ✅ Compliant — escrow allocation view (`View Escrow Allocation: YES`) |
| Certs       | `pm08` | ✅ Compliant — certs viewer (`View Certs: YES`) |
| **Comments**| `pm09` | ⚠️ **Structural concern — recommend removal** (see below) |
| Profile     | `pm10` | ✅ Compliant — own profile |

### Action buttons present in PM screens (pm01–pm10)

| Action | Matrix says | Found in UI | Verdict |
|---|---|---|---|
| Create Job | – | absent | ✅ |
| Edit Job Details | – | absent | ✅ |
| Create Quote | – | absent | ✅ |
| Submit Quote | – | absent | ✅ |
| Accept / Reject Quote | – | absent | ✅ |
| Create Milestone | – | absent | ✅ |
| Edit Milestone | – | absent | ✅ |
| **Mark Milestone Complete** | YES | 4 buttons across pm04 + modals | ✅ |
| Acknowledge Milestone | – | absent | ✅ |
| **Upload Evidence** | YES | 9 buttons (pm03 milestone rows, pm04, pm05) | ✅ |
| Delete Evidence | – | absent | ✅ |
| Mark as Paid | – (not on PM matrix line for "Trigger Payment") | absent | ✅ |
| Upload Cert / Insurance | – | absent | ✅ |
| **Leave Comment** | – | absent (no `<textarea>`, no Post button anywhere in PM screens) | ✅ |
| Manage Subscription | – | absent | ✅ |
| Add / Remove Team | – | absent | ✅ |

**Action-level result: 0 violations.** Every action available in PM matches the matrix.

---

### ⚠️ Issue 1 — `pm09` Comments tab is a structural redundancy

**What it is now:**
A top-level sidebar entry "Comments" → `pm09` shows a thread for a single hard-coded job ("Surry Hills Kitchen Reno"). The page contains:
- A disclaimer banner: *"Only the Contractor Owner and Homeowner can post comments."*
- 3 read-only comment items (Mark Chen / Sarah Chen)
- **No post-comment form** — correctly enforces matrix's `Leave Comment: –`

**Why it should be removed:**

1. **Comments are job-bound, not global.** A PM may be assigned to multiple jobs. A global "Comments" tab can only show one job's thread (currently hard-coded to Surry Hills) — it's structurally impossible to be a useful global view.

2. **Job-level comments already exist for PM.** `pm02` (Job Detail — "Surry Hills Kitchen Reno") already contains the same `comment-thread` block in its body. PMs can already view comments inside the job they're looking at.

3. **The matrix's `View Comments: YES` is fully satisfied** by the in-job thread on `pm02`. The standalone `pm09` adds no new capability.

4. **Sidebar real estate is precious** and "Comments" reads as an actionable global inbox, which it isn't.

**Recommendation (Pass 2):**
- **Remove "Comments" sidebar entry** from all 10 PM screens.
- **Delete `pm09` section** entirely.
- **Keep the existing in-job comment thread on `pm02`** unchanged — that's where PM views comments per-job.
- If/when PM is assigned to multiple jobs in the future, `pm02`'s thread is per-job, which is correct.

---

### ⚠️ Issue 2 (minor) — `pm09` "Surry Hills Kitchen Reno" subtitle is hard-coded

If for any reason `pm09` is kept, the subtitle "Surry Hills Kitchen Reno" is hard-coded — it does not change based on which job's comments you'd be viewing. This reinforces Issue 1: a global tab cannot represent per-job state.

---

## Summary for PM

- ✅ **All 16 audited actions are compliant** with the matrix.
- ⚠️ **1 structural recommendation:** remove "Comments" from sidebar + delete `pm09`. View-comments capability is already satisfied by the in-job thread on `pm02`.

---

## Next steps

- [ ] User confirms PM findings and Pass 2 plan (remove sidebar entry + delete `pm09`).
- [ ] Pass 2 — execute approved PM changes.
- [ ] Pass 1 continues for: Estimator → Admin → Site Manager → Homeowner → Contractor Owner.
