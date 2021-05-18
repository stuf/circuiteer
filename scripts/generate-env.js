#!/usr/bin/env node
const Pkg = require('../package.json');
const { exec, writeEnvFile } = require('./_common');

const commit = exec('git', ['rev-parse', 'HEAD']);
const branch = exec('git', ['branch', '--show-current']);
const version = Pkg.version;
const appName = Pkg.name;
const created = new Date().toISOString();

const env = { commit, branch, version, appName, created };

writeEnvFile(env);
