const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
module.exports = {
    purge: ['./public/**/*.html', './src/**/*.vue'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                sky: colors.sky,
            },
            maxWidth: {
                64: '16rem',
            },
        },
        screens: {
            '2xs': '320px',
            xs: '480px',
            ...defaultTheme.screens,
        },
    },
    variants: {
        extend: {
            backgroundColor: ['group-focus'],
            textColor: ['group-focus'],
        },
    },
    plugins: [],
};
