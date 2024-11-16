import React from 'react';
import styles from '../../styles/creator/DetailTop.module.css';
import basicimage from '../../assets/images/ModalImage.png';

const DetailTop = ({ creator }) => {
  const categoryTranslations = {
    prints: '인쇄물',
    video: '영상',
    sns_post: 'SNS',
  };

  const categories = Array.isArray(creator.getWorkResList)
    ? [
        ...new Set(
          creator.getWorkResList
            .map((work) => work.category)
            .filter(Boolean)
            .map((cat) => cat.trim().toLowerCase())
        ),
      ]
    : [];

  return (
    <div className={styles.container}>
      <img
        className={styles.creatorImage}
        src={creator.profileImgUrl ? creator.profileImgUrl : basicimage}
        alt={creator.nickname || '크리에이터 이미지'}
      />
      <div className={styles.infoContainer}>
        <div className={styles.categoryContainer}>
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <span
                key={index}
                className={`${styles.category} ${
                  styles[cat] || styles.defaultCategory
                }`}
              >
                {categoryTranslations[cat] || '알 수 없는 카테고리'}
              </span>
            ))
          ) : (
            <p className={styles.noCategory}>카테고리: 없음</p>
          )}
        </div>
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
