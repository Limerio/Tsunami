const { spawn, exec } = require('child_process')
const { readdir } = require('fs/promises')
const { join } = require('path')
;(async () => {
  const apps = await readdir(join('apps'))
  apps.map(app => {
    const childProcess = spawn(`nx lint ${app}`, { shell: true })
    childProcess.stdout.on('data', data => {
      console.log(`${app} | ${data.toString('utf8')}`)
    })

    childProcess.on('close', code => {
      if (code > 0) {
        throw new Error(`Process exited : ${code}`)
      }
    })
  })
})()
