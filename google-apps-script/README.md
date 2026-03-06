# Platinum Ruby Care – Google Sheets Integration

This script receives form submissions from the website and appends them to Google Sheets.

## Setup

### 1. Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Copy the **Spreadsheet ID** from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
3. The script will create two sheets automatically: **Referrals** and **Contact**.

### 2. Create the Apps Script

1. Open [script.google.com](https://script.google.com).
2. Create a new project.
3. Replace the default `Code.gs` with the contents of `Code.gs` in this folder.
4. Paste your Spreadsheet ID into the `SPREADSHEET_ID` constant (around line 6).
5. Save the project (Ctrl/Cmd + S).

### 3. Deploy as Web App

1. Click **Deploy** → **New deployment**.
2. Click the gear icon next to “Select type” and choose **Web app**.
3. Set:
   - **Description**: “Form handler”
   - **Execute as**: Me (your account)
   - **Who has access**: Anyone (so the website can send requests)
4. Click **Deploy** and authorize when prompted.
5. Copy the **Web app URL** (it ends with `/exec`).

### 4. Update the Website

1. Open `index.html`.
2. Find `const FORM_SCRIPT_URL = '...'` near the top of the `<script>` block.
3. Replace the placeholder with your deployed web app URL.

## CORS and iframe submission

The forms submit via a hidden iframe instead of `fetch` to avoid CORS errors when the site is hosted on a different domain than `script.google.com`. The script returns HTML that uses `postMessage` to notify the page of success or failure.

## Beautifying the sheet

The script formats headers (bold, dark background, white text), sets column widths, freezes the header row, and uses alternating row colours. New submissions are formatted automatically.

To beautify sheets that already have data, run `beautifyAllSheets` once:
1. In the script editor, select `beautifyAllSheets` from the function dropdown
2. Click Run
3. Authorize if prompted

## Data stored

### Referrals sheet
| Timestamp | Name | Professional Role | Organisation | Service User Profile |
|-----------|------|-------------------|--------------|----------------------|

### Contact sheet
| Timestamp | First Name | Last Name | Email | Message |
|-----------|------------|-----------|-------|---------|
