import InputWrapper from '../common/InputWrapper';
import styles from '../../styles/strategy/Strategy.module.css';
import { useState, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { useValidateFull } from '../../hooks/useStrategy';
import { useNavigate } from 'react-router-dom';

export default function FormWrapper() {
  const [isInputFull, setIsInputFull] = useState(false);
  const { value } = useStore();
  const titleRef = useRef();
  const periodRef = useRef();
  const targetRef = useRef();
  const budgetRef = useRef();
  const navigate = useNavigate();

  const dropdownList = [
    '선택',
    '인쇄물(포스터, 배너 등)',
    '영상(숏폼, 롱폼 등)',
    'SNS 게시물(피드 등)',
  ];

  const handleSubmit = () => {
    navigate(`result`, {
      state: {
        title: titleRef.current.value,
        period: parseInt(periodRef.current.value),
        targetNumberOfPeople: parseInt(targetRef.current.value),
        budget: parseInt(budgetRef.current.value.split(',').join('')),
        firstMeans: value[0],
        secondMeans: value[1],
        thirdMeans: value[2],
      },
    });
  };

  //prop로 전달할 onChange 핸들러
  const validateFull = useValidateFull(
    value,
    titleRef,
    periodRef,
    targetRef,
    budgetRef,
    setIsInputFull
  );

  return (
    <div className={styles.inputsWrapper}>
      <InputWrapper
        label="홍보 제목"
        width="100%"
        placeholder="홍보 제목을 입력해주세요"
        refer={titleRef} // ref 추가
        onChange={validateFull}
      />
      <div className={styles.inputs}>
        <InputWrapper
          width="100%"
          label="예상 모집 기간"
          placeholder="ex) 00일"
          spanPosition="back"
          span="일"
          refer={periodRef} // ref 추가
          onChange={validateFull}
        />
        <InputWrapper
          width="100%"
          label="목표 인원"
          placeholder="ex) 00명 이상"
          spanPosition="back"
          span="명 이상"
          refer={targetRef} // ref 추가
          onChange={validateFull}
        />
      </div>
      <InputWrapper
        label="보유한 예산"
        span="원"
        spanPosition="back"
        placeholder="10,000원 이상부터 입력 가능해요."
        width="70.35%"
        refer={budgetRef} // ref 추가
        onChange={validateFull}
      />
      <div className={styles.inputWrapper}>
        <label>원하는 홍보 수단 선택</label>
        <div className={styles.selectWrapper}>
          {Array.from({ length: 3 }).map((_, index) => (
            <InputWrapper
              number={index}
              key={index}
              spanPosition="front"
              span={`${index + 1}순위`}
              placeholder="선택"
              list={dropdownList}
              onChange={validateFull}
            />
          ))}
        </div>
      </div>
      <div
        className={`${styles.submitBtn} ${isInputFull ? styles.active : ''}`}
      >
        <button onClick={handleSubmit} disabled={!isInputFull}>
          홍보 전략 제안받기
        </button>
      </div>
    </div>
  );
}
