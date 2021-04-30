const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const validateNpmPackageName = require('validate-npm-package-name');
const inquirer = require('inquirer');
const { exec } = require('shelljs');

const { writeFiles } = require('../util');
const { copyright, generatorBasePath } = require('../../config');
async function createAction(appName) {
  const result = validateNpmPackageName(appName);
  const targetDir = path.resolve(process.cwd(), appName);

  // 检查appName是否合法
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid app name: "${appName}"`));
    result.errors &&
      result.errors.forEach((error) => {
        console.error(chalk.red.dim('Error: ' + error));
      });
    result.warnings &&
      result.warnings.forEach((warning) => {
        console.error(chalk.red.dim('Warning: ' + warning));
      });
    exit(1);
  }
  // 检测是否存在同名文件夹
  if (fs.existsSync(targetDir)) {
    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `Target directory ${chalk.cyan(
          targetDir
        )} already exists. Pick an action:`,
        choices: [
          { name: 'Overwrite', value: 'overwrite' },
          { name: 'Cancel', value: 'cancel' },
        ],
      },
    ]);
    if (action === 'overwrite') {
      console.log(`\nRemoving ${chalk.cyan(targetDir)} ...`);
      await fs.remove(targetDir);
    } else {
      return;
    }
  }
  const creator = new Creator(appName, targetDir);
  await creator.create();
}
function Creator(appName, targetDir) {
  this.appName = appName;
  this.targetDir = targetDir;
}
Creator.prototype.create = async function () {
  // framework pick
  const inquirerData = await inquirer.prompt([
    {
      name: 'framework',
      type: 'list',
      message: 'Pick a framework which you want: ',
      choices: [
        // Micro frontend app templates
        { name: 'Micro Frontend Main App', value: 'micro.fe.main' },
        { name: 'Micro Frontend Pure html', value: 'micro.fe.purehtml' },
        {
          name: 'Micro Frontend App with React (Ant Design)',
          value: 'micro.fe.react.antd',
        },
        {
          name: 'Micro Frontend App with Vue (iView)',
          value: 'micro.fe.vue.iview',
        },
        // Normal frontend app templates
        { name: 'Normal App with React (Ant Design)', value: 'react.antd' },
        { name: 'Normal App with Vue (iView)', value: 'vue.iview' },
      ],
    },
    {
      name: 'version', // version
      type: 'input',
      message: 'Please enter your application version:',
      default: '0.0.1',
    },
    {
      name: 'private', // is-private
      type: 'confirm',
      message: 'Is your application private?',
      default: true,
    },
    {
      name: 'description', // description
      type: 'input',
      message: 'Please enter your application description:',
    },
  ]);
  const { framework } = inquirerData;
  const { appName, targetDir } = this;
  // 复制模板文件
  await fs.copy(`${generatorBasePath}/${framework}`, targetDir);

  // 合并package内容
  const defaultPackage = Object.assign({ name: appName }, inquirerData);
  const generatorPackage = await fs.readJSON(`${targetDir}/package.json`);
  const package = Object.assign(defaultPackage, generatorPackage);
  await writeFiles(targetDir, {
    'package.json': JSON.stringify(package, null, 2),
  });

  // 安装项目依赖
  console.log('\nInstalling dependencies, this might take a while...');
  exec('yarn install', { cwd: targetDir });

  // 初始化git仓库
  console.log('\n');
  exec('git init', { cwd: targetDir });
  exec('git add -A', { cwd: targetDir });
  exec('git commit -m init', { cwd: targetDir });

  // 完成
  console.log(`\nSuccessfully created project ${chalk.yellow(appName)}`);
  console.log(`Now you can get started with the following commands:\n`);
  console.log(`${chalk.blue(`$ cd ${appName}`)}\n`);
  console.log(`${chalk.blue(`$ npm run <Your Script>`)}\n`);
};
module.exports = (...args) => {
  return createAction(...args).catch((error) => {
    if (error) {
      process.exit(1);
    }
  });
};
