// 执行终端命令代码
const {spawn} = require('child_process')

const commandSpawn = (...args)=>{
 return new Promise((resolve,reject)=>{
  const childProcess = spawn(...args);
  childProcess.stdout.pipe(process.stdout)
  childProcess.stderr.pipe(process.stderr)
  childProcess.stdout.on('data', (data)=>{
    let pattern = /^http:\/\/localhost:\d{4}\//gi
    console.log(pattern.test(data)+'123');
  })
  childProcess.on('close',()=>{
    resolve()
  })
 })
}

module.exports = {
  commandSpawn,
}