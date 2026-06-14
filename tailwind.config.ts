import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#faf9f6',
        ink: '#2d2c28',
        ochre: '#c4a882',
        'ink-light': '#3a3a3a',
        'warm-line': '#e8e3db',
        'text-muted': '#888',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        reading: '680px',
        wide: '720px',
      },
    },
  },
  plugins: [],
}
export default config
