function generateReport() {
  const data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1").getDataRange().getValues();
  const report = {};
  const today = new Date();
  const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
  const currentYearReport = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
  const lastMonthData = data.filter(d => {
    const date = new Date(d[1]);
    const month = date.getMonth();
    const year = date.getFullYear();

    return month === lastMonth && year === currentYearReport;
  });

  for (let d of lastMonthData) {
    const purpose = d[4];
    report[purpose] = (report[purpose] ?? 0) + parseInt(d[2], 10);
  }

  const totalValue = parseInt(Object.values(report).reduce((acc, value) => acc + value, 0), 10);
  Logger.log(`${JSON.stringify(report)} with total value ${totalValue}}`);

  const monthName = monthFromInteger(lastMonth + 1);
  const htmlTable = `
  <table>
    <tr>
      <th>Luna</th>
      <th>Spending</th>
    </tr>
    ${Object.keys(report).map(key => `<tr><td>${key}</td><td>${report[key]}</td></tr>`).join('<hr>')}
  </table>`;

    MailApp.sendEmail({
    to: 'test@test.com',
    subject: `Raport luna ${monthName}`,
    htmlBody: `<p>In luna ${monthName} ${currentYearReport} costurile totale au fost ${totalValue} dupa cum urmeaza<p/><br/>${htmlTable}`,
  });
  Logger.log(`sent email on month ${monthName}`);
}
