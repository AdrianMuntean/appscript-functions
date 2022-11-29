# Registration form

Check more about the functionality in this [blog post on Offerzen]()

## Steps

1. Define a Spreadsheet with the possible values of the dropdown
2. Create a [form](https://docs.google.com/forms/u/0/?tgif=d) with other details like name, email and a dropdown with possible selections
3. Add AppScript in the SpreadSheet with the responses and define the [process functions](registration-form.js)
4. On submit, the script marks the row as processed and updates the possible values in the dropdown.
5. Add [another script](../../populateDropdown.js) in the SpreadSheet with the possible values which will update the dropdown options on data change