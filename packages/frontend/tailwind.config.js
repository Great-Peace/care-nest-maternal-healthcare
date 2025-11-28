/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Explicit opacity variations
    'bg-white/10',
    'bg-white/20',
    'bg-white/30',
    'bg-white/60',
    'hover:bg-white/20',
    'hover:bg-white/30',
    // Pattern matching for all color variations
    {
      pattern: /bg-(white|pink|purple|blue|green|gray|indigo|red|orange)-(50|100|200|300|400|500|600|700|800|900)\/(10|20|30|40|50|60|70|80|90)/,
    },
    {
      pattern: /bg-(white|pink|purple|blue|green|gray|indigo|red|orange)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(white|pink|purple|blue|green|gray|indigo|red|orange)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /from-(pink|purple|blue|green|indigo)-(400|500|600|700)/,
    },
    {
      pattern: /to-(pink|purple|blue|green|indigo)-(400|500|600|700)/,
    },
    {
      pattern: /via-(pink|purple|blue|green|indigo)-(400|500|600|700)/,
    },
    // Gradient utilities
    'bg-gradient-to-br',
    'bg-gradient-to-r',
    'bg-gradient-to-l',
    'bg-gradient-to-t',
    'bg-gradient-to-b',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
    },
  },
  plugins: [],
}
