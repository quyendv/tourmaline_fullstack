/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'main-100': '#1e1e1e',
            },
            screens: {
                1280: '1280px',
            },
            keyframes: {
                'slide-left': {
                    '0%': {
                        '-webkit-transform': 'translateX(100px);',
                        transform: 'translateX(100px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },
            },
            animation: {
                'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
            }
        },
    },
    plugins: [],
};
