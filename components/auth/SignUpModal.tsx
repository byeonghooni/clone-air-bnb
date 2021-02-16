import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import palette from '../../styles/palette';
import CloseXIcon from '../../public/static/svg/modal/modal_close.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';

import { dayList, monthList, yearList } from '../../lib/staticData';

import { signupAPI } from '../../lib/api/auth';
import { userActions } from '../../store/user';
import useValidateMode from '../../hooks/useValidateMode';

import Input from '../common/Input';
import Selector from '../common/Selector';
import Button from '../common/Button';
import PasswordWarning from './PasswordWarning';

const PASSWORD_MIN_LENGTH = 8;

const Container = styled.form`
  width: 568px;
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

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

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

  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    return () => {
      // validateMode가 다른곳에서 재사용 안되게 하기 위해서 false 처리
      setValidateMode(false);
    };
  }, []);

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
    setHidePassword(!hidePassword);
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

  const validateSignUpForm = () => {
    if (!email || !lastName || !firstName || !password) {
      return false;
    }

    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    ) {
      return false;
    }

    if (!birthDay || !birthMonth || !birthYear) {
      return false;
    }

    return true;
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);

    if (!validateSignUpForm()) {
      return;
    }

    try {
      const signUpBody = {
        email,
        lastName,
        firstName,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth!.replace('월', '')}-${birthDay}`,
        ).toISOString(),
      };

      const { data } = await signupAPI(signUpBody);

      dispatch(userActions.setLoggedUser(data));

      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  // password 가 이름이나 이메일을 포함하는지
  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastName ||
      password.includes(lastName) ||
      password.includes(email.split('@')[0]),
    [password, lastName, email],
  );

  // password 비밀번호 최소 자리수
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length > PASSWORD_MIN_LENGTH,
    [password],
  );

  // 비밀번호가 숫자나 특수기호를 포함하는지
  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password],
  );

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className='modal-close-x-icon' onClick={closeModal} />
      <div className='input-wrapper'>
        <Input
          type='email'
          placeholder='이메일 주소'
          icon={<MailIcon />}
          name='email'
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage='이메일이 필요합니다.'
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
          useValidation
          isValid={!!lastName}
          errorMessage='이름을 입력하세요.'
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
          useValidation
          isValid={!!firstName}
          errorMessage='성을 입력하세요.'
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
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            !isPasswordHasNumberOrSymbol
          }
          errorMessage='비밀번호를 입력하세요.'
          onFocus={onFocusPassword}
        />
        {passwordFocused && (
          <>
            <PasswordWarning
              isValid={isPasswordHasNameOrEmail}
              text='비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다.'
            />
            <PasswordWarning
              isValid={!isPasswordOverMinLength}
              text='최소 8자'
            />
            <PasswordWarning
              isValid={isPasswordHasNumberOrSymbol}
              text='숫자나 기호를 포함하세요'
            />
          </>
        )}
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
            isValid={!!birthMonth}
          />
        </div>
        <div className='sign-up-modal-birthday-day-selector'>
          <Selector
            options={dayList}
            disabledOptions={['일']}
            defaultValue='일'
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className='sign-up-modal-birthday-year-selector'>
          <Selector
            options={yearList}
            disabledOptions={['년']}
            defaultValue='년'
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      <div className='sign-up-modal-submit-button-wrapper'>
        <Button type='submit'>가입하기</Button>
      </div>
      <p>
        이미 에어비엔비 계정이 있나요?
        <span
          className='sign-up-modal-set-login'
          role='presentation'
          onClick={() => {}}
        >
          로그인
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
