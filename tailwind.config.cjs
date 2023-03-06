/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/flowbite/**/*.js"

  ],

  theme: {
   
    extend: {
      colors :{
        green : '#3C6255',
        darkGreen : '#021710',
        red:'#8C2222',
        white:'#ffffff',
        lightGreen : '#A6BB8D',
        dark:'#F3F3F3',
        dark1:'#191919',
        white1:"#c4c2c2",
        light:'#a5c2a5',
        brown:'#fafaa0',
        veryLightGreen:'#abeda8',
        blue:'#323aa8'


      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
