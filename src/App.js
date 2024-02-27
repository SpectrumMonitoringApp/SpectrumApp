import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';
import SignUpSignIn from './components/SignUpSignIn/SignUpSignIn';
import JoinWorkspace from './components/Onboarding/components/JoinWorkspace/JoinWorkspace';
import CreateWorkspace from './components/Onboarding/components/CreateWorkspace/CreateWorkspace';
import HomeOutlet from './components/HomeOutlet/HomeOutlet';
import MainDashboard from './components/MainDashboard/MainDashboard';
import ResourcesOutlet from './components/ResourcesOutlet/ResourcesOutlet';
import WorkspaceSettings from './components/WorkspaceSettings/WorkspaceSettings';
import Profile from './components/Profile/Profile';
import Resources from './components/ResourcesOutlet/components/Resources/Resources';
import ResourceDetails from './components/ResourcesOutlet/components/ResourceDetails/ResourceDetails';
import ResourceDashboard from './components/ResourcesOutlet/components/ResourceDashboard/ResourceDashboard';
import { CurrentUserProvider } from './services/CurrentUserContext/CurrentUserProvider';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  fonts: {
    heading: `'DM Sans', sans-serif`,
    body: `'DM Sans', sans-serif`
  }
});


export default function App() {
  return (
    <ChakraProvider theme={theme} initialColorMode={theme.config.initialColorMode}
                    toastOptions={{ defaultOptions: { position: 'top' } }}>
      <Router>
        <CurrentUserProvider>
          <Routes>
            <Route exact path='/' element={<HomeOutlet />}>
              <Route index element={<MainDashboard />} />
              <Route path='/resources' element={<ResourcesOutlet />}>
                <Route index element={<Resources />} />
                <Route path='new' element={<ResourceDetails />} />
                <Route path=':id' element={<ResourceDashboard />} />
                <Route path=':id/edit' element={<ResourceDetails />} />
              </Route>
              <Route path='/settings' element={<WorkspaceSettings />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route exact path='/sign-up' element={<SignUpSignIn isSignUp />} />
            <Route exact path='/sign-in' element={<SignUpSignIn />} />
            <Route path='/onboarding'>
              <Route index element={<Navigate to='/onboarding/join' replace />} />
              <Route path='join' element={<JoinWorkspace />} />
              <Route path='create' element={<CreateWorkspace />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </CurrentUserProvider>
      </Router>
    </ChakraProvider>
  );
}
