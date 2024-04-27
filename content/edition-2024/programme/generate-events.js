const fs = require('fs');
const parse = require('csv-parse');

function capitalize(s) {
  if (s.length > 1) {
    s = s[0].toUpperCase() + s.slice(1);
  }
  return s;
}

class Event {
  constructor(event_data) {
    this.event = event_data;
    this.title = capitalize(event_data['Titre de l\'event']);
    const dateString = event_data['Date event'];
    const startHourString = event_data['Heure début'];
    const endHourString = event_data['Heure fin'];
    this.startDate = createDate(dateString, startHourString);
    this.endDate = createDate(dateString, endHourString);
    this.showEnd = false;
    if (endHourString != "") {
      this.showEnd = true;
    }
    this.showHours = false
    if (startHourString != "") {
      this.showHours = true;
    }
    this.address = capitalize(event_data['Adresse lieu']);
    this.location = capitalize(event_data['Nom lieu']);
    this.shortDescription = capitalize(event_data['Description courte']);
    this.longDescription = capitalize(event_data['Description longue']);
    this.org1 = capitalize(event_data['Organisateur 1']);
    this.org2 = capitalize(event_data['Organisateur 2']);
    this.accessibility = capitalize(event_data['Infos accessibilités']);
    this.subscribeUrl = event_data['Lien inscription'];
  }

  toMarkdown() {
    let accessibility = "";
    let organizers = "";
    let subscribe = "";
    if (this.accessibility != "") {
      accessibility += "***Accessibilité :*** ";
      accessibility += this.accessibility;
    }
    if (this.org1 != "" || this.org2 != "") {
      organizers += "***Organisateurs :*** ";
      if (this.org1 != "") {
        organizers += this.org1;
      }
      if (this.org2 != "") {
        organizers += " et " + this.org2;
      }
    }
    if (this.subscribeUrl != "") {
      subscribe += `***Inscriptions :*** <${this.subscribeUrl}>`
    }
let markdownContent = `---
title: ${this.title}
startDate: ${this.startDate.toISOString()}
endDate: ${this.endDate.toISOString()}
showHours: ${this.showHours}
showEnd: ${this.showEnd}
location: ${this.location}
place: ${this.address}
placeUrl: 
---

${this.shortDescription}

${this.longDescription}

${subscribe}

${organizers}

${accessibility}

`;
    return markdownContent;
  }

  filename() {
    const dayStr = String(this.startDate.getDate()).padStart(2, '0');
    const monthStr = String(this.startDate.getMonth() + 1).padStart(2, '0');
    const name = this.title.toLowerCase().replace(/ /g, "-")
    return dayStr + "-" + monthStr + "-" + name + ".md"
  }

  writeFile() {
    fs.writeFile(this.filename(), this.toMarkdown(), 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${this.filename()}:`, err);
        return;
      }
      console.log(`File ${this.filename()} has been created.`);
    });
  }
}

function createDate(dateString, hourString) {
  const dateParts = dateString.split('/');
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // in Js, months starts at 0
  const year = parseInt(dateParts[2]);
  let hours = 0;
  let minutes = 0;
  const hourParts = hourString.match(/^(\d{1,2})(?:[:h](\d{1,2}))?$/);
  console.log("hour string is ", hourString, "and parsed parts are ", hourParts);
  if (hourParts) {
    hours = parseInt(hourParts[1], 10);
    minutes = hourParts[2] ? parseInt(hourParts[2], 10) : 0;
  }
  hours += 2; // add local timezone offset
  const date = new Date(year, month, day, hours, minutes);
  return date;
}

/// Main script :

// Read the CSV file
fs.readFile('prog-gf-2024.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse CSV data
  parse(data, {
    columns: true,
    trim: true,
    skip_empty_lines: true
  }, (err, events) => {
    if (err) {
      console.error('Error parsing CSV:', err);
      return;
    }

    // Generate markdown files for each event
    events.slice(0,5).forEach(event_data => {
      const event = new Event(event_data);
      console.log(event);
      console.log("filename is", event.filename())
      console.log(event.toMarkdown());
      event.writeFile();
      console.log("\n");
    });
  });
});



