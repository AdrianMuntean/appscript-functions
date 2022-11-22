const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function generateReport() {
  const data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1").getDataRange().getValues();
  const report = {};
  const today = new Date();
  const lastMonthIndex = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
  const currentYearReport = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
  const lastMonthData = data.filter(d => {
    const date = new Date(d[1]);
    const month = date.getMonth();
    const year = date.getFullYear();

    return month === lastMonthIndex && year === currentYearReport;
  });

  for (const entry of lastMonthData) {
    const purpose = entry[4];
    report[purpose] = (report[purpose] ?? 0) + parseInt(entry[2], 10);
  }

  const totalValue = parseInt(Object.values(report).reduce((acc, value) => acc + value, 0), 10);

  const monthName = monthNames[lastMonthIndex];
  const htmlTable = `
  <table>
    <tr>
      <th>Month</th>
      <th>Spending</th>
    </tr>
    ${Object.keys(report).map(key => `<tr><td>${key}</td><td>${report[key]}</td></tr>`).join('<hr>')}
  </table>`;

    MailApp.sendEmail({
    to: 'test@test.com',
    subject: `Monthly report: ${monthName}`,
    htmlBody: `<p>For ${monthName} ${currentYearReport} your total spendings were ${totalValue} as follows<p/><br/>${htmlTable}`,
  });
}
