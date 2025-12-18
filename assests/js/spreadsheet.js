// Code.gs
var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

// Run this ONCE (select initialSetup in editor and click Run)
function initialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

// Handles form POSTs
function doPost(e) {
  var lock = LockService.getScriptLock();
  var gotLock = false;

  try {
    gotLock = lock.tryLock(10000);
    if (!gotLock) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'error', message: 'Could not obtain lock.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    // Read headers from the first row
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var params = e.parameter || {};
    var newRow = headers.map(function(header) {
      // If header looks like timestamp, put date
      if (String(header).toLowerCase() === 'timestamp') {
        return new Date();
      }
      // map header -> form field with same name
      return params[header] || '';
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (gotLock) {
      try { lock.releaseLock(); } catch (e) {}
    }
  }
}
