/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    purple: '#8903ff',
                    orange: '#fe9c13',
                },
                ink: {
                    950: '#0a0a0f',
                    900: '#111118',
                    800: '#181824',
                    700: '#242436',
                },
            },
            fontFamily: {
                display: ['"Days One"', 'system-ui', 'sans-serif'],
                sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
            backgroundImage: {
                'brand-gradient': 'linear-gradient(40deg, #8903ff 0%, #fe9c13 100%)',
            },
            boxShadow: {
                glow: '0 0 60px -15px rgba(137, 3, 255, 0.55)',
            },
            keyframes: {
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'fade-up': 'fade-up 0.5s ease-out both',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
