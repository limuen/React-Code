import { getPackageJSON, resovlePkgPath, getBaseRollupPlugins } from './utils'
import generatePackageJson from 'rollup-plugin-generate-package-json'

// 直接传入package.json的name
const { name, module } = getPackageJSON('react')
// react包的路径
const pkgPath = resovlePkgPath(name)
// 解析出react产物路径
const pkgDistPath = resovlePkgPath(name, true)

export default [
  // react的包
  {
    input:`${pkgPath}/${module}`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: 'index.js',
      format: "umd"
    },
    plugins: [...getBaseRollupPlugins(), generatePackageJson({
      inputFolder: pkgPath,
      outputFolder: pkgDistPath,
      baseContents: ({ name, description, version}) => ({
        name,
        description,
        version,
        main: 'index.js'
      })
    })]
  },
  // jsx-runtime
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      {
        // jsx-runtime
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      },
      {
        // jsx-dev-runtime
         file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      }
    ],
    plugins: getBaseRollupPlugins()
  }
]