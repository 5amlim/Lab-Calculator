# Submission Source Pill v11.70

- Kept the source tube count and tube icon, followed by the complete `From [source]` wording **inside the same original pill**.
- For serum, plasma, platelet-poor plasma, or RBC transfers that explicitly require centrifugation, the source pill now reads `From spun [source]` and a separate plain-text `· Spin` appears **outside** the pill.
- For stool, urine, and unspun transfers, retained the original source pill without adding a spin cue.
- Preserved the specimen badges in the header and omitted redundant specimen names below the header.
- Preserved LABEL badge generation and notes exactly.
- `node qa_submission_source_layout_v11.70.js` passed 8,096 comparisons and checks, comparing every active test's collection/submission counts and labeling with v11.69, plus mixed-order scenarios.
