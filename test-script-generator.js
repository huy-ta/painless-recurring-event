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

scriptGenerator.appendCodeFromFile('./test/test.painless');

fs.writeFileSync('./build/final-script.painless', scriptGenerator.buildString);
fs.writeFileSync('./build/final-script.min.painless', scriptGenerator.minifiedBuildString);
