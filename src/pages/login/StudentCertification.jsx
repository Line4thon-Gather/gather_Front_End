import React, { useState, useRef } from 'react';
import NextButton from '../../components/login/NextButton.jsx';
import InputWrapper from '../../components/common/InputWrapper.jsx';
import styles from '../../styles/login/StudentCertification.module.css';
import Question from '../../components/login/Question.jsx';
import InputDiv from '../../components/login/InputDiv.jsx';
import mailAlert from '../../assets/images/mailAlert.png';

const StudentCertification = () => {
  const [universityName, setUniversityName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  const universityRef = useRef();
  const emailRef = useRef();
  const verificationCodeRef = useRef();

  const verifyEmail = () => {
    const trimmedEmail = email.trim();
    console.log('입력된 이메일:', trimmedEmail);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (emailPattern.test(trimmedEmail)) {
      setIsVerificationCodeSent(true);
      alert('인증번호가 이메일로 전송되었습니다.');
    } else {
      console.log('유효하지 않은 이메일 형식:', trimmedEmail);
      alert('유효한 이메일을 입력해주세요.');
    }
  };

  const confirmCode = () => {
    if (verificationCode === '123456') {
      setIsEmailVerified(true);
      setIsCodeConfirmed(true);
      alert('이메일 인증이 완료되었습니다.');
    } else {
      alert('인증번호가 올바르지 않습니다.');
    }
  };

  const isNextButtonEnabled =
    universityName !== '' && isEmailVerified && isInputValid;

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    validate();
  };

  const validate = () => {
    const isValidUniversity = universityName.trim() !== '';
    setIsInputValid(isValidUniversity);
  };

  return (
    <div className={styles.container}>
      <div style={{ width: '426px' }}>
        <Question QuestionNum="Q.2" Question="대학생 인증을 진행해주세요." />

        <InputDiv
          label="대학생 인증"
          placeholder="대학교명을 입력해 주세요."
          width="393px"
          value={universityName}
          onChange={handleInputChange(setUniversityName)}
        />

        <div className={styles.mailcontainer}>
          <InputDiv
            label="이메일 인증"
            placeholder="학교 이메일을 입력해주세요."
            width="274px"
            value={email}
            onChange={handleInputChange(setEmail)}
          />
          <button className={styles.certiBtn} onClick={verifyEmail}>
            인증 요청
          </button>
        </div>

        {isVerificationCodeSent && !isCodeConfirmed && (
          <div>
            <InputDiv
              label="인증번호 입력"
              placeholder="인증번호를 입력해주세요."
              width="274px"
              value={verificationCode}
              onChange={handleInputChange(setVerificationCode)}
            />
            <button className={styles.certiBtn} onClick={confirmCode}>
              확인
            </button>
          </div>
        )}
        <img src={mailAlert} className={styles.alertImg} />
        <div className={styles.nextBtn}>
          <NextButton
            text="인증 완료"
            isEnabled={isNextButtonEnabled}
            onClick={() => alert(`인증된 학교: ${universityName}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentCertification;
