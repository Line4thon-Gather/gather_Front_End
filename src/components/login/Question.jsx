import React from 'react';
import styles from '../../styles/login/Question.module.css';

function Question({ QuestionNum, Question }) {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionNum}>{QuestionNum}</div>
      <h2 className={styles.questionText}>{Question}</h2>
    </div>
  );
}

export default Question;
