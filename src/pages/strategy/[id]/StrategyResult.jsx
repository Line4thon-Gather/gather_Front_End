import Loading from '../../../components/common/Loading';
import styles from '../../../styles/strategy/StrategyResult.module.css';
import { useState } from 'react';
import TimeLine from '../../../components/strategy/TimeLine';
import ResultHeader from '../../../components/strategy/ResultHeader';
import Cost from '../../../components/strategy/Cost';
import Footer from '../../../components/home/Footer';
import ThumbnailCard from '../../../components/creator/ThumbnailCard';

export default function StrategyResult() {
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    {
      url: '',
    },
  ];

  if (isLoading) {
    return <Loading width="100vw" height="100vh" />;
  }

  return (
    <div className={styles.pageWrapper}>
      <TimeLine setIsLoading={setIsLoading} />
      <Cost />
      <div className={styles.creatorWrapper}>
        <ResultHeader type="크리에이터" />
      </div>
      <Footer />
      <ThumbnailCard
        description="크리에이터의 소개글이 적히는 공간입니다."
        creatorName="예찬"
      />
    </div>
  );
}
