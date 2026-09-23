# CEO Review

**Mode:** Scope reduction for the runnable prototype; selective expansion only after observed exchanges.

## Nuclear challenge

The premise is vulnerable: installs are not equal, cross-promotion can erode user trust, and a network without quality controls becomes an arbitrage market for junk traffic. The product outcome is not “more impressions.” It is **incremental activated users at a trusted, measurable exchange rate**.

CURRENT: deals in DMs and spreadsheets → THIS PROTOTYPE: auditable pair planning → 12-MONTH IDEAL: curated exchange with verified events, make-goods, and partner reputation.

## Architecture and alternatives

- **Minimal:** deterministic browser calculator + matching FastAPI operation. Lowest risk; chosen for this demo.
- **Cohort service:** Postgres ledger, signed event ingestion, scheduled settlement. Best next step after manual demand.
- **Open network:** real-time marketplace and SDK. Deferred until repeated pair behavior exists.

The implementation reuses the factory’s static Next.js/FastAPI/Playwright deployment shape, but the domain workflow and allocation engine are original to LiftLoop.

```text
App profiles + campaign constraints
              │
              ▼
       validation boundary
        │       │       │
      valid    empty   invalid
        │       │       └─ named field error
        │       └─ empty-state guidance
        ▼
 activation-weighted capacity engine
        │
        ├─ allocation + fairness ratio
        ├─ partner-fit warnings
        └─ exportable demo config
```

## Review findings

1. **Architecture:** keep scoring pure and shared via explicit fixtures; do not imply frontend calls the undeployed API. Future event ingestion needs idempotency keys and append-only records.
2. **Errors:** name invalid MAU, impression, activation, overlap, and identical-app failures. Surface them inline; never silently clamp.
3. **Security:** no secrets or user data in this demo. Future SDK events require signed requests, replay protection, origin allowlists, and abuse review.
4. **Data flow:** handle blank, zero, malformed, extreme, stale, and double-submit states. Inputs are bounded before calculation.
5. **Code quality:** a pure deterministic allocation function is preferable to simulated AI. Avoid speculative marketplace abstractions.
6. **Tests:** cover happy path, asymmetric capacity, bad input, reset, partner switching, result export, and 390px overflow.
7. **Observability:** production metrics must include accepted matches, eligible impressions, click-through, activation, imbalance, fraud flags, and make-good debt. Prototype has visible computation state only.
8. **State:** browser state is ephemeral and labeled. Future ledger needs unique event IDs, campaign membership constraints, and immutable settlement history.
9. **API:** `/plan` is deterministic and versionable; validation errors use HTTP 422. Rate limiting is required before public hosting.
10. **Scale:** calculation is O(partners). At 100× load, signed event aggregation—not planning—is the bottleneck.
11. **UX:** planner first, evidence second, result third. Loading, invalid, empty, and ready states are explicit; controls remain keyboard accessible and tables do not force mobile overflow.

## Decisions

- Build the calculator, partner chooser, fairness result, and config-copy interaction.
- Label all app data fictional and all state demo-only.
- Exclude live ads, tracking pixels, authentication, billing, AI, and public matching.
- Python is tested source only; GitHub Pages serves the static frontend.

**Status:** DONE_WITH_CONCERNS — viability depends on observed repeat swaps, not newsletter market statistics.
