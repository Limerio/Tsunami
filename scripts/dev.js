const { spawn, exec } = require('child_process')
const { readdir } = require('fs/promises')
const { join } = require('path')
;(async () => {
  console.log('Check if docker is start')
  const docker = exec('npm run docker')

  docker.stdout.on('data', data => {
    console.log(data)
  })

  docker.stderr.on('data', data => {
    console.error(data)
  })

  docker.on('close', code => {
    if (code > 0) {
      throw new Error(`Process exited with code ${code}`)
    }
  })

  const apps = await readdir(join('apps'))
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
