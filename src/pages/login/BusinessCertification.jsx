import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NextButton from '../../components/login/NextButton.jsx';
import styles from '../../styles/login/BusinessCertification.module.css';
import Question from '../../components/login/Question.jsx';
import InputDiv from '../../components/login/InputDiv.jsx';

const BusinessCertification = () => {
  const [businessNumber, setBusinessNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const navigate = useNavigate();

  const isNextButtonEnabled = businessNumber && startDate && representativeName;

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleCertification = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('인증 토큰이 없습니다. 다시 시도해주세요.');
      return;
    }

    console.log('인증 토큰:', token);

    console.log('인증 요청 데이터:', {
      b_no: businessNumber,
      start_dt: startDate,
      p_nm: representativeName,
    });

    try {
      console.log('요청 헤더에 담긴 인증 토큰:', token);

      const response = await axios.post(
        'https://backend.to-gather.info/api/certification/entrepreneur',
        {
          b_no: businessNumber,
          start_dt: startDate,
          p_nm: representativeName,
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
        navigate('/login-finish');
      } else {
        alert('사업자 인증에 실패했습니다. 정보를 다시 확인해 주세요.');
      }
    } catch (error) {
      console.error('인증 요청 중 오류가 발생했습니다:', error);
      alert(
        '사업자 인증 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      );
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ width: '426px' }}>
        <Question QuestionNum="Q.2" Question="사업자 인증을 진행해주세요." />
        <div className={styles.inputcontainer}>
          <InputDiv
            label="사업자 등록번호"
            placeholder="사업자등록번호를 입력해 주세요."
            width="393px"
            value={businessNumber}
            onChange={handleInputChange(setBusinessNumber)}
          />

          <InputDiv
            label="개업일자"
            placeholder="YYYY/MM/DD"
            width="393px"
            value={startDate}
            onChange={handleInputChange(setStartDate)}
          />

          <InputDiv
            label="대표자 성명"
            placeholder="대표자 성명을 입력해 주세요."
            width="393px"
            value={representativeName}
            onChange={handleInputChange(setRepresentativeName)}
          />
        </div>
        <div className={styles.nextBtn}>
          <NextButton
            text="인증 완료"
            isEnabled={isNextButtonEnabled}
            onClick={handleCertification}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessCertification;
