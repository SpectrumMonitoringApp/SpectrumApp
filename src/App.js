import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUpSignIn from './components/SignUpSignIn/SignUpSignIn';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  fonts: {
    heading: `'DM Sans', sans-serif`,
    body: `'DM Sans', sans-serif`
  }
});


export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/sign-up' element={<SignUpSignIn isSignUp />} />
          <Route exact path='/sign-in' element={<SignUpSignIn />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
