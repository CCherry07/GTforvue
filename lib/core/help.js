const program = require('commander')
 
const helpOptions=()=>{
//增加自己的options 
  program.option("-d --dest <dest>",'创建到~目标文件夹,例如:-d /src/components');
}

module.exports = helpOptions;
