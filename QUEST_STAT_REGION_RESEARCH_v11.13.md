> Historical v11.13 research, superseded for Southern California by the user-supplied October 2025 Quest menu. See QUEST_STAT_SOCAL_MENU_v11.14.md for current in-app eligibility.

# Quest STAT eligibility by service area (research summary)

Official Quest specimen collection and transport guide states STAT service is limited to particular tests and that clients should contact the receiving laboratory. A published menu at one lab does not apply to a different regional Quest account.

Sources
- Quest Specimen Collection and Transport Guide: https://www.questdiagnostics.com/content/dam/corporate/restricted/documents/test-directory/Specimen_Collection_and_Transport_Guide_2019.pdf
- Quest Short Pump RRL (Virginia) STAT menu (updated July 24, 2025): https://www.questdiagnostics.com/content/dam/corporate/restricted/images/medical-groups-lpg-phase-2/bayview/Short-Pump-RRL_STAT-Testing.pdf

## Implemented STAT area lists
- Southern California: 809 Sed Rate, a clinic-requested STAT default, **not independently confirmed** on a Quest SoCal menu.
- Northern California: No public account-specific STAT list verified. Empty until written Quest approval.
- New York: No public account-specific STAT list verified. Empty until written Quest approval.
- Florida: No public account-specific STAT list verified. Empty until written Quest approval.
- Virginia, Short Pump RRL: Codes from its specific official published STAT menu; NOT a nationwide list. The PDF states weekday/weekend/holiday and receipt-time restrictions.

For production across multiple clinics, obtain the STAT test-code lists and scheduling/courier instructions from each market's Quest account representative. Add confirmed code strings to `STAT_AREAS` in `app.js` and deploy the centrally updated app. Do not copy Virginia entries into a different market. The site is static; the region selector is saved per browser rather than an authenticated account setting. A STAT button is a *routing aid*, not a guarantee of acceptance or turnaround time.

For safety, no STAT buttons are shown until staff select the receiving Quest service area. The chosen area is stored in the browser; unselected is the initial state.
