import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../../components/login/NextButton.jsx';
import InputWrapper from '../../components/common/InputWrapper.jsx';
import styles from '../../styles/login/StudentCertification.module.css';
import Question from '../../components/login/Question.jsx';
import InputDiv from '../../components/login/InputDiv.jsx';
import mailAlert from '../../assets/images/mailAlert.png';
import axios from 'axios';

const StudentCertification = () => {
  const navigate = useNavigate();
  const [univName, setUniversityName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  const verifyEmail = async () => {
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (emailPattern.test(trimmedEmail)) {
      setIsVerificationCodeSent(true);
      alert('인증번호가 이메일로 전송되었습니다.');

      try {
        const response = await axios.post(
          'https://backend.to-gather.info/api/certification/univ/email',
          {
            univName: univName,
            email: trimmedEmail,
          }
        );

        const token = response.data.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        console.log('인증 요청 성공:', response.data);
      } catch (error) {
        console.error('인증 요청 실패:', error);
        alert('인증 요청에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      alert('유효한 이메일을 입력해주세요.');
    }
  };

  const confirmCode = async () => {
    const numericVerificationCode = Number(verificationCode);
    const token = localStorage.getItem('token');

    if (!token) {
      alert('인증 토큰이 없습니다. 다시 시도해주세요.');
      return;
    }

    console.log('인증 요청 데이터:', {
      code: numericVerificationCode,
      email: email.trim(),
      univName: univName,
    });

    try {
      console.log(token);
      const response = await axios.post(
        'https://backend.to-gather.info/api/certification/univ/auth',
        {
          code: numericVerificationCode,
          email: email.trim(),
          univName: univName,
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = response.data;

      if (responseData.isSuccess) {
        setIsEmailVerified(true);
        setIsCodeConfirmed(true);
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert(
          responseData.message || '인증에 실패하였습니다. 다시 시도해주세요.'
        );
      }
    } catch (error) {
      console.error('인증 확인 실패:', error);

      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage =
          error.response.data?.message ||
          '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

        alert(`오류 코드 ${statusCode}: ${errorMessage}`);
      } else {
        alert(
          '인증 확인에 실패했습니다. 네트워크 상태를 확인하고 다시 시도해주세요.'
        );
      }
    }
  };

  const isNextButtonEnabled =
    univName !== '' && isEmailVerified && isInputValid;

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    validate();
  };

  const validate = () => {
    const isValidUniversity = univName.trim() !== '';
    setIsInputValid(isValidUniversity);
  };

  const handleCertificationRequest = () => {
    console.log('대학교:', univName);
    console.log('이메일:', email);
    verifyEmail();
  };

  const handleNextButtonClick = () => {
    console.log('인증된 학교:', univName);
    navigate('/login-finish');
  };

  return (
    <div className={styles.container}>
      <div style={{ width: '426px' }}>
        <Question QuestionNum="Q.2" Question="대학생 인증을 진행해주세요." />

        <InputDiv
          label="대학생 인증"
          placeholder="대학교명을 입력해 주세요."
          width="393px"
          value={univName}
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
          <button
            className={styles.requestcertiBtn}
            onClick={handleCertificationRequest}
          >
            인증 요청
          </button>
        </div>

        {isVerificationCodeSent && !isCodeConfirmed && (
          <div className={styles.mailcontainer}>
            <InputDiv
              placeholder="인증번호를 입력해주세요."
              width="274px"
              value={verificationCode}
              onChange={handleInputChange(setVerificationCode)}
            />
            <button className={styles.checkcertiBtn} onClick={confirmCode}>
              확인
            </button>
          </div>
        )}
        <img src={mailAlert} className={styles.alertImg} />
        <div className={styles.nextBtn}>
          <NextButton
            text="인증 완료"
            isEnabled={isNextButtonEnabled}
            onClick={handleNextButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentCertification;
