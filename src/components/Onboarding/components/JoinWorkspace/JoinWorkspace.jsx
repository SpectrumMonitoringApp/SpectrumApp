import React from 'react';
import { Link } from 'react-router-dom';

import WorkspaceItem from './components/WorkspaceItem/WorkspaceItem';

import styles from './join-workspace.module.scss';

export default function JoinWorkspace(props) {
  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.title}>
              👋 Welcome to Spectrum, Bohdan
            </div>
            <div className={styles.subTitle}>
              Click below to join a workspace, or <Link className={styles.createNewText}>create a new workspace</Link>
            </div>
          </div>
          <div className={styles.workspacesWrapper}>
            <div className={styles.title}>Your workspaces</div>
            <div className={styles.workspacesContainer}>
              <WorkspaceItem name={'Workaround'} membersNumber={2}/>
              <WorkspaceItem name={'Workaround dsjaktop team'} membersNumber={1}/>
              <WorkspaceItem name={'AXDRAFT'} membersNumber={1}/>
            </div>
          </div>
          <div className={styles.footerInfoContainer}>
            By joining a workspace you are agreeing with the <Link className={styles.termsOfServiceText}>Terms of
            Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
