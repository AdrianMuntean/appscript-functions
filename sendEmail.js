function sendUserEmail (email) {
  MailApp.sendEmail ({
    to: email,
    subject: 'Hello from appscript',
    htmlBody: `<p>${email}</p> <br/><br/>This is the body`,
    replyTo: 'another@email.com',
  });
}
