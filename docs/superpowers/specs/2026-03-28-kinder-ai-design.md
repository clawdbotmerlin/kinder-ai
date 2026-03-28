# KinderAI — Product Design Spec
**Version:** 1.0
**Date:** 2026-03-28
**Status:** Approved for implementation planning

---

## 1. Product Vision

KinderAI is a mobile-first AI literacy app for children aged 4–15. Children learn to **thrive in an AI-powered world** through short daily sessions (10–20 min), delivered via a gamified adventure world on Android (iOS later).

### Three Learning Pillars
1. **Prompting Principles** — what makes a good prompt, how to be specific, give context, and iterate
2. **Know What You Want** — articulating goals clearly, breaking problems into steps, thinking before asking
3. **AI as Lego** — discovering AI tools as building blocks, connecting them creatively to solve real-world problems

### Core Design Principles
- Playful, adventurous, joyful — every screen feels like an adventure
- Safety-first — COPPA-compliant, no dark patterns targeting children
- Parent trust — transparent progress, no manipulative mechanics
- Accessibility — Tier 1 (pre-readers) served via audio, icons, and animation throughout

---

## 2. Platform & Stack

- **Platform:** Android first, React Native (iOS in v2)
- **AI:** Claude API (Anthropic) — powers adaptive content engine + companion + sandbox
- **Backend:** TBD (implementation planning phase)
- **Session targets:** ~7 min Tier 1 | ~15 min Tier 2 | ~20 min Tier 3

---

## 3. Age Tiers

| Tier | Ages | Name | Input Model | Key Constraint |
|------|------|------|-------------|----------------|
| 1 | 4–6 | Explorers | Tap + drag-drop icons/images. Zero words. Audio-narrated everything. | No reading or writing. Voice + tap + visuals only. |
| 2 | 7–10 | Builders | Drag-and-drop word bank — pre-written tiles child arranges. No free typing. | Simple text readable, but no keyboard input. |
| 3 | 11–15 | Pioneers | Free text typebox. Full keyboard. AI gives contextual feedback. | Full text, critical thinking, open-ended prompts. |

### Tier 1 Global Rules (enforced across every screen)
- No instructional or CTA text without simultaneous audio narration
- All buttons: icon + audio only — no text-only labels
- Progress indicators: icon-based (filled circles, icons) — no numbers for age 4
- Companion speaks first, child responds — never the reverse
- Tap targets minimum 60×60dp (larger than standard Android 48×48dp minimum)

---

## 4. Core Navigation Structure

**Model:** World Map navigation — a richly illustrated scrollable/zoomable adventure map with themed zones.

### World Map Zones (AI concept worlds)
Each zone is adventure-themed, not technology-themed. The AI concept is the learning objective, not the zone identity.

| Zone | Theme | Learning Pillar | Tier |
|------|-------|----------------|------|
| 🌱 Sprout Valley | What is AI? | Foundations | Free — all tiers |
| 🤖 Robot City | How AI learns | Prompting Principles | Free — all tiers |
| 🧠 The Thinking Forest | Data and patterns | Know What You Want | Free (partial) / Premium |
| 🎨 Creator Islands | AI and creativity | AI as Lego | Premium |
| 🔭 Starship Observatory | AI and the future | AI as Lego | Premium |
| + Future zones | Expandable | All pillars | Premium |

**Tier 1 map exception:** Simplified linear "stepping stone" path (5–6 visible locations, no zoom, no spatial orientation required). Same visual world, different interaction model.

**Bottom nav (persistent):** Map | My Explorer | Badges | Settings

**MVP Badges nav tap:** Opens a simplified "My Badges" screen — earned badges displayed as full-colour icons in a grid, total count, next earnable badge highlighted. No outlined unearned state in MVP. Full collection screen with zone grouping and outline unearned state: v1.1.

---

## 5. Gamification System

### XP & Levels
- **Tier 1:** Visual power meter (fills with colour/sparkles). No XP numbers.
- **Tier 2–3:** XP bar with numeric total. Level titles confer identity.
- **Tier 3 level titles:** Serious register — "AI Systems Thinker", "Neural Architect" (not childish labels)
- Level Up modal fires at activity boundaries only — never mid-task

