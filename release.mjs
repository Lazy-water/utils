import path from 'path'
import { execSync } from 'child_process'
import fs from 'fs'

const project = path.resolve('./dist')
const packages = path.resolve('./package.json')
const readme = path.resolve('./README.md')
const license = path.resolve('./LICENSE')

fs.copyFileSync(packages, path.resolve(project, 'package.json'))
fs.copyFileSync(readme, path.resolve(project, 'README.md'))
fs.copyFileSync(license, path.resolve(project, 'LICENSE'))

execSync(`cd ${project} && npm publish --access public`)
console.info('--------', 'release successfully')
