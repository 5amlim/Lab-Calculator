# Quest Southern California STAT menu integration (v11.14)

Source: user-uploaded **STAT LABS - 10-2025 - Copy of South California STAT Menu 090925.xlsx**.
Each tab represents a distinct Quest rapid-response/receiving laboratory. It is not a single SoCal-wide promise of STAT availability.
Rows were read from paired CODE / REPORT NAME columns B-C, E-F, and H-I.

## Eligibility interpretation

- **Southern California · Common to all labs** uses the intersection of all nine tab lists, not their union. This is deliberately conservative.
- Selecting a specific receiving RRL uses that tab only. Menu membership enables a **Mark STAT** control, not automatic STAT designation.
- All tests start Routine, including **809 Sed Rate by Modified Westergren**. Previously auto-STAT ESR selections are reset once on upgrade.
- STAT routing still requires confirmation of the receiving lab, test code, service hours, account access, courier, and current acceptance.
- No additional test definitions were created; listed codes absent from the calculator remain unavailable until separately verified and added.
- The REVISIONS sheet removes code **713** from all RRLs. Although still typed on the Highland tab, it is excluded from Highland eligibility.

## Counts

| Receiving lab | Menu codes used | Codes already in calculator |
|---|---:|---:|
| Arcadia RRL | 96 | 90 |
| Bakersfield RRL | 74 | 72 |
| Highland RRL | 84 | 81 |
| Orange RRL | 92 | 84 |
| Redlands RRL | 84 | 82 |
| Riverside RRL | 82 | 80 |
| San Diego RRL | 89 | 84 |
| Ventura RRL | 82 | 79 |
| West Hills Laboratory | 104 | 95 |
| SoCal common to all nine | 66 | 64 |

Union across specific SoCal labs: **118** unique codes after exclusion; **104** are currently in calculator, **14** are not.

Missing test codes in the calculator (not added by this change): 250, 310, 444, 784, 890, 5406, 8013, 8477, 10553, 17667, 37015, 38226, 59118, 70117

## Implementation notes

The existing region storage key is retained. A browser previously selecting Southern California will now use the conservative common-codes menu until a specific lab is chosen.
The feature stores only a selected receiving lab key in the browser; it does not verify live Quest service or courier pickups.
