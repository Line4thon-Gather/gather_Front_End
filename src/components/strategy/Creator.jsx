import { useNavigate } from 'react-router-dom';
import styles from '../../styles/strategy/Creator.module.css';
import ThumbnailCard from '../creator/ThumbnailCard';
import ResultHeader from './ResultHeader';
import P from 'prop-types';

export default function Creator({ data }) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/creator');
  };
  return (
    <div className={styles.creatorWrapper}>
      <div className={styles.headerWrapper}>
        <ResultHeader type="크리에이터" />
      </div>
      <div className={styles.thumbnailwrapper}>
        {data.map((item, index) => (
          <ThumbnailCard
            key={index}
            description={item.introductionTitle}
            creatorName={item.nickname}
            category={item.availableWork}
            minPrice={item.startPrice}
            imageUrl={item.thumbnailImgUrl}
          />
        ))}
      </div>
      <div className={styles.navigationWrapper}>
        <div onClick={handleNav} className={styles.navigation}>
          <span>더 많은 크리에이터 보기</span>
          <img src="/right.png" />
        </div>
      </div>
    </div>
  );
}

Creator.propTypes = {
  data: P.array,
};
