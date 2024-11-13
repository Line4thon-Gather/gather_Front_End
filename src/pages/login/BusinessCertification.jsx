import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import NextButton from '../../components/login/NextButton.jsx';
import styles from '../../styles/login/BusinessCertification.module.css';
import Question from '../../components/login/Question.jsx';
import InputDiv from '../../components/login/InputDiv.jsx';

const BusinessCertification = () => {
  const [businessNumber, setBusinessNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const history = useHistory();

  const isNextButtonEnabled = businessNumber && startDate && representativeName;

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleCertification = async () => {
    setIsLoading(true);
    console.log('인증 요청 시작:', {
      businessNumber,
      startDate,
      representativeName,
    });
    try {
      const response = await axios.post(
        'https://backend.to-gather.info/api/certification/entrepreneur',
        {
          b_no: businessNumber,
          start_dt: startDate.replace(/\//g, ''), // YYYY/MM/DD 형식을 YYYYMMDD로 변환
          p_nm: representativeName,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('인증 응답 데이터:', response.data);

      if (response.data.isSuccess) {
        alert(`사업자 인증에 성공하였습니다: ${representativeName}`);
        setApiResponse(response.data);
        history.push('/login-finish');
      } else {
        alert(`사업자 인증에 실패하였습니다: ${response.data.message}`);
      }
    } catch (error) {
      console.error('인증 중 오류 발생:', error);
      alert('사업자 인증 중 오류가 발생하였습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
      console.log('인증 요청 완료');
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
            text={isLoading ? '인증 중...' : '인증 완료'}
            isEnabled={isNextButtonEnabled && !isLoading}
            onClick={handleCertification}
          />
        </div>
        {apiResponse && (
          <div className={styles.responseMessage}>
            <p>인증 결과: {apiResponse.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCertification;
