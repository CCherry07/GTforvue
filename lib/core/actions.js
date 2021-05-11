const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const download = promisify(require("download-git-repo"));
const open = require("open");

const { compile, writerFile, mkdirSync } = require("../utils/utils");
const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const createProjectAction = async (project) => {
  console.log(`正在为你创建 ${project} 项目`);
  // clone 包
  await download(vueRepo, project, { clone: true });
  //  执行npm install
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(npm, ["install"], { cwd: `./${project}` });
  open("http://localhost:8080/");
  // 执行npm run serve
  await commandSpawn(npm, ["run", "serve"], { cwd: `./${project}` });
  console.log(`你的 ${project} 项目创建已完成`);
};

// 模板的action
const addTemplate = async (name, dest) => {
  console.log("vue模板正在创建");
  // 拉取ejs组件模板  // 编译ejs模板文件
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  // 根据ejs模板生成vue模板
  const targetPath = path.resolve(dest, `${name}.vue`);
  // 响应文件写入
  if (mkdirSync(dest)) {
    writerFile(targetPath, result)
      .then(() => {
        console.log("创建vue模板成功");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// 组件与路由
const addAssemblyRoute = async (name, dest) => {
  console.log("vue组件正在创建");
  // 拉取ejs组件模板  // 编译ejs模板文件
  const assemblyResult = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  const routeResult = await compile("vue-router.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  // 根据ejs模板生成vue模板
  const targetPath = path.resolve(dest, `${name}.vue`);
  const routePath = path.resolve(dest, `${name}.js`);
  // 响应文件写入
  if (mkdirSync(dest)) {
    writerFile(targetPath, assemblyResult)
      .then(() => {
        console.log("创建vue组件成功");
      })
      .catch((err) => {
        console.log(err);
      });
    writerFile(routePath, routeResult)
      .then(() => {
        console.log("创建vue组件成功");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const addStore = async(name, dest) => {
  console.log("vue-store正在创建");
  // 拉取ejs组件模板  // 编译ejs模板文件
  const storeResult = await compile("vue-store.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  // 根据ejs模板生成vue模板
  const targetPath = path.resolve(dest, `${name}.js`);
  // 响应文件写入
  if (mkdirSync(dest)) {
    writerFile(targetPath, storeResult)
      .then(() => {
        console.log("创建vue-store成功");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
module.exports = {
  createProjectAction,
  addTemplate,
  addAssemblyRoute,
  addStore,
};
