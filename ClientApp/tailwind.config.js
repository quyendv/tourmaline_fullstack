/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'main-100': '#1e1e1e',
                'activecolor': '#009cf4',
                'overlay-30':'rgba(0,0,0,0.3)',
                'player-from':'rgba(255,255,255,0.1)',
                'player-to': 'rgba(255,255,255,0)'
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
                  'scale-up-image':{
                    '0%': {
                        '-webkit-transform': 'scale(1)',
                        transform:'scale(1)'
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1.05)',
                        transform:'scale(1.05)'
                    }
                  },
                  'scale-down-image':{
                    '0%': {
                        '-webkit-transform': 'scale(1.05)',
                        transform:'scale(1.1)'
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1.05)',
                        transform:'scale(1)'
                    }
                  }
            },
            
            animation: {
                'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'rotate-center': 'rotate-center 8s linear infinite',
                'scale-up-image': 'scale-up-image 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'scale-down-image': 'scale-down-image 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
            }
        },
    },
    plugins: [],
};
