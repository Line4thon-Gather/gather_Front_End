import React, { useState } from 'react';
import NextButton from '../../components/login/NextButton.jsx';
import styles from '../../styles/login/BusinessCertification.module.css';
import Question from '../../components/login/Question.jsx';
import InputDiv from '../../components/login/InputDiv.jsx';

const BusinessCertification = () => {
  const [businessNumber, setBusinessNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [representativeName, setRepresentativeName] = useState('');

  const isNextButtonEnabled = businessNumber && startDate && representativeName;

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
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
            onClick={() => alert(`인증된 사업자: ${representativeName}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessCertification;
