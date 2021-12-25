const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        blueGray: colors.slate,
        coolGray: colors.gray,
        teal: colors.teal,
        dark: '#111827',
        darker: '#0d131f',
        midnight: '#1e293b',
        'midnight-hover': '#334155',
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        amber: colors.amber,
        sky: colors.sky,
        gray: {
          0: '#fff',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111',
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [{ color: '#18181b', a: { 'text-decoration': 'none' } }],
        },
        invert: {
          css: [
            {
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

    fill: (theme) => ({
      light: theme('colors.gray.50'),
      dark: theme('colors.coolGray.900'),
    }),
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
