const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textColor: {
        white: '#ffffff',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        emerald: 'var(--color-text-emerald)',
        'emerald-hover': 'var(--color-text-emerald-hover)',
        indigo: 'var(--color-text-indigo)',
        'indigo-hover': 'var(--color-text-indigo-hover)',
        orange: 'var(--color-text-orange)',
        'orange-hover': 'var(--color-text-orange-hover)',
        rose: 'var(--color-text-rose)',
        amber: 'var(--color-text-amber)',
        'amber-hover': 'var(--color-text-amber-hover)',
        blue: 'var(--color-text-blue)',
        link: 'var(--color-text-link)',
        default: 'var(--color-text-default)',
        'footer-link': 'var(--color-text-link-footer)',
        'footer-link-hover': 'var(--color-text-link-footer-hover)',
        'footer-icon': 'var(--color-text-footer-icons)',
        'footer-icon-hover': 'var(--color-text-footer-icons-hover)',
      },
      typography: (theme) => ({
        light: {
          css: [
            {
              color: theme('colors.gray.400'),
              '[class~="lead"]': {
                color: theme('colors.gray.300'),
              },
              a: {
                color: theme('colors.teal.400')
              },
              strong: {
                color: 'var(--color-text-primary)'
              },
              'ol > li::before': {
                color: 'var(--color-text-primary)'
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600'),
              },
              hr: {
                borderColor: theme('colors.gray.200'),
              },
              blockquote: {
                color: theme('colors.gray.200'),
                borderLeftColor: theme('colors.gray.600'),
              },
              h1: {
                color: 'var(--color-text-primary)'
              },
              h2: {
                color: 'var(--color-text-primary)',
              },
              h3: {
                color: 'var(--color-text-primary)',
              },
              h4: {
                color: 'var(--color-text-primary)',
              },
              'figure figcaption': {
                color: theme('colors.gray.400'),
              },
              code: {
                color: 'var(--color-text-primary)',
              },
              'a code': {
                color: 'var(--color-text-primary)',
              },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: 'var(--color-text-primary)',
                borderBottomColor: theme('colors.gray.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.600'),
              },
            },
          ],
        },
      }),
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        emerald: 'var(--color-bg-emerald)',
        'button-indigo': 'var(--color-button-indigo)',
        'button-indigo-hover': 'var(--color-button-indigo-hover)',
        blockquote: 'var(--color-blockquote-bg)',
      },
      ringOffsetColor: {
        primary: 'var(--color-bg-primary)',
      },
      borderColor: {
        primary: 'var(--color-border)',
        blockquote: 'var(--color-blockquote-border)',
        infoquote: 'var(--color-infoquote-border)',
      },
      backgroundOpacity: {
        navbar: '0.3',
      },
    },
    colors: colors,

    fill: (theme) => ({
      light: theme('colors.gray.50'),
      dark: theme('colors.coolGray.900'),
    }),
    fontFamily: {
      inter: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
    },
  }, variants: {
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};