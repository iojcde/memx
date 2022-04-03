const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
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
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
       fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.006em' }],
        base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.011em' }],
        lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.0143em' }],
        xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.017em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.019em' }],
        '3xl': [
          '1.875rem',
          { lineHeight: '2.25rem', letterSpacing: '-0.021em' },
        ],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.022em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.022em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.022em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.0222em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.0223em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.0223em' }],
      },
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
