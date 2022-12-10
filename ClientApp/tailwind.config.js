/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'main-100': '#1e1e1e',
                'activecolor': '#009cf4',
                'overlay-30':'rgba(0,0,0,0.3)',
            },
            screens: {
                1280: '1280px',
            },
            keyframes: {
                'slide-left': {
                    '0%': {
                        '-webkit-transform': 'translateX(500px);',
                        transform: 'translateX(500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },
                'slide-right': {
                    '0%': {
                        '-webkit-transform': 'translateX(0px);',
                        transform: 'translateX(0px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(500px);',
                        transform: 'translateX(500px);',
                    },
                },
                'rotate-center': {
                    '0%' : {
                      'webkit-transform': 'rotate(0);',
                      transform:'rotate(0);'
                    },
                    '100%' : {
                      'webkit-transform' : 'rotate(360deg);',
                      transform: 'rotate(360deg);',
                    },
                  },
            },
            
            animation: {
                'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'rotate-center': 'rotate-center 8s linear infinite',
            }
        },
    },
    plugins: [],
};
