import React, { useState } from 'react';
import to from 'await-to-js';
import { Link, useNavigate } from 'react-router-dom';
import { Button, useToast } from '@chakra-ui/react';

import SpectrumInputBlock from '../../../Primary/SpectrumInputBlock/SpectrumInputBlock';
import { handleWorkspaceCreate } from './services/handleWorkspaceCreate';

import styles from './create-workspace.module.scss';

export default function CreateWorkspace(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');

  /**
   * Handle workspace creation
   */
  async function onWorkspaceCreateButtonClick() {
    setIsLoading(true);

    const [err] = await to(handleWorkspaceCreate(workspaceName));

    setIsLoading(false);

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    toast({
      title: '🚀 Launching...',
      description: 'Hooray, let\'s the journey begin',
      status: 'success',
      duration: 4000,
      isClosable: true
    });
    navigate('/onboarding/join');
  }

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.title}>
              👋 Welcome to Spectrum, Bohdan
            </div>
            <div className={styles.subTitle}>
              Let's get your workspace set up
            </div>
          </div>
          <div className={styles.inputsWrapper}>
            <div className={styles.inputsContainer}>
              <SpectrumInputBlock label='Workspace name' placeholder='Apple Inc.' value={workspaceName}
                                  onChange={(e) => setWorkspaceName(e.target.value)} />
            </div>
          </div>
          <div className={styles.actionButtonWrapper}>
            <Button colorScheme='teal' isLoading={isLoading} onClick={onWorkspaceCreateButtonClick}>Create
              workspace</Button>
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
