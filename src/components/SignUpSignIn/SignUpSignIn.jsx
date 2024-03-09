import React, { useState, useMemo, useEffect } from 'react';
import to from 'await-to-js';
import { Button, Checkbox, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SpectrumInputBlock from '../Primary/SpectrumInputBlock/SpectrumInputBlock';

import styles from './sign-up-sign-in.module.scss';

import { ReactComponent as SpectrumLogo } from '../../images/spectrum-logo.svg';
import { handleUserSignUp } from './services/handleUserSignUp';
import { handleUserSignIn } from './services/handleUserSignIn';
import { spectrumAccessTokenLocalStorageKey } from '../../services/apiUrl';
import { useCurrentUser } from '../../hooks/useCurrentUser';

export default function SignUpSignIn(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const { state, dispatch: currentUserDispatch } = useCurrentUser();
  const { user } = state;
  const { isSignUp } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isSignInSignUpButtonEnabled = useMemo(() => email && password && (isSignUp ? fullName : true), [isSignUp, email, password, fullName]);

  useEffect(() => {
    const bearerTokenExists = localStorage.getItem(spectrumAccessTokenLocalStorageKey);

    if (user && bearerTokenExists) navigate('/');
  }, [user]);


  /**
   * Handler on Sign Up button click
   * @returns {Promise<string|number>}
   */
  async function proceedSignUpButtonClick() {
    setIsLoading(true);

    const [err] = await to(handleUserSignUp(fullName, email, password));

    setIsLoading(false);

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    setFullName('');
    setEmail('');
    setPassword('');

    toast({
      title: '🚀 User has been successfully created',
      description: 'Now sign in with newly created user',
      status: 'success',
      isClosable: true
    });

    setTimeout(() => navigate('/sign-in'), 1000);
  }

  /**
   * Handler on Sign Ip button click
   * @returns {Promise<string|number>}
   */
  async function proceedSignInButtonClick() {
    setIsLoading(true);

    const [err, res] = await to(handleUserSignIn(email, password));

    setIsLoading(false);

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    setEmail('');
    setPassword('');

    localStorage.setItem(spectrumAccessTokenLocalStorageKey, res.accessToken);

    toast({
      title: `Signed in as ${res.email}`,
      description: 'Let the journey begin with Spectrum',
      status: 'success',
      isClosable: true
    });

    const userData = {
      email: res.email,
      fullName: res.fullName
    };

    currentUserDispatch({ type: 'SET_USER', payload: userData });
    navigate('/onboarding/join');
  }

  /**
   * Call different function on Sign In/Sign Up button click depending on current page
   */
  function handleSignInSignUpButtonClick() {
    if (isSignUp) return proceedSignUpButtonClick();

    proceedSignInButtonClick();
  }

  return (
    <>
      <Helmet>
        <title>{isSignUp ? 'Sign Up' : 'Sign In'}</title>
      </Helmet>

      <div className={styles.page}>
        <div className={styles.actionsContainer}>
          <div className={styles.content}>
            <div className={styles.headerContainer}>
              <div className={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</div>
              <div
                className={styles.subTitle}>{isSignUp ? 'Enter your full name, email and password to sign up' : 'Enter your email and password to sign in'}</div>
            </div>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputsContainer}>
                {isSignUp ? <SpectrumInputBlock label='Full name*' placeholder='Jack Wilson' value={fullName}
                                                onChange={(e) => setFullName(e.target.value)} /> : null}
                <SpectrumInputBlock label='Email*' type='email' placeholder='jack.wilson@email.com' value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                <SpectrumInputBlock label='Password*' type='password' placeholder='BLqQVrR5CtgKumZ' value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className={styles.additionalActions}>
                <Checkbox>Keep me logged in</Checkbox>
              </div>
            </div>
            <div className={styles.actionButtonWrapper}>
              <Button colorScheme='teal' isLoading={isLoading} isDisabled={!isSignInSignUpButtonEnabled}
                      onClick={handleSignInSignUpButtonClick}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
              <div className={styles.helperTextWrapper}>
                <div><span
                  className={styles.helperQuestionText}>{isSignUp ? 'Already have an account?' : 'Not registered yet?'}</span>&nbsp;
                  <Link to={isSignUp ? '/sign-in' : '/sign-up'}
                        className={styles.helperActionButtonText}>{isSignUp ? 'Sign In in existing account' : 'Create an account'}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sideInfoContainer}>
          <div className={styles.content}>
            <div></div>
            <div className={styles.logoContainer}>
              <div className={styles.logoWrapper}><SpectrumLogo /></div>
              <div className={styles.title}>Spectrum</div>
            </div>
            <div className={styles.infoButtonsContainer}>
              <div>Thesis</div>
              <div>Architecture</div>
              <div>GitLab</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
