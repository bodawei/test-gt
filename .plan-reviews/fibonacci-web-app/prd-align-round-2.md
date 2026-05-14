# PRD Alignment Round 2: Constraints & Non-Goals
**Review ID:** fibonacci-web-app  
**Phase:** prd-align-2  
**Date:** 2026-05-14  
**Coordinator:** gastown.mayor  
**Legs:** constraints-compliance (tg-sg8), non-goals-enforcement (tg-5vd)

---

## Summary

Two legs ran in parallel. Constraints compliance found one must-fix (PRD/design contradiction on error handling) and four should-fix items. Non-goals enforcement found no must-fix violations and two should-fix scope additions that need explicit authorization.

**Overall confidence:** ~90%

---

## Must-Fix Changes Applied

### MF-1: Error Handling — validation ceiling contradiction (tg-sg8)

**Problem:** The PRD Error Handling clause states that inputs > F(78) trigger an error with "F(78) is the maximum supported value" messaging. R1 revised the design to accept inputs up to MAX_SAFE_INTEGER and silently clamp them to F(78) as the nearest valid result. These directly contradict.

**Resolution (Option A applied):** Update the PRD Error Handling clause:
- Validation ceiling is `Number.MAX_SAFE_INTEGER` (not F(78))
- Inputs in the range `(F(78), MAX_SAFE_INTEGER]` are valid and return F(78) as the result
- F(78) remains the largest computable Fibonacci number; inputs beyond F(78) are clamped, not rejected
- Error path triggered only for: non-integer, negative, non-numeric, or > MAX_SAFE_INTEGER inputs

---

## Should-Fix Items (deferred / tracked)

| ID | Source | Finding | Disposition |
|----|--------|---------|-------------|
| SF-1 (constraints) | tg-sg8 | "Result area cleared on error" — design says "clears when new query starts"; ambiguous whether error submit counts | Add explicit clause: error submission clears result area |
| SF-2 (constraints) | tg-sg8 | OQ-2 (single vs. multi-file) still listed in Open Questions despite trade-offs table deciding single-file | Close OQ-2: single-file is decided |
| SF-3 (R1 carry) | tg-sg8 | No WCAG conformance target (AA/AAA) stated | Needs explicit target before accessibility audit; add to OQ-3 or resolve |
| SF-4 (R1 carry) | tg-sg8 | OQ-3: input=0 display copy still open | Blocks UI copy; carry to R3 |
| SF-5 (R1 carry) | tg-sg8 | OQ-4: boundary neighbor display ("—" vs hide) still open | Blocks boundary-case UI; carry to R3 |
| SF-1 (non-goals) | tg-5vd | `?q=VALUE` shareable URL via `history.replaceState` + on-load auto-run — small scope addition, good UX, no non-goal violation | Not authorized in PRD; defer to v2 or explicit human approval |
| SF-2 (non-goals) | tg-5vd | CI + deploy pipeline (Node test runner, Netlify config, security header smoke test) — not in PRD | Confirm alongside OQ-1 (repo placement); no non-goal violation |

---

## Non-Goals Status

All five non-goals correctly excluded from the current design:

| Non-goal | Status |
|----------|--------|
| Not a sequence viewer | ✓ Excluded — 3-value result display is correct |
| Not float/negative support | ✓ Excluded — `Number() + isInteger()` check correct |
| Not a REST API | ✓ Excluded — no server; URL param is client-side only |
| Not mobile-native/offline | ✓ Excluded — no PWA features; single-file offline side-effect is not "support" |
| Not storing history/analytics | ✓ Excluded — no storage of any kind; `replaceState` does not accumulate |

---

## Open Items Carried to R3

- OQ-1: Repo placement (needed to confirm CI pipeline scope)
- OQ-3: Input=0 display copy
- OQ-4: Boundary neighbor display ("—" vs hide)
- WCAG conformance target

---

## Blockers on tg-wt9.8 (R3)

R3 is unblocked. Carry the four open questions above as inputs to the user-stories and open-questions alignment leg.