### Streaks (Adventure Days)
- **Tier 1:** "Adventure days" — footprint path accumulation. No streaks, no penalties for gaps. Path grows, never shrinks.
- **Tier 2:** Forgiving streak — resets only after 3 missed days. 1 free "rest day" per week, earnable via gameplay (not purchasable). Rest day auto-labelled on calendar.
- **Tier 3:** Standard streak with total days and longest streak. Longest streak shown only when current streak equals or exceeds it (avoids loss framing).

### Stars (Mission Completion)
- **Mastery-based, not accuracy-based.** All children who finish a mission earn ≥ 2 stars.
- 3 stars = first-attempt success on majority of activities.
- Stars never punish struggle — they reward completion and excellence.

### Badges
- Grouped by zone + meta-badges (cross-zone achievements)
- Earned = full colour, animated on tap
- Unearned = outline only (Tier 2–3) | illustrated unlock hint (Tier 1)
- No premium-exclusive badges shown in outline state — never tease what can't be earned through play
- Seasonal/chapter completion ceiling: define finite completion states per content release

### Companions (Collectibles)
- Earnable through gameplay only in free tier — not purchasable
- **Tier 1 companion shelf:** "Hidden presence" design — treasure chest, sleeping character, or question mark companion. Framing: "something will arrive," not "something is missing."
- **Tier 2 companion shelf:** Silhouettes with unlock path indicator (which zone/mission type unlocks each)
- **Tier 3 companion shelf:** Standard silhouettes
- Companion lore screen (detail + when earned): v1.1

