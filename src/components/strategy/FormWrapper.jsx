import InputWrapper from '../common/InputWrapper';
import styles from '../../styles/strategy/Strategy.module.css';
import { useState, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { useEffect } from 'react';
import { validateFull, validateInputs } from '../../hooks/useStrategy';

export default function FormWrapper() {
  const [isFailed, setIsFailed] = useState({
    title: false,
    period: false,
    target: false,
    budget: false,
  });
  const [isInputFull, setIsInputFull] = useState(false);
  const { value } = useStore();
  const titleRef = useRef();
  const periodRef = useRef();
  const targetRef = useRef();
  const budgetRef = useRef();

  const dropdownList = [
    '선택',
    '인쇄물(포스터, 배너 등)',
    '영상(숏폼, 롱폼 등)',
    'SNS 게시물(피드 등)',
  ];

  useEffect(() => {
    validateFull(
      value,
      titleRef,
      periodRef,
      targetRef,
      budgetRef,
      setIsInputFull
    );
  }, [value]);

  return (
    <div className={styles.inputsWrapper}>
      <InputWrapper
        label="홍보 제목"
        isFailed={isFailed['title']}
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
          isFailed={isFailed['period']}
          refer={periodRef} // ref 추가
          onChange={validateFull}
        />
        <InputWrapper
          width="100%"
          label="목표 인원"
          placeholder="ex) 00명 이상"
          spanPosition="back"
          span="명 이상"
          isFailed={isFailed['target']}
          refer={targetRef} // ref 추가
          onChange={validateFull}
        />
      </div>
      <InputWrapper
        label="보유한 예산"
        span="만원"
        spanPosition="back"
        placeholder="ex) 50만원일 경우 ‘50’만 입력"
        width="70.35%"
        isFailed={isFailed['budget']}
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
              isFailed={isFailed}
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
        <button
          onClick={() =>
            validateInputs(
              periodRef,
              targetRef,
              budgetRef,
              isFailed,
              setIsFailed
            )
          }
        >
          홍보 전략 제안받기
        </button>
      </div>
    </div>
  );
}
