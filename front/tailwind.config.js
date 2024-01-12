/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  zIndex: {
      '-1': '-1',
    },
   colors:{
    'blue-shade':'#F0F0EF',
    'redbtn':'#E50914'
   },
   backgroundImage: {
    'bgimage': "url('https://images.pexels.com/photos/1478524/pexels-photo-1478524.jpeg?auto=compress&cs=tinysrgb&w=1550')",
    
  }
},
  },
  plugins: [],
}

