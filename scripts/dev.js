const { spawn } = require('child_process')
const fs = require('fs/promises')
const path = require('path')

;(async () => {
  const apps = await fs.readdir(path.join('apps'))
  apps.map(app => {
    const childProcess = spawn(`nx serve ${app}`, { shell: true })
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
