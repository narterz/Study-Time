module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F92121",
        primaryOpac: "rgba(249, 33, 33, 50%)",
        shortBreak: "#F99621",
        shortBreakOpac: "rgba(249, 150, 33, 70%)",
        longBreak: "#F9E421",
        longBreakOpac: "rgba(249, 228, 33, 70%)",
        timesUp: "#66F921",
        timesUpOpac: "rgba(102, 249, 33, 70%)",
        underText: "#aaaaaa",
        buttonDark: "#363636",
        formButtonCont: "#efefef",
        notesColor: "#fcfcdc",
      },
      keyframes: {
        buttonScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.75)' },
        },
      },
      animation: {
        buttonScale: 'buttonScale 200ms ease-in-out',
      },
      fontSize: {
        xxsm: "0.925rem",
        xsm: "1.1rem",
        sm: "1.4rem",
        md: "2.0rem",
        lg: "2.2rem",
        xl: "3.2rem",
        xxl: "6rem",
        toDoLg: "0.825rem",
      },
      fontFamily: {
        WixMadeforText: ['Wix Madefor Text', 'sans-serif']
      },
      fontWeight: {
        regular: 400,
        semibold: 600,
        bold: 800
      },
      screens: {
        'sm': '425px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        'xxl': '1630px'
      },
    },
  },
  plugins: [],
};
