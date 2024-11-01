import React from 'react';
import styles from '../../styles/creator/ThumbnailCard.module.css';

const ThumbnailCard = ({
  imageUrl,
  category,
  creatorName,
  rating,
  reviewCount,
  minPrice,
  description,
}) => {
  return (
    <div className={styles.cardContainer}>
      <img src={imageUrl} alt="썸네일 사진" className={styles.thumbnail} />
      <div className={`${styles.category} ${styles[category]}`}>{category}</div>
      <p className={styles.description}>{truncateText(description, 30)}</p>
      <div className={styles.creatorInfo}>
        <span className={styles.creatorName}>
          {truncateText(creatorName, 20)}
        </span>
        <span className={styles.rating}>
          <span className={styles.star}>⭐</span> {rating}
          <span className={styles.reviewCount}>({reviewCount})</span>
        </span>
      </div>
      <div className={styles.price}>{minPrice}원~</div>
    </div>
  );
};

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export default ThumbnailCard;
