import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Divider, Button } from '@chakra-ui/react';
import { DragHandleIcon, LinkIcon, SettingsIcon } from '@chakra-ui/icons';

import CurrentWorkspace from './components/CurrentWorkspace/CurrentWorkspace';
import CurrentUserBlock from './components/CurrentUserBlock/CurrentUserBlock';
import { useWorkspace, useWorkspaceIsLoading } from '../../../../services/stores/workspace-store/workspace-store';

import styles from './home-sidebar.module.scss';

/**
 * Sidebar menu button and their corresponding URL paths
 * @type {{profile: string, mainDashboard: string, resources: string}}
 */
const sidebarMenuButtonsPaths = {
  mainDashboard: '/',
  resources: '/resources',
  settings: '/settings'
};

export default function HomeSidebar(props) {
  const workspaceName = 'Workaround';
  const { pathname } = useLocation();
  const workspace = useWorkspace();
  const isWorkspaceLoading = useWorkspaceIsLoading();

  /**
   * Check whether menu button should be active depending on current URL path
   * @param buttonActivePath
   */
  function isSidebarMenuButtonActive(buttonActivePath) {
    return pathname === buttonActivePath;
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionsBlock}>
        <CurrentWorkspace workspaceName={workspace?.name} isWorkspaceLoading={isWorkspaceLoading}/>
        <Divider type='teal' className={styles.dividerMargins} />
        <div className={styles.sidebarButtonsContainer}>
          <Link to='/' className={styles.linkButtonContainer}>
            <Button colorScheme='teal' variant='ghost' leftIcon={<LinkIcon />} justifyContent='flex-start'
                    isActive={isSidebarMenuButtonActive(sidebarMenuButtonsPaths.mainDashboard)}>
              Main Dashboard
            </Button>
          </Link>
          <Link to='/resources' className={styles.linkButtonContainer}>
            <Button colorScheme='teal' variant='ghost' leftIcon={<DragHandleIcon />} justifyContent='flex-start'
                    isActive={isSidebarMenuButtonActive(sidebarMenuButtonsPaths.resources)}>
              Resources
            </Button>
          </Link>
          <Link to='/settings' className={styles.linkButtonContainer}>
            <Button colorScheme='teal' variant='ghost' leftIcon={<SettingsIcon />} justifyContent='flex-start'
                    isActive={isSidebarMenuButtonActive(sidebarMenuButtonsPaths.settings)}>
              Settings
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.currentUserWrapper}><CurrentUserBlock /></div>
    </div>
  );
}
