// How to add themed styles
// 1 - For each theme (light, dark, etc.) add a new object for your components
//     NOTE:  the object key must be the component name in lowercase!!
// 2 - Within the object with the key of your component, add the styles in the
//     same structure as they are defined in your component default styles.
//     You can copy and paste from your component to make sure you are accurate
// 3 - Update the style values that are relevant to the theme, and remove style
//     attributes that are not changing based on the theme.
// 4 - Repeat step 3 for each theme.

const themes = {
  light: {
    appbar: {
        appbarStyles: {
        backgroundColor: '#0099ee'
      }
    }
  },
  dark: {
    appbar: {
        appbarStyles: {
        backgroundColor: '#002277'
      }
    }
  },
  custom: {
    appbar: {
        appbarStyles: {
        backgroundColor: 'green'
      }
    }
  }
};
export default themes;
