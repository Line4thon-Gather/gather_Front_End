import React from 'react';
import styles from '../../styles/creator/ThumbnailCard.module.css';
import { useNavigate } from 'react-router-dom';

const ThumbnailCard = ({
  imageUrl,
  category,
  creatorName,
  minPrice,
  description,
}) => {
  const categories = Array.isArray(category) ? category : category.split(', ');
  const navigate = useNavigate();

  return (
    <div
      className={styles.cardContainer}
      onClick={() => navigate(`/creator/${creatorName}`)}
    >
      <img src={imageUrl} alt="썸네일 사진" className={styles.thumbnail} />
      <div className={styles.categoryContainer}>
        {categories.map((cat, index) => (
          <span
            key={index}
            className={`${styles.category} ${styles[cat.trim()] || ''}`}
          >
            {cat.trim()}
          </span>
        ))}
      </div>
      <p className={styles.description}>{truncateText(description, 30)}</p>
      <div className={styles.creatorInfo}>
        <span className={styles.creatorName}>
          {truncateText(creatorName, 20)}
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
