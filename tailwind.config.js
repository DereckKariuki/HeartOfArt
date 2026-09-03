/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base
        canvas: '#FAF8F5', // warm off-white
        ink: '#1A1918', // deep charcoal
        // Secondary neutrals
        bone: '#EFEAE3',
        taupe: '#C9BFB2',
        stone: '#8C857C', // decorative / large text only (3.4:1 on canvas)
        muted: '#6E6860', // metadata text — 5.2:1 on canvas, WCAG AA
        // The single accent, in two tones of the same hue.
        // `accent` for rules, hovers and marks; `accentDeep` when it carries text.
        accent: '#B8945F',
        accentDeep: '#8A6B3C', // 4.7:1 on canvas, WCAG AA
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Body never drops below 16px.
        base: ['1rem', { lineHeight: '1.7' }],
        label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
      },
      letterSpacing: {
        wordmark: '0.14em',
        label: '0.18em',
      },
      maxWidth: {
        prose: '68ch',
        shell: '90rem',
      },
      boxShadow: {
        piece: '0 18px 50px -28px rgba(26, 25, 24, 0.35)',
        lift: '0 26px 70px -30px rgba(26, 25, 24, 0.45)',
        drawer: '-24px 0 60px -30px rgba(26, 25, 24, 0.45)',
      },
      transitionTimingFunction: {
        gallery: 'cubic-bezier(0.16, 0.84, 0.44, 1)',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        riseIn: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 500ms cubic-bezier(0.16, 0.84, 0.44, 1) both',
        riseIn: 'riseIn 700ms cubic-bezier(0.16, 0.84, 0.44, 1) both',
      },
    },
  },
  plugins: [],
}
