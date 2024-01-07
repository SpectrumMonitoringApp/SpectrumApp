import React from 'react';
import { Input, Button, Checkbox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import styles from './sign-up-sign-in.module.scss';

import { ReactComponent as SpectrumLogo } from '../../images/spectrum-logo.svg';

export default function SignUpSignIn(props) {
  const { isSignUp } = props;

  return (
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
              {isSignUp ? <div className={styles.inputBlock}>
                <div className={styles.inputLabel}>Full name*</div>
                <Input />
              </div> : null}
              <div className={styles.inputBlock}>
                <div className={styles.inputLabel}>Email*</div>
                <Input />
              </div>
              <div className={styles.inputBlock}>
                <div className={styles.inputLabel}>Password*</div>
                <Input type='password' />
              </div>
            </div>
            <div className={styles.additionalActions}>
              <Checkbox>Keep me logged in</Checkbox>
            </div>
          </div>
          <div className={styles.actionButtonWrapper}>
            <Button colorScheme='teal'>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
            <div className={styles.helperTextWrapper}>
              <div><span
                className={styles.helperQuestionText}>{isSignUp ? 'Already have an account?' : 'Not registered yet?'}</span> <Link to={isSignUp ? '/sign-in' : '/sign-up'}
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
  );
}
