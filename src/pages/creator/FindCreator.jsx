import React, { useState } from 'react';
import ThumbnailCard from '../../components/creator/ThumbnailCard';
import AddPortfolio from '../../assets/images/AddPortfolio.png';
import styles from '../../styles/creator/FindCreator.module.css';
import Image from '../../assets/images/ModalImage.png';
import Toggle from '../../components/creator/Toggle';

const FindCreator = () => {
  const [priceRange, setPriceRange] = useState('전체');
  const [category, setCategory] = useState('전체');
  const [sortOrder, setSortOrder] = useState('최신순');

  const initialValues1 = '가격대';
  const initialValues2 = '카테고리';
  const initialValues3 = '정렬';

  const creatorData = [
    {
      imageUrl: AddPortfolio,
      category: ['영상', '인쇄물'],
      creatorName: '홍길동',
      rating: '4.5',
      reviewCount: 12,
      minPrice: 15000,
      description:
        '영상 제작과 인쇄물을 전문으로 하는 홍길동입니다. 다양한 스타일을 제공합니다.',
    },
    {
      imageUrl: AddPortfolio,
      category: ['인쇄물'],
      creatorName: '김철수',
      rating: '4.2',
      reviewCount: 8,
      minPrice: 50000,
      description:
        '인쇄물을 디자인하고 제작하는 김철수입니다. 고퀄리티 인쇄물을 약속드립니다.',
    },
    {
      imageUrl: AddPortfolio,
      category: ['SNS'],
      creatorName: '이영희',
      rating: '5.0',
      reviewCount: 20,
      minPrice: 110000,
      description:
        'SNS 마케팅 전문가 이영희입니다. 브랜드의 인지도를 높이는 데 도움을 드립니다.',
    },
    {
      imageUrl: AddPortfolio,
      category: ['영상', '인쇄물'],
      creatorName: '홍길동',
      rating: '4.5',
      reviewCount: 12,
      minPrice: 15000,
      description:
        '영상 제작과 인쇄물을 전문으로 하는 홍길동입니다. 다양한 스타일을 제공합니다.',
    },
    {
      imageUrl: AddPortfolio,
      category: ['인쇄물', 'SNS', '영상'],
      creatorName: '김철수',
      rating: '4.2',
      reviewCount: 8,
      minPrice: 50000,
      description:
        '인쇄물을 디자인하고 제작하는 김철수입니다. 고퀄리티 인쇄물을 약속드립니다.',
    },
    {
      imageUrl: AddPortfolio,
      category: ['SNS'],
      creatorName: '이영희',
      rating: '5.0',
      reviewCount: 20,
      minPrice: 110000,
      description:
        'SNS 마케팅 전문가 이영희입니다. 브랜드의 인지도를 높이는 데 도움을 드립니다.',
    },
  ];

  const filteredData = creatorData
    .filter((creator) => {
      if (priceRange === '전체') return true;
      const priceConditions = {
        '1만원 미만': creator.minPrice < 10000,
        '5만원 미만': creator.minPrice < 50000,
        '10만원 미만': creator.minPrice < 100000,
        '20만원 미만': creator.minPrice < 200000,
        '20만원 이상': creator.minPrice >= 200000,
      };
      return priceConditions[priceRange];
    })
    .filter((creator) => {
      if (category === '전체') return true;
      return Array.isArray(creator.category)
        ? creator.category.includes(category)
        : creator.category === category;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case '리뷰순':
          return b.reviewCount - a.reviewCount;
        case '가격낮은순':
          return a.minPrice - b.minPrice;
        case '가격높은순':
          return b.minPrice - a.minPrice;
        default:
          return 0;
      }
    });

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <img className={styles.logoImg} src={Image} alt="로고" />
          <h2>
            여러분의 홍보물을 제작해 줄 <span>크리에이터 </span>를 선택해보세요
          </h2>
          <div className={styles.filters}>
            <Toggle
              label="가격대"
              initialValues={initialValues1}
              options={[
                { value: '전체', label: '전체' },
                { value: '1만원 미만', label: '1만원 미만' },
                { value: '5만원 미만', label: '5만원 미만' },
                { value: '10만원 미만', label: '10만원 미만' },
                { value: '20만원 미만', label: '20만원 미만' },
                { value: '20만원 이상', label: '20만원 이상' },
              ]}
              selectedValue={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
            <Toggle
              label="카테고리"
              initialValues={initialValues2}
              options={[
                { value: '전체', label: '전체' },
                { value: '인쇄물', label: '인쇄물' },
                { value: '영상', label: '영상' },
                { value: 'SNS', label: 'SNS' },
              ]}
              selectedValue={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Toggle
              label="정렬"
              initialValues={initialValues3}
              options={[
                { value: '최신순', label: '최신순' },
                { value: '리뷰순', label: '리뷰순' },
                { value: '가격낮은순', label: '가격낮은순' },
                { value: '가격높은순', label: '가격높은순' },
              ]}
              selectedValue={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.creatorContainer}>
          {filteredData.map((creator, index) => (
            <div
              className={`${styles.thumbnailCard} ${creator.category
                .map((cat) => styles[cat])
                .join(' ')}`}
              key={index}
            >
              <ThumbnailCard
                imageUrl={creator.imageUrl}
                category={creator.category.join(', ')}
                creatorName={creator.creatorName}
                rating={creator.rating}
                reviewCount={creator.reviewCount}
                minPrice={creator.minPrice.toLocaleString()}
                description={creator.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindCreator;
