# Phased build prompts

1. **Concierge pilot:** add a private campaign record and CSV import for observed events. Preserve the deterministic planner and write contract tests for every status transition.
2. **Verified ledger:** implement signed, idempotent impression/click/activation ingestion, append-only storage, replay detection, and an operator-visible rejection reason. Add load and abuse tests.
3. **Settlement:** aggregate activation value, surface >15% imbalance, and require both partners to approve a make-good. Add audit logs, retries, metrics, alerts, and a rollback runbook.
4. **Curated cohorts:** add invite-only matching, audience-tag controls, brand exclusions, removal rights, billing, and retention analysis. Keep ranking explainable; do not introduce an LLM into settlement.
5. **Production hardening:** privacy review, platform-policy review, rate limits, data retention, support tooling, SLOs, incident response, and independent security testing.
