const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

// 模板的编译
const compile = (template,data)=>{
  const templateRoad = `../templates/${template}`
  const templatePath = path.resolve(__dirname,templateRoad)
  return new Promise((resolve,reject)=>{
  ejs.renderFile(templatePath,{data},{},(err,res)=>{
    if(err)return console.log(err)
    resolve(res)
  })
 })
}

// 模板文件写入目标路径
const writerFile =(path,content)=>{
    return fs.promises.writeFile(path, content);
} 
const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在,判断父亲文件夹是否存在？
    if (mkdirSync(path.dirname(dirname))) {
      // 存在父亲文件，就直接新建该文件
      fs.mkdirSync(dirname)
      return true
    }
  }
}
module.exports = {
  compile,
  writerFile,
  mkdirSync
}
