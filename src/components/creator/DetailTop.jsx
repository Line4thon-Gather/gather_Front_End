import React from 'react';
import styles from '../../styles/creator/DetailTop.module.css';
import basicimage from '../../assets/images/ModalImage.png';

const DetailTop = ({ creator }) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.creatorImage}
        src={creator.profileImgUrl ? creator.profileImgUrl : basicimage}
        alt={creator.nickname}
      />
      <div className={styles.infoContainer}>
        <p className={styles.category}>카테고리: 영상, 인쇄물</p>
        {/* 서버 응답에는 카테고리가 없으므로 고정된 값을 사용 */}
        <p className={styles.description}>
          {creator.introductionContent
            ? creator.introductionContent
            : '소개가 없습니다.'}
        </p>
        <h2 className={styles.creatorName}>{creator.nickname}</h2>
      </div>
    </div>
  );
};

export default DetailTop;
