import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import Question from '../../components/login/Question.jsx';
import OptionButton from '../../components/login/OptionButton.jsx';
import NextButton from '../../components/login/NextButton.jsx';
import styles from '../../styles/login/LoginSelect.module.css';

const LoginSelect = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleOptionSelect = (option) => {
    if (selectedOption === option) {
      setSelectedOption('');
    } else {
      setSelectedOption(option);
    }
  };

  const handleNextClick = () => {
    if (selectedOption === '대학생이에요') {
      navigate('/student'); // 대학생 전용 페이지로 이동
    } else if (selectedOption === '창업했어요') {
      navigate('/business'); // 사업자 대상 페이지로 이동
    }
  };

  return (
    <div className={styles.container}>
      <Question QuestionNum="Q.1" Question="어떤 상태이신가요?" />
      <div className={styles.Btncontainer}>
        <OptionButton
          text="대학생이에요"
          isSelected={selectedOption === '대학생이에요'}
          onClick={() => handleOptionSelect('대학생이에요')}
        />
        <OptionButton
          text="창업했어요"
          isSelected={selectedOption === '창업했어요'}
          onClick={() => handleOptionSelect('창업했어요')}
        />
      </div>
      <NextButton
        text="선택 완료"
        isEnabled={selectedOption !== ''}
        onClick={handleNextClick} // 페이지 이동 함수 호출
      />
    </div>
  );
};

export default LoginSelect;
