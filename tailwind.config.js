import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Zappo / Main Brand Colors
        brand: {
          accent: '#94FF2B',       // Bright Neon Green Button
          'accent-hover': '#82e026',
          primary: '#3b82f6',      // Blue Accent
          dark: '#0f172a',         // Main Dark Background
          deep: '#020617',         // Deepest Background
        },
        // Cards and Containers Surface Colors
        surface: {
          light: '#ffffff',
          dark: '#1e293b',         // Card / Sidebar background
          'dark-border': '#334155',  // Border for dark cards
        }
      }
    }
  }
}