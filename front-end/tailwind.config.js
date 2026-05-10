/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
           colors:{
       "primary-blue":"#2563eb",
       "secondary-blue":"#1e40af",
       "color-black":"#0f172a",
       "color-gray":"#6b7280",
       "white-color":"#f4f618",
       "cinza-escuro":"#111827",
       "cinza-claro":"#F3F4F6",
       "cinza-medio":"#6B7280",
       "color-white":"#FFFFFF",
       "verde-escuro":"#10B981",
       "azul-header":"#1E3A8A"

     }
    },
  },
  plugins: [
    require('daisyui')
  ],
}