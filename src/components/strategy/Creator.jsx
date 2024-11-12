import { useNavigate } from 'react-router-dom';
import styles from '../../styles/strategy/Creator.module.css';
import ThumbnailCard from '../creator/ThumbnailCard';
import ResultHeader from './ResultHeader';

export default function Creator() {
  const navigate = useNavigate();
  const data = [
    {
      url: '',
      minPrice: 20000,
      creator: '예찬',
      category: ['영상', 'SNS'],
      description: '어쩌고 저쩌고 랑람ㄴ얼;미아너',
    },
    {
      url: '',
      minPrice: 20000,
      creator: '예찬',
      category: ['영상', 'SNS'],
      description: '어쩌고 저쩌고 랑람ㄴ얼;미아너',
    },
    {
      url: '',
      minPrice: 20000,
      creator: '예찬',
      category: ['영상', 'SNS'],
      description: '어쩌고 저쩌고 랑람ㄴ얼;미아너',
    },
    {
      url: '',
      minPrice: 20000,
      creator: '예찬',
      category: ['영상', 'SNS'],
      description: '어쩌고 저쩌고 랑람ㄴ얼;미아너',
    },
    {
      url: '',
      minPrice: 20000,
      creator: '예찬',
      category: ['영상', 'SNS'],
      description: '어쩌고 저쩌고 랑람ㄴ얼;미아너',
    },
    {
      url: '',
      minPrice: 20000,
      creator: '예찬',
      category: ['영상', 'SNS'],
      description: '어쩌고 저쩌고 랑람ㄴ얼;미아너',
    },
  ];

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
            description={item.description}
            creatorName={item.creator}
            category={item.category}
            minPrice={item.minPrice}
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
