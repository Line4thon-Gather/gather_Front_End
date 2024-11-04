import React from 'react';
import styles from '../../styles/creator/DetailTop.module.css';
import basicimage from '../../assets/images/ModalImage.png';

const DetailTop = () => {
  const creator = {
    name: '크리에이터 이름',
    category: '영상',
    description: '여기에 크리에이터의 소개글이 들어갑니다.',
    imageUrl: 'https://example.com/creator-image.jpg',
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.creatorImage}
        src={basicimage}
        alt={creator.name}
      />
      <div className={styles.infoContainer}>
        <p className={styles.category}>{creator.category}</p>
        <p className={styles.description}>{creator.description}</p>
        <h2 className={styles.creatorName}>{creator.name}</h2>
      </div>
    </div>
  );
};

export default DetailTop;
