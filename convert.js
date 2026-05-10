const fs = require('fs');

function convertMdToJson(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const blocks = content.split('---').map(b => b.trim()).filter(b => b.length > 0);
  const jsonArray = [];

  for (const block of blocks) {
    const obj = {};
    const lines = block.split('\n');
    for (const line of lines) {
      if (line.includes(':')) {
        let firstColonIndex = line.indexOf(':');
        let key = line.substring(0, firstColonIndex).trim();
        let value = line.substring(firstColonIndex + 1).trim();
        
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Parse stringified array like '["Vue.js", "React"]'
          value = value.slice(1, -1).split(',').map(v => {
            let item = v.trim();
            if (item.startsWith('"') && item.endsWith('"')) item = item.slice(1, -1);
            return item;
          });
        }
        obj[key] = value;
      }
    }
    if (Object.keys(obj).length > 0) {
      jsonArray.push(obj);
    }
  }

  const newFilePath = filePath.replace('.md', '.json');
  fs.writeFileSync(newFilePath, JSON.stringify(jsonArray, null, 2));
  console.log(`Converted ${filePath} to ${newFilePath}`);
  fs.unlinkSync(filePath); // remove md file
}

convertMdToJson('./content/id/experience.md');
convertMdToJson('./content/en/experience.md');
convertMdToJson('./content/id/projects.md');
convertMdToJson('./content/en/projects.md');
