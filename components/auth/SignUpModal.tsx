import React, { useState } from 'react';
import styled from 'styled-components';

import palette from '../../styles/palette';
import CloseXIcon from '../../public/static/svg/modal/modal_close.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import { dayList, monthList, yearList } from '../../lib/staticData';
import Input from '../common/Input';
import Selector from '../common/Selector';
import Button from '../common/Button';

const Container = styled.form`
  pointer-events: none;
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;

    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }

    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }

    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
`;

const SignUpModal: React.FC = () => {
  // input
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  // selector
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(hidePassword);
  };

  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };

  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };

  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  return (
    <Container>
      <CloseXIcon className='modal-close-x-icon' />
      <div className='input-wrapper'>
        <Input
          type='email'
          placeholder='이메일 주소'
          icon={<MailIcon />}
          name='email'
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className='input-wrapper'>
        <Input
          type='text'
          placeholder='이름(예:길동)'
          icon={<PersonIcon />}
          name='lastName'
          value={lastName}
          onChange={onChangeLastName}
        />
      </div>
      <div className='input-wrapper'>
        <Input
          type='text'
          placeholder='이름(예:홍)'
          icon={<PersonIcon />}
          name='firstName'
          value={firstName}
          onChange={onChangeFirstName}
        />
      </div>
      <div className='input-wrapper sign-up-password-input-wrapper'>
        <Input
          type={hidePassword ? 'password' : 'text'}
          placeholder='비밀번호 설정하기'
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <p className='sign-up-birthday-label'>생일</p>
      <p className='sign-up-modal-birthday-info'>
        만 18세 이상의 성인만 회원그로 가입할 수 있습니다. 생일은 다른
        에어비앤비 이용자에게 공개되지 않습니다.
      </p>
      <div className='sign-up-modal-birthday-selectors'>
        <div className='sign-up-modal-birthday-month-selector'>
          <Selector
            options={monthList}
            disabledOptions={['월']}
            defaultValue='월'
            value={birthMonth}
            onChange={onChangeBirthMonth}
          />
        </div>
        <div className='sign-up-modal-birthday-day-selector'>
          <Selector
            options={dayList}
            disabledOptions={['일']}
            defaultValue='일'
            value={birthDay}
            onChange={onChangeBirthDay}
          />
        </div>
        <div className='sign-up-modal-birthday-year-selector'>
          <Selector
            options={yearList}
            disabledOptions={['년']}
            defaultValue='년'
            value={birthYear}
            onChange={onChangeBirthYear}
          />
        </div>
      </div>
      <div className='sign-up-modal-submit-button-wrapper'>
        <Button type='submit'>가입하기</Button>
      </div>
    </Container>
  );
};

export default SignUpModal;