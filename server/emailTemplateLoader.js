// emailTemplateLoader.js
const fs = require('fs');
const path = require('path');

// Function to read HTML template file
const loadHtmlTemplate = fileName => {
  const templatePath = path.join(__dirname, 'emailTemplates', fileName);

  return new Promise((resolve, reject) => {
    fs.readFile(templatePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = loadHtmlTemplate;
