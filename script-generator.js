const fs = require('fs');

class PainlessScriptGenerator {
  constructor() {
    this.buildString = '';
  }

  appendCodeFromFile(path) {
    this.buildString += fs.readFileSync(path, 'utf8') + '\n';
  }

  get minifiedBuildString() {
    return this.buildString.replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
  }
}

const scriptGenerator = new PainlessScriptGenerator();

scriptGenerator.appendCodeFromFile('./nearest-occur/daily.painless');
scriptGenerator.appendCodeFromFile('./nearest-occur/monthly.painless');

scriptGenerator.appendCodeFromFile('./shared/pre-script.painless');

// scriptGenerator.appendCodeFromFile('./nearest-occur/weekly.painless');
// scriptGenerator.appendCodeFromFile('./nearest-occur/yearly.painless');

scriptGenerator.appendCodeFromFile('./shared/post-script.painless');

fs.writeFileSync('./build/final-script.painless', scriptGenerator.buildString);
fs.writeFileSync('./build/final-script.min.painless', scriptGenerator.minifiedBuildString);
