const loaderUtils = require('loader-utils')
const globby = require('globby')
const path = require('path')

const getOptions = require('../utils/getOptions')
const getPathInfo = require('../utils/getPathInfo')

module.exports = function DocsLoader () {
  this.cacheable && this.cacheable()

  const callback = this.async()

  const context = this.context || process.cwd()
  const loaderOptions = loaderUtils.getOptions(this) || {}
  const options = getOptions(loaderOptions)

  const processFile = (filepath) => {
    return `require('!!${require.resolve('./docgen-loader')}?${JSON.stringify(loaderOptions)}!${filepath}')`
  }

  const themes = parseThemes(options.themes, options)
  const icons = parseIcons(options.icons)

  const files = options.files.map(file => path.resolve(options.projectRoot, file))
  const ignore = options.ignore ? options.ignore.map(file => path.resolve(options.projectRoot, file)) : undefined

  globby(files, { ignore }).then((matches) => {
    const docs = matches.map((filepath) => processFile(path.resolve(options.context, filepath)))

    callback(null, `
      // Activate hot module replacement
      module.hot && module.hot.accept()

      const renderClient = require('!!${require.resolve('@instructure/ui-docs-client')}').default
      const getClientProps = require('!!${require.resolve('../utils/getClientProps')}')

      const props = getClientProps(
        [
          ${docs.join(',')}
        ],
        [${themes.join(',')}],
        ${JSON.stringify(options.library || {})}
      )

      props.icons = ${icons}

      renderClient(props, document.getElementById('app'))
    `)
  }).catch((error) => {
    callback(error)
  })
}

function parseThemes (themes = [], options) {
  return themes.map((theme) => {
    const themePath = path.resolve(options.projectRoot, theme)
    const pathInfo = getPathInfo(themePath, options, options.context)
    return `{
        resource: require('${path.resolve(options.context, themePath)}').default,
        requirePath: '${pathInfo.requirePath}'
      }`
  })
}

function parseIcons (icons = {}) {
  const formats = Object.keys(icons.formats).map((format) => {
    return `\
'icons-${format.toLowerCase()}': {
  format: '${format}',
  glyphs: require('${icons.formats[format]}'),
  requirePath: '${icons.formats[format]}'
}`
  })

  return `
  {
    packageName: '${icons.packageName}',
    formats: {
      ${formats.join(',\n')}
    }
  }`
}
