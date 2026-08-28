/** @type {import('tailwindcss').Config} */

// "Bulletin" design system — a security advisory, not a brochure.
// Shape rule: bordered *controls* take `rounded-control`; structure (rules,
// rows, cards, the logo block) stays square. No gradients, no glows.
const RULE = 'rgba(237, 235, 240, 0.11)'
const RULE_STRONG = 'rgba(237, 235, 240, 0.22)'
const PROSE = '#D7D4DD'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Neutral black carrying the faintest violet bias — chosen, not inherited.
                ground: '#0B0A0D',
                surface: '#131218',
                raised: '#1B1922',
                ink: {
                    DEFAULT: '#EDEBF0',
                    dim: '#A19DAC',
                    faint: '#6E6A79',
                },
                brand: {
                    purple: '#8903FF',  // solid fills, bars, blocks
                    violet: '#A855F7',  // accent *text* on a near-black ground
                    amber: '#FE9C13',   // data + live markers only (article SVGs hardcode it)
                },
                rule: RULE,
                'rule-strong': RULE_STRONG,
            },
            fontFamily: {
                display: ['"Bebas Neue"', 'Haettenschweiler', '"Arial Narrow"', 'sans-serif'],
                headline: ['"Zilla Slab"', 'Georgia', 'serif'],
                sans: ['Chivo', '"Helvetica Neue"', 'Arial', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            borderRadius: {
                control: '6px',
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
            typography: () => ({
                bulletin: {
                    css: {
                        '--tw-prose-body': PROSE,
                        '--tw-prose-headings': '#EDEBF0',
                        '--tw-prose-lead': '#A19DAC',
                        '--tw-prose-links': '#A855F7',
                        '--tw-prose-bold': '#EDEBF0',
                        '--tw-prose-counters': '#6E6A79',
                        '--tw-prose-bullets': RULE_STRONG,
                        '--tw-prose-hr': RULE,
                        '--tw-prose-quotes': '#EDEBF0',
                        '--tw-prose-quote-borders': '#8903FF',
                        '--tw-prose-captions': '#6E6A79',
                        '--tw-prose-code': '#FE9C13',
                        '--tw-prose-pre-code': PROSE,
                        '--tw-prose-pre-bg': '#131218',
                        '--tw-prose-th-borders': RULE_STRONG,
                        '--tw-prose-td-borders': RULE,

                        maxWidth: 'none',
                        fontSize: '1.0625rem',
                        lineHeight: '1.78',

                        // Section heads are the display face, ruled off above.
                        h2: {
                            fontFamily: '"Bebas Neue", Haettenschweiler, sans-serif',
                            fontWeight: '400',
                            fontSize: '1.6rem',
                            lineHeight: '1',
                            letterSpacing: '0.02em',
                            marginTop: '2.75rem',
                            marginBottom: '1.1rem',
                            paddingTop: '0.85rem',
                            borderTop: `1px solid ${RULE}`,
                        },
                        h3: {
                            fontFamily: '"Zilla Slab", Georgia, serif',
                            fontWeight: '700',
                            fontSize: '1.25rem',
                            letterSpacing: '-0.01em',
                            marginTop: '2rem',
                            marginBottom: '0.75rem',
                        },
                        blockquote: {
                            borderLeftWidth: '3px',
                            paddingLeft: '1.4rem',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '1.1875rem',
                            lineHeight: '1.5',
                            letterSpacing: '-0.012em',
                        },
                        'blockquote p:first-of-type::before': { content: 'none' },
                        'blockquote p:last-of-type::after': { content: 'none' },
                        code: {
                            fontWeight: '400',
                            fontSize: '0.875em',
                            backgroundColor: '#1B1922',
                            padding: '0.12em 0.36em',
                            borderRadius: '0',
                        },
                        'code::before': { content: '""' },
                        'code::after': { content: '""' },
                        a: {
                            fontWeight: '500',
                            textUnderlineOffset: '3px',
                        },
                        // Inline article diagrams keep their own hardcoded palette.
                        svg: { display: 'block', width: '100%', height: 'auto' },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
