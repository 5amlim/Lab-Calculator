# Urine collection sharing checks | v11.10

This release changes the source Sterile Urine Cup count, not the per-test specimen requirements or downstream transport-bag routing.

Tests run against the included catalog and app logic:
- Quest 395 (urine culture, Routine) plus Quest 5463 (UA, STAT): one shared sterile cup, separate STAT/routine transport bags.
- Three compatible random-urine tests with mixed priority: one source cup.
- Explicit request for two collection cups: two dedicated cups plus the shared cup for another test.
- Explicitly separate specimen: its own cup, never pooled with a routine spot sample.
- First-morning versus random urine collection: different collection requirements, separate cups.
- Two compatible first-catch urine tests: one shared cup across mixed priorities.
- 24-hour urine versus random/spot urine: separate containers.
- Urine versus stool using nominally identical sterile cups: separate physical collection counts.
- Mixed-priority blood source tubes: remain separate.
- On-screen Draw Plan and print Collection Summary use the same pooled source-cup count.
- Print plan labels shared mixed-priority source cup, and preserves independent transport bags.

Source specimen reuse should be limited to compatible tests using urine collected from the same patient, same collection event, and same collection protocol. Follow explicit Quest/facility instructions about sterile collection, timing, minimum volume, separate specimens, and acceptability of aliquots. STAT and Routine transport containers should still be bagged and routed separately.
