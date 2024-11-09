import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from '../../components/login/Question.jsx';
import OptionButton from '../../components/login/OptionButton.jsx';
import NextButton from '../../components/login/NextButton.jsx';
import styles from '../../styles/login/LoginSelect.module.css';

const LoginSelect = () => {
  const [role, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption((prev) => (prev === option ? '' : option));
  };

  const handleNextClick = () => {
    if (role) {
      localStorage.setItem('role', role);

      if (role === '대학생') {
        navigate('/student');
      } else if (role === '창업') {
        navigate('/business');
      }
    }
  };

  return (
    <div className={styles.container}>
      <Question QuestionNum="Q.1" Question="어떤 상태이신가요?" />
      <div className={styles.Btncontainer}>
        <OptionButton
          text="대학생이에요"
          isSelected={role === '대학생'}
          onClick={() => handleOptionSelect('대학생')}
        />
        <OptionButton
          text="창업했어요"
          isSelected={role === '창업'}
          onClick={() => handleOptionSelect('창업')}
        />
      </div>
      <NextButton
        text="선택 완료"
        isEnabled={role !== ''}
        onClick={handleNextClick}
      />
    </div>
  );
};

export default LoginSelect;
