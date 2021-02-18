import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import palette from '../styles/palette';
import AirbnbLogoIcon from '../public/static/svg/logo.svg';
import AirbnbLogoTextIcon from '../public/static/svg/logo_text.svg';
import HamburgerIcon from '../public/static/svg/header/hamburger.svg';

import { useSelector } from '../store';

import AuthModal from './auth/AuthModal';
import useModal from '../hooks/useModal';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0 1px 12px;
  z-index: 10;

  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }

  .header-auth-buttons {
    display: flex;
    align-items: center;
    .header-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
    }
    .header-sign-up-button {
      margin-right: 8px;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }

  .header-user-profile {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 6px 0 16px;
    border: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
    border-radius: 21px;
    background-color: white;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }
    .header-user-profile-image {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { openModal, ModalPortal, closeModal } = useModal();
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <Link href='/'>
        <a className='header-logo-wrapper'>
          <AirbnbLogoIcon className='header-logo' />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      {!user.isLogged && (
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
      )}
      {user.isLogged && (
        <button className='header-user-profile' type='button'>
          <HamburgerIcon />
          <img
            src={user.profileImage}
            className='header-user-profile-image'
            alt=''
          />
        </button>
      )}

      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
