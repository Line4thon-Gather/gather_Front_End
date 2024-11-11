import React from 'react';
import styles from '../../styles/creator/WorkDetail.module.css';
import DEFAULT_IMAGE from '../../assets/images/workBasic.png';

const WorkDetail = ({ imageUrl, workName, price, duration }) => {
  return (
    <div className={styles.workDetailContainer}>
      <img
        src={imageUrl || DEFAULT_IMAGE}
        alt="작업 이미지"
        className={styles.workImage}
      />
      <div className={styles.categoryContainer}>
        <h3 className={styles.workName}>{workName}</h3>
        <div className={styles.price}>{price}원~</div>
        <div className={styles.duration}>총 {duration}일</div>
      </div>
    </div>
  );
};

export default WorkDetail;
