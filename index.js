#!/usr/bin/env node
const program = require('commander');
const helpOptions =  require('./lib/core/help')
const createCommands = require('./lib/core/create')
program.version(require('./package-lock.json').version);
program.version(require('./package-lock.json').version ,'-v -version');
helpOptions()
// 创建命令行
createCommands()
// 解析输入
program.parse(process.argv);
// console.log(program.opts().dest)