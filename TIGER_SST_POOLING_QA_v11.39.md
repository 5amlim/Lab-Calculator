# v11.39 Tiger SST usable-serum pooling update

- Gold SST continues to pool on 2.5 mL usable serum per filled 5 mL Gold collection tube.
- Tiger SST now pools on 4.0 mL usable serum per filled 7.5 mL Tiger collection tube. This replaces its prior whole-blood equivalent calculation; serum requirements are pooled in serum volume units using the existing preferred/minimum requirement parser.
- Single test maximum of one SST unless explicit multiple collection tubes specified remains unchanged; high-volume tests still produce an insufficiency warning rather than silently adding extra collection tubes.
- Explicit two/three tube requests, dedicated and full tubes, original-SST versus transfer-source tubes, different transfer destinations, priority, temperature and bag separation remain in place.
- Whole-blood preferred/minimum draw volume badges remain based on a separate 2.5x planning conversion and are NOT reinterpreted as serum-yield guarantees.
- Existing desktop/mobile print CSS and layouts unchanged. Print legend updated to communicate the new 4 mL serum assumption.

## Regression verification

- `node qa_gold_sst_pooling_v11.38.js`: 8,351 checks pass.
- `node qa_tiger_sst_4ml_v11.39.js`: 20,068 checks pass. Checks include 748 active SST single-test entries, explicit multi-tube conditions, original vs transfer, separate destinations, STAT, temperature groups, print notes, 2,100 mixed-order simulations and unchanged Gold counts.
- `node --check app.js`: syntax valid.
- Source directory `data.js`, `styles.css`, `experience.css`, `print.css` byte-identical to v11.38. No print-layout rules changed.
- Existing unrelated test scripts `qa_search_aliases.js` (ESR fixture) and `qa_urine_collection_audit.js` (older expected catalog count) fail in the original v11.38 as well. These were not altered in this update.

A 4.0 mL usable serum yield from 7.5 mL collected blood is a **planning assumption**, not a guaranteed or instrument-validated value. Inspect actual yield and receiving lab requirements.