### Failure States by Tier
- **Tier 1 & 2:** Attempt 1 → warm hint from companion. Attempt 2 → companion gives answer and moves on. No XP penalty ever.
- **Tier 3:** Attempt 1 → process hint ("What information are you using?"). Attempt 2 → content hint ("Look at the second sentence"). Attempt 3 → answer revealed with brief explanation ("The answer is X because Y"). After reveal, companion asks "Does that make sense?" (flags AI engine, doesn't block progress).
- Open-ended Tier 3 responses: AI-assessed with rubric (to be defined in implementation planning).

---

## 6. AI System Design

### Three Roles
1. **Engine** — adaptive content selection. Serves the right mission based on child's recent performance and weak spots. Session structure is AI-determined, not fixed.
2. **Companion** — persistent character that guides, encourages, reacts. Tier-specific personality:
   - Tier 1: Expressive, simple, speaks first, uses animal sounds and simple words
   - Tier 2: Encouraging coach, slightly advanced vocabulary
   - Tier 3: Peer-like, uses humor and irony, does not volunteer help unless asked
3. **Sandbox** — freeform AI interaction zone, accessible after completing a mission in a zone

### Sandbox Safety Architecture
- **Two-layer content filter:** Input classification before sending to model + output classification before displaying to child
- **Tier 1 & 2 pre-entry screen:** Companion says "This robot helper knows a lot — but it's different from people who love you. Ask it anything about [zone topic]!" Tap "Got it!" (icon + audio for Tier 1) to proceed.
- **Tier 3 pre-entry screen:** Explainer card — how AI works, what it stores, what it can't do. Framed as AI literacy content, not a disclaimer.
- **Emotional escalation response:** If child discloses distress, companion warmly redirects: "That sounds hard. A grown-up who loves you would want to hear about this." No counselling, no probing.
- **Jailbreak handling:** Two-layer filter catches "pretend you are a different AI" patterns. Companion intercepts out-of-scope queries: "That's a question for a grown-up!"
- **Session context reset:** Sandbox context resets on every session open. No cross-session memory.
- **Topic scope:** AI literacy topics + general knowledge + child-safe casual conversation. Blocked: news, politics, real people, health/medical advice, relationship advice.
- **Voice input for Tier 1:** 3–5 second silence tolerance (vs standard 1–2s). Low confidence threshold with generous acceptance.

### Adaptive Session Design
- **Tier 1:** 3 micro-activities (2–3 min each) with Celebration Breaks between
- **Tier 2:** Sustained session ~15 min, natural activity boundaries
- **Tier 3:** Sustained session ~20 min, self-directed pacing acceptable
- Session end fires **only at activity boundaries** — never mid-lesson or mid-task

---

## 7. MVP Screen Inventory (31 Screens)

### Section 1 — Onboarding (Screens 1–7)

**Screen 1: Splash**
Full-screen animated logo. KinderAI wordmark + companion character peeking in. 2–3s auto-advance.

**Screen 2: Welcome**
"Let's go on an AI adventure!" Looping world map animation. Single CTA: "Let's Go!" Ghost link: "I'm a parent →" (non-forced). No text-heavy explanation.

**Screen 3: Age Selection**
Large illustrated age bubbles — not a dropdown. Tier 1 age bubbles (4–6) have illustrated faces. Tapping an age silently assigns tier (no "tier" label shown). Audio: numbers read aloud on tap.

**Screen 4: Pick Your Explorer**
4 animated avatar characters (MVP: fixed selection, no customisation). Carousel: 3 shown at a time, swipe to see more. Each avatar has audio intro on tap ("Hi, I'm Zara! I love adventures!"). CTA: "This is me!" (icon + audio for Tier 1).

**Screen 5: Name Your Explorer**
- Tier 1: 4–6 illustrated name cards with symbol + audio playback on tap. Child taps the name they want to "hear." No text reading required.
- Tier 2–3: Text input with AI-generated name suggestions. Parent can type for child.
No last names, no personal info.

**Screen 6: Parent Gate + Parental Consent**
Hard-switch for Tier 1: full visual pattern interrupt — different character, different tone. "Stop! Time for a grown-up." Parent-facing language only. Child never sees the email field.
Content: parent email field + parental consent capture (COPPA-compliant verifiable consent). Skip option with clear plain-English consequence: "Without an account, progress saves on this device only and may be lost." Legal review required before launch.
Skip stores locally only — no cloud sync.

**Screen 7: World Intro Cinematic**
Interactive, not passive. 3 tap moments: "Tap to launch your explorer!" → "Tap the portal!" → "Wave hello to your companion!" ~10 seconds. Skippable at Beat 2 for Tier 3.

---

### Section 2 — World Map & Navigation (Screens 8–11)

**Screen 8: World Map (Home)**
Scrollable/zoomable illustrated map. Zones show: progress ring, star rating (0–3), "NEW" badge if fresh content. AI companion lives on map and reacts — waves, points at next zone, celebrates streaks.
**Tier 1:** Linear stepping-stone path, 5–6 locations visible, no zoom.
Locked premium zones: visually distinct but not previewed — clearly unavailable from the start with "for grown-ups to unlock" framing. No greyed-out previews of desirable content.

**Screen 9: Daily Mission Nudge (Modal)**
Fires on every session open. Companion: "Hey [Name]! I've picked today's adventure for you." Preview card of AI-recommended mission. Equal options: "Let's go!" | "I want to choose."

**Screen 10: Zone Entry**
Full-screen zone landing. Zone illustration, flavour text, mission list (Lesson/Quest/Challenge tags, difficulty stars, completion status). Locked missions: clearly unavailable, never teased. "Continue" highlights next recommended mission.
Tier 1: Mission cards use icons + audio labels only.

**Screen 11: Mission Card Detail (Bottom Sheet)**
Mission name + illustrated banner, "What you'll learn" (icons for Tier 1), estimated time, XP/power meter preview, "Start Mission" CTA. Premium gate: "Ask a grown-up to unlock this adventure!" — never a child-directed payment prompt.

---

### Section 3 — Session & Lesson (Screens 12–21)

**Screen 12: Activity Loading / Transition State**
Companion animates during server calls. Friendly audio line. No spinner, no blank screen.
If load > 3s: companion adds a second animation beat ("Almost there!").
If offline/server error: companion-narrated fallback — "Let's try again in a moment!" with retry or cached offline option. System errors never surface as Android system dialogs.

**Screen 13: Mission Launch Sequence**
3-beat interactive intro:
- Beat 1: Companion introduces mission in 1 sentence (audio for Tier 1)
- Beat 2: Mission goal shown visually (icon/illustration) + audio narration
- Beat 3: "Let's go!" CTA (icon + audio for Tier 1)
- Tier 2: Skip unlocks after Beat 2, after 3 completed missions in zone
- Tier 3: Skippable after Beat 1
- Repeat mission: variant companion line ("Ready to go again?") + 1-beat entry

**Screen 14: Lesson Screen (Tier-Adaptive)**
- **Tier 1:** Full-screen illustrated scene. Companion speaks concept out loud. Interaction: drag-drop icons, tap targets ≥60×60dp. 2–3 min max before Celebration Break. Idle state: after 8–10s, companion prompts with animated gesture. After second idle: companion demonstrates interaction.
- **Tier 2:** Top half visual/interactive. Bottom half: companion dialogue + drag-and-drop word bank (pre-written tiles). Audio read-aloud on each word tile. Subtle lesson progress indicator (steps, not timer).
- **Tier 3:** Text + visuals. Companion presents scenario, child types response, AI gives contextual feedback with ~1–2s "companion is thinking" micro-animation.

All tiers: wrong answers never penalise XP. Failure states per Section 5.

**Screen 15: Mini-Game / Quest Screen**
Hands-on activity post-lesson. Introduced by companion. Visible goal tracker (icon-based for Tier 1, e.g. 3 filled circles of 5).
Examples by tier:
- Tier 1: "Help the robot sort animals" — drag-drop
- Tier 2: "Train the AI to recognise shapes" — word bank labelling
- Tier 3: "Spot the bias in this AI output" — typebox response
No timer for Tier 1 or Tier 2. Tier 3 timers = time-bonus framing (extra XP, not failure condition). Timer opt-out in accessibility settings.
Partial completion saved on session exit (Tier 2–3). Resume state designed.
Format familiarity tracking: suppress interaction tutorial after 2 completions per format type.

**Screen 16: AI Companion Sandbox**
Accessible after completing a mission in a zone.
Pre-entry screen per tier (see Section 6 — Sandbox Safety Architecture).
First entry only: companion tutorial — "Try asking me something!" with 3 tappable example prompts.
Interface: Clean chat. Companion avatar visible. Voice-first Tier 1 (3–5s silence tolerance). Text Tier 2–3. Hard content filter active. Companion intercept for out-of-scope queries.
This is the **prompting playground** — directly tied to Learning Pillar 1.

**Screen 17: Celebration Break (Tier 1 only)**
Fires after each micro-activity completes (activity-completion trigger, not time-based).
10-second screen. Avatar bounces, confetti, audio cheer. Tap target: large icon/arrow (no text). Does not auto-advance — waits for tap regardless of time elapsed. Not skippable.

**Screen 18: Activity Complete / Micro-Celebration**
- Tier 1: Power meter fills with sparkles. Companion narrates "what you learned" with illustrated visual.
- Tier 2–3: XP orbs animate into XP bar. One-line learning summary (text).
Companion reacts with unique animation per activity type.
Equal-weight CTAs: "Next up →" | "That's enough for today ✓" (icons + audio for Tier 1).
Never: "Are you sure you want to stop?" No guilt framing.
Handoff: if this is the final activity in a mission, transitions to Screen 19 (Mission Completion) not looping back. No double-celebration.

**Screen 19: Mission Completion Summary**
Full-screen celebration. Avatar victory animation.
Stars earned (1–3, mastery-based). XP gained + total bar (power meter for Tier 1).
Badge unlock: full-screen reveal with companion narration of what it represents. If badge already earned (replay): "You already have this one!" with alternate companion line.
"What you learned today": 2–3 illustrated takeaways. Tier 1: companion audio narration + illustrated only. Content: static per mission (not AI-generated, for consistency).
Equal CTAs: "Explore more" | "See you tomorrow!"

**Screen 20: Session End / "Well Done" Screen**
Fires at next activity boundary once target session time is reached. Never mid-task.
Companion farewell: "Amazing exploring today, [Name]! Come back tomorrow for more!"
Progress snapshot: adventure days / streak, XP today, next zone teaser.
Next zone teaser: if all content complete → "New adventures coming soon" + notification opt-in.
Tier 3: Clean summary screen without overblown companion farewell. Progress metrics as primary content.
Big clear exit button. No countdown. No guilt framing.

**Screen 21: Notification Setup (First-Time)**
Fires after first mission completed. Companion: "Want me to remind you to explore tomorrow?"
- Tier 1: Illustrated thumbs up / thumbs down + audio. No text required.
- Tier 2–3: "Yes please!" / "No thanks." Equal visual weight.
If yes: notification preview card shown first ("This is what your reminder will look like") → system permission dialog → illustrated time slot picker: Morning / Afternoon / Evening (companion illustrations, not clock). "Choose a specific time" option available as "grown-up option."
If system permission denied: companion reassures "That's okay! You can turn on reminders later in Settings."
"No thanks" path: neutral framing throughout. No follow-up loss framing.

---

### Section 4 — Profile & Progress (Screens 22–23)

**Screen 22: My Explorer (Profile — MVP)**
Animated avatar (idle). Explorer name + level title + level progress bar (sparkles for Tier 1).
Tier 1 stats: single growing visual (expanding map fragment or garden) — not 3 separate counters.
Tier 2–3 stats: zones explored, missions completed, adventure days count.
Companion shelf: earned companions (animated on tap, shows when earned). Unearned: per companion shelf design in Section 5.
Adventure days display: footprint path for Tier 1, counter for Tier 2–3. Full calendar view: v1.1.
First-launch empty state: companion narrates "Your adventure starts here!" with forward-looking framing. No blank counters.

**Screen 23: Level Up Celebration (Modal)**
Fires at activity boundary when level threshold crossed — queued, never mid-task.
Avatar evolution: additive only (gains accessory or glow). Never transforms appearance — Tier 1 children must recognise their avatar.
- Tier 1: Heavy confetti, companion fanfare, full narration. Sound: avoid sharp high-pitched audio.
- Tier 3: Restrained clean reveal. No overblown fanfare.
Tap anywhere to continue.

---

### Section 5 — Settings & Parent View (Screens 24–28)

**Screen 24: Settings (Main)**
Clean list layout. Sections:
- **Your Profile** (child-facing): display name, avatar
- **Sound & Display**: SFX toggle, music toggle, reduced motion toggle, high contrast toggle
- **Notifications**: daily reminder toggle, time slot picker
- [Grown-ups area divider — small padlock icon] — visual signal before lock, no reading required
- **For Parents** → Screen 25
- **Privacy & Data** → Screen 27
- **About KinderAI** + support email link
- **Log Out**

**Tier 1 lock mechanism:** 5-tap with audio countdown after tap 3 ("almost there… keep going") to prevent accidental unlock by curious children. 5-second hold as alternative. Visual hold progress indicator (circular fill animation).
**Session persistence:** unlock valid until app backgrounded >5 min or device locked. Manual re-lock button inside parent settings area ("Lock this area").
Premium upsell CTA: inside the parent lock only — never child-accessible.

**Screen 25: Parent View**
Read-only. Accessed via 5-tap lock from Settings.
First-time: one-time tooltip explaining the lock ritual.
Content:
- Child level + zone progress (visual)
- Last 7 days: date, duration, missions completed. "Last updated [today]" timestamp.
- Topics covered in plain language: "This week: [topic], [topic]"
- Badges earned
- Sandbox activity summary: "Used the AI chat X times this week." Toggle: "Show AI conversation topic summaries" (opt-in, no raw transcripts). Default off — legal review required on posture.
- Subscription section: current plan (Free / Premium), upgrade CTA if free, Google Play management link if premium.
- Weekly email summary opt-in/off toggle (persistent — both states always visible).
Tone: Reassuring, non-clinical. Written for a non-technical parent.

**Screen 26: Parental Consent (COPPA)**
Part of onboarding (Screen 6), but also accessible here for review/update.
Separate dedicated view within Parent View showing: what consent was given, date, option to withdraw (triggers account deletion flow with confirmation).
Legal review required before launch.

**Screen 27: Privacy & Data**
Two versions:
- **Tier 1 & 2 (via parent lock):** Plain-English data summary. What is collected, what AI uses. Granular data controls: clear AI activity data | clear progress data | clear all data (each with plain-English consequence). Delete account requires parent email confirmation (not self-service for under-13). Data export available.
- **Tier 3 (direct child access from Settings):** Age-appropriate privacy explainer as AI literacy content — "What does an app know about you?" Account deletion requires parent confirmation step (email to parent address on file). Data export self-service.
Legal review of Tier 3 copy accuracy required before launch.

**Accessibility (Basic — MVP, not a separate screen)**
Two live toggles folded into Sound & Display in Screen 24: reduced motion, read-aloud mode (narrates all on-screen text). Dedicated Accessibility screen with full options (dyslexia font, colour blind mode, focus mode, quiet companion, extended tap time, large tap targets, caption all audio, slow companion speech): v1.1.

---

### Section 6 — Premium & Paywall (Screens 29–32)

**Screen 29: Locked Content Gate (In-Flow)**
Bottom sheet — not full-screen interrupt. Only fires after child has completed ≥1 free mission in that zone. Never fires on World Map before zone is tried.
Companion: "This adventure needs a KinderAI Pro pass — ask a grown-up to unlock it!"
Options: "Ask a grown-up" (→ Screen 30) | "Explore something else" (dismiss, return to zone).
No countdown. No urgency language. No guilt. Child never feels punished.

**Screen 30: KinderAI Pro — Parent Paywall**
Full-screen. Parent-facing visual tone.
- Hero: "Unlock the full adventure" — world map with all zones lit
- What's included: all zones unlocked, bonus AI challenges, exclusive companions (framed as bonus, not better)
- Pricing: Monthly and Yearly cards (yearly shows savings)
- Trust signals: "Cancel anytime", COPPA badge, "No ads, ever"
- CTA: "Start KinderAI Pro"
- Below fold: privacy policy link, restore purchases
No fake countdown. No "price goes up soon." No guilt copy.
Premium companions: always "bonus options" framing — never "better companion."
Streak freezes: earnable through gameplay only — never purchasable.

**Screen 31: Purchase Confirmation / Welcome to Pro**
Companion celebration. Child-facing: "[Name]'s adventure just got bigger — ALL zones are now open!" World map zones illuminate one by one. Parent: email receipt.
CTA: "Let's explore!" → World Map with all zones unlocked.

**Screen 32: Subscription Management**
In Settings → Your Profile → Manage Subscription (inside parent lock).
Current plan + next billing date. Cancel subscription link (clear, no confirmation loops). Restore purchases. Links to Google Play for billing management.

---

## 8. Deferred to v1.1

- Avatar Customisation (cosmetics system)
- Badges & Achievements (full collection screen — MVP shows counter only)
- Adventure Days Calendar (full 30-day view — MVP shows counter)
- Full Accessibility Settings screen (MVP: 2 toggles in main settings)
- First Sandbox Entry Tutorial (MVP: folded into Mission Launch)
- End-of-Zone Celebration screen
- Mid-Session Progress Indicator
- Companion Detail / Lore Screen
- Child Profile Edit Wizard (MVP: age/name editable in Settings → Your Profile)
- Full Learning History beyond 7 days

## 9. Cut from Scope

- Tier 3 Journey Timeline
- In-app Learning Report (weekly email covers it)
- Content Controls / Topic Filter screen
- Profile Switching / Multi-child support (v2)
- Paired device management (v2)
- Help & Troubleshooting screen (MVP: support email link in About)

---

## 10. Legal & Compliance Requirements (Pre-Launch)

1. **COPPA verifiable parental consent** — legal review of consent capture mechanism in Screen 6
2. **Parental consent management** — review and withdrawal flow in Parent View
3. **Tier 3 data deletion** — confirm parent confirmation step is sufficient for 11–12 age group
4. **Tier 3 privacy copy** — legal review of accuracy against actual data schema before any user testing
5. **Sandbox conversation log default-off posture** — legal review of whether default-off satisfies parental access rights in target markets (US, EU, SEA)
6. **AI sandbox content filter architecture** — legal review of two-layer filter sufficiency for children's app classification
7. **Premium cosmetics** — CARU review for US market before any cosmetics system ships (v1.1)
8. **CAN-SPAM / GDPR** — unsubscribe path for weekly email summaries must be as easy as subscribe

---

## 11. Open Questions for Implementation Planning

1. What is the backend architecture for the adaptive AI engine? (session history, performance tracking, content selection logic)
2. What is the content authoring pipeline for lessons and mini-games? (how is curriculum content created and updated)
3. How does the AI companion voice work — TTS, pre-recorded, or hybrid?
4. What is the offline content strategy — which lessons/activities are cached locally?
5. How is activity progress persisted mid-session for resume on Tier 2–3?
6. What analytics events are collected, and does collection require consent adjustments per market?
7. What is the content moderation SLA for AI sandbox responses — real-time filtering latency?
