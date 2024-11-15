import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThumbnailCard from '../../components/creator/ThumbnailCard';
import styles from '../../styles/creator/FindCreator.module.css';
import Image from '../../assets/images/ModalImage.png';
import Toggle from '../../components/creator/Toggle';

const FindCreator = () => {
  const navigate = useNavigate();
  const handleCardClick = (nickname) => {
    navigate(`/creator/${nickname}`);
  };

  const [priceRange, setPriceRange] = useState('전체');
  const [category, setCategory] = useState('전체');
  const [sortOrder, setSortOrder] = useState('최신순');
  const [creatorData, setCreatorData] = useState([]);

  const initialValues1 = '가격대';
  const initialValues2 = '카테고리';
  const initialValues3 = '정렬';

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('토큰:', token);

        if (!token) {
          console.error('토큰이 없습니다. 인증이 필요한 페이지입니다.');
          return;
        }

        console.log('API 요청을 시작합니다.');

        const response = await axios.get(
          'https://backend.to-gather.info/api/creator',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          }
        );

        console.log('API 응답:', response);

        if (response.data.isSuccess) {
          const data = response.data.data;

          const formattedData = [
            {
              id: data.nickname,
              imageUrl: data.profileImgUrl,
              category: ['영상', '인쇄물'],
              nickname: data.nickname,
              minPrice: 50000,
              description: data.introductionContent || '소개가 없습니다.',
            },
          ];

          console.log('데이터 변환 완료:', formattedData);

          setCreatorData(formattedData);
        } else {
          console.error(
            '데이터를 가져오는 데 실패했습니다. 응답 메시지:',
            response.data.message
          );
        }
      } catch (error) {
        console.error('API 호출 중 오류가 발생했습니다:', error);
      }
    };

    fetchCreatorData();
  }, []);

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
          {filteredData.map((creator) => (
            <div
              className={`${styles.thumbnailCard} ${creator.category
                .map((cat) => styles[cat])
                .join(' ')}`}
              key={creator.id}
              onClick={() => handleCardClick(creator.nickname)}
            >
              <ThumbnailCard
                imageUrl={creator.imageUrl}
                category={creator.category.join(', ')}
                creatorName={creator.nickname}
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
