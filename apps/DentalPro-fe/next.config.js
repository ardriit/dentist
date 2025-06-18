//@ts-check
const path = require('node:path')

const { composePlugins, withNx } = require('@nx/next')
// eslint-disable-next-line no-console
console.log(
  `@use "${path
    .join(process.cwd(), '_mantine')
    .replace(/\\/g, '/')}" as mantine;`
)
/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `@use "${path
      .join(process.cwd(), '_mantine')
      .replace(/\\/g, '/')}" as mantine;`,
  },
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
]

module.exports = composePlugins(...plugins)(nextConfig)
