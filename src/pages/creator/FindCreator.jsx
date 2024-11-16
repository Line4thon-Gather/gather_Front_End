import { useEffect, useState } from 'react';
import ThumbnailCard from '../../components/creator/ThumbnailCard';
import styles from '../../styles/creator/FindCreator.module.css';
import Image from '../../assets/images/ModalImage.png';
import Toggle from '../../components/creator/Toggle';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCreatorList } from '../../hooks/useCreator';
import Footer from '../../components/home/Footer';
import { useInView } from 'react-intersection-observer';

const FindCreator = () => {
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const { ref, inView } = useInView({
    threshold: 1.0, // Trigger when fully visible
  });

  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['creator', category, sortOrder, priceRange],
    queryFn: ({ pageParam = 0 }) =>
      getCreatorList(pageParam, sortOrder, category, priceRange),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return pages.length;
      return undefined;
    },
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const allCreators = data.pages
        ?.flatMap((page) => page.data)
        ?.map((creator) => ({
          id: creator.nickname,
          imageUrl: creator.thumbnailImgUrl || '기본 이미지 경로',
          category: creator.availableWork,
          nickname: creator.nickname,
          minPrice: parseInt(creator.startPrice, 10),
          description: creator.introductionTitle || '소개가 없습니다.',
          reviewCount: 0,
          rating: 0,
        }));

      setFilteredData(allCreators);
    }
  }, [data, priceRange, category, sortOrder]);

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
              currentLabel={priceRange}
              setCurrentLabel={setPriceRange}
              options={[
                { value: '', label: '가격대' },
                { value: 10000, label: '1만원 미만' },
                { value: 50000, label: '5만원 미만' },
                { value: 100000, label: '10만원 미만' },
                { value: 200000, label: '20만원 미만' },
                { value: 200001, label: '20만원 이상' },
              ]}
              selectedValue={priceRange}
              onChange={(e) => {
                setSortOrder('');
                // 정렬이 변경될 경우, 다른 두 필터(가격대, 카테고리)를 초기화
                setPriceRange(e.target.value); // 가격대 초기화
                setCategory(''); // 카테고리 초기화
              }}
            />
            <Toggle
              label="카테고리"
              currentLabel={category}
              setCurrentLabel={setCategory}
              options={[
                { value: '', label: '카테고리' },
                { value: 'PRINTS', label: '인쇄물' },
                { value: 'VIDEO', label: '영상' },
                { value: 'SNS_POST', label: 'SNS' },
              ]}
              selectedValue={category}
              onChange={(e) => {
                setSortOrder('');
                // 정렬이 변경될 경우, 다른 두 필터(가격대, 카테고리)를 초기화
                setPriceRange(''); // 가격대 초기화
                setCategory(e.target.value); // 카테고리 초기화
              }}
            />
            <Toggle
              label="최신순"
              currentLabel={sortOrder}
              setCurrentLabel={setSortOrder}
              options={[
                { value: 'recently', label: '최신순' },
                { value: 'lowPrice', label: '가격낮은순' },
                { value: 'highPrice', label: '가격높은순' },
              ]}
              selectedValue={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                // 정렬이 변경될 경우, 다른 두 필터(가격대, 카테고리)를 초기화
                setPriceRange(''); // 가격대 초기화
                setCategory(''); // 카테고리 초기화
              }}
            />
          </div>
        </div>

        <div className={styles.creatorContainer}>
          {filteredData &&
            filteredData.map((creator, index) => (
              <ThumbnailCard
                key={index}
                imageUrl={creator.imageUrl}
                category={creator.category.join(', ')}
                creatorName={creator.nickname}
                rating={creator.rating}
                reviewCount={creator.reviewCount}
                minPrice={creator.minPrice.toLocaleString()}
                description={creator.description}
              />
            ))}
          {hasNextPage && (
            <div style={{ width: '20px' }} ref={ref} className={styles.loading}>
              {isFetching ? '로딩 중...' : '스크롤하여 더 보기'}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindCreator;
