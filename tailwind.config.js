//
// This is your Tailwind CSS configuration, where
// you can define global style constants such as
// color palette, fonts and sizes.
//
// Read more at https://tailwindcss.com.
//

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  important: true,
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Menlo', ...defaultTheme.fontFamily.mono],
        system: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      typography: ({ theme }) => ({
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
            blockquote: { fontStyle: 'normal' },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
