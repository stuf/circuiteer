#!/usr/bin/env node
const { statSync, mkdirSync } = require('fs');
const { join, resolve, relative, basename, dirname } = require('path');
const { execSync } = require('child_process');
const log = require('npmlog');

const { exit0, exit1, exit } = require('./_common');

//

log.heading = 'validate-deps';

const rootDir = resolve(__dirname, '..');
const bin = resolve(rootDir, 'node_modules', '.bin');
const src = resolve(rootDir, 'src');
const reports = resolve(rootDir, 'reports');
const scriptName = join(basename(__dirname), basename(process.argv[1]));
const args = process.argv.slice(2);
const restIx = args.findIndex(x => x === '--');
const restArgs = restIx !== -1 ? args.slice(restIx + 1) : [];

const rootRel = relative.bind(null, rootDir);

//

const exec = (cmd, ...argsIn) => {
  const cmdArg = [cmd, ...argsIn].flat().join(' ');

  log.silly('exec', 'executing command %s', cmdArg);

  const out = execSync(cmdArg, { cwd: rootDir });
  return out.toString();
};

const runCruise = (...argsIn) => {
  const baseArgs = ['-c .dependency-cruiser.js'];
  return exec(join(bin, 'depcruise'), [...baseArgs, ...argsIn]);
};

//

if (!args.length) {
  log.error('main', 'no command given, exiting');
  exit(1);
}

//

const mainCmd = args[0];
let out;
let error;

log.verbose('main', 'rootDir = %s', dirname(rootRel(rootDir)));
log.verbose('main', 'bin = %s', rootRel(bin));
log.verbose('main', 'src = %s', rootRel(src));
log.verbose('main', 'reports = %s', rootRel(reports));
log.verbose('main', 'scriptName = %s', scriptName);
log.verbose('main', '---');
log.verbose('main', 'command `%s`', mainCmd);

switch (mainCmd) {
  case 'validate':
    log.info('main', 'validate project source files');
    out = runCruise(src);
    console.log(out);
    break;

  case 'report':
    log.info('report', 'create validation report');
    log.info('report', 'ensure `%s` exists', rootRel(reports));
    try {
      statSync(reports);
    } catch (e) {
      if (e.code === 'ENOENT') {
        log.info('report', 'created reports directory `%s`', rootRel(reports));
        mkdirSync(reports);
      }
    }

    const repName = `depcruise-${+Date.now()}.html`;
    const repPath = join(reports, repName);

    out = runCruise(src, '-T err-html', `-f ${repPath}`, ...restArgs);

    log.info('report', `report created in ${rootRel(repPath)}`);

    exit0();
    break;

  default:
    log.error('main', 'unrecognized command `%s`', mainCmd);
    error = true;
    break;
}

if (error) {
  exit1();
}

exit0();
