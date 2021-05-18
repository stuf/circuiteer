const { resolve } = require('path');
const { execSync } = require('child_process');
const { writeFileSync } = require('fs');

const exec = (cmd, args, opts = { stripTrailingNewline: true }) => {
  const result = execSync(`${cmd} ${args.join(' ')}`);

  let output = result.toString();

  if (opts.stripTrailingNewline) {
    output = output.replace(/\n$/, '');
  }

  return output;
};

const writeEnvFile = env => {
  const root = resolve(__dirname, '..');
  const file = resolve(root, '.env');

  const kvp = Object.entries(env)
    .map(([k, v]) => [`REACT_APP_${k}`, v].join('='))
    .join('\n')
    .concat('\n');
  console.log(kvp);

  writeFileSync(file, kvp);
};

module.exports = { exec, writeEnvFile };
