# Product plan

## ICP and JTBD

Bootstrapped subscription-app founders with 500–25,000 MAU and under $2,000/month in acquisition budget. When paid acquisition is uneconomic, help them exchange qualified placements with an adjacent app so they can acquire activated users without losing trust or guessing whether the trade was fair.

## MVP

Curated partner profiles, audience-fit screen, capacity inputs, activation-weighted allocation, seven-day campaign cap, signed event ledger, imbalance alert, and make-good recommendation. The shipped prototype demonstrates planning only.

## Data model

`App(id, category, audience_tags, mau)`; `Placement(id, app_id, surface, capacity)`; `Campaign(id, members, status, cap)`; `Event(idempotency_key, campaign_id, kind, occurred_at)`; `Settlement(campaign_id, delivered_value, balance, status)`. The demo replaces persistence with `data/demo.json`.

## Architecture

Static Next.js planning UI → future versioned FastAPI service → Postgres append-only events → scheduled settlement. Signed first-party events replace third-party cookies. The deterministic scoring engine is the system of record; an optional future model may summarize partner rationale but may not decide settlement.

## Economics

Validate $29/month for two active exchanges, then $79/month for cohorts and reconciliation. If an app currently pays an illustrative $6 per install, 20 incremental activations can justify the entry tier. Gross margin should exceed 80%; event ingestion and human curation are the main variable costs. Do not subsidize poor-quality inventory to manufacture liquidity.

## Validation

Run three manual pairs for seven days. Gate continuation on: 70% campaign acceptance, two repeated pairs, less than 15% activation-value imbalance after make-goods, no trust complaints, and at least two founders willing to pay $29. Observe setup live; surveys do not count.

## Moat

Not matching alone. The plausible moat is a high-integrity graph of app-to-app audience compatibility, verified post-click activation quality, policy-safe placements, and settlement reputation. It only forms through repeated trusted exchanges.

## Risks

Cold start, reciprocal traffic of unequal quality, install fraud, brand damage, attribution loss, platform-policy restrictions, adverse selection, and founders overstating activation rates. Mitigate with curated cohorts, signed events, caps, transparent math, and removal rights.

## 30 / 60 / 90 days

- **30:** concierge three pairs; define event schema; watch every setup; charge manually.
- **60:** ship private cohort ledger, signed events, imbalance alerts, and make-goods to 10 apps.
- **90:** test repeat matching and $29/$79 tiers with 25 apps; publish cohort-quality rules. No open marketplace until repeat rate and abuse controls are proven.

## Source signals

The source cites app supply growth, a possible 5× rise in Product Hunt submissions, an illustrative $6 install cost, and mobile-game cross-promotion precedent. The gated full page prevented verification of scores, keyword tables, offer ladder, growth chart, difficulty, revenue potential, and detailed GTM notes; none are invented here.
