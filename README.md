# Quest Lab Calculator — GitHub Pages Edition

A static, browser-based batch search and print tool built from `Quest Lab Calculator (3).xlsx`.

This edition uses **no Supabase, server, API, login, or external database**. GitHub Pages hosts the files, and the browser handles searching, editing, printing, and local storage.

## Files to upload

Upload everything in this folder to the root of one GitHub repository:

- `index.html`
- `styles.css`
- `app.js`
- `data.js`
- `data.json`
- `.nojekyll`

`data.js` is the published master test list used when the website opens.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Choose **Add file → Upload files**.
3. Upload all files from this folder, not the outer folder itself.
4. Commit the files to the `main` branch.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Choose `main` and `/ (root)`, then save.
8. GitHub will display the public website address after deployment.

## Add or edit a test locally

1. Open the published website.
2. Select **+ Add test**, or select **Edit** beside an existing test.
3. Save the record.

The change is immediately available in that browser. It is stored in browser `localStorage` until you publish it to GitHub.

## Publish your edits for everyone

1. After making edits, select **Export GitHub data.js**.
2. Your browser downloads a new file named `data.js`.
3. In the GitHub repository, open the existing `data.js` file.
4. Choose the pencil/edit control, or use **Add file → Upload files** and upload the replacement file.
5. Commit the replacement to `main`.
6. GitHub Pages republishes the website automatically.

New visitors receive the updated list. A browser that has its own saved edits keeps those local edits and merges in newly published records. Use **Reset** in the app to discard local overrides and return fully to the latest published `data.js` list.

## Backups

- **Export backup JSON** saves the complete current database as a `.json` backup.
- **Import database** merges a JSON backup into the browser database.
- **Export GitHub data.js** creates the file intended for publishing through GitHub.

Keep a JSON backup before large changes.

## Included features

- 253 spreadsheet records preloaded
- Search by Quest code or test name
- Batch paste and best-match selection
- Editable and custom records
- Tube and temperature color coding
- Draw-plan summary
- Print-friendly landscape collection sheet
- CSV summary export
- JSON backup/import
- Publishable `data.js` export

## Limitations

- GitHub Pages cannot accept shared live edits. Publishing a replacement `data.js` is the manual shared-update workflow.
- Do not enter patient names, dates of birth, results, medical record numbers, or other PHI.
- Verify current collection requirements and service-area availability in the official Quest Test Directory before collection.
- Spreadsheet-derived mappings may require manual verification.
