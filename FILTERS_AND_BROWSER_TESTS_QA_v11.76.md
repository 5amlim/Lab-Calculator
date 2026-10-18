# v11.76 test-filter and browser-only removal QA

- Inline Chromium browser loaded the actual calculator HTML, CSS, bundled data and app code at 1280px and 390px.
- No JavaScript runtime errors.
- Tested specimen type (Urine: 194), combined Urine + Frozen (19), explicit pediatric/neonatal names (8), fasting preferred (33), centrifugation (1924), reset button, opening and closing filter panel.
- Tested browser custom-test removal with an existing packaged test override in storage and a selected cart ID. Cancel preserved the custom test. Confirm removed only the custom test, retained the packaged override, retained selected packaged test, and removed the cleared entry's selected ID.
- Neonatal Microtainer direct-submission regression: 8079 assertions passed with no unintended changes to other test collection or submission plans and labels.
- Because the runtime prevents navigation to local URLs, test rendering used the same HTML, styles, bundled data, and application JavaScript inside a self-contained Chromium document with a simulated browser-storage interface; actual Safari printing still needs real-device validation.
