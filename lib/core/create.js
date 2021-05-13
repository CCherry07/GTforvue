const program = require('commander');

const {
  createProjectAction,
  addTemplate,
  addAssemblyRoute,
  addStore
} = require('./actions')
const createCommands = () =>{
  program
  .command('create <project> [others...]')
  .description('clone project ing...')
  .action(createProjectAction)
  
// 添加一个vue模板commend
  program
  .command('add-t <name> [others...]')
  .description('添加一个vue模板', '例如：gt add-t "name" -d [src/components]')
  .action((name)=>{
    addTemplate(name,program.opts().dest||'src/components')
  })

  // vue组件和路由commend
  program
  .command('add-a <name> [others...]')
  .description('添加一个vue组件和路由', '例如：gt add-a "name" -d [src/components]')
  .action((name)=>{ 
    addAssemblyRoute(name,program.opts().dest||'src/pages')
  })

  // store
  program
  .command('add-s <name> [others...]')
  .description('添加一个vue-store', '例如：gt add-s "name" -d [src/components]')
  .action((name)=>{ 
    addStore(name,program.opts().dest||'src/store')
  })
}

module.exports = createCommands