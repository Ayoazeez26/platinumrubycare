/**
 * Platinum Ruby Care - Form to Google Sheets
 * Deploy as web app: Run doPost, Execute as: Me, Who has access: Anyone
 */

const SPREADSHEET_ID = ''; // Paste your Google Sheet ID here (from the sheet URL)
const REFERRALS_SHEET = 'Referrals';
const CONTACT_SHEET = 'Contact';

function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const formType = params.formType;

    if (!formType) {
      return jsonResponse({ success: false, error: 'Missing formType' }, 400);
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let result;

    if (formType === 'referral') {
      result = appendReferral(ss, params);
    } else if (formType === 'contact') {
      result = appendContact(ss, params);
    } else {
      return jsonResponse({ success: false, error: 'Invalid formType' }, 400);
    }

    return jsonResponse({ success: true, message: result });
  } catch (err) {
    Logger.log(err);
    return jsonResponse({ success: false, error: err.message || 'Server error' }, 500);
  }
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
  return 'Message sent. Our clinical team will be in touch soon.';
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function jsonResponse(data, statusCode) {
  statusCode = statusCode || 200;
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
