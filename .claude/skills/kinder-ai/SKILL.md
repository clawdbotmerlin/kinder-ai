---
name: kinder-ai
description: Use when working on any task within the KinderAI project — an AI literacy mobile app for children aged 4–15. Provides product context, design principles, age-tier rules, and tech guidance to ensure all work aligns with the product vision.
---

# KinderAI Project Context

## What Is KinderAI?
A mobile-first AI literacy app for children aged 4–15. Children learn how to understand, use, and think critically about AI through short daily sessions (10–20 min), gamified progression, and age-appropriate content.

## Core Design Principles
- **Playful, adventurous, joyful** — every screen should feel like an adventure
- **Safety-first** — no personal data collection beyond what's required; COPPA-compliant
- **Parent trust** — transparent progress reports, no dark patterns
- **Accessibility** — supports pre-readers (age 4–6) via audio, icons, and animations

## Age Tiers

| Tier | Ages | Name | Key Constraint |
|------|------|------|----------------|
| 1 | 4–6 | Explorers | No reading/writing required; voice + tap + visuals only |
| 2 | 7–10 | Builders | Simple text, guided input, short sentences |
| 3 | 11–15 | Pioneers | Full text, critical thinking, open-ended prompts |

## Gamification Pillars
- XP + level-up system per tier
- Daily streak tracking
- Collectible AI characters / companions
- Badge system for skills mastered
- Parent-visible leaderboard (opt-in)

## Tech Stack (TBD — pending design spec)
- Frontend: React Native (cross-platform iOS + Android)
- Backend: TBD
- AI: Claude API (Anthropic) for interactive lesson content

## Key Files (once scaffold exists)
- `docs/superpowers/specs/` — design specs
- `.claude/skills/kinder-ai/` — this skill

## What NOT To Do
- Never use adult/complex vocabulary in UI copy without age-gating
- Never skip the age-tier logic when building screens
- Never design a screen without considering the Tier 1 (pre-reader) use case first
