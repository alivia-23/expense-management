import React from 'react';

export const themes = {
   light: {
     buttonStyle: 'light-theme-button',
     bodyBackground: '#fff7e6'
   },
   dark: {
     buttonStyle: 'dark-theme-button',
     bodyBackground: '#C0C0C0'
   }
};

export const ThemeContext = React.createContext({
  default: 'To be overriden'
});
