const fs = require('fs');
const { exec } = require('child_process');

fs.readFile('Front-endRequirements.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading requirements.txt:', err);
    return;
  }

  const dependencies = data.split('\n').filter(Boolean);

  dependencies.forEach(dep => {
    const [packageName, version] = dep.split('==');
    const installCommand = `npm install ${packageName}${version ? '@' + version : ''}`;
    
    exec(installCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing ${packageName}:`, error);
        return;
      }
      console.log(`Installed ${packageName}`);
    });
  });
});