/**
 * Platinum Ruby Care - Form to Google Sheets
 * Deploy as web app: Run doPost, Execute as: Me, Who has access: Anyone
 */

const SPREADSHEET_ID = ''; // Paste your Google Sheet ID here (from the sheet URL)
const REFERRALS_SHEET = 'Referrals';
const CONTACT_SHEET = 'Contact';

// Brand colours (Platinum Ruby Care)
const HEADER_BG = '#2E1113';   // Deep ruby
const HEADER_TEXT = '#FFFFFF';
const ACCENT = '#A10F18';      // Primary ruby
const ROW_ALT = '#F6F6F5';     // Off-white for alternating rows

function doPost(e) {
  try {
    // Support form-urlencoded (e.parameter) - used when posting from iframe to avoid CORS
    const params = e.parameter || {};

    const formType = params.formType;

    if (!formType) {
      return htmlResponse({ success: false, error: 'Missing formType' });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let result;

    if (formType === 'referral') {
      result = appendReferral(ss, params);
    } else if (formType === 'contact') {
      result = appendContact(ss, params);
    } else {
      return htmlResponse({ success: false, error: 'Invalid formType' });
    }

    return htmlResponse({ success: true, message: result });
  } catch (err) {
    Logger.log(err);
    return htmlResponse({ success: false, error: err.message || 'Server error' });
  }
}

// Returns HTML that posts message to parent window (avoids CORS - form submits in iframe)
function htmlResponse(data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><script>window.parent.postMessage({type:"platinum-form-response",data:' + json + '},"*");</script><p>Form submitted. You can close this window.</p></body></html>';
  return ContentService.createTextOutput(html).setMimeType(ContentService.MimeType.HTML);
}

function appendReferral(ss, params) {
  const sheet = getOrCreateSheet(ss, REFERRALS_SHEET, [
    'Timestamp', 'Name', 'Professional Role', 'Organisation', 'Service User Profile'
  ]);
  const row = [
    new Date(),
    params.name || '',
    params.role || '',
    params.organisation || '',
    params.serviceUserProfile || ''
  ];
  sheet.appendRow(row);
  formatNewRow(sheet, 5);
  return 'Referral submitted. Our team will respond within 24 hours.';
}

function appendContact(ss, params) {
  const sheet = getOrCreateSheet(ss, CONTACT_SHEET, [
    'Timestamp', 'First Name', 'Last Name', 'Email', 'Message'
  ]);
  const row = [
    new Date(),
    params.firstName || '',
    params.lastName || '',
    params.email || '',
    params.message || ''
  ];
  sheet.appendRow(row);
  formatNewRow(sheet, 5);
  return 'Message sent. Our clinical team will be in touch soon.';
}

function formatNewRow(sheet, numCols) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const rowRange = sheet.getRange(lastRow, 1, lastRow, numCols);
  rowRange.setWrap(true);
  rowRange.setVerticalAlignment('top');
  rowRange.setBackground((lastRow - 1) % 2 === 0 ? ROW_ALT : '#FFFFFF');
  sheet.getRange(lastRow, 1, lastRow, 1).setNumberFormat('dd/mm/yyyy hh:mm');
}

/**
 * Run this once from the script editor to beautify existing sheets.
 * Extensions → Apps Script → select beautifyAllSheets → Run
 */
function beautifyAllSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  [REFERRALS_SHEET, CONTACT_SHEET].forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (sheet && sheet.getLastRow() > 0) {
      beautifySheet(sheet, sheet.getLastColumn());
    }
  });
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    beautifySheet(sheet, headers.length);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    beautifySheet(sheet, headers.length);
  }
  return sheet;
}

function beautifySheet(sheet, numCols) {
  const lastRow = sheet.getLastRow();

  // Header row: bold, dark background, white text
  const headerRange = sheet.getRange(1, 1, 1, numCols);
  headerRange.setBackground(HEADER_BG);
  headerRange.setFontColor(HEADER_TEXT);
  headerRange.setFontWeight('bold');
  headerRange.setVerticalAlignment('middle');
  headerRange.setWrap(true);

  // Set column widths (adjust per sheet via name)
  const name = sheet.getName();
  if (name === REFERRALS_SHEET) {
    sheet.setColumnWidths(1, 1, 150);  // Timestamp
    sheet.setColumnWidths(2, 2, 140);  // Name
    sheet.setColumnWidths(3, 3, 140);  // Role
    sheet.setColumnWidths(4, 4, 180);  // Organisation
    sheet.setColumnWidths(5, 5, 300);  // Service User Profile
  } else if (name === CONTACT_SHEET) {
    sheet.setColumnWidths(1, 1, 150);  // Timestamp
    sheet.setColumnWidths(2, 2, 120);  // First Name
    sheet.setColumnWidths(3, 3, 120);  // Last Name
    sheet.setColumnWidths(4, 4, 200);  // Email
    sheet.setColumnWidths(5, 5, 300);  // Message
  }

  // Freeze header row
  sheet.setFrozenRows(1);

  // Format data rows if any (alternating colours, wrap text)
  if (lastRow > 1) {
    const dataRange = sheet.getRange(2, 1, lastRow, numCols);
    dataRange.setWrap(true);
    dataRange.setVerticalAlignment('top');
    // Alternating row colours
    for (let r = 2; r <= lastRow; r++) {
      const rowRange = sheet.getRange(r, 1, r, numCols);
      rowRange.setBackground((r - 1) % 2 === 0 ? ROW_ALT : '#FFFFFF');
    }
    // Timestamp column: date format
    sheet.getRange(2, 1, lastRow, 1).setNumberFormat('dd/mm/yyyy hh:mm');
  }
}

