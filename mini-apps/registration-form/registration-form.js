const responseSsId = 'formSpreadsheetId';
const optionsSsId = 'optionsSpreadsheetId';
const wsData =
  SpreadsheetApp.openById(responseSsId).getSheetByName('Form Responses 1');
const optionsData = SpreadsheetApp.openById(optionsSsId).getSheetByName('data');

const processedIndex = 9;
const emailIndex = 3;
const nameIndex = 1;
const placesStartIndex = 4;

function processRow(e) {
  const data = wsData.getSheetValues(2, 1, 1000, 21);
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!row[0] || row[processedIndex] === true || row[processedIndex]) {
      continue;
    }

    updatePossibleFields(row);

    const dv = wsData.getRange(i + 2, processedIndex + 1).getValue();
    if (!dv) {
      wsData.getRange(i + 2, processedIndex + 1).setValue(true);
      Logger.log(`Marked as processed row: ${i}`);
    }
  }
}

function updatePossibleFields(row) {
  const places = [];
  const data = optionsData.getSheetValues(1, 1, 844, 1);
  const valueToIndex = {};
  for (let i = 0; i < data.length; i++) {
    places.push(...data[i]);
    valueToIndex[data[i][0]] = i;
  }

  for (let i = placesStartIndex; i < processedIndex; i++) {
    if (row[i]) {
      for (const option of places) {
        if (option === row[i]) {
          Logger.log(`Removing ${option} as it was already selected`);
          optionsData.getRange(1 + valueToIndex[option], 1).setValue('');
        }
      }
    }
  }
}
