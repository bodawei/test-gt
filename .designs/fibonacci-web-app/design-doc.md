# Design: Fibonacci Web App

## Executive Summary

A single-file, zero-dependency HTML page that accepts an integer input and returns the nearest Fibonacci number along with its immediate neighbors. Computation is entirely client-side; no server, no storage, no frameworks.

**Last updated:** 2026-05-14 (prd-align-round-2 changes applied)

---

## Problem Statement

Find the Fibonacci number closest to an arbitrary non-negative integer input and display it with its context neighbors (F(n-1) and F(n+1)).

---

## Proposed Design

### Architecture

Single HTML file (`index.html`) containing inlined CSS and JS. No build step, no dependencies. Deployable by opening locally or hosting on any static file server.

### Computation

Pre-compute F(0)–F(78) at load time (array of 79 bigint values). Binary search to find the nearest value to the user's input. Return the triplet `[F(n-1), F(n), F(n+1)]`.

F(78) = 8944394323791464 is the largest value representable without exceeding `Number.MAX_SAFE_INTEGER`. No Fibonacci number beyond F(78) can be stored exactly as a JS number.

---

## Key Components

| Component | Responsibility |
|-----------|---------------|
| Input field | Accept user input; trigger validation on submit |
| Validator | `Number() + Number.isInteger()` check; rejects floats, negatives, non-numeric, > MAX_SAFE_INTEGER |
| Fibonacci table | Pre-computed array [F(0)…F(78)] |
| Search | Binary search over table to find nearest |
| Result renderer | Display 3-value context strip; highlight exact match |
| Error display | Show error message and clear result area |

---

## Interface

```
┌─────────────────────────────────────┐
│  Fibonacci Finder                   │
│  ┌─────────────────────┐  [Find]    │
│  │  100                │            │
│  └─────────────────────┘            │
│                                     │
│  Nearest Fibonacci to 100:          │
│  ┌──────┬──────┬──────┐             │
│  │  89  │  89  │ 144  │             │
│  │F(10) │F(11) │F(12) │             │
│  └──────┴──────┴──────┘             │
│  (nearest highlighted)              │
└─────────────────────────────────────┘
```

**Error state:**
- Result area clears immediately on error submission
- Inline error message below input field
- Input field retains the invalid value for correction

---

## Data Model

No persistent state. Session state:
- `currentInput: string` — last submitted value
- `result: { prev, match, next } | null` — current display state

The F(0)–F(78) lookup table is a module-level constant.

---

## Trade-offs and Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Single vs. multi-file | **Single file** | Zero setup, easy sharing, no build tooling needed |
| Validation ceiling | **MAX_SAFE_INTEGER** | Broader useful range; inputs > F(78) clamp to F(78) rather than error |
| Framework | **None** | Problem is tiny; framework overhead unjustified |
| Storage | **None** | History/analytics explicitly out of scope |
| Float support | **Rejected** | Non-goal; nearest-Fibonacci of a float is ambiguous |

---

## Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Large integer precision loss | Stay within MAX_SAFE_INTEGER; pre-clamp |
| Accessibility gaps | WCAG conformance target must be stated before audit (see Open Questions) |
| Scope creep: shareable URLs | `?q=VALUE` pattern noted as good UX; deferred to v2 unless explicitly authorized |
| Scope creep: CI pipeline | Confirm against OQ-1 (repo placement); no non-goal violation |

---

## Implementation Plan

1. HTML skeleton with input + result area
2. Fibonacci table constant (F0–F78)
3. Binary search + nearest-finder function
4. Validator (`Number()` + `isInteger()` + range check)
5. Event handler: submit → validate → search → render or error
6. CSS: minimal styling, result triplet layout, error state

---

## Open Questions

| ID | Question | Status |
|----|----------|--------|
| OQ-1 | Repo placement | Open — affects CI/deploy scope |
| ~~OQ-2~~ | ~~Single vs. multi-file~~ | **Closed — single file** |
| OQ-3 | Input=0 display copy | Open — blocks UI copy for F(0) case |
| OQ-4 | Boundary neighbor display ("—" vs. hide) | Open — blocks F(0)/F(78) UI |
| OQ-5 | WCAG conformance target (AA vs. AAA) | Open — blocks accessibility audit |
