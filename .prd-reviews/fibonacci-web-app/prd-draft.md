# PRD: Fibonacci Web App

## Problem Statement

Users need a quick way to find the Fibonacci number closest to a given input value. No existing tool provides this with proper boundary display and input validation in a lightweight, zero-dependency web interface.

## Goals

1. Accept an integer input and return the nearest Fibonacci number
2. Show the surrounding context: F(n-1), F(n), F(n+1)
3. Support all valid non-negative integers up to `Number.MAX_SAFE_INTEGER`
4. Provide clear error messages for invalid inputs
5. Ship as a self-contained, zero-dependency web page

## Non-Goals

- **Not a sequence viewer:** Do not display the full Fibonacci sequence or sequence ranges
- **No float/negative support:** Reject floating-point and negative inputs with a clear error
- **Not a REST API:** No server component; computation is client-side only
- **Not mobile-native or offline-first:** No PWA features, service workers, or install flows (single-file offline access is a side-effect, not a feature)
- **No history or analytics storage:** No localStorage, no IndexedDB, no server-side logging; each session starts fresh

## User Stories / Scenarios

1. **Basic lookup:** User enters `100`, sees F(n-1)=89, F(n)=89, F(n+1)=144 with the nearest highlighted
2. **Exact match:** User enters `89` (a Fibonacci number), sees it highlighted as exact
3. **Large input:** User enters `9007199254740991` (MAX_SAFE_INTEGER), sees F(78)=8944394323791464 as the clamped result
4. **Error path — float:** User enters `3.14`, sees error message, result area clears
5. **Error path — negative:** User enters `-5`, sees error message, result area clears
6. **Error path — non-numeric:** User enters `abc`, sees error message, result area clears

## Constraints

1. Zero runtime dependencies — vanilla JS, no frameworks
2. Single HTML file deliverable
3. Inputs validated client-side: must be a non-negative integer ≤ `Number.MAX_SAFE_INTEGER`
4. **Error handling:** Inputs > `Number.MAX_SAFE_INTEGER` trigger an error. Inputs in the range `(F(78), MAX_SAFE_INTEGER]` are valid and return F(78) as the result. Error submissions clear the result area.
5. Must be accessible (WCAG target TBD — see Open Questions)
6. Must handle F(78) = 8944394323791464 as the largest computable value

## Open Questions

1. (OQ-1) Where does the repo live? (affects CI/deploy scope)
2. ~~(OQ-2) Single file vs. multi-file?~~ **Decided: single file.**
3. (OQ-3) What copy do we show when input=0? ("F(0) = 0" vs. special messaging)
4. (OQ-4) For boundary cases (F(0), F(78)), how do we display the missing neighbor? ("—" vs. hide the cell)
5. (OQ-5) WCAG conformance target: AA or AAA?

## Rough Approach

- Pre-compute all 79 Fibonacci numbers (F(0)–F(78)) at load time
- Binary search to find nearest value
- Render result with prev/next neighbors
- Inline all CSS and JS into a single `.html` file
