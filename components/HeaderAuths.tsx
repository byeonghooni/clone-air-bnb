import React from 'react';

import AuthModal from './auth/AuthModal';
import useModal from '../hooks/useModal';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const HeaderAuths: React.FC = () => {
  const dispatch = useDispatch();

  const { openModal, ModalPortal, closeModal } = useModal();

  return (
    <>
      <div className='header-auth-buttons'>
        <button
          type='button'
          className='header-button header-sign-up-button'
          onClick={() => {
            dispatch(authActions.setAuthMode('signup'));
            openModal();
          }}
        >
          회원가입
        </button>
        <button
          type='button'
          className='header-button header-login-button'
          onClick={() => {
            dispatch(authActions.setAuthMode('login'));
            openModal();
          }}
        >
          로그인
        </button>
      </div>

      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default HeaderAuths;
