# Architecture

```text
demo.json ──► Next.js static UI ──► result + copied demo config
    │                 (Pages)
    └────────► FastAPI /plan ──► validated allocation response
                    (local/tested source only)
```

The browser and API intentionally implement the same deterministic rule: exchange capacity is balanced by expected activations, capped by each side’s available impressions. Inputs are bounded and same-app exchanges are rejected by the API.

Future production boundaries: a versioned API; Postgres append-only campaign events; signed, replay-protected SDK ingestion; asynchronous settlement; and an operator review queue. No such production services are claimed in this demo.
