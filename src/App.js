import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUpSignIn from './components/SignUpSignIn/SignUpSignIn';
import JoinWorkspace from './components/Onboarding/components/JoinWorkspace/JoinWorkspace';
import NotFound from './components/NotFound/NotFound';

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
    <ChakraProvider theme={theme} initialColorMode={theme.config.initialColorMode}>
      <Router>
        <Routes>
          <Route exact path='/sign-up' element={<SignUpSignIn isSignUp />} />
          <Route exact path='/sign-in' element={<SignUpSignIn />} />
          <Route path='/onboarding'>
            <Route index element={<Navigate to='/onboarding/join' replace />} />
            <Route path='join' element={<JoinWorkspace />} />
            <Route path='create' element={<JoinWorkspace />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
