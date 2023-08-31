import path from 'path';
import fs from 'fs'

import ts from 'rollup-plugin-typescript2'
import cjs from '@rollup/plugin-commonjs'


const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules')

/**
 * 解析包的路径
 */
export const resovlePkgPath = (pkgName, isDist) => {
  if (isDist) {
    return `${distPath}/${pkgName}`
  }
  return `${pkgPath}/${pkgName}`
}


/**
 * 解析packages的文件方法
 */
export const getPackageJSON = (pkgName) => {
  // ...包的路径
  const path = `${resovlePkgPath(pkgName)}/package.json`
  const str = fs.readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(str)
}


/**
 * 获取所有基础的rollupPlugins
 */
export const getBaseRollupPlugins = ({
  typescript = {}
} = {}) => {
  return [cjs(), ts(typescript)]
}