const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: [{ color: '#18181b', a: { 'text-decoration': 'none' } }],
        },
        invert: {
          css: [
            {
              color: theme('colors.gray.200'),
              code: {
                color: colors.gray,
              },
            },
          ],
        },
      }),
      backgroundOpacity: {
        navbar: '0.3',
      },
      backgroundImage: {
        hero: 'url(/images/hero.jpg)',
        'hero-dark': 'url(/images/hero-dark.jpg)',
      },
      fontFamily: {
        inter: ['Inter', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`,
          )}`
        })
      })
    }),
  ],
}
