# LiftLoop

A runnable concept for planning transparent reciprocal promotion between small subscription apps. The demo uses fictional app profiles and a deterministic, activation-weighted allocation engine.

## What works

- Choose among three fictional partners and compare audience fit.
- Set impression capacity and activation rate with bounded validation.
- Calculate a reciprocal allocation, expected activations, fairness, and fit warning.
- Copy a demo campaign configuration.
- Run the equivalent validated FastAPI domain operation locally.

GitHub Pages serves only the static Next.js frontend. The Python backend is tested, runnable source and is **not deployed**. No real ads, tracking, users, money, APIs, or AI are involved.

## Run and verify

```bash
npm ci
npm run typecheck
npm run test:e2e
npm run build
npm run audit:prod
cd api && uv sync --frozen && uv run pytest
```

Frontend: `npm run dev` · API: `cd api && uv run uvicorn main:app --reload`

## Docs

- [Product plan](docs/PRODUCT.md)
- [Office Hours diagnostic](docs/OFFICE_HOURS.md)
- [CEO review](docs/CEO_REVIEW.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Build prompts](docs/BUILD_PROMPTS.md)
- [Source notes](research/notes.md)

Source inspiration: [Ideabrowser — an ad-swap network for indie apps](https://www.ideabrowser.com/hub/ideas/an-ad-swap-network-for-indie-apps-94bf1d0d).
