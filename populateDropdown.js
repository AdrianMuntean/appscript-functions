const ssId = 'spreadSheetIdWhereTheOptionsAre'; // the values should be unique
const formId = 'formId';

const wsData = SpreadsheetApp.openById(ssId).getSheetByName('data');
const form = FormApp.openById(formId);
const numberOfDataRows = 10;
const dropdownName = 'What are you favorite foods?';

function main() {
  const data = wsData.getSheetValues(1, 1, numberOfDataRows, 1);
  const optionsArray = [];
  for (const row of data) {
    optionsArray.push(...row);
  }
  Logger.log(optionsArray.length);
  const filteredData = optionsArray.filter((option) => !!option.trim());
  updateDropdown(filteredData);
}

function updateDropdown(data) {
  const items = form.getItems();
  const id = items.find((item) => item.getTitle() === dropdownName)?.getId(); // find the question by the title
  if (id) {
    const item = form.getItemById(formId);
    Logger.log(`Updating ${item.getTitle()}...`);
    item.asListItem().setChoiceValues(data);
  }
}
